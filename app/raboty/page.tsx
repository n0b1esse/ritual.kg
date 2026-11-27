import type { Metadata } from 'next';
import StandalonePage from '@/components/StandalonePage';

export const metadata: Metadata = {
  title: 'Наши работы — Ritual.kg | памятники и мемориальные комплексы',
  description:
    'Реальные работы Ritual.kg: памятники, ограды, благоустройство могил, комплексы под ключ. Фото до и после, производство и монтаж в Бишкеке.',
  openGraph: {
    title: 'Наши работы — Ritual.kg',
    description: 'Галерея выполненных объектов: памятники, ограды, комплексы, фото до и после.',
    type: 'website',
  },
};

export default function WorksPage() {
  return <StandalonePage kind="works" />;
}
