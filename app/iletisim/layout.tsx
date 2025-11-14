import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://evart.com';

export const metadata: Metadata = {
  title: "İletişim",
  description: "Evart ile iletişime geçin. Hayalinizdeki eve kavuşmak için bizimle iletişim kurun. Adres, telefon ve e-posta bilgilerimiz.",
  alternates: {
    canonical: `${baseUrl}/iletisim`,
  },
  openGraph: {
    title: "İletişim | Evart",
    description: "Evart ile iletişime geçin. Hayalinizdeki eve kavuşmak için bizimle iletişim kurun.",
    url: `${baseUrl}/iletisim`,
    type: "website",
  },
};

export default function IletisimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

