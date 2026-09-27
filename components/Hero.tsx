'use client';
import { ArrowRight, MessageCircle, ShieldCheck, Timer, Award } from 'lucide-react';
import { ButtonLink } from './Button';

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
        <div>
          <p className="section-badge text-brand-gold">
            <span className="inline-block h-px w-8 bg-brand-gold" aria-hidden />
            &nbsp;Бишкек · весь Кыргызстан
          </p>
          <h1 className="mt-5 font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.08] text-white">
            Изготовление памятников и благоустройство мест захоронения в Кыргызстане
          </h1>
          <p className="mt-5 text-base md:text-lg leading-relaxed text-white/70 max-w-xl">
            Гранитные памятники, кованые ограды, укладка брусчатки, гравировка портретов.
            Организация похорон. Работаем от 1 дня.
          </p>
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
        </div>

        <div className="relative hidden lg:block">
          <div className="border border-brand-gold/40 rounded-[3px] overflow-hidden stone-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/ig-17.jpg"
              alt="Мемориальный комплекс с кованой оградой — работа Ritual.kg"
              className="aspect-[4/5] w-full object-cover"
              loading="eager"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 bg-white rounded-[3px] stone-card px-5 py-4 border-l-2 border-brand-gold">
            <p className="font-serif text-3xl font-bold text-brand-dark">87+</p>
            <p className="text-xs uppercase tracking-wider text-brand-muted">
              работ — смотрите в Instagram
            </p>
          </div>
          <div className="absolute -top-4 -right-3 bg-brand-dark border border-brand-gold/50 rounded-[3px] px-4 py-3">
            <p className="text-xs uppercase tracking-wider text-brand-gold font-semibold">
              Работа от 1 дня
            </p>
            <p className="text-[11px] text-white/60">замер и консультация — бесплатно</p>
          </div>
        </div>
      </div>
    </section>
  );
}
