'use client';
import { useCatalogGallery } from './CatalogGalleryProvider';

export default function CatalogMenuButton({ label }: { label: string }) {
  const { openGallery } = useCatalogGallery();
  return (
    <button onClick={() => openGallery()} className="hover:text-brand-gold transition-colors">
      {label}
    </button>
  );
}
