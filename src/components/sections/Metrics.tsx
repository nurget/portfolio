'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Card from '@/components/ui/Card';

gsap.registerPlugin(ScrollTrigger);

interface Metric {
  label: string;
  value: number;
  unit: string;
  trend?: 'up' | 'down' | 'stable';
}

const initialMetrics: Metric[] = [
  { label: '평균 응답 시간', value: 145, unit: 'ms', trend: 'down' },
  { label: '에러율', value: 0.12, unit: '%', trend: 'down' },
  { label: '일일 처리량', value: 1240000, unit: 'req', trend: 'up' },
  { label: '서버 사용률', value: 68, unit: '%', trend: 'stable' },
  { label: '캐시 히트율', value: 92, unit: '%', trend: 'up' },
  { label: 'DB 쿼리 시간', value: 23, unit: 'ms', trend: 'down' },
];

export default function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [metrics, setMetrics] = useState(initialMetrics);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // 스크롤 애니메이션
    const cards = section.querySelectorAll('.metricCard');
    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.95,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
        }
      );
    });

    // 실시간 느낌의 숫자 애니메이션
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => {
          const variation = metric.unit === '%' ? 0.5 : metric.unit === 'ms' ? 2 : 1000;
          const change = (Math.random() - 0.5) * variation * 0.1;
          return {
            ...metric,
            value: Math.max(0, metric.value + change),
          };
        })
      );
    }, 3000);

    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const formatValue = (value: number, unit: string): string => {
    if (unit === 'req') {
      return (value / 1000).toFixed(1) + 'K';
    }
    return value.toFixed(unit === '%' ? 2 : 0);
  };

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

  const getTrendColor = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'var(--color-accent-success-text)';
      case 'down':
        return 'var(--color-accent-warning-text)';
      default:
        return 'var(--color-text-muted)';
    }
  };

  return (
    <section ref={sectionRef} className="section metricsSection">
      <div className="sectionContainer">
        <div className="sectionHeader">
          <span className="sectionKicker">Metrics</span>
          <h2 className="sectionTitle">시스템 지표</h2>
          <p className="sectionSubtitle">실시간 모니터링 대시보드</p>
        </div>
        <div className="metricsGrid">
          {metrics.map((metric, idx) => (
            <Card key={idx} className="metricCard">
              <div className="metricHeader">
                <span className="metricLabel">{metric.label}</span>
                {metric.trend && (
                  <span
                    className="metricTrend"
                    style={{ color: getTrendColor(metric.trend) }}
                  >
                    {getTrendIcon(metric.trend)}
                  </span>
                )}
              </div>
              <div className="metricValue">
                <span className="metricNumber">{formatValue(metric.value, metric.unit)}</span>
                <span className="metricUnit">{metric.unit}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
