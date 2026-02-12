'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Badge from '@/components/ui/Badge';

gsap.registerPlugin(ScrollTrigger);

// shields.io 뱃지 URL (키: 기술명. 괄호 앞만 써도 됨)
const SKILL_BADGE_URLS: Record<string, string> = {
  NestJS: 'https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=nestjs&logoColor=white',
  'Express.js': 'https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white',
  'Spring Boot': 'https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white',
  TypeScript: 'https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white',
  JavaScript: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black',
  Java: 'https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white',
  PHP: 'https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white',
  MySQL: 'https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white',
  Redis: 'https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white',
  Grafana: 'https://img.shields.io/badge/Grafana-F46800?style=flat-square&logo=grafana&logoColor=white',
  Prometheus: 'https://img.shields.io/badge/Prometheus-E6522C?style=flat-square&logo=prometheus&logoColor=white',
  Loki: 'https://img.shields.io/badge/Loki-2F2F2F?style=flat-square&logo=grafana&logoColor=white',
  React: 'https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black',
  'Chart.js': 'https://img.shields.io/badge/Chart.js-FF6384?style=flat-square&logo=chart.js&logoColor=white',
  GSAP: 'https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white',
  'React Three Fiber': 'https://img.shields.io/badge/React_Three_Fiber-000000?style=flat-square&logo=react&logoColor=white',
  Linux: 'https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black',
  Firebase: 'https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black',
  GCP: 'https://img.shields.io/badge/Google_Cloud-4285F4?style=flat-square&logo=googlecloud&logoColor=white',
  Git: 'https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white',
};

function getBadgeUrl(item: string): string | undefined {
  const key = item.includes('(') ? item.split('(')[0].trim() : item;
  return SKILL_BADGE_URLS[key];
}

const skillCategories = [
  { title: 'Backend', items: ['NestJS', 'Express.js', 'Spring Boot'] },
  { title: 'Language', items: ['TypeScript', 'JavaScript', 'Java', 'PHP (레거시 분석/연동 경험)'] },
  { title: 'Database / Cache', items: ['MySQL', 'Redis'] },
  { title: 'Observability', items: ['Grafana', 'Prometheus', 'Loki'] },
  { title: 'Frontend', items: ['React', 'Chart.js', 'GSAP', 'React Three Fiber'] },
  { title: 'Infra / Tools', items: ['Linux', 'Firebase', 'GCP', 'Git'] },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    panelsRef.current.forEach((panel, index) => {
      if (!panel) return;

      gsap.fromTo(
        panel,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.1,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="section">
      <div className="sectionContainer">
        <div className="sectionHeader">
          <span className="sectionKicker">Skills</span>
          <h2 className="sectionTitle">기술 스택</h2>
        </div>
        <div className="skillsGrid">
          {skillCategories.map((category, idx) => (
            <div
              key={idx}
              className="skillPanel"
              ref={(el) => {
                if (el) panelsRef.current[idx] = el;
              }}
            >
              <div className="skillPanelHeader">
                <span className="skillPanelLabel">{category.title}</span>
              </div>
              <div className="skillBadges">
                {category.items.map((item) => {
                  const badgeUrl = getBadgeUrl(item);
                  return badgeUrl ? (
                    <span key={item} className="skillBadgeImg">
                      <img src={badgeUrl} alt={item} />
                    </span>
                  ) : (
                    <Badge key={item} variant="tech">
                      {item}
                    </Badge>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
