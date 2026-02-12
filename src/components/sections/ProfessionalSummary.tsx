'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/** "" 로 감싼 부분만 파란 밑줄로 표시 (따옴표는 노출하지 않음. " " " 모두 지원) */
function PanelTextWithHighlights({ text }: { text: string }) {
  const normalized = text.replace(/\u201C|\u201D/g, '"');
  const parts = normalized.split('"');
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="panelTextHighlight">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function ProfessionalSummary() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // TODO: 여기만 본인 정보로 바꾸면 됩니다.
  const profile = {
    name: '김아영',
    title: 'Backend Engineer',
    email: 'devayeong@gmail.com',
    github: 'https://github.com/nurget',
    linkedin: 'https://www.linkedin.com/in/%EC%95%84%EC%98%81-%EA%B9%80-a33250232?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
    photo: '/images/profile.jpg',
    stack: ['NestJS', 'Redis', 'MySQL', 'Grafana', 'Prometheus', 'Loki'],
  };

  const panelText =
    'NestJS 기반 서버 개발과 레거시 시스템 연동 경험을 바탕으로, 운영·안정성·데이터 흐름 관점에서 문제를 정의하고 해결합니다. 관측(Observability) 구축, 마이그레이션, 플랫폼 연동을 통해 "원인 파악이 빠른 시스템"과 "운영 가능한 구조"를 만드는 데 강점이 있습니다.';

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panelRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: 0.2,
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="summary" ref={sectionRef} className="section">
      <div className="sectionContainer">
        <div ref={headerRef} className="sectionHeader">
          <span className="sectionKicker">Professional Summary</span>
          <h2 className="sectionTitle">백엔드 개발자</h2>
        </div>
        <div ref={panelRef} className="summaryGrid">
          <div className="summaryLeft">
            <div className="summaryPhoto">
              <Image
                src={profile.photo}
                alt={profile.name}
                width={240}
                height={300}
                priority
                className="summaryPhotoImg"
              />
            </div>
            <div className="summaryIdentity">
              <div className="summaryName">{profile.name}</div>
              <div className="summaryRole">{profile.title}</div>
            </div>
            <div className="summaryContacts">
              <a className="summaryLink" href={`mailto:${profile.email}`}>{profile.email}</a>
              <a className="summaryLink" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="summaryLink" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>
          <div className="summaryRight">
            <p className="panelText">
              <PanelTextWithHighlights text={panelText} />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
