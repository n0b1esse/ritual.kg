'use client';
import { Product, formatPrice } from '@/data/products';

export default function ProductCard({
  product,
  onOrder,
}: {
  product: Product;
  onOrder: (p: Product) => void;
}) {
  return (
    <article className="group bg-white border border-brand-border stone-card rounded-[3px] overflow-hidden flex flex-col hover:border-brand-gold transition-colors">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-border/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 bg-brand-dark/90 text-white text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-[2px]">
          {product.material}
        </span>
        {product.badge && (
          <span className="absolute right-3 top-3 bg-brand-gold text-white text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-[2px]">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] uppercase tracking-wider text-brand-muted font-semibold">
          {product.categoryLabel}
        </p>
        <h3 className="mt-1.5 font-serif text-xl font-semibold leading-snug text-brand-dark">
          {product.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-muted line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex items-end justify-between border-t border-brand-border pt-4 mt-auto">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-brand-muted">от</p>
            <p className="font-serif text-2xl font-bold text-brand-dark">
              {formatPrice(product.priceFrom)}
              {product.priceSuffix && (
                <span className="text-sm font-sans font-medium text-brand-muted">
                  {product.priceSuffix}
                </span>
              )}
            </p>
          </div>
          <button
            onClick={() => onOrder(product)}
            className="rounded-[2px] border border-brand-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-goldhover hover:bg-brand-gold hover:text-white transition-colors"
          >
            Заказать расчет
          </button>
        </div>
      </div>
    </article>
  );
}
