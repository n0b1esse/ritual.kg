import { MapPin, Clock, Phone, MessageCircle, Instagram } from 'lucide-react';
import { WHATSAPP_NUMBER, PHONE_DISPLAY, PHONE_SECONDARY, INSTAGRAM_URL } from '@/lib/contact';

export default function Footer() {
  return (
    <footer id="contacts" className="bg-brand-dark text-white">
      <div className="mx-auto max-w-container px-4 md:px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/avatar.jpg"
              alt="Логотип Ritual.kg"
              className="h-9 w-9 rounded-full object-cover border border-brand-gold/60"
            />
            <span className="font-serif text-xl font-bold tracking-wide">RITUAL.KG</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-white/60">
            Памятники, ограды, облицовка. Опыт более 15 лет, работы от 1 дня.
            Организация похорон.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center border border-white/20 hover:border-brand-gold hover:text-brand-gold rounded-[2px] transition-colors"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center border border-white/20 hover:border-brand-gold hover:text-brand-gold rounded-[2px] transition-colors"
            >
              <Instagram size={16} />
            </a>
            <a
              href="tel:+996551177107"
              aria-label="Телефон"
              className="flex h-9 w-9 items-center justify-center border border-white/20 hover:border-brand-gold hover:text-brand-gold rounded-[2px] transition-colors"
            >
              <Phone size={16} />
            </a>
          </div>
        </div>

        <nav aria-label="Навигация в подвале">
          <p className="section-badge text-brand-gold">Навигация</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {[
              ['#catalog', 'Каталог'],
              ['#services', 'Услуги'],
              ['#works', 'Наши работы'],
              ['#reviews', 'Отзывы'],
              ['#top', 'Наверх'],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="hover:text-brand-gold transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="section-badge text-brand-gold">Контакты</p>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex gap-2">
              <Phone size={16} className="mt-0.5 shrink-0 text-brand-gold" />
              <span>
                <a href="tel:+996551177107" className="hover:text-brand-gold block">
                  {PHONE_DISPLAY}
                </a>
                <a href="tel:+996505177107" className="hover:text-brand-gold">
                  {PHONE_SECONDARY}
                </a>
              </span>
            </li>
            <li className="flex gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand-gold" />
              <span>
                г. Бишкек, Кыргызстан
                <br />
                <a
                  href="https://maps.google.com/?q=Бишкек"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-brand-gold"
                >
                  Открыть на карте
                </a>
              </span>
            </li>
            <li className="flex gap-2">
              <Clock size={16} className="mt-0.5 shrink-0 text-brand-gold" />
              <span>На связи ежедневно</span>
            </li>
          </ul>
        </div>

        <div>
          <p className="section-badge text-brand-gold">Услуги</p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            <li>Памятники из гранита</li>
            <li>Гравировка портретов</li>
            <li>Ограды кованые и сварные</li>
            <li>Брусчатка и облицовка</li>
            <li>Столики, скамейки, навесы</li>
            <li>Уборка и реставрация могил</li>
            <li>Организация похорон</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-container px-4 md:px-6 py-5 flex flex-col md:flex-row gap-2 items-center justify-between text-xs text-white/50">
          <p>© {new Date().getFullYear()} Ritual.kg — Все права защищены.</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 uppercase tracking-wider hover:text-brand-gold"
          >
            <Instagram size={13} /> @ritual.kgz
          </a>
        </div>
      </div>
    </footer>
  );
}
