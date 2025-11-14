import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://evart.com';

export const metadata: Metadata = {
  title: "Evart Oran",
  description: "Ankara'nın kalbinde seçkin bir yaşam. Evart Oran projesi ile şehrin merkezinde lüks konut fırsatları. Detaylı bilgi için iletişime geçin.",
  alternates: {
    canonical: `${baseUrl}/evart-oran`,
  },
  openGraph: {
    title: "Evart Oran - Ankara'nın Kalbinde Seçkin Bir Yaşam",
    description: "Ankara'nın kalbinde seçkin bir yaşam. Evart Oran projesi ile şehrin merkezinde lüks konut fırsatları.",
    url: `${baseUrl}/evart-oran`,
    type: "website",
  },
};

export default function EvartOranLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

