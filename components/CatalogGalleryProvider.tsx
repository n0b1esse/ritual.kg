'use client';
import { createContext, useCallback, useContext, useState } from 'react';
import CatalogClient from '@/app/catalog/CatalogClient';
import type { SectionId } from '@/data/catalog-sections';

interface GalleryOptions {
  section?: SectionId | 'all';
  page?: number;
}

interface GalleryContextValue {
  openGallery: (options?: GalleryOptions) => void;
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

export function useCatalogGallery() {
  const ctx = useContext(GalleryContext);
  if (!ctx) throw new Error('useCatalogGallery must be used inside CatalogGalleryProvider');
  return ctx;
}

export default function CatalogGalleryProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GalleryOptions | null>(null);

  const openGallery = useCallback((options: GalleryOptions = {}) => {
    setState({ section: options.section ?? 'all', page: options.page });
  }, []);

  return (
    <GalleryContext.Provider value={{ openGallery }}>
      {children}
      {state && (
        <CatalogClient
          key={`${state.section}-${state.page ?? 0}`}
          overlay
          initialSection={state.section}
          initialPage={state.page}
          onClose={() => setState(null)}
        />
      )}
    </GalleryContext.Provider>
  );
}
