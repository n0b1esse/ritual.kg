import { ReactNode } from 'react';

export function Badge({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`section-badge inline-flex items-center gap-2 uppercase text-xs tracking-wider font-semibold ${
        dark ? 'text-brand-gold' : 'text-brand-goldhover'
      }`}
    >
      <span className="inline-block h-px w-8 bg-brand-gold" aria-hidden />
      {children}
    </p>
  );
}

export function H2({
  children,
  dark = false,
  className = '',
}: {
  children: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`font-serif text-3xl md:text-4xl lg:text-[2.75rem] leading-tight font-semibold ${
        dark ? 'text-white' : 'text-brand-dark'
      } ${className}`}
    >
      {children}
    </h2>
  );
}

export function Subtitle({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`mt-4 text-base md:text-lg leading-relaxed ${dark ? 'text-white/70' : 'text-brand-muted'}`}>
      {children}
    </p>
  );
}
