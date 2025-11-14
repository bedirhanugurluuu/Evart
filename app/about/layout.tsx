import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://evart.com';

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Yapıtek ANKA İnşaat olarak güvenle yükselen bir gelecek sunuyoruz. Evart projeleriyle hayalinizdeki yaşam alanını keşfedin.",
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: "Hakkımızda | Evart",
    description: "Yapıtek ANKA İnşaat olarak güvenle yükselen bir gelecek sunuyoruz.",
    url: `${baseUrl}/about`,
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

