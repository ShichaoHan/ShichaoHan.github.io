import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const colsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 90%',
        once: true,
      },
    });

    tl.fromTo(
      colsRef.current?.children || [],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 }
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-8"
      style={{
        paddingTop: '48px',
        paddingBottom: '48px',
        borderTop: '1px solid #E5E5E5',
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div
          ref={colsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Programming */}
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '14px',
                fontWeight: 600,
                color: '#3B7A5B',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              {t('Programming', '编程')}
            </p>
            <p
              style={{
                fontFamily: "'Source Serif 4', serif",
                fontSize: '14px',
                color: '#5A5A5A',
                lineHeight: 1.6,
              }}
            >
              Python, R, C, C++, Scala (Spark), Ray, RISC-V, LaTeX
            </p>
          </div>

          {/* Languages */}
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '14px',
                fontWeight: 600,
                color: '#3B7A5B',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              {t('Languages', '语言')}
            </p>
            <p
              style={{
                fontFamily: "'Source Serif 4', 'Noto Serif SC', serif",
                fontSize: '14px',
                color: '#5A5A5A',
                lineHeight: 1.6,
              }}
            >
              {t(
                'Mandarin (native), English (advanced), French (fluent), Cantonese (fluent), Korean (elementary)',
                '普通话（母语）、英语（高级）、法语（流利）、粤语（流利）、韩语（初级）'
              )}
            </p>
          </div>

          {/* Sport */}
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '14px',
                fontWeight: 600,
                color: '#3B7A5B',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              {t('Sport', '运动')}
            </p>
            <p
              style={{
                fontFamily: "'Source Serif 4', 'Noto Serif SC', serif",
                fontSize: '14px',
                color: '#5A5A5A',
                lineHeight: 1.6,
              }}
            >
              {t('Figure skating (intercollegiate)', '花样滑冰（校际）')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
