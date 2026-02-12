'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import CursorFollower from '@/components/common/CursorFollower';

gsap.registerPlugin(ScrollTrigger);

const companies = [
  {
    name: '커넥트웨이브',
    logo: '/images/companies/connectwave.svg',
    href: 'https://connectwave.co.kr/',
    logoSize: 99,
    role: '백엔드 개발자',
    period: '2025-04 ~ ',
  },
  {
    name: '와이이노베이션랩',
    logo: '/images/companies/yinvl.svg',
    href: 'https://yinvl.com',
    role: '풀스택 개발자',
    period: '2024-04 ~ 2025-04',
  },
  {
    name: '브이젠주식회사',
    logo: '/images/companies/vgen.png',
    href: 'https://vgen.co.kr/',
    role: '프론트엔드 개발자 / 인턴',
    period: '2022-01 ~ 2022-03',
  },
];

export default function Companies() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [follower, setFollower] = useState<{
    visible: boolean;
    label: string;
    logo: string | null;
    logoSize?: number;
    x: number;
    y: number;
  }>({ visible: false, label: '', logo: null, x: 0, y: 0 });
  const [hoveredDetail, setHoveredDetail] = useState<{ role: string; period: string } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    setFollower((prev) => (prev.visible ? { ...prev, x: e.clientX, y: e.clientY } : prev));
  }, []);

  const handleEnter = useCallback(
    (company: (typeof companies)[number]) => {
      const { x, y } = mouseRef.current;
      setFollower({
        visible: true,
        label: company.name,
        logo: company.logo,
        logoSize: company.logoSize,
        x,
        y,
      });
      setHoveredDetail({ role: company.role, period: company.period });
    },
    []
  );

  const handleLeave = useCallback(() => {
    setFollower((prev) => ({ ...prev, visible: false }));
    setHoveredDetail(null);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.companyItem');
    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.08,
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <>
      <section
        id="career"
        ref={sectionRef}
        className="section"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
      >
        <div className="sectionContainer">
          <div className="sectionHeader">
            <span className="sectionKicker">Career</span>
            <h2 className="sectionTitle">경력</h2>
          </div>
          <div className="companiesWrap">
            <div ref={listRef} className="companiesList">
              {companies.map((company, idx) => (
                <a
                  key={idx}
                  href={company.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="companyItem"
                  onMouseEnter={() => handleEnter(company)}
                  onMouseLeave={handleLeave}
                >
                  <span className="companyName">{company.name}</span>
                  <span className="companyArrow" aria-hidden>→</span>
                </a>
              ))}
            </div>
            <div className="companyDetailPanel">
              {hoveredDetail ? (
                <>
                  <div className="companyDetailRole">{hoveredDetail.role}</div>
                  <div className="companyDetailPeriod">{hoveredDetail.period}</div>
                </>
              ) : (
                <span className="companyDetailPlaceholder">회사명에 마우스를 올려보세요</span>
              )}
            </div>
          </div>
        </div>
      </section>
      <CursorFollower
        visible={follower.visible}
        label={follower.label}
        logo={follower.logo}
        logoSize={follower.logoSize}
        x={follower.x}
        y={follower.y}
      />
    </>
  );
}
