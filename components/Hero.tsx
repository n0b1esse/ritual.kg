'use client';
import { motion } from 'motion/react';
import { ArrowRight, MessageCircle, ShieldCheck, Timer, Award } from 'lucide-react';
import { ButtonLink } from './Button';
import { HeroStagger, HeroItem, DURATION, EASE } from './motion';

const STATS = [
  { icon: Award, value: '15+ лет', label: 'опыта работы' },
  { icon: Timer, value: 'от 1 дня', label: 'выполнение работ' },
  { icon: ShieldCheck, value: '87+', label: 'работ в ленте' },
];

export default function Hero({ onConsult }: { onConsult: () => void }) {
  return (
    <section id="top" className="granite-bg relative overflow-hidden pt-16 md:pt-20">
      <div className="absolute inset-x-0 bottom-0 h-px bg-brand-gold/30" />
      <div className="mx-auto max-w-container px-4 md:px-6 py-16 md:py-24 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        <HeroStagger>
          <HeroItem>
            <p className="section-badge text-brand-gold">
              <span className="inline-block h-px w-8 bg-brand-gold" aria-hidden />
              &nbsp;Бишкек · весь Кыргызстан
            </p>
          </HeroItem>
          <HeroItem>
            <h1 className="mt-5 font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] text-white">
              Изготовление памятников и благоустройство мест захоронения в Кыргызстане
            </h1>
          </HeroItem>
          <HeroItem>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-white/70 max-w-xl">
              Гранитные памятники, кованые ограды, укладка брусчатки, гравировка портретов.
              Организация похорон. Работаем от 1 дня.
            </p>
          </HeroItem>
          <HeroItem>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <ButtonLink href="#catalog" variant="gold" size="lg">
                Смотреть каталог <ArrowRight size={16} />
              </ButtonLink>
              <button
                onClick={onConsult}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold uppercase tracking-wider rounded-[2px] border border-white/40 text-white hover:bg-brand-gold hover:border-brand-gold hover:text-brand-dark transition-colors"
              >
                <MessageCircle size={16} /> Бесплатная консультация
              </button>
            </div>
          </HeroItem>
          <HeroItem>
            <dl className="mt-10 grid grid-cols-3 max-w-lg divide-x divide-white/10 border-y border-white/10">
              {STATS.map((s) => (
                <div key={s.label} className="px-4 py-4 first:pl-0">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-serif text-2xl md:text-3xl font-bold text-brand-gold">{s.value}</dd>
                  <dd className="mt-1 text-[11px] md:text-xs uppercase tracking-wider text-white/60">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </HeroItem>
        </HeroStagger>

        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, transform: 'translateY(28px) scale(0.985)' }}
          animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
          transition={{ duration: DURATION + 0.15, delay: 0.25, ease: EASE }}
        >
          <div className="border border-brand-gold/40 rounded-[3px] overflow-hidden stone-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/ig-17.jpg"
              alt="Мемориальный комплекс с кованой оградой — работа Ritual.kg"
              className="aspect-[4/5] w-full object-cover"
              loading="eager"
            />
          </div>
          <motion.div
            className="absolute -bottom-5 -left-5 bg-white rounded-[3px] stone-card px-5 py-4 border-l-2 border-brand-gold"
            initial={{ opacity: 0, transform: 'translateY(14px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: DURATION, delay: 0.7, ease: EASE }}
          >
            <p className="font-serif text-3xl font-bold text-brand-dark">87+</p>
            <p className="text-xs uppercase tracking-wider text-brand-muted">
              работ — смотрите в Instagram
            </p>
          </motion.div>
          <motion.div
            className="absolute -top-4 -right-3 bg-brand-dark border border-brand-gold/50 rounded-[3px] px-4 py-3"
            initial={{ opacity: 0, transform: 'translateY(-12px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            transition={{ duration: DURATION, delay: 0.85, ease: EASE }}
          >
            <p className="text-xs uppercase tracking-wider text-brand-gold font-semibold">
              Работа от 1 дня
            </p>
            <p className="text-[11px] text-white/60">замер и консультация — бесплатно</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
