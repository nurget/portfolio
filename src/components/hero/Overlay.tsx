'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface OverlayProps {
  progress: number;
}

export default function Overlay({ progress }: OverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const kickerRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.set(containerRef.current, { visibility: 'visible' })
        .fromTo(kickerRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo(line1Ref.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7 }, 0.15)
        .fromTo(line2Ref.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7 }, 0.25)
        .fromTo(line3Ref.current, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.7 }, 0.35)
        .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, 0.5)
        .fromTo(
          pillsRef.current?.children || [],
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 },
          0.65
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.8
        );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // 스크롤에 따른 부드러운 위로 이동 (패럴랙스)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const y = progress * 80;
    gsap.set(container, { y: -y });
  }, [progress]);

  const goNext = () => {
    const target = document.getElementById('summary');
    const lenis = window.__lenis;
    if (lenis?.scrollTo && target) {
      lenis.scrollTo(target, { duration: 1.2, offset: -80 });
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div ref={containerRef} className="heroContent" style={{ visibility: 'hidden' }}>
      <div ref={kickerRef} className="kicker">
        Backend Engineer
      </div>
      <h1 className="h1">
        <span ref={line1Ref} className="block">Observability</span>
        <span ref={line2Ref} className="block">Migration</span>
        <span ref={line3Ref} className="block">Platform Integration</span>
      </h1>
      {/* <p ref={descRef} className="p">
        운영 · 안정성 · 데이터 흐름을 이해하는 백엔드 개발자
      </p> */}
      {/* <div ref={pillsRef} className="pills">
        <span className="pill">Grafana</span>
        <span className="pill">Prometheus</span>
        <span className="pill">Loki</span>
        <span className="pill">NestJS</span>
        <span className="pill">Spring Boot</span>
      </div> */}
      <div className="heroCtaRow">
        <button ref={ctaRef} className="heroCta" onClick={goNext} type="button">
          Explore works
        </button>
        <span className="heroCtaHint">Scroll</span>
      </div>
    </div>
  );
}
