import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Geçerli bir e-posta adresi giriniz.' },
        { status: 400 }
      );
    }

    const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID;
    const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    let GOOGLE_SHEET_NAME = (process.env.GOOGLE_SHEET_NAME || 'Sheet1').trim();
    let GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

    if (GOOGLE_PRIVATE_KEY) {
      GOOGLE_PRIVATE_KEY = GOOGLE_PRIVATE_KEY.trim().replace(/^["']|["']$/g, '');
      GOOGLE_PRIVATE_KEY = GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');
      if (!GOOGLE_PRIVATE_KEY.includes('-----BEGIN PRIVATE KEY-----')) {
        GOOGLE_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----\n${GOOGLE_PRIVATE_KEY}\n-----END PRIVATE KEY-----\n`;
      }
    }

    if (GOOGLE_SHEETS_ID && GOOGLE_SERVICE_ACCOUNT_EMAIL && GOOGLE_PRIVATE_KEY) {
      try {
        const auth = new google.auth.JWT({
          email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
          key: GOOGLE_PRIVATE_KEY.trim(),
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const sheets = google.sheets({ version: 'v4', auth });

        // ----------------------------------------------------
        // 1) Debug: Google Sheets içinde olan tüm sheet isimlerini oku
        // ----------------------------------------------------
        const meta = await sheets.spreadsheets.get({
          spreadsheetId: GOOGLE_SHEETS_ID,
        });

        console.log(
          'Sheets inside spreadsheet:',
          meta.data.sheets?.map((s) => s.properties?.title)
        );

        // ----------------------------------------------------
        // 2) Sheet adını güvenli hale getir (boşluk, özel karakterler için)
        // ----------------------------------------------------
        const safeSheetName = GOOGLE_SHEET_NAME.replace(/'/g, "''");
        const range = `'${safeSheetName}'!A1`;

        console.log('Attempting to append to range:', range);

        // ----------------------------------------------------
        // 3) Veriyi ekle
        // ----------------------------------------------------
        await sheets.spreadsheets.values.append({
          spreadsheetId: GOOGLE_SHEETS_ID,
          range,
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [[email, new Date().toLocaleString('tr-TR')]],
          },
        });

        console.log('Newsletter subscription saved to Google Sheets:', email);
      } catch (sheetsError: any) {
        console.error('Google Sheets error:', sheetsError?.response?.data || sheetsError);
      }
    }

    console.log('Newsletter subscription:', email, new Date().toISOString());

    return NextResponse.json(
      { success: true, message: 'Newsletter kaydı başarıyla alındı!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'Bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}
