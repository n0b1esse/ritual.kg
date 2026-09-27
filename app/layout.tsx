import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ritual.kg — Изготовление памятников и благоустройство в Кыргызстане | Гранит, мрамор',
  description:
    'Памятники из гранита и мрамора, ограды, брусчатка, комплексы под ключ в Бишкеке и по Кыргызстану. Собственное производство, 15+ лет опыта, гарантия качества.',
  keywords: ['памятники Бишкек', 'гранит Кыргызстан', 'мрамор', 'ограды', 'брусчатка', 'ритуальные услуги', 'Ritual.kg'],
  openGraph: {
    title: 'Ritual.kg — Память на века. Гранит, мрамор, благоустройство.',
    description:
      'Изготовление памятников и благоустройство мест захоронения в Кыргызстане. Собственное производство. Гарантия качества.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Ritual.kg',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans bg-brand-light text-brand-text">{children}</body>
    </html>
  );
}
