import type { Metadata } from 'next';
import StandalonePage from '@/components/StandalonePage';

export const metadata: Metadata = {
  title: 'Отзывы клиентов — Ritual.kg | памятники и ритуальные услуги в Бишкеке',
  description:
    'Отзывы семей, для которых Ritual.kg изготовил и установил памятники, ограды и мемориальные комплексы в Бишкеке и по Кыргызстану.',
  openGraph: {
    title: 'Отзывы клиентов — Ritual.kg',
    description: 'Что говорят семьи о нашей работе: качество, сроки, бережное отношение.',
    type: 'website',
  },
};

export default function ReviewsPage() {
  return <StandalonePage kind="reviews" />;
}
