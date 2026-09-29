'use client';
import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { gallery } from '@/data/gallery';
import { Badge, H2 } from './Heading';
import { Reveal, Stagger, StaggerItem } from './motion';

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setActive((a) => (a === null ? a : (a + dir + gallery.length) % gallery.length)),
    []
  );

  useEffect(() => {
    if (active === null) return;
    document.body.style.overflow = 'hidden';
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', fn);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', fn);
    };
  }, [active, close, step]);

  return (
    <section id="works" className="bg-brand-light scroll-mt-20">
      <div className="mx-auto max-w-container px-4 md:px-6 py-16 md:py-20">
        <Reveal>
          <Badge>Наши работы</Badge>
          <div className="mt-3 flex flex-col md:flex-row md:items-end justify-between gap-3">
            <H2>Реальные объекты, реальные семьи</H2>
            <p className="text-sm text-brand-muted max-w-md">
              Нажмите на фото, чтобы открыть в полном размере. Все работы — наше производство и монтаж.
            </p>
          </div>
        </Reveal>

        <div className="mt-8 columns-2 md:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
          {gallery.map((g, i) => (
            <motion.button
              key={g.id}
              onClick={() => setActive(i)}
              className="group relative mb-4 block w-full overflow-hidden rounded-[3px] border border-brand-border break-inside-avoid"
              aria-label={`Открыть фото: ${g.alt}`}
              initial={{ opacity: 0, transform: 'translateY(18px)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: Math.min((i % 8) * 0.05, 0.35), ease: 'easeOut' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/35 transition-colors" />
              <span className="absolute left-3 bottom-3 bg-brand-dark/85 text-white text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-[2px]">
                {g.tag}
              </span>
              <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-white/90 text-brand-dark rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Expand size={14} />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Просмотр работы"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <button
              onClick={close}
              aria-label="Закрыть"
              className="absolute right-4 top-4 text-white/80 hover:text-white p-2"
            >
              <X size={28} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Назад"
              className="absolute left-2 md:left-6 text-white/80 hover:text-white p-2"
            >
              <ChevronLeft size={36} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <motion.img
              key={gallery[active].src}
              src={gallery[active].src}
              alt={gallery[active].alt}
              className="max-h-[82vh] max-w-[92vw] object-contain rounded-[3px] border border-white/15"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, transform: 'scale(0.97)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0.98)' }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Вперёд"
              className="absolute right-2 md:right-6 text-white/80 hover:text-white p-2"
            >
              <ChevronRight size={36} />
            </button>
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs uppercase tracking-wider text-white/70">
              {active + 1} / {gallery.length} · {gallery[active].alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
