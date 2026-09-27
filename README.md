# Ritual.kg — памятники и благоустройство (Next.js + Tailwind + Docker + Caddy)

## Быстрый старт (локально)

```bash
npm.cmd install
npm.cmd run dev
# → http://localhost:3000
```

## Продакшн через Docker

```bash
docker compose up -d --build
# app → :3000 (внутри сети), Caddy → :80 / :443
```

## Переменные окружения

Скопируйте `.env.example` в `.env.local` (локально) или задайте в `docker-compose.yml`:

- `NEXT_PUBLIC_WHATSAPP_NUMBER` — номер для приёма заявок (без `+`, например `996555123456`)
- `NEXT_PUBLIC_TELEGRAM_BOT_TOKEN` — токен Telegram-бота (опционально)
- `NEXT_PUBLIC_TELEGRAM_CHAT_ID` — chat_id мастера (опционально)

Без Telegram-токена форма всё равно работает через WhatsApp (генерирует `wa.me`-ссылку с предзаполненным текстом).

## Структура

- `app/` — App Router: `layout.tsx` (SEO/OpenGraph), `page.tsx`, `globals.css`
- `components/` — Navbar, Hero, Catalog, Services, Gallery (lightbox), Advantages, Testimonials, ContactCTA, Footer, LeadModal, Button, Heading, ProductCard
- `data/` — `products.ts`, `gallery.ts`
- `public/img/` — реальные фото работ и логотип из Instagram @ritual.kgz (ig-01…ig-17, avatar)
- `lib/contact.ts` — WhatsApp (+996 551 177 107) + Telegram интеграция + ссылка на Instagram
- `Dockerfile`, `docker-compose.yml`, `Caddyfile` — production deploy
