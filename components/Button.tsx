import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react';

type Variant = 'gold' | 'outline' | 'dark' | 'outlineLight';
type Size = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

const variants: Record<Variant, string> = {
  gold: 'bg-brand-gold hover:bg-brand-goldhover text-white border border-brand-gold hover:border-brand-goldhover',
  outline:
    'bg-transparent hover:bg-brand-dark text-brand-dark hover:text-white border border-brand-dark',
  dark: 'bg-brand-dark hover:bg-brand-surfacedark text-white border border-brand-dark',
  outlineLight:
    'bg-transparent hover:bg-brand-gold text-white hover:text-brand-dark border border-white/40 hover:border-brand-gold',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

function classes(variant: Variant, size: Size, extra = '') {
  return `inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-wider transition-colors duration-200 rounded-[2px] ${variants[variant]} ${sizes[size]} ${extra}`;
}

export function Button({ variant = 'gold', size = 'md', children, className = '', ...rest }: ButtonProps) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({ variant = 'gold', size = 'md', children, className = '', ...rest }: LinkProps) {
  return (
    <a className={classes(variant, size, className)} {...rest}>
      {children}
    </a>
  );
}
