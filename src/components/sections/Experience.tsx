'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: '커넥트웨이브',
    role: 'Backend Developer',
    period: '2025.04 ~ 현재',
    projects: [
      {
        title: '샵빌더 백엔드 시스템 구축',
        tech: 'NestJS, Redis',
        description: '노코드 에디터 서버 API 설계 및 구현 담당. PHP 레거시 API 연동 구조 구현. 사용자 편집 중 임시 저장 데이터를 Redis Key-Value 구조로 관리하여 빈번한 수정 이벤트 대응 가능한 저장 흐름 구축. DB 저장 이전 데이터를 Redis로 분리하여 편집 응답 안정화에 기여.',
      },
      {
        title: '네이버 스마트스토어 연동 기능 개발',
        description: '샵빌더와 네이버 스마트스토어 간 연동 기능 개발.',
      },
      {
        title: '샵빌더 백오피스 구축',
        tech: 'NestJS, MySQL',
        description: '운영자 관리 시스템 서버 개발 전반 담당. 콘텐츠 관리 기능 6~7종 API 설계 및 구현. 운영자가 직접 관리 가능한 구조 제공으로 수작업 의존도 감소 및 운영 효율 개선.',
      },
      {
        title: '모니터링 환경 구축',
        tech: 'Grafana, Prometheus, Loki',
        description: '로그 수동 분석 기반 운영에서 원인 파악까지 평균 약 30분 소요되던 상황 개선을 위해 관측 환경 구축 주도. 서버 사용량, 트래픽(RPS), 로그 통합 시각화 구성. 대시보드 기반 탐지 흐름으로 전환하여 장애 원인 파악 시간을 수 분 내 확인 가능한 수준으로 단축.',
      },
      {
        title: '메이크샵 라이트 마이그레이션',
        status: '진행 중',
        description: '장기간 운영된 PHP 레거시 코드 및 DB 구조 분석 수행. 단일 라이브러리 파일 4~5천 라인 규모 코드 분석 및 도메인 규칙 정리. NestJS 기반 API 전환 작업 수행.',
      },
    ],
  },
  {
    company: '와이이노베이션랩',
    role: 'Backend Developer',
    period: '2024.04 ~ 2025.04',
    projects: [
      {
        title: '파인모션 멘토링 플랫폼 백엔드 개발',
        description: '영상 피드백 서비스 서버 API 구현. 파일 업로드 처리 로직 개발. 멘토링 도메인 ERD 설계 수행.',
      },
      {
        title: '교육부 교육용 앱 3종 유지보수',
        tech: 'Spring Boot',
        description: '담당자 공백 상황에서 백엔드 운영 인수. 시스템 구조 분석 후 API 수정 및 기능 대응. 서비스 중단 없이 안정 운영 지원.',
      },
      {
        title: '자사 웹사이트 리뉴얼',
        tech: 'Fullstack',
        description: '3D 인터랙션 웹 구현 (GSAP, R3F). Express 서버 구성 및 Firebase/GCP 배포 연동. 웹사이트 개선 이후 프로젝트 문의 유입에 기여.',
      },
    ],
  },
  {
    company: '한국남동발전',
    role: 'Frontend Developer Intern',
    period: '인턴십',
    projects: [
      {
        title: '전력중개 시스템 개발',
        tech: 'React, Chart.js',
        description: 'React 기반 전력량 시각화 UI 구현. Chart.js 차트 개발. 상태관리 구조 개선으로 렌더링 안정성 향상.',
      },
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: -30,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.15,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="section">
      <div className="sectionContainer">
        <div className="sectionHeader">
          <span className="sectionKicker">Experience</span>
          <h2 className="sectionTitle">경력</h2>
        </div>
        <div className="experienceTimeline">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="experienceItem"
              ref={(el) => {
                if (el) itemsRef.current[idx] = el;
              }}
            >
              <div className="experienceHeader">
                <div className="experienceCompany">
                  <h3 className="experienceCompanyName">{exp.company}</h3>
                  <span className="experienceRole">{exp.role}</span>
                </div>
                <span className="experiencePeriod">{exp.period}</span>
              </div>
              <div className="experienceProjects">
                {exp.projects.map((project, pIdx) => (
                  <div key={pIdx} className="projectCard">
                    <div className="projectHeader">
                      <h4 className="projectTitle">{project.title}</h4>
                      {project.tech && <span className="projectTech">{project.tech}</span>}
                      {project.status && <span className="projectStatus">{project.status}</span>}
                    </div>
                    <p className="projectDescription">{project.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
