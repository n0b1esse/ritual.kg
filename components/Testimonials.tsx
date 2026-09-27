import { Star, Instagram } from 'lucide-react';
import { Badge, H2 } from './Heading';
import { INSTAGRAM_URL } from '@/lib/contact';

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-white border-t border-brand-border scroll-mt-20">
      <div className="mx-auto max-w-container px-4 md:px-6 py-16 md:py-20">
        <Badge>Отзывы</Badge>
        <div className="mt-3 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <H2>Нас рекомендуют семьям</H2>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-goldhover hover:text-brand-gold"
          >
            <Instagram size={16} /> Все отзывы — в нашем Instagram
          </a>
        </div>

        <figure className="mt-8 max-w-3xl bg-brand-light border border-brand-border border-l-2 border-l-brand-gold rounded-[3px] p-7 md:p-9 stone-card">
          <div className="flex gap-1 text-brand-gold" aria-label="Оценка 5 из 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} fill="currentColor" />
            ))}
          </div>
          <blockquote className="mt-4 font-serif text-xl md:text-2xl leading-relaxed text-brand-dark">
            «Отличная компания, заказывал тут памятник на могилу из гранита. Все было сделано на
            высоком уровне после согласования индивидуального проекта. Материал памятника красный
            гранит смотрится просто превосходно. Спасибо за работу!»
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center bg-brand-dark text-brand-gold font-serif font-bold rounded-full">
              С
            </span>
            <span>
              <span className="block text-sm font-semibold uppercase tracking-wider">Савелий</span>
              <span className="block text-xs text-brand-muted">Памятник из красного гранита · отзыв из Instagram</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
