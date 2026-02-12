'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Card from '@/components/ui/Card';

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  { label: 'Email', value: 'devayeong@gmail.com', href: 'mailto:devayeong@gmail.com' },
  { label: 'GitHub', value: 'github.com/nurget', href: 'https://github.com/nurget' },
  { label: 'LinkedIn', value: 'linkedin.com/in/아영-김', href: 'https://www.linkedin.com/in/%EC%95%84%EC%98%81-%EA%B9%80-a33250232' },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.contactItem');
    items.forEach((item, index) => {
      gsap.fromTo(
        item,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
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
    <section id="contact" ref={sectionRef} className="section contactSection">
      <div className="sectionContainer">
        <div className="sectionHeader">
          <span className="sectionKicker">Contact</span>
          <h2 className="sectionTitle">연락처</h2>
          {/* <p className="sectionSubtitle">프로젝트 문의 및 협업 제안을 환영합니다</p> */}
        </div>
        <div className="contactContent">
          <Card className="contactCard">
            <div className="contactList">
              {contactItems.map((item, idx) => (
                <div key={idx} className="contactItem">
                  <span className="contactLabel">{item.label}</span>
                  <a
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="contactValue"
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
