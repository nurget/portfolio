'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const links = [
  { label: 'About', href: '#summary' },
  { label: 'Skills', href: '#skills' },
  { label: 'Career', href: '#career' },
  { label: 'Works', href: '#works' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;

    gsap.set(header, { yPercent: -100 });

    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    if (scrolled) {
      gsap.to(header, { yPercent: 0, duration: 0.5, ease: 'power3.out' });
    } else {
      gsap.to(header, { yPercent: -100, duration: 0.4, ease: 'power2.in' });
    }
  }, [scrolled]);

  return (
    <header
      ref={ref}
      className="fixed top-0 left-0 right-0 z-[var(--z-sticky)] py-4 px-6 flex items-center justify-between bg-[var(--color-bg)]/90 backdrop-blur-md border-b border-[var(--color-border)]"
      style={{ fontFamily: 'var(--font-display), var(--font-sans)' }}
    >
      <a href="#" className="text-sm font-semibold tracking-tight text-[var(--color-text)]">
        Ayeong's Portfolio
      </a>
      <nav className="flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-xs tracking-wide text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
