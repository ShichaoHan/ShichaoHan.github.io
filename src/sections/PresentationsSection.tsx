import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

const presentations = [
  {
    en: 'Guest Lecturer, "AI for Business Decisions", Purdue University, Mitch Daniels School of Business',
    zh: '客座讲师，"AI for Business Decisions"，普渡大学，米切尔·丹尼尔斯商学院',
    location: 'West Lafayette, IN',
    date: 'February 2026',
    dateZh: '2026年2月',
  },
  {
    en: 'Guest Lecturer, The University of Hong Kong, Business School',
    zh: '客座讲师，香港大学商学院',
    location: 'Hong Kong',
    date: '2021 – 2026',
    dateZh: '2021 – 2026',
  },
  {
    en: 'Conference on Digital Experimentation (CODE) @ MIT',
    zh: 'MIT数字实验会议 (CODE)',
    location: 'Boston, MA',
    date: 'December 2021 – 2025',
    dateZh: '2021年12月 – 2025年',
  },
  {
    en: 'INFORMS Annual Meeting',
    zh: 'INFORMS年会',
    location: 'Atlanta, GA',
    date: 'October 2025',
    dateZh: '2025年10月',
  },
  {
    en: 'Guest Lecturer, The Hong Kong University of Science and Technology, School of Engineering',
    zh: '客座讲师，香港科技大学工学院',
    location: 'Hong Kong',
    date: 'April 2025',
    dateZh: '2025年4月',
  },
  {
    en: 'Conference on Information and Knowledge Management (CIKM)',
    zh: '信息与知识管理会议 (CIKM)',
    location: 'Boise, ID',
    date: 'July 2024',
    dateZh: '2024年7月',
  },
  {
    en: 'ACM Conference on Economics and Computation (EC)',
    zh: 'ACM经济计算会议 (EC)',
    location: 'New Haven, CT',
    date: 'July 2024',
    dateZh: '2024年7月',
  },
];

export default function PresentationsSection() {
  const { language, t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      },
    });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
    ).fromTo(
      listRef.current?.children || [],
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
      '-=0.3'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="presentations"
      ref={sectionRef}
      className="px-6 md:px-8"
      style={{ paddingTop: '64px', paddingBottom: '64px' }}
    >
      <div className="max-w-[800px] mx-auto">
        <h2
          ref={headingRef}
          style={{
            fontFamily: "'Cormorant Garamond', 'Noto Serif SC', serif",
            fontSize: '36px',
            fontWeight: 600,
            color: '#2C3E50',
            marginBottom: '24px',
          }}
        >
          {t('Conference Presentations & Invited Talks', '会议报告与受邀演讲')}
        </h2>

        <div ref={listRef}>
          {presentations.map((item, i) => (
            <p key={i} style={{ margin: '0 0 12px', lineHeight: 1.6 }}>
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', 'Noto Serif SC', serif",
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#2C3E50',
                }}
              >
                {language === 'en' ? item.en : item.zh}
              </span>
              <span
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: '14px',
                  color: '#9B9B9B',
                  marginLeft: '6px',
                }}
              >
                ({item.location ? `${item.location} · ` : ''}{language === 'en' ? item.date : item.dateZh})
              </span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
