export type SectionId = 'stone' | 'fences' | 'crosses' | 'complex' | 'caskets' | 'wreaths' | 'others';

export interface CatalogSection {
  id: SectionId;
  slug: string;
  label: string;
  title: string;
  description: string;
}

export const CATALOG_SECTIONS: CatalogSection[] = [
  {
    id: 'stone',
    slug: 'monuments',
    label: 'Памятники',
    title: 'Памятники из гранита и мрамора — каталог RITUAL.KG',
    description:
      'Памятники из гранита и мрамора, мусульманские и европейские формы, портретная гравировка. Смотрите страницы каталога онлайн и узнавайте цену через WhatsApp.',
  },
  {
    id: 'fences',
    slug: 'fences',
    label: 'Ограды',
    title: 'Ограды для могил — кованые и сварные | RITUAL.KG',
    description:
      'Кованые и сварные ограды, калитки, вензеля и элементы декора. Галерея готовых решений из каталога RITUAL.KG.',
  },
  {
    id: 'crosses',
    slug: 'crosses',
    label: 'Кресты',
    title: 'Кресты на могилу — православные и католические | RITUAL.KG',
    description:
      'Металлические кресты различных форм и размеров: православные, католические, с оградкой. Листайте каталог и выбирайте модель.',
  },
  {
    id: 'complex',
    slug: 'complexes',
    label: 'Комплексы',
    title: 'Мемориальные комплексы под ключ — каталог RITUAL.KG',
    description:
      'Мемориальные комплексы: памятник, ограда, брусчатка и благоустройство участка под ключ в Бишкеке.',
  },
  {
    id: 'caskets',
    slug: 'caskets',
    label: 'Гробы',
    title: 'Гробы — каталог RITUAL.KG',
    description:
      'Гробы разных моделей и материалов. Откройте страницу в галерее и напишите в WhatsApp для расчёта стоимости.',
  },
  {
    id: 'wreaths',
    slug: 'wreaths',
    label: 'Венки',
    title: 'Венки и траурные композиции — каталог RITUAL.KG',
    description:
      'Венки из свежих и искусственных цветов, траурные композиции. Смотрите варианты в онлайн-каталоге.',
  },
  {
    id: 'others',
    slug: 'accessories',
    label: 'Аксессуары',
    title: 'Ритуальные аксессуары и таблички — каталог RITUAL.KG',
    description:
      'Траурные ленты, аксессуары, погребальная одежда, таблички и кепин. Онлайн-галерея товаров RITUAL.KG.',
  },
];

export function getSectionBySlug(slug: string): CatalogSection | undefined {
  return CATALOG_SECTIONS.find((s) => s.slug === slug);
}
