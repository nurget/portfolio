'use client';

import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GRADUATION_IMAGE: string | null = '/images/education/graduation.png';

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="section">
      <div className="sectionContainer">
        <div className="sectionHeader">
          <span className="sectionKicker">Education</span>
          <h2 className="sectionTitle">학력</h2>
        </div>
        <div ref={panelRef} className="educationPanel">
          <div className="educationItem">
            <h3 className="educationSchool">경동대학교</h3>
            <span className="educationMajor">소프트웨어학과 학사</span>
            <span className="educationPeriod">2019-03 ~ 2024-02 (졸업)</span>
          </div>
          <div className="educationProject">
            <div className="educationProjectInner">
              <div className="educationProjectContent">
                <div className="educationProjectHead">
                  <h4 className="educationProjectTitle">졸업작품 — 저시력자 이동권 개선을 위한 버스 예약 앱</h4>
                  <span className="educationProjectGrade">캡스톤 디자인 4.5</span>
                </div>
                <p className="educationProjectDesc">
                  저시력자를 위한 버스 노선·도착 안내 앱. TTS(음성 안내)와 형태소 분석을 활용해 정류장/노선 정보를 읽어 주고, 접근성을 고려해 설계했습니다.
                </p>
                <div className="educationProjectDetails">
                  <span className="educationProjectTech">Java 기반 Android 앱 개발</span>
                  <span className="educationProjectTech">Express 서버 구축 및 API 연동</span>
                  <span className="educationProjectTech">접근성 고려 기능 설계</span>
                </div>
                <div className="educationProjectTags">
                  <span className="educationProjectTag">TTS (음성 합성)</span>
                  <span className="educationProjectTag">코모란 분석기 · 형태소 분석</span>
                </div>
              </div>
              {GRADUATION_IMAGE && (
                <div className="educationProjectImageWrap">
                  <Image
                    src={GRADUATION_IMAGE}
                    alt="졸업작품"
                    width={750}
                    height={400}
                    className="educationProjectImage"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
