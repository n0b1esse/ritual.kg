import type { Metadata } from 'next';
import CatalogClient from './CatalogClient';

export const metadata: Metadata = {
  title: 'Каталог памятников RITUAL.KG — 95 страниц, гранитные памятники, ограды | Бишкек',
  description:
    'Полный каталог RITUAL.KG: 95 страниц, 350+ моделей памятников из гранита и мрамора, мусульманские и европейские формы, ограды и облицовка. Смотрите онлайн или скачайте PDF. Заказ по WhatsApp +996 551 177 107.',
  openGraph: {
    title: 'Каталог RITUAL.KG — памятники, ограды, облицовка (95 стр.)',
    description: 'Листайте каталог онлайн, скачайте PDF или напишите в WhatsApp для расчета стоимости.',
    type: 'website',
  },
};

export default function CatalogPage() {
  return <CatalogClient />;
}
