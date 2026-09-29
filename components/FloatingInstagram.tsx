'use client';
import { motion } from 'motion/react';
import { Instagram } from 'lucide-react';
import { INSTAGRAM_URL } from '@/lib/contact';

export default function FloatingInstagram() {
  return (
    <motion.a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Наш Instagram — @ritual.kgz"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 rounded-[3px] bg-brand-dark border border-brand-gold/60 shadow-stonedark overflow-hidden hover:border-brand-gold transition-colors"
      initial={{ opacity: 0, transform: 'translateY(16px)' }}
      animate={{ opacity: 1, transform: 'translateY(0px)' }}
      transition={{ duration: 0.5, delay: 1.2, ease: 'easeOut' }}
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-white/85 transition-all duration-300 group-hover:max-w-[140px] group-hover:px-3 group-hover:py-3">
        Мы в Instagram
      </span>
      <span className="flex h-12 w-12 items-center justify-center bg-brand-gold text-white group-hover:bg-brand-goldhover transition-colors">
        <Instagram size={22} />
      </span>
    </motion.a>
  );
}
