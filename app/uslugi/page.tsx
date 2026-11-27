import type { Metadata } from 'next';
import StandalonePage from '@/components/StandalonePage';

export const metadata: Metadata = {
  title: 'Услуги — Ritual.kg | памятники, ограды, благоустройство, организация похорон',
  description:
    'Памятники из гранита и мрамора, кованые и сварные ограды, брусчатка и облицовка, мемориальные комплексы под ключ, реставрация могил и организация похорон в Бишкеке.',
  openGraph: {
    title: 'Услуги Ritual.kg — памятники, ограды, благоустройство',
    description: 'Собственное производство, выезд на замер, работа от 1 дня. Бишкек, Кыргызстан.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return <StandalonePage kind="services" />;
}
