'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X, MessageCircle, Send, Loader2 } from 'lucide-react';
import { SERVICE_TYPES, Product } from '@/data/products';
import { buildWhatsAppLink, sendToTelegram, LeadData } from '@/lib/contact';

export default function LeadModal({
  open,
  onClose,
  presetProduct,
  presetService,
}: {
  open: boolean;
  onClose: () => void;
  presetProduct?: Product | null;
  presetService?: string;
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(SERVICE_TYPES[0]);
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setSent(false);
      setError('');
      if (presetProduct) {
        const map: Record<string, string> = {
          monuments: SERVICE_TYPES[0],
          fences: SERVICE_TYPES[1],
          paving: SERVICE_TYPES[2],
          complex: SERVICE_TYPES[3],
        };
        setService(map[presetProduct.category] ?? SERVICE_TYPES[0]);
        setComment(`Интересует: ${presetProduct.title} (от ${presetProduct.priceFrom} сом). `);
      } else if (presetService) {
        setService(presetService);
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open, presetProduct, presetService]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [open, onClose]);

  const valid = name.trim().length >= 2 && phone.trim().length >= 6;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || sending) return;
    setSending(true);
    setError('');
    const lead: LeadData = {
      name: name.trim(),
      phone: phone.trim(),
      service,
      comment: comment.trim(),
      productTitle: presetProduct?.title,
    };
    // 1) Telegram webhook (best-effort)
    const tgOk = await sendToTelegram(lead);
    // 2) Always offer WhatsApp handoff
    const waLink = buildWhatsAppLink(lead);
    setSending(false);
    setSent(true);
    // auto-open WhatsApp after short delay so the user finishes in messenger
    setTimeout(() => window.open(waLink, '_blank'), 600);
    if (!tgOk) {
      // not fatal — WhatsApp link remains the primary channel
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 p-0 md:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Рассчитать стоимость"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <motion.div
            className="w-full max-w-lg bg-white rounded-[4px] shadow-stonedark overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, transform: 'translateY(24px) scale(0.98)' }}
            animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
            exit={{ opacity: 0, transform: 'translateY(16px) scale(0.98)' }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
          >
        <div className="flex items-center justify-between bg-brand-dark px-6 py-4">
          <div>
            <p className="section-badge text-brand-gold">Бесплатный расчет</p>
            <h3 className="font-serif text-2xl font-semibold text-white mt-1">
              {presetProduct ? presetProduct.title : 'Рассчитать стоимость'}
            </h3>
          </div>
          <button onClick={onClose} aria-label="Закрыть" className="text-white/70 hover:text-white p-1">
            <X size={22} />
          </button>
        </div>

        {sent ? (
          <div className="px-6 py-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center bg-brand-gold/15 rounded-full">
              <Send size={22} className="text-brand-goldhover" />
            </div>
            <h4 className="mt-4 font-serif text-2xl font-semibold">Заявка готова!</h4>
            <p className="mt-2 text-sm text-brand-muted leading-relaxed">
              Мы открыли WhatsApp с заполненной заявкой — просто нажмите «Отправить».
              <br />
              Перезвоним в течение 15 минут в рабочее время.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <a
                href={buildWhatsAppLink({
                  name: name.trim(),
                  phone: phone.trim(),
                  service,
                  comment: comment.trim(),
                  productTitle: presetProduct?.title,
                })}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex justify-center items-center gap-2 bg-[#25D366] text-white px-5 py-3 text-xs font-semibold uppercase tracking-wider rounded-[2px]"
              >
                <MessageCircle size={16} /> Открыть WhatsApp
              </a>
              <button
                onClick={onClose}
                className="flex-1 border border-brand-border px-5 py-3 text-xs font-semibold uppercase tracking-wider rounded-[2px] hover:border-brand-dark"
              >
                Закрыть
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-muted">
                  Ваше имя *
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Например, Азамат"
                  className="mt-1.5 w-full border border-brand-border rounded-[2px] px-3.5 py-3 text-sm outline-none focus:border-brand-gold"
                  required
                />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-muted">
                  Телефон *
                </span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+996 ___ ___ ___"
                  inputMode="tel"
                  className="mt-1.5 w-full border border-brand-border rounded-[2px] px-3.5 py-3 text-sm outline-none focus:border-brand-gold"
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-muted">
                Тип услуги
              </span>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="mt-1.5 w-full border border-brand-border rounded-[2px] px-3.5 py-3 text-sm outline-none focus:border-brand-gold bg-white"
              >
                {SERVICE_TYPES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-muted">
                Комментарий / размеры
              </span>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Размеры, материал, сроки…"
                rows={3}
                className="mt-1.5 w-full border border-brand-border rounded-[2px] px-3.5 py-3 text-sm outline-none focus:border-brand-gold resize-none"
              />
            </label>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={!valid || sending}
              className="w-full inline-flex justify-center items-center gap-2 bg-brand-gold hover:bg-brand-goldhover disabled:opacity-50 text-white px-6 py-3.5 text-sm font-semibold uppercase tracking-wider rounded-[2px] transition-colors"
            >
              {sending ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Отправка…
                </>
              ) : (
                <>
                  <MessageCircle size={16} /> Отправить в WhatsApp
                </>
              )}
            </button>
            <p className="text-[11px] leading-relaxed text-brand-muted text-center">
              Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
              Дублируем заявку в Telegram мастера.
            </p>
          </form>
        )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
