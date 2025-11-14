import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://evart.com';

export const metadata: Metadata = {
  title: "Evart Yalıkavak",
  description: "Şehrin enerjisiyle Bodrum'un ruhu buluşuyor. Evart Yalıkavak projesi ile deniz kenarında lüks yaşam. Detaylı bilgi için iletişime geçin.",
  alternates: {
    canonical: `${baseUrl}/evart-yalikavak`,
  },
  openGraph: {
    title: "Evart Yalıkavak - Bodrum'da Lüks Yaşam",
    description: "Şehrin enerjisiyle Bodrum'un ruhu buluşuyor. Evart Yalıkavak projesi ile deniz kenarında lüks yaşam.",
    url: `${baseUrl}/evart-yalikavak`,
    type: "website",
  },
};

export default function EvartYalikavakLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

