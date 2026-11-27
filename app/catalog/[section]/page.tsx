import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CatalogClient from '../CatalogClient';
import { CATALOG_SECTIONS, getSectionBySlug } from '@/data/catalog-sections';

type Props = { params: { section: string } };

export function generateStaticParams() {
  return CATALOG_SECTIONS.map((s) => ({ section: s.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const section = getSectionBySlug(params.section);
  if (!section) return {};
  const url = `https://ritual.kg/catalog/${section.slug}`;
  return {
    title: section.title,
    description: section.description,
    alternates: { canonical: url },
    openGraph: {
      title: section.title,
      description: section.description,
      url,
      type: 'website',
    },
  };
}

export default function CatalogSectionPage({ params }: Props) {
  const section = getSectionBySlug(params.section);
  if (!section) notFound();
  return <CatalogClient key={section.id} initialSection={section.id} />;
}
