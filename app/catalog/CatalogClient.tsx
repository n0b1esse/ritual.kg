'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  ArrowLeft,
  Images,
  LayoutGrid,
  Rows3,
  ZoomIn,
  ZoomOut,
  Hash,
  Move,
} from 'lucide-react';
import Link from 'next/link';
import { WHATSAPP_NUMBER, PHONE_DISPLAY, PHONE_SECONDARY } from '@/lib/contact';
import { CATALOG_SECTIONS, SectionId } from '@/data/catalog-sections';

interface CatalogPage {
  num: number;
  src: string;
  label: string;
  section: SectionId;
  title: string;
}

function buildPages(): CatalogPage[] {
  const pages: CatalogPage[] = [];
  const add = (from: number, to: number, section: SectionId, title: string) => {
    for (let n = from; n <= to; n++) {
      pages.push({
        num: n,
        src: `/catalog/pages/${String(n).padStart(3, '0')}.webp`,
        label: `Стр. ${String(n).padStart(2, '0')}`,
        section,
        title,
      });
    }
  };

  // Каталог RITUAL.KG — памятники, ограды, кресты, комплексы
  add(1, 1, 'stone', 'Каталог RITUAL.KG');
  add(2, 25, 'stone', 'Памятники');
  add(26, 64, 'fences', 'Ограды');
  add(65, 66, 'crosses', 'Кресты');
  add(67, 76, 'stone', 'Памятники');
  add(77, 95, 'complex', 'Комплексы и благоустройство');

  // Ритуальные товары и аксессуары
  add(96, 96, 'others', 'Услуги');
  add(97, 110, 'caskets', 'Гробы');
  add(111, 122, 'wreaths', 'Венки');
  add(123, 130, 'crosses', 'Кресты и оградки');
  add(131, 132, 'others', 'Траурные ленты');
  add(133, 136, 'others', 'Аксессуары');
  add(137, 137, 'others', 'Погребальный набор');
  add(138, 140, 'others', 'Погребальная одежда');
  add(141, 141, 'stone', 'Памятники на заказ');
  add(142, 147, 'others', 'Таблички');
  add(148, 149, 'others', 'Кепин');

  return pages;
}

const PAGES = buildPages();
const TOTAL_PAGES = PAGES.length;

function waLink(pageNum?: number) {
  const text = pageNum
    ? `Здравствуйте, RITUAL.KG! Смотрю каталог, интересует модель на странице ${pageNum} (https://ritual.kg/catalog). Подскажите, пожалуйста, стоимость и сроки.`
    : 'Здравствуйте, RITUAL.KG! Смотрю ваш каталог на сайте ritual.kg/catalog. Нужна консультация.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function CatalogClient({ initialSection = 'all' }: { initialSection?: SectionId | 'all' }) {
  const [filter, setFilter] = useState<SectionId | 'all'>(initialSection);
  const [view, setView] = useState<'grid' | 'strip'>('grid');
  const [activeNum, setActiveNum] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [jump, setJump] = useState('');

  const viewerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dragRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const wasOpen = useRef(false);
  const reduce = useReducedMotion();

  const list = useMemo(
    () => (filter === 'all' ? PAGES : PAGES.filter((p) => p.section === filter)),
    [filter]
  );
  const activeIndex = activeNum === null ? -1 : list.findIndex((p) => p.num === activeNum);
  const activePage = activeIndex >= 0 ? list[activeIndex] : null;

  const goTo = useCallback(
    (num: number) => {
      setDirection(num >= (activeNum ?? num) ? 1 : -1);
      setActiveNum(num);
      setZoom(1);
      setPan({ x: 0, y: 0 });
    },
    [activeNum]
  );

  const close = useCallback(() => setActiveNum(null), []);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (!list.length) return;
      const i = activeIndex >= 0 ? activeIndex : 0;
      goTo(list[(i + dir + list.length) % list.length].num);
    },
    [list, activeIndex, goTo]
  );

  // клавиатура
  useEffect(() => {
    if (activeNum === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)));
      if (e.key === '-') setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)));
      if (e.key === 'Home') goTo(list[0].num);
      if (e.key === 'End') goTo(list[list.length - 1].num);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [activeNum, close, step, goTo, list]);

  // свайп
  useEffect(() => {
    if (activeNum === null) return;
    let x0 = 0;
    const onTouchStart = (e: TouchEvent) => (x0 = e.touches[0].clientX);
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 60) step(dx > 0 ? -1 : 1);
    };
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [activeNum, step]);

  // колесо мыши — зум
  useEffect(() => {
    if (activeNum === null) return;
    const el = viewerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((z) =>
        Math.min(3, Math.max(1, +(z + (e.deltaY < 0 ? 0.15 : -0.15)).toFixed(2)))
      );
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [activeNum]);

  // лента миниатюр всегда держит активную страницу в видимой зоне
  useEffect(() => {
    if (activeNum === null) return;
    document
      .getElementById(`film-${activeNum}`)
      ?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
  }, [activeNum, reduce]);

  // фокус на закрытии только при открытии
  useEffect(() => {
    if (activeNum !== null && !wasOpen.current) closeRef.current?.focus();
    wasOpen.current = activeNum !== null;
  }, [activeNum]);

  const film =
    activeIndex >= 0
      ? list.slice(Math.max(0, activeIndex - 7), Math.min(list.length, activeIndex + 8))
      : [];

  function submitJump(e: React.FormEvent) {
    e.preventDefault();
    const n = Number(jump);
    if (n >= 1 && n <= TOTAL_PAGES) {
      if (!list.some((p) => p.num === n)) setFilter('all');
      goTo(n);
    }
    setJump('');
  }

  return (
    <div className="min-h-screen bg-brand-light">
      {/* шапка */}
      <header className="sticky top-0 z-30 border-b border-brand-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-container items-center justify-between gap-4 px-4 py-3 md:px-6">
          <a href="/" className="inline-flex items-center gap-2 text-brand-dark hover:text-brand-gold">
            <ArrowLeft size={18} />
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">На главную</span>
            <span className="sm:hidden text-xs font-semibold uppercase tracking-wider">Главная</span>
          </a>
          <div className="text-center">
            <h1 className="font-serif-d text-[18px] md:text-xl font-bold leading-none">RITUAL.KG — Каталог</h1>
            <p className="text-[11px] uppercase tracking-widest text-brand-muted">
              {TOTAL_PAGES} страниц · памятники · ограды · ритуальные товары
            </p>
          </div>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 rounded-[2px] bg-[#25D366] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#1ebe5a]"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>
      </header>

      {/* описание */}
      <div className="mx-auto max-w-container px-4 md:px-6 pt-6 md:pt-8">
        <div className="rounded-[4px] border border-brand-border bg-white p-4 md:p-5 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h2 className="font-serif-d text-xl md:text-2xl font-bold leading-tight">
              Единый каталог RITUAL.KG — {TOTAL_PAGES} страниц
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">
              Памятники, ограды, кресты, комплексы, гробы, венки и аксессуары — откройте любую страницу
              на весь экран, приблизьте детали и листайте прямо здесь. Скачивание не требуется.
            </p>
            <p className="mt-2 text-xs text-brand-muted">
              Контакты: {PHONE_DISPLAY} / {PHONE_SECONDARY}
            </p>
          </div>
          <a
            href={waLink()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[2px] bg-brand-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-brand-goldhover"
          >
            <MessageCircle size={14} /> Написать в WhatsApp
          </a>
        </div>

        {/* разделы — каждая вкладка ведёт на отдельную страницу */}
        <nav className="mt-5 flex flex-wrap gap-2" aria-label="Разделы каталога">
          {([{ id: 'all', slug: '', label: 'Все страницы' }, ...CATALOG_SECTIONS] as const).map((s) => {
            const count = s.id === 'all' ? TOTAL_PAGES : PAGES.filter((p) => p.section === s.id).length;
            const href = s.slug ? `/catalog/${s.slug}` : '/catalog';
            return (
              <Link
                key={s.id}
                href={href}
                aria-current={filter === s.id ? 'page' : undefined}
                onClick={() => {
                  setFilter(s.id);
                  setActiveNum(null);
                }}
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-[2px] border transition-colors ${
                  filter === s.id
                    ? 'bg-brand-dark text-white border-brand-dark'
                    : 'bg-white text-brand-muted border-brand-border hover:border-brand-gold hover:text-brand-dark'
                }`}
              >
                {s.label}
                <span className={filter === s.id ? 'text-white/60' : 'text-brand-gold'}>{count}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-xs text-brand-muted">
            <Images size={14} /> Показано {list.length} из {TOTAL_PAGES} страниц
          </p>
          <div className="flex items-center gap-1 rounded-[2px] border border-brand-border bg-white p-1" role="group" aria-label="Вид галереи">
            <button
              onClick={() => setView('grid')}
              aria-pressed={view === 'grid'}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-[2px] ${
                view === 'grid' ? 'bg-brand-dark text-white' : 'text-brand-muted hover:text-brand-dark'
              }`}
            >
              <LayoutGrid size={14} /> Сетка
            </button>
            <button
              onClick={() => setView('strip')}
              aria-pressed={view === 'strip'}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-[2px] ${
                view === 'strip' ? 'bg-brand-dark text-white' : 'text-brand-muted hover:text-brand-dark'
              }`}
            >
              <Rows3 size={14} /> Лента
            </button>
          </div>
        </div>
      </div>

      {/* сетка */}
      {view === 'grid' ? (
        <div className="mx-auto max-w-container px-4 md:px-6 py-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {list.map((p, i) => (
              <motion.button
                key={p.num}
                onClick={() => goTo(p.num)}
                className="group relative overflow-hidden rounded-[4px] border border-brand-border bg-white text-left shadow-sm hover:shadow-md transition-shadow"
                aria-label={`Открыть страницу ${p.num}: ${p.title}`}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : Math.min((i % 8) * 0.03, 0.24) }}
              >
                <div className="relative aspect-[707/1000] overflow-hidden bg-[#f3f3f3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt={`Каталог RITUAL.KG — ${p.title}, страница ${p.num}`}
                    loading={p.num <= 8 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute left-2 top-2 rounded bg-brand-dark/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    {p.num} / {TOTAL_PAGES}
                  </span>
                  <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-brand-dark opacity-0 transition-opacity group-hover:opacity-100">
                    <ZoomIn size={15} />
                  </span>
                  <span className="absolute inset-0 ring-1 ring-black/5 group-hover:ring-brand-gold/30 transition-colors" />
                </div>
                <div className="flex items-center justify-between gap-2 px-3 py-2">
                  <span className="truncate text-xs font-medium text-brand-dark">{p.title}</span>
                  <span className="shrink-0 text-[11px] uppercase tracking-wider text-brand-gold group-hover:text-brand-goldhover">
                    Открыть
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-3xl px-4 md:px-6 py-6 space-y-6">
          {list.map((p) => (
            <figure key={p.num} className="rounded-[4px] border border-brand-border bg-white p-2 md:p-3">
              <button
                onClick={() => goTo(p.num)}
                className="block w-full overflow-hidden"
                aria-label={`Открыть страницу ${p.num}: ${p.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={`Каталог RITUAL.KG — ${p.title}, страница ${p.num}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full transition-transform duration-500 hover:scale-[1.01]"
                />
              </button>
              <figcaption className="flex items-center justify-between gap-2 px-1 pb-1 pt-2 text-xs text-brand-muted">
                <span className="font-semibold uppercase tracking-wider text-brand-dark">{p.title}</span>
                <span>
                  {p.num} / {TOTAL_PAGES}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {/* интерактивный просмотрщик */}
      <AnimatePresence>
        {activePage && (
          <motion.div
            ref={viewerRef}
            className="fixed inset-0 z-50 flex flex-col bg-black/95"
            role="dialog"
            aria-modal="true"
            aria-label="Просмотр страницы каталога"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
          >
            {/* верхняя панель */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5 text-white md:px-5">
              <div className="flex items-center gap-3">
                <button
                  ref={closeRef}
                  onClick={close}
                  className="rounded bg-white/10 p-2 hover:bg-white/20"
                  aria-label="Закрыть"
                >
                  <X size={18} />
                </button>
                <span className="text-sm">
                  <strong>{activePage.title}</strong> · страница {activePage.num} из {TOTAL_PAGES}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <form onSubmit={submitJump} className="flex items-center gap-1 rounded bg-white/10 px-2 py-1">
                  <Hash size={13} className="text-white/60" />
                  <input
                    value={jump}
                    onChange={(e) => setJump(e.target.value.replace(/\D/g, ''))}
                    inputMode="numeric"
                    aria-label="Номер страницы"
                    placeholder={`1-${TOTAL_PAGES}`}
                    className="w-16 bg-transparent text-xs text-white outline-none placeholder:text-white/40"
                  />
                  <button type="submit" className="text-[11px] font-semibold uppercase tracking-wider text-brand-gold hover:text-white">
                    Перейти
                  </button>
                </form>
                <div className="flex items-center gap-1 rounded bg-white/10 p-1">
                  <button
                    onClick={() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
                    className="rounded p-1.5 hover:bg-white/15"
                    aria-label="Уменьшить"
                    disabled={zoom <= 1}
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="w-10 text-center text-[11px] tabular-nums text-white/70">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    onClick={() => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)))}
                    className="rounded p-1.5 hover:bg-white/15"
                    aria-label="Увеличить"
                    disabled={zoom >= 3}
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>
                <a
                  href={waLink(activePage.num)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-[2px] bg-[#25D366] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#1ebe5a]"
                >
                  <MessageCircle size={14} /> Цена этой модели
                </a>
              </div>
            </div>

            {/* страница */}
            <div
              className="relative flex flex-1 items-center justify-center overflow-hidden p-2 md:p-6"
              style={{ perspective: 1800 }}
            >
              <button
                onClick={() => step(-1)}
                className="absolute left-2 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 backdrop-blur md:left-5"
                aria-label="Назад"
              >
                <ChevronLeft size={22} />
              </button>

              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={activePage.num}
                  custom={direction}
                  variants={
                    reduce
                      ? undefined
                      : {
                          enter: (d: number) => ({
                            opacity: 0,
                            rotateY: d > 0 ? 58 : -58,
                            x: d > 0 ? '14%' : '-14%',
                            scale: 0.96,
                            transformOrigin: d > 0 ? 'right center' : 'left center',
                          }),
                          center: { opacity: 1, rotateY: 0, x: '0%', scale: 1 },
                          exit: (d: number) => ({
                            opacity: 0,
                            rotateY: d > 0 ? -58 : 58,
                            x: d > 0 ? '-14%' : '14%',
                            scale: 0.96,
                            transformOrigin: d > 0 ? 'left center' : 'right center',
                          }),
                        }
                  }
                  initial={reduce ? false : 'enter'}
                  animate={reduce ? undefined : 'center'}
                  exit={reduce ? undefined : 'exit'}
                  transition={{ duration: reduce ? 0 : 0.5, ease: [0.2, 0.8, 0.25, 1] }}
                  className="relative flex h-full w-full items-center justify-center"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <motion.img
                    src={activePage.src}
                    alt={`${activePage.title}, страница ${activePage.num}`}
                    draggable={false}
                    initial={false}
                    animate={{ x: pan.x, y: pan.y, scale: zoom }}
                    transition={{ type: 'spring', stiffness: 380, damping: 38, mass: 0.5 }}
                    onDoubleClick={() => setZoom((z) => (z > 1 ? 1 : 2.2))}
                    onPointerDown={(e) => {
                      if (zoom <= 1) return;
                      dragRef.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
                      e.currentTarget.setPointerCapture(e.pointerId);
                    }}
                    onPointerMove={(e) => {
                      const d = dragRef.current;
                      if (!d) return;
                      setPan({ x: d.px + e.clientX - d.x, y: d.py + e.clientY - d.y });
                    }}
                    onPointerUp={() => (dragRef.current = null)}
                    className="max-h-full max-w-full select-none object-contain shadow-2xl"
                    style={{ cursor: zoom > 1 ? 'grab' : 'zoom-in', backfaceVisibility: 'hidden' }}
                  />
                  {!reduce && (
                    <motion.span
                      aria-hidden
                      custom={direction}
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 38%, rgba(255,255,255,0.05) 65%, rgba(0,0,0,0.4) 100%)',
                      }}
                      variants={{
                        enter: (d: number) => ({ opacity: 0.75, x: d > 0 ? '30%' : '-30%' }),
                        center: { opacity: 0, x: '0%' },
                        exit: (d: number) => ({ opacity: 0.65, x: d > 0 ? '-25%' : '25%' }),
                      }}
                      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.25, 1] }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <button
                onClick={() => step(1)}
                className="absolute right-2 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 backdrop-blur md:right-5"
                aria-label="Вперёд"
              >
                <ChevronRight size={22} />
              </button>
            </div>

            {/* лента миниатюр */}
            <div className="border-t border-white/10 bg-black px-3 pb-3 pt-2 md:px-5">
              <div className="mb-2 flex items-center justify-between gap-3 text-[11px] uppercase tracking-wider text-white/50">
                <span className="flex items-center gap-1.5">
                  <Move size={12} /> Тяните увеличенную страницу · колесо и двойной клик — зум
                </span>
                <span className="hidden sm:inline">
                  ← → перелистывать · Esc закрыть · +- зум · {activeIndex + 1} из {list.length} в разделе
                </span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
                {film.map((p) => (
                  <button
                    key={p.num}
                    id={`film-${p.num}`}
                    onClick={() => goTo(p.num)}
                    aria-label={`Страница ${p.num}: ${p.title}`}
                    aria-current={p.num === activePage.num}
                    className={`relative h-16 w-12 shrink-0 overflow-hidden rounded-[2px] border transition-all md:h-20 md:w-14 ${
                      p.num === activePage.num
                        ? 'border-brand-gold opacity-100 ring-1 ring-brand-gold'
                        : 'border-white/20 opacity-55 hover:opacity-100'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                    <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-center text-[9px] text-white">
                      {p.num}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
