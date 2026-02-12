'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const BASE_LOGO_SIZE = 56;
const BOX_SIZE = 80;

interface CursorFollowerProps {
  visible: boolean;
  label: string;
  logo?: string | null;
  logoSize?: number;
  x: number;
  y: number;
}

export default function CursorFollower({
  visible,
  label,
  logo,
  logoSize,
  x,
  y,
}: CursorFollowerProps) {
  const elRef = useRef<HTMLDivElement>(null);
  // 원 안에서만 이미지 확대 (비율). 기본 1, 커넥트웨이브 등은 1.3 등
  const scale = logoSize != null ? logoSize / BASE_LOGO_SIZE : 1;

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    gsap.to(el, {
      x,
      y,
      duration: 0.35,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  }, [x, y]);

  if (!visible) return null;

  return (
    <div
      ref={elRef}
      className="cursor-follower"
      aria-hidden
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: BOX_SIZE,
        height: BOX_SIZE,
        marginLeft: -BOX_SIZE / 2,
        marginTop: -BOX_SIZE / 2,
        pointerEvents: 'none',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        fontSize: 18,
        fontWeight: 600,
        color: 'var(--color-text)',
        fontFamily: 'var(--font-display), var(--font-sans)',
      }}
    >
      {logo ? (
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Image
            src={logo}
            alt=""
            width={BASE_LOGO_SIZE}
            height={BASE_LOGO_SIZE}
            style={{
              objectFit: 'contain',
              transform: `scale(${scale})`,
            }}
          />
        </span>
      ) : (
        <span>{label.charAt(0)}</span>
      )}
    </div>
  );
}
