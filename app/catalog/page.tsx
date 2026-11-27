import type { Metadata } from 'next';
import CatalogClient from './CatalogClient';

export const metadata: Metadata = {
  title: 'Каталог RITUAL.KG — 149 страниц: памятники, ограды, ритуальные товары | Бишкек',
  description:
    'Единый онлайн-каталог RITUAL.KG: 149 страниц — памятники, ограды, кресты, комплексы, гробы, венки и аксессуары. Откройте любую страницу на весь экран и узнайте цену через WhatsApp +996 551 177 107.',
  openGraph: {
    title: 'Каталог RITUAL.KG — 149 страниц в онлайн-галерее',
    description: 'Листайте единый каталог на сайте: памятники, ограды, ритуальные товары. Напишите в WhatsApp для расчёта стоимости.',
    type: 'website',
  },
};

export default function CatalogPage() {
  return <CatalogClient key="all" initialSection="all" />;
}
