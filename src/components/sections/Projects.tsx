'use client';

import Image from 'next/image';
import { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const COMPANY_LOGOS: Record<string, { logo: string; name: string }> = {
  connectwave: { logo: '/images/companies/connectwave.svg', name: '커넥트웨이브' },
  yinvl: { logo: '/images/companies/yinvl.svg', name: '와이이노베이션랩' },
  vgen: { logo: '/images/companies/vgen.png', name: '브이젠주식회사' },
};

type Project = {
  id: string;
  title: string;
  company: keyof typeof COMPANY_LOGOS;
  tech: string[];
  role: string;
  summary: string;
  bullets: string[];
  impact: string[];
  status?: string;
  /** 프로젝트 대표 이미지. public/images/works/ 폴더에 넣고 경로 지정 (예: '/images/works/01.jpg') */
  image?: string;
  /** true면 이미지 영역 자체를 숨김 (공개 불가 등) */
  hideImage?: boolean;
};

const projects: Project[] = [
  {
    id: '01',
    title: '샵빌더 백엔드 시스템 구축',
    company: 'connectwave',
    image: '/images/works/01.jpg',
    tech: ['NestJS', 'Redis', 'MySQL', 'JWT', 'DDD', 'Clean Architecture'],
    role: 'Backend Developer',
    summary: '노코드 쇼핑몰 에디터의 편집 데이터를 Redis 임시 저장 → MySQL 확정 저장 흐름으로 설계해, 잦은 수정/저장 이벤트에서도 DB 부하를 줄였습니다. PHP 레거시와 공존하는 연동 레이어를 구현하고, 네이버 스마트스토어 연동 API까지 확장했습니다.',
    bullets: [
      '노코드 에디터 서버 API - 설계 및 구현 담당 (NestJS, Redis 임시 저장 → MySQL 확정 저장)',
      'DDD & 클린 아키텍처 - 도메인(에디터/상품/주문)별 계층 분리, Entity·UseCase·Repository 패턴 적용으로 비즈니스 로직과 인프라 의존성 분리',
      'PHP 레거시 - 기존 API와 동시 운영되도록 연동 레이어 구현 (요청 라우팅, 응답 포맷 맞춤)',
      'Redis 키 설계 - 유저·세션·편집 버전 기준으로 수정 이벤트 잦은 구간 DB 접근 최소화',
      '네이버 스마트스토어 - 상품/주문 연동 API 개발 (인증, webhook 처리)',
    ],
    impact: [
      '편집 구간 저장/응답 안정화, 스마트스토어 연동으로 판매자 유입 확대',
    ],
  },
  {
    id: '02',
    title: '모니터링 환경 구축',
    company: 'connectwave',
    image: '/images/works/02.png',
    tech: ['Grafana', 'Prometheus', 'Loki'],
    role: 'Backend Developer',
    summary: '장애 대응이 "서버 접속 → 로그 수동 탐색"에 의존해 평균 30분+ 걸리던 흐름을, Grafana 기반 대시보드로 통합했습니다. Prometheus/Loki로 메트릭과 로그를 함께 보게 하면서 원인 파악 시간을 수 분대로 단축했습니다.',
    bullets: [
      '관측 환경 구축 - 로그 파일만 보관하던 환경에서 원인 파악 30분+ 소요되던 문제 개선을 위해 제안·구축',
      'Prometheus - 메트릭 수집(target, scrape 설정) 후 Grafana 대시보드에 RPS·CPU·메모리·에러율 통합 구성',
      'Loki - 앱 로그 수집 후 Grafana에서 메트릭과 로그 동시 조회 가능하도록 연동',
      '알람 - 특정 에러율/지연 구간에서 네이버 웍스 발송 규칙 정의',
    ],
    impact: [
      '장애 원인 파악 시간 30분대 → 수 분 이내로 단축',
    ],
  },
  {
    id: '03',
    title: '샵빌더 백오피스 구축',
    company: 'connectwave',
    hideImage: true,
    tech: ['NestJS', 'MySQL'],
    role: 'Backend Developer',
    summary: '운영팀이 콘텐츠·설정을 직접 관리할 수 있도록 백오피스 API를 구축했습니다. 엑셀/수작업으로 처리하던 흐름을 서비스 안으로 가져오고, 6~7종 관리 기능을 안정적으로 운영할 수 있게 만들었습니다.',
    bullets: [
      '백오피스 서버 - 인증·권한, 콘텐츠 CRUD API 6~7종 설계 및 구현 담당',
      '엔티티별 스키마 - 상품/카테고리/배너/설정 등 정리 후 NestJS 모듈로 구현',
      '파일 업로드 - S3 연동, 썸네일·용량 제한 처리',
    ],
    impact: [
      '운영 수작업 감소, 콘텐츠 반영 주기 단축',
    ],
  },
  {
    id: '04',
    title: '메이크샵 라이트 마이그레이션',
    image: '/images/works/04.png',
    company: 'connectwave',
    tech: ['NestJS', 'PHP', 'MySQL'],
    role: 'Backend Developer',
    summary: '오래 운영된 PHP 서비스(단일 파일 4~5천 라인 규모 포함)를 분석해 도메인 규칙을 정리하고, NestJS로 API를 단계적으로 이관하고 있습니다. 기존 클라이언트 호환을 유지하면서 전환 리스크를 줄이는 방식으로 진행 중입니다.',
    bullets: [
      'PHP 레거시 - 코드·DB 스키마 분석, 도메인 규칙 문서화',
      '대형 라이브러리 - 단일 파일 4~5천 라인 규모 분석 후 역할별로 쪼개 이식',
      'NestJS 전환 - 동일 동작 API 재구현, 기존 클라이언트 호환 유지',
    ],
    impact: [
      '레거시 구조·규칙 정리로 이후 마이그레이션 속도 확보',
    ],
    status: '진행 중',
  },
  {
    id: '05',
    title: '파인모션 멘토링 플랫폼',
    image: '/images/works/05.png',
    company: 'yinvl',
    tech: ['Backend API', 'File Upload', 'ERD', 'Firebase'],
    role: 'Backend Developer',
    summary: '영상 기반 멘토링 서비스의 백엔드를 맡아 도메인 ERD 설계부터 업로드/피드백 API까지 구현했습니다. 멘토·멘티·세션·영상·피드백 흐름을 하나의 데이터 모델로 정리해 서비스 운영이 가능하도록 구성했습니다.',
    bullets: [
      'ERD 설계 - 멘토/멘티/세션/영상/피드백 도메인 관계 정리',
      '영상 업로드 - multipart 처리, 스토리지 저장 후 메타정보 DB 적재',
      '피드백·타임라인 API - 목록/필터/페이지네이션',
    ],
    impact: [
      '영상 업로드~피드백까지 한 흐름으로 서비스 가능',
    ],
  },
  {
    id: '06',
    title: '교육부 교육용 앱 3종 유지보수',
    image: '/images/works/06.jpg',
    company: 'yinvl',
    tech: ['Spring Boot', 'PostgreSQL', 'JPA'],
    role: 'Backend Developer',
    summary: '담당자 공백 상황에서 교육용 앱 3종(Spring Boot) 백엔드를 인수해, 코드/DB 구조를 빠르게 파악하고 이슈 대응을 이어갔습니다. 스펙 변경과 버그 수정에서도 기존 앱 호환을 지키며 무중단 운영을 지원했습니다.',
    bullets: [
      '백엔드 3종 - Spring Boot 기반 구조 파악, 배포·로그·DB 접근 경로 정리',
      'API 수정 - 버그·문의 반영, 스펙 변경 시 기존 앱 호환 유지',
      '인수인계 - 배포·모니터링 절차 문서화',
    ],
    impact: [
      '담당자 공백 기간에도 무중단 운영·이슈 대응 유지',
    ],
  },
  {
    id: '07',
    title: '자사 웹사이트 리뉴얼',
    image: '/images/works/07.png',
    company: 'yinvl',
    tech: ['GSAP', 'R3F', 'Express', 'Firebase/GCP', 'Jest', 'TDD'],
    role: 'Fullstack',
    summary: '회사 브랜딩 웹을 3D/스크롤 인터랙션 중심으로 리뉴얼하고, Express + Firebase/GCP 배포까지 구성했습니다. 결과적으로 소개/문의 흐름이 좋아져 프로젝트 유입에 기여했습니다.',
    bullets: [
      '프론트 - 랜딩·소개 페이지 3D·스크롤 애니메이션 (GSAP, React Three Fiber)',
      'TDD 적용 - API 엔드포인트 및 핵심 비즈니스 로직에 Jest 기반 테스트 코드 작성, 테스트 커버리지 80% 이상 유지하며 안정적인 배포 구조 확립',
      '서버·배포 - Express 정적/API 라우팅, GCP/Firebase 배포 파이프라인',
    ],
    impact: [
      '리뉴얼 후 월평균 문의 건수 2~3건 → 8~10건으로 약 300% 증가',
      '페이지 체류 시간 평균 45초 → 2분 30초로 개선',
    ],
  },
  {
    id: '08',
    title: '전력중개 시스템 개발',
    image: '/images/works/08.png',
    company: 'vgen',
    tech: ['React', 'Chart.js', 'Axios', 'React Router'],
    role: 'Frontend Developer (Intern)',
    summary: '전력량·시계열 데이터를 Chart.js로 시각화하는 React 화면을 개발했습니다. 데이터 갱신 시 발생하던 깜빡임/멈춤 문제를 상태 구조 개선으로 줄여, 지속 갱신에서도 안정적으로 동작하도록 만들었습니다.',
    bullets: [
      '시각화 화면 - React + Chart.js로 전력량·시계열 차트 구현',
      '상태 구조 - 불필요 리렌더 감소로 차트 갱신 시 안정성 개선',
    ],
    impact: [
      '실시간에 가깝게 갱신해도 화면이 안정적으로 동작',
    ],
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLElement[]>([]);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const closeLightbox = useCallback(() => setLightbox(null), []);

  useEffect(() => {
    if (!lightbox) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    document.addEventListener('keydown', onEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onEscape);
      document.body.style.overflow = '';
    };
  }, [lightbox, closeLightbox]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    itemsRef.current.forEach((item) => {
      if (!item) return;

      const number = item.querySelector('.workNumber');
      const title = item.querySelector('.workTitle');
      const summary = item.querySelector('.workSummary');

      gsap.fromTo(
        item,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none reverse' },
        }
      );

      if (number) {
        gsap.fromTo(
          number,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none reverse' },
            delay: 0.1,
          }
        );
      }
      if (title) {
        gsap.fromTo(
          title,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none reverse' },
            delay: 0.15,
          }
        );
      }
      if (summary) {
        gsap.fromTo(
          summary,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 85%', toggleActions: 'play none none reverse' },
            delay: 0.25,
          }
        );
      }
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section id="works" ref={sectionRef} className="section worksSection">
      <div className="sectionContainer worksContainer">
        <div className="sectionHeader">
          <span className="sectionKicker">Works</span>
          <h2 className="sectionTitle">프로젝트</h2>
        </div>
        <div className="worksList">
          {projects.map((project, idx) => (
            <article
              key={project.id}
              className={`workItem ${project.hideImage ? 'workItem--noImage' : ''}`}
              ref={(el) => {
                if (el) itemsRef.current[idx] = el;
              }}
            >
              <div className="workItemInner">
                <span className="workNumber">{project.id}</span>
                <div className="workContent">
                  <div className="workHeader">
                    <span
                      className={`workCompanyLogo ${project.company === 'connectwave' ? 'workCompanyLogo--connectwave' : ''}`}
                      title={COMPANY_LOGOS[project.company].name}
                    >
                      <Image
                        src={COMPANY_LOGOS[project.company].logo}
                        alt=""
                        width={32}
                        height={32}
                        style={{ objectFit: 'contain' }}
                      />
                    </span>
                    <h3 className="workTitle">{project.title}</h3>
                    {project.status && (
                      <span className="workStatus">{project.status}</span>
                    )}
                  </div>
                  <div className="workRole">{project.role}</div>
                  <p className="workSummary">{project.summary}</p>
                  <ul className="workBullets">
                    {project.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <div className="workImpact">
                    <div className="workImpactTitle">Impact</div>
                    <ul className="workImpactList">
                      {project.impact.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="workMeta">
                    <div className="workTech">
                      {project.tech.map((t, i) => (
                        <span key={i} className="workTechTag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {!project.hideImage && (
                  <div className="workImageWrap">
                    {project.image ? (
                      <button
                        type="button"
                        className="workImageButton"
                        onClick={() => setLightbox({ src: project.image!, alt: project.title })}
                        aria-label={`${project.title} 이미지 크게 보기`}
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={280}
                          height={210}
                          className="workImage"
                        />
                      </button>
                    ) : (
                      <div className="workImagePlaceholder">
                        <span>{project.title}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="workImageLightbox"
          onClick={closeLightbox}
          role="presentation"
          aria-modal="true"
          aria-label="이미지 확대"
        >
          <button
            type="button"
            className="workImageLightboxClose"
            onClick={closeLightbox}
            aria-label="닫기"
          >
            ×
          </button>
          <div className="workImageLightboxContent" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} />
          </div>
        </div>
      )}
    </section>
  );
}
