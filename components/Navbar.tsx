'use client';
import { useEffect, useState } from 'react';
import { Phone, Menu, X, MessageCircle, Instagram } from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE_DISPLAY, INSTAGRAM_URL } from '@/lib/contact';

const LINKS = [
  { href: '#catalog', label: 'Каталог' },
  { href: '#services', label: 'Услуги' },
  { href: '#works', label: 'Работы' },
  { href: '#reviews', label: 'Отзывы' },
  { href: '#contacts', label: 'Контакты' },
];

export default function Navbar({ onOrder }: { onOrder: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors ${
        scrolled ? 'bg-brand-dark/95 backdrop-blur shadow-stonedark' : 'bg-brand-dark'
      }`}
    >
      <div className="mx-auto flex h-16 md:h-20 max-w-container items-center justify-between px-4 md:px-6">
        <a href="#top" className="flex items-center gap-2.5 text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/avatar.jpg"
            alt="Логотип Ritual.kg"
            className="h-9 w-9 rounded-full object-cover border border-brand-gold/60"
          />
          <span className="leading-none">
            <span className="block font-serif text-xl font-bold tracking-wide">RITUAL.KG</span>
            <span className="block text-[9px] uppercase tracking-[0.18em] text-white/60 whitespace-nowrap">
              памятники · ограды · облицовка
            </span>
          </span>
        </a>

        <nav className="hidden xl:flex items-center gap-6 2xl:gap-8" aria-label="Основная навигация">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs 2xl:text-[13px] font-medium uppercase tracking-wider whitespace-nowrap text-white/80 hover:text-brand-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden xl:flex items-center gap-4 shrink-0">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram Ritual.kg"
            className="text-white/70 hover:text-brand-gold transition-colors"
          >
            <Instagram size={18} />
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[13px] whitespace-nowrap text-white/80 hover:text-brand-gold"
          >
            <MessageCircle size={16} className="shrink-0" />
            <span className="font-semibold">{PHONE_DISPLAY}</span>
          </a>
          <button
            onClick={onOrder}
            className="inline-flex items-center gap-2 rounded-[2px] bg-brand-gold hover:bg-brand-goldhover px-4 2xl:px-5 py-2.5 text-xs 2xl:text-[13px] font-semibold uppercase tracking-wider whitespace-nowrap text-white transition-colors"
          >
            Рассчитать стоимость
          </button>
        </div>

        <button
          className="xl:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="xl:hidden border-t border-white/10 bg-brand-dark px-4 py-4 flex flex-col gap-1">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm uppercase tracking-wider text-white/85 hover:text-brand-gold border-b border-white/5"
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-2 pt-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              className="flex-1 inline-flex justify-center items-center gap-2 border border-white/30 text-white px-4 py-3 text-xs uppercase tracking-wider rounded-[2px]"
            >
              <Phone size={14} /> Позвонить
            </a>
            <button
              onClick={() => {
                setOpen(false);
                onOrder();
              }}
              className="flex-1 bg-brand-gold text-white px-4 py-3 text-xs uppercase tracking-wider font-semibold rounded-[2px]"
            >
              Рассчитать стоимость
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
