'use client';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'tech' | 'status' | 'success';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono transition-colors';
  
  const variants = {
    default: 'bg-[var(--color-primary-bg)] text-[var(--color-primary)]',
    tech: 'bg-[var(--color-surface-light)] text-[var(--color-text)]',
    status: 'bg-[var(--color-primary-bg)] text-[var(--color-primary)]',
    success: 'bg-[var(--color-primary-bg)] text-[var(--color-primary)]',
  };
  
  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
