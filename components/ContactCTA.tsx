'use client';
import { Phone, MessageCircle, MapPin, Clock, Instagram } from 'lucide-react';
import { Badge, H2 } from './Heading';
import { Reveal } from './motion';
import { WHATSAPP_NUMBER, PHONE_DISPLAY, PHONE_SECONDARY, INSTAGRAM_URL } from '@/lib/contact';

export default function ContactCTA({ onOrder }: { onOrder: () => void }) {
  return (
    <section className="bg-brand-light border-t border-brand-border">
      <div className="mx-auto max-w-container px-4 md:px-6 py-16 md:py-20 grid lg:grid-cols-2 gap-10">
        <Reveal>
          <Badge>Контакты</Badge>
          <H2 className="mt-3">
            Напишите нам —<br />
            ответим и подскажем по цене
          </H2>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex gap-3">
              <Phone size={18} className="text-brand-gold shrink-0 mt-0.5" />
              <span>
                <a href="tel:+996551177107" className="font-semibold text-lg block">
                  {PHONE_DISPLAY}
                </a>
                <a href="tel:+996505177107" className="text-brand-muted hover:text-brand-gold">
                  {PHONE_SECONDARY}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Instagram size={18} className="text-brand-gold shrink-0 mt-0.5" />
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-gold"
              >
                @ritual.kgz — 87+ работ с фото до и после
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />
              <span>
                г. Бишкек, Кыргызстан — выезжаем на замер
                <br />
                <a
                  href="https://maps.google.com/?q=Бишкек"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-goldhover underline underline-offset-2"
                >
                  Открыть на карте
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <Clock size={18} className="text-brand-gold shrink-0 mt-0.5" />
              <span>На связи ежедневно · работы выполняем от 1 дня</span>
            </li>
          </ul>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOrder}
              className="inline-flex justify-center items-center gap-2 bg-brand-gold hover:bg-brand-goldhover text-white px-7 py-3.5 text-sm font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
            >
              Рассчитать стоимость
            </button>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Здравствуйте! Нужна консультация по памятнику.')}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center items-center gap-2 border border-brand-dark px-7 py-3.5 text-sm font-semibold uppercase tracking-wider rounded-[2px] hover:bg-brand-dark hover:text-white transition-colors"
            >
              <MessageCircle size={16} /> Написать в WhatsApp
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="bg-white border border-brand-border rounded-[3px] p-7 stone-card">
          <p className="section-badge text-brand-goldhover">Как мы работаем</p>
          <ol className="mt-4 space-y-0">
            {[
              ['01', 'Заявка', 'Звонок, WhatsApp или Instagram — уточняем задачу за 5 минут.'],
              ['02', 'Замер и проект', 'Выезжаем на замер, согласовываем индивидуальный проект и смету.'],
              ['03', 'Изготовление', 'Памятники, ограды, плитка — выполнение работ от 1 дня.'],
              ['04', 'Установка', 'Монтаж, благоустройство, уборка. Фото-отчёт до и после.'],
            ].map(([n, t, d]) => (
              <li key={n} className="flex gap-4 py-4 border-b border-brand-border last:border-0">
                <span className="font-serif text-2xl font-bold text-brand-gold">{n}</span>
                <span>
                  <span className="block font-semibold text-sm uppercase tracking-wider">{t}</span>
                  <span className="block mt-1 text-sm text-brand-muted">{d}</span>
                </span>
              </li>
            ))}
            </ol>
        </Reveal>
      </div>
    </section>
  );
}
