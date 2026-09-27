export type Category = 'monuments' | 'fences' | 'paving' | 'complex';

export interface Product {
  id: number;
  title: string;
  category: Category;
  categoryLabel: string;
  material: string;
  priceFrom: number;
  priceSuffix?: string;
  image: string;
  description: string;
  badge?: string;
}

export const CATEGORIES: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'Все' },
  { id: 'monuments', label: 'Памятники' },
  { id: 'fences', label: 'Ограды' },
  { id: 'paving', label: 'Брусчатка и облицовка' },
  { id: 'complex', label: 'Комплексы' },
];

export const SERVICE_TYPES = [
  'Памятник из гранита',
  'Ограда (кованая / сварная)',
  'Брусчатка и облицовка',
  'Мемориальный комплекс под ключ',
  'Реставрация / уборка могилы',
  'Организация похорон',
];

// Фото — реальные работы Ritual.kg (instagram: @ritual.kgz), хранятся в public/img/
export const products: Product[] = [
  {
    id: 1,
    title: 'Двойной памятник с гравировкой портретов',
    category: 'monuments',
    categoryLabel: 'Памятники',
    material: 'Гранит',
    priceFrom: 45000,
    image: '/img/ig-01.jpg',
    description: 'Гравировка портретов и надписей, художественное оформление стелы.',
    badge: 'Хит',
  },
  {
    id: 2,
    title: 'Памятник из чёрного гранита с цветником',
    category: 'monuments',
    categoryLabel: 'Памятники',
    material: 'Гранит чёрный',
    priceFrom: 52000,
    image: '/img/ig-13.jpg',
    description: 'Полированный чёрный гранит, цветник, гравировка в стоимости.',
  },
  {
    id: 3,
    title: 'Памятник из красного гранита',
    category: 'monuments',
    categoryLabel: 'Памятники',
    material: 'Гранит красный',
    priceFrom: 68000,
    image: '/img/ig-16.jpg',
    description: 'Красный гранит с позолоченными буквами, благоустройство вокруг.',
    badge: 'Premium',
  },
  {
    id: 4,
    title: 'Ограда кованая с крестом',
    category: 'fences',
    categoryLabel: 'Ограды',
    material: 'Металл + ковка',
    priceFrom: 28000,
    image: '/img/ig-15.jpg',
    description: 'Ручная ковка, вензеля, калитка, покраска.',
  },
  {
    id: 5,
    title: 'Ограда сварная с элементами ковки',
    category: 'fences',
    categoryLabel: 'Ограды',
    material: 'Металл + ковка',
    priceFrom: 32000,
    image: '/img/ig-12.jpg',
    description: 'Установка за 1 день: замер, изготовление, монтаж и покраска.',
  },
  {
    id: 6,
    title: 'Брусчатка и благоустройство участка',
    category: 'paving',
    categoryLabel: 'Брусчатка и облицовка',
    material: 'Брусчатка',
    priceFrom: 1800,
    priceSuffix: '/м²',
    image: '/img/ig-08.jpg',
    description: 'Подготовка основания, укладка плитки, поребрик, выравнивание.',
  },
  {
    id: 7,
    title: 'Комплекс из чёрного и красного гранита',
    category: 'complex',
    categoryLabel: 'Комплексы',
    material: 'Гранит + ковка',
    priceFrom: 180000,
    image: '/img/ig-06.jpg',
    description: 'Памятник, цоколь, ограда, плитка — всё из гранита, под ключ.',
    badge: 'Под ключ',
  },
  {
    id: 8,
    title: 'Комплекс с кованой оградой и скамьёй',
    category: 'complex',
    categoryLabel: 'Комплексы',
    material: 'Гранит + ковка',
    priceFrom: 240000,
    image: '/img/ig-17.jpg',
    description: 'Памятник, кованая ограда, брусчатка, столик и скамейка.',
  },
];

export function formatPrice(n: number): string {
  return `${n.toLocaleString('ru-RU')} сом`;
}
