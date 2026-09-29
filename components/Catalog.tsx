'use client';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CATEGORIES, products, Category, Product } from '@/data/products';
import { Badge, H2, Subtitle } from './Heading';
import ProductCard from './ProductCard';
import { Reveal } from './motion';
import { INSTAGRAM_URL } from '@/lib/contact';

export default function Catalog({ onOrder }: { onOrder: (p: Product) => void }) {
  const [filter, setFilter] = useState<Category | 'all'>('all');

  const list = useMemo(
    () => (filter === 'all' ? products : products.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="catalog" className="bg-brand-light scroll-mt-20">
      <div className="mx-auto max-w-container px-4 md:px-6 py-16 md:py-20">
        <Reveal>
          <Badge>Каталог</Badge>
          <div className="mt-3 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <H2>
              Камень, который
              <br />
              хранит память
            </H2>
            <Subtitle>
              <span className="block max-w-md">
                Цены «от» — точный расчет за 15 минут после замера и выбора материала.
              </span>
            </Subtitle>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Фильтр каталога">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={filter === c.id}
              onClick={() => setFilter(c.id)}
              className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-[2px] border transition-colors ${
                filter === c.id
                  ? 'bg-brand-dark text-white border-brand-dark'
                  : 'bg-white text-brand-muted border-brand-border hover:border-brand-gold hover:text-brand-dark'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {list.map((p) => (
              <ProductCard key={p.id} product={p} onOrder={onOrder} />
            ))}
          </AnimatePresence>
        </motion.div>

        <p className="mt-6 text-xs text-brand-muted">
          Больше работ с ценами — в нашем{' '}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="font-semibold uppercase tracking-wider text-brand-goldhover hover:text-brand-gold underline underline-offset-2"
          >
            Instagram @ritual.kgz
          </a>
        </p>
      </div>
    </section>
  );
}
