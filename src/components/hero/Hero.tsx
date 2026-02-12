'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Scene from './Scene';
import Overlay from './Overlay';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const advancedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const st = ScrollTrigger.create({
      trigger: root,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.8, // 조금 더 부드러운 스크롤
      onUpdate: (self) => {
        setProgress(self.progress);

        // 랜딩(자동차 주행) 끝 지점에서 다음 섹션으로 자연스럽게 진입
        // 중앙에서 멈추는 구간을 고려하여 타이밍 조정
        if (!advancedRef.current && self.progress >= 0.92 && self.direction === 1) {
          advancedRef.current = true;
          const target = document.getElementById('summary');
          const lenis = window.__lenis;
          if (lenis?.scrollTo && target) {
            lenis.scrollTo(target, { duration: 1.4, offset: -80 });
          } else if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }

        // 위로 다시 올라오면 재진입 가능
        if (self.progress < 0.15) {
          advancedRef.current = false;
        }
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section ref={rootRef} className="hero">
      <div className="canvasWrap">
        <Scene progress={progress} />
      </div>
      <div className="overlay">
        <Overlay progress={progress} />
      </div>
    </section>
  );
}
