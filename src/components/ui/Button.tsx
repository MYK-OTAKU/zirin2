import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-zirin-primary text-white shadow-[var(--shadow-cta)] hover:bg-zirin-primary-hover active:scale-[0.98]',
  secondary:
    'bg-zirin-sand/90 text-zirin-brown border border-zirin-brown/20 hover:bg-zirin-sand-strong/70 hover:border-zirin-brown/35 active:scale-[0.98]',
  ghost:
    'bg-transparent text-zirin-brown hover:bg-zirin-sand/70 active:scale-[0.98]',
};

const BASE_CLASSES =
  'inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 py-3 text-base font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-zirin-primary disabled:pointer-events-none disabled:opacity-50';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function ActionButton({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ActionButtonProps) {
  return (
    <button
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

interface ActionLinkProps extends LinkProps {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function ActionLink({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ActionLinkProps) {
  return (
    <Link
      className={`${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
