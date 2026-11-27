import type { Metadata } from 'next';
import StandalonePage from '@/components/StandalonePage';

export const metadata: Metadata = {
  title: 'Контакты Ritual.kg — Бишкек, +996 551 177 107, WhatsApp',
  description:
    'Ritual.kg — г. Бишкек, Кыргызстан. Телефоны +996 551 177 107 и +996 505 177 107, WhatsApp, Instagram @ritual.kgz. Выезд на замер, работаем ежедневно.',
  openGraph: {
    title: 'Контакты Ritual.kg — напишите в WhatsApp',
    description: 'Бишкек, выезд на замер, ответим и подскажем по цене.',
    type: 'website',
  },
};

export default function ContactsPage() {
  return <StandalonePage kind="contacts" />;
}
