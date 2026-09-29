'use client';
import { Award, Timer, Images, PenTool, Armchair, Flower2 } from 'lucide-react';
import { Badge, H2 } from './Heading';
import { Reveal, Stagger, StaggerItem } from './motion';

const ITEMS = [
  { icon: Award, title: 'Опыт более 15 лет', text: 'Делаем памятники, ограды и благоустройство каждый день — руку набили.' },
  { icon: Timer, title: 'Работа от 1 дня', text: 'Замер, изготовление и установка без затягивания сроков.' },
  { icon: PenTool, title: 'Гравировка портретов', text: 'Портреты, надписи, художественные работы по граниту.' },
  { icon: Armchair, title: 'Оградки, столики, навесы', text: 'Ковка и сварка: ограды, столики, скамейки, навесы, цоколь.' },
  { icon: Images, title: '87+ работ в Instagram', text: 'Каждая работа — с фото до и после. Смотрите и сравнивайте.' },
  { icon: Flower2, title: 'Уборка и организация', text: 'Уборка и реставрация могил, организация похорон под ключ.' },
];

export default function Advantages() {
  return (
    <section id="advantages" className="granite-bg scroll-mt-20">
      <div className="mx-auto max-w-container px-4 md:px-6 py-16 md:py-20">
        <Reveal>
          <Badge dark>Преимущества</Badge>
          <H2 dark className="mt-3">
            Почему нам доверяют главное
          </H2>
        </Reveal>
        <Stagger className="mt-10 grid gap-px bg-white/10 border border-white/10 rounded-[3px] overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((a) => (
            <StaggerItem key={a.title}>
              <div className="h-full bg-brand-dark p-7 hover:bg-brand-surfacedark transition-colors">
                <a.icon size={24} className="text-brand-gold" />
                <h3 className="mt-4 font-serif text-xl font-semibold text-white">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{a.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1} className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="contents">
            {[
              ['15+', 'лет опыта работы'],
              ['от 1 дня', 'срок выполнения'],
              ['87+', 'работ с фото-отчётами'],
            ].map(([v, l]) => (
              <div key={l} className="border border-brand-gold/30 rounded-[3px] px-6 py-5 text-center">
                <p className="font-serif text-4xl font-bold text-brand-gold">{v}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/60">{l}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
