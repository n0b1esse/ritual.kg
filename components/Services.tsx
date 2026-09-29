'use client';
import { Box, PenTool, Layers, HeartHandshake, ArrowUpRight } from 'lucide-react';
import { Badge, H2, Subtitle } from './Heading';
import { Reveal, Stagger, StaggerItem } from './motion';

const SERVICES = [
  {
    icon: Box,
    title: 'Памятники из гранита',
    text: 'Сборка мемориалов любой сложности, гравировка портретов, художественные работы.',
    service: 'Памятник из гранита',
  },
  {
    icon: PenTool,
    title: 'Ограды, столики, навесы',
    text: 'Кованые и сварные ограды, столики, скамейки, навесы. Установка от 1 дня.',
    service: 'Ограда (кованая / сварная)',
  },
  {
    icon: Layers,
    title: 'Брусчатка и облицовка',
    text: 'Укладка брусчатки, облицовка плиткой, цоколь. Выравнивание и благоустройство.',
    service: 'Брусчатка и облицовка',
  },
  {
    icon: HeartHandshake,
    title: 'Реставрация и похороны',
    text: 'Уборка и реставрация могил, восстановление памятников, организация похорон.',
    service: 'Организация похорон',
  },
];

export default function Services({ onOrderService }: { onOrderService: (s: string) => void }) {
  return (
    <section id="services" className="bg-white border-y border-brand-border scroll-mt-20">
      <div className="mx-auto max-w-container px-4 md:px-6 py-16 md:py-20">
        <Reveal>
          <Badge>Услуги</Badge>
          <div className="mt-3 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <H2>Полный цикл — от замера до установки</H2>
            <Subtitle>
              <span className="block max-w-md">Опыт более 15 лет. Выполнение работ — от 1 дня.</span>
            </Subtitle>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <StaggerItem key={s.title}>
              <article className="group h-full bg-brand-light border border-brand-border rounded-[3px] p-6 hover:border-brand-gold hover:shadow-stone transition-all">
                <span className="flex h-11 w-11 items-center justify-center bg-brand-dark text-brand-gold rounded-[2px] group-hover:bg-brand-gold group-hover:text-white transition-colors">
                  <s.icon size={20} />
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-brand-dark">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{s.text}</p>
                <button
                  onClick={() => onOrderService(s.service)}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brand-goldhover hover:text-brand-gold"
                >
                  Заказать <ArrowUpRight size={14} />
                </button>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
