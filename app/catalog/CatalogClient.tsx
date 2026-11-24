'use client';
import { useEffect, useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Download, MessageCircle, ArrowLeft, FileText, Images } from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE_DISPLAY, PHONE_SECONDARY } from '@/lib/contact';

const TOTAL_PAGES = 95;
const pages = Array.from({ length: TOTAL_PAGES }, (_, i) => ({
  num: i + 1,
  src: `/catalog/pages/${String(i + 1).padStart(3, '0')}.webp`,
  label: `Стр. ${i + 1}`,
}));

function waLink(pageNum?: number) {
  const text = pageNum
    ? `Здравствуйте, RITUAL.KG! Смотрю каталог, интересует модель на странице ${pageNum} (https://ritual.kg/catalog). Подскажите, пожалуйста, стоимость и сроки.`
    : `Здравствуйте, RITUAL.KG! Смотрю ваш каталог на сайте ritual.kg/catalog. Нужна консультация по памятнику.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export default function CatalogClient() {
  const [view, setView] = useState<'grid' | 'pdf'>('grid');
  const [lightbox, setLightbox] = useState<number | null>(null); // 1-based page number

  const open = useCallback((n: number) => setLightbox(n), []);
  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox((v) => (v && v > 1 ? v - 1 : TOTAL_PAGES)), []);
  const next = useCallback(() => setLightbox((v) => (v && v < TOTAL_PAGES ? v + 1 : 1)), []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, close, prev, next]);

  // swipe
  useEffect(() => {
    if (lightbox === null) return;
    let x0 = 0;
    const onTouchStart = (e: TouchEvent) => (x0 = e.touches[0].clientX);
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 60) (dx > 0 ? prev() : next());
    };
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [lightbox, prev, next]);

  return (
    <div className="min-h-screen bg-brand-light">
      {/* top bar */}
      <header className="sticky top-0 z-30 border-b border-brand-border bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-container items-center justify-between gap-4 px-4 py-3 md:px-6">
          <a href="/" className="inline-flex items-center gap-2 text-brand-dark hover:text-brand-gold">
            <ArrowLeft size={18} />
            <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">На главную</span>
            <span className="sm:hidden text-xs font-semibold uppercase tracking-wider">Главная</span>
          </a>
          <div className="text-center">
            <h1 className="font-serif-d text-[18px] md:text-xl font-bold leading-none">RITUAL.KG — Каталог</h1>
            <p className="text-[11px] uppercase tracking-widest text-brand-muted">95 страниц · памятники · ограды · облицовка</p>
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

      {/* hero actions */}
      <div className="mx-auto max-w-container px-4 md:px-6 pt-6 md:pt-8">
        <div className="rounded-[4px] border border-brand-border bg-white p-4 md:p-5 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="min-w-0">
            <h2 className="font-serif-d text-xl md:text-2xl font-bold leading-tight">Полный каталог от клиента — как в PDF, только удобно листать</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">
              Оригинал: <span className="font-medium text-brand-dark">КАТАЛОГ- RITUAL.KGZ (1).pdf</span> · 95 стр. · 32.5 Мб.
              Онлайн-версия уже оптимизирована (9 Мб webp), листается без скачивания. Контакты на первой странице: {PHONE_DISPLAY} / {PHONE_SECONDARY}
            </p>
            <p className="mt-2 text-xs text-brand-muted">
              Подсказка: нажмите на страницу для увеличения, в лайтбоксе — стрелки ← → и свайп. Для заявки кнопка внизу берет номер страницы в сообщение WhatsApp.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <a
              href="/catalog.pdf"
              download="RITUAL-KG-कталог.pdf"
              className="inline-flex items-center gap-2 rounded-[2px] border border-brand-dark bg-brand-dark px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-black"
            >
              <Download size={14} /> Скачать PDF
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-[2px] bg-brand-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-brand-goldhover"
            >
              <MessageCircle size={14} /> Написать в WhatsApp
            </a>
          </div>
        </div>

        {/* view switcher */}
        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={() => setView('grid')}
            className={`inline-flex items-center gap-2 rounded-[2px] border px-4 py-2 text-xs font-semibold uppercase tracking-wider ${view === 'grid' ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-brand-muted border-brand-border hover:border-brand-gold hover:text-brand-dark'}`}
          >
            <Images size={14} /> Листалка (изображения)
          </button>
          <button
            onClick={() => setView('pdf')}
            className={`inline-flex items-center gap-2 rounded-[2px] border px-4 py-2 text-xs font-semibold uppercase tracking-wider ${view === 'pdf' ? 'bg-brand-dark text-white border-brand-dark' : 'bg-white text-brand-muted border-brand-border hover:border-brand-gold hover:text-brand-dark'}`}
          >
            <FileText size={14} /> PDF просмотр
          </button>
          <span className="ml-2 text-xs text-brand-muted hidden sm:inline">{TOTAL_PAGES} страниц · листайте вниз</span>
        </div>
      </div>

      {/* content */}
      {view === 'pdf' ? (
        <div className="mx-auto max-w-container px-4 md:px-6 py-6">
          <div className="overflow-hidden rounded-[4px] border border-brand-border bg-white">
            <div className="flex items-center justify-between border-b border-brand-border bg-brand-light px-4 py-2 text-xs text-brand-muted">
              <span>Если PDF не отображается на iPhone — используйте кнопку «Скачать PDF» или переключитесь на «Листалка».</span>
              <a href="/catalog.pdf" target="_blank" rel="noreferrer" className="font-semibold text-brand-gold hover:underline">
                Открыть в новой вкладке
              </a>
            </div>
            <object data="/catalog.pdf#view=FitH" type="application/pdf" className="h-[75vh] w-full md:h-[78vh]">
              <iframe src="/catalog.pdf#view=FitH" className="h-full w-full" title="Каталог PDF" />
            </object>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-container px-4 md:px-6 py-6">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
            {pages.map((p) => (
              <button
                key={p.num}
                onClick={() => open(p.num)}
                className="group relative overflow-hidden rounded-[4px] border border-brand-border bg-white text-left shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-[707/1000] overflow-hidden bg-[#f3f3f3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt={`Каталог RITUAL.KG — страница ${p.num}`}
                    loading={p.num <= 8 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-contain group-hover:scale-[1.01] transition-transform duration-300"
                  />
                  <span className="absolute left-2 top-2 rounded bg-brand-dark/90 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    {p.num} / {TOTAL_PAGES}
                  </span>
                  <span className="absolute inset-0 ring-1 ring-black/5 group-hover:ring-brand-gold/30 transition-colors" />
                </div>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-xs font-medium text-brand-dark">Стр. {String(p.num).padStart(2, '0')}</span>
                  <span className="text-[11px] uppercase tracking-wider text-brand-gold group-hover:text-brand-goldhover">Увеличить</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 rounded-[4px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <strong>Что дальше с третьим вариантом?</strong> Ниже объяснено почему пока делаем именно листалку — и как за 1 шаг превратить каждую из 4 моделей на странице в отдельный товар с фильтром.
          </div>

          <div className="mt-4 rounded-[4px] border border-brand-border bg-white p-4 md:p-6">
            <h3 className="font-serif-d text-lg font-bold">Почему не сразу «каждый памятник — отдельный товар» (вариант 3)</h3>
            <p className="mt-2 text-sm leading-relaxed text-brand-muted">
              С третьим вариантом всё <em>можно</em>, но есть нюансы — из-за них я предложил сначала быстрый «2+1», а нарезку deixar как следующий шаг:
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-sm leading-relaxed text-brand-muted">
              <li>
                <strong className="text-brand-dark">Нет данных в PDF.</strong> Это сканы без текста — нет названий, артикулов, размеров, цен. При автопорезе получим «Памятник №042» без описания. Клиенту придётся отдельно дать прайс, иначе это просто красивая галерея без «купить».
              </li>
              <li>
                <strong className="text-brand-dark">4 в 1, но не всегда.</strong> 70% страниц — сетка 2×2 (легко режется пополам), но есть страницы с 2 оградками и с фото ДО/ПОСЛЕ. Автокроп на 50% даст кривые поля и обрезанные тени — нужен ручной QA каждого из ~350 кропов.
              </li>
              <li>
                <strong className="text-brand-dark">Водяные знаки.</strong> Часть моделей с «PQD.RU» / «memory» поверх — если резать, знаки останутся. Нужно или чистить, или оставлять как есть по согласованию.
              </li>
              <li>
                <strong className="text-brand-dark">Категории вручную.</strong> Мусульманские (с полумесяцем/арабской вязью) vs. классика можно угадать по картинке, но клиент должен подтвердить — иначе фильтр будет врать.
              </li>
              <li>
                <strong className="text-brand-dark">Объем и поддержка.</strong> 350 товаров = пагинация, фильтр, 350 alt-текстов для SEO и 9 Мб → 15-20 Мб картинок. При каждом обновлении PDF придётся перезапускать нарезку и версионировать.
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-brand-muted">
              <strong className="text-brand-dark">Вывод:</strong> 2+1 даёт ценность за день — клиент видит каталог онлайн без скачивания, а вы не блокируетесь на сборе прайса. Когда клиент даст цены/размеры — запустим скрипт{' '}
              <code className="rounded bg-brand-light px-1.5 py-0.5 text-xs">scripts/slice-catalog.py</code> (уже в проекте, режет 2×2/2×1 автоматически) и зальём в <code className="rounded bg-brand-light px-1.5 py-0.5 text-xs">data/products</code> с фильтром.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[2px] bg-brand-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:bg-brand-goldhover">
                <MessageCircle size={14} /> Обсудить нарезку в WhatsApp
              </a>
              <a href="/catalog.pdf" download className="inline-flex items-center gap-2 rounded-[2px] border border-brand-border bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-brand-dark hover:border-brand-gold">
                <Download size={14} /> Скачать исходный PDF
              </a>
            </div>
          </div>
        </div>
      )}

      {/* lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/95">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <button onClick={close} className="rounded bg-white/10 p-2 hover:bg-white/20" aria-label="Закрыть">
                <X size={18} />
              </button>
              <span className="text-sm">
                Страница <strong>{lightbox}</strong> из {TOTAL_PAGES}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={waLink(lightbox)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[2px] bg-[#25D366] px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:bg-[#1ebe5a]"
              >
                <MessageCircle size={14} /> Цена этой модели
              </a>
              <a href="/catalog.pdf" download className="hidden sm:inline-flex items-center gap-2 rounded-[2px] border border-white/20 px-3 py-2 text-xs uppercase tracking-wider hover:bg-white/10">
                <Download size={14} /> PDF
              </a>
            </div>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden p-2 md:p-6">
            <button onClick={prev} className="absolute left-2 md:left-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 backdrop-blur" aria-label="Назад">
              <ChevronLeft size={22} />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/catalog/pages/${String(lightbox).padStart(3, '0')}.webp`}
              alt={`Страница ${lightbox}`}
              className="max-h-full max-w-full object-contain shadow-2xl"
            />
            <button onClick={next} className="absolute right-2 md:right-4 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 backdrop-blur" aria-label="Вперед">
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 border-t border-white/10 bg-black px-4 py-3">
            <span className="text-xs text-white/60 hidden sm:inline">← → стрелки · Esc закрыть · свайп на телефоне · клик вне — закрыть</span>
            <button onClick={close} className="sm:hidden rounded bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black">Закрыть</button>
          </div>
          <button onClick={close} className="absolute inset-0 -z-10" aria-label="Закрыть оверлей" />
        </div>
      )}
    </div>
  );
}
