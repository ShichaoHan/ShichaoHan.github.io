import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

const educationItems = [
  {
    degree: 'M.A. in Statistics',
    degreeZh: '统计学硕士',
    school: 'University of California, Berkeley',
    schoolZh: '加州大学伯克利分校',
    gpa: 'GPA: 3.9/4.0',
    honors: '',
    honorsZh: '',
    courses: 'Selected Courses: Experimental Design, Natural Language Processing, Statistical Inference',
    coursesZh: '主修课程：实验设计、自然语言处理、统计推断',
    dates: 'Aug. 2021 – May 2022',
  },
  {
    degree: 'B.A. in Statistics & Computer Science',
    degreeZh: '统计学与计算机科学学士',
    school: 'University of California, Berkeley',
    schoolZh: '加州大学伯克利分校',
    gpa: 'GPA: 3.9/4.0',
    honors: 'Honors in Statistics, High Distinction in General Scholarship',
    honorsZh: '统计学荣誉学位，通识教育最高荣誉',
    courses: 'Selected Courses: Causal Inference, Machine Learning, Survival Analysis, Nonlinear Optimization, Probability for Data Science, Deep Neural Networks, Data Structure, Algorithms',
    coursesZh: '主修课程：因果推断、机器学习、生存分析、非线性优化、数据科学概率、深度神经网络、数据结构、算法',
    dates: 'Aug. 2017 – Dec. 2020',
  },
];

export default function EducationSection() {
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
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.12 },
      '-=0.3'
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      id="education"
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
            marginBottom: '32px',
          }}
        >
          {t('Education', '教育背景')}
        </h2>

        <div ref={listRef}>
          {educationItems.map((item, i) => (
            <div key={i} style={{ marginBottom: '24px' }}>
              {/* Degree + dates */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-1">
                <p style={{ margin: 0 }}>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', 'Noto Serif SC', serif",
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#2C3E50',
                    }}
                  >
                    {language === 'en' ? item.degree : item.degreeZh}
                  </span>
                </p>
                <span
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontSize: '14px',
                    color: '#9B9B9B',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.dates}
                </span>
              </div>

              {/* School */}
              <p
                style={{
                  margin: '2px 0 0',
                  fontFamily: "'Source Serif 4', 'Noto Serif SC', serif",
                  fontSize: '14px',
                  color: '#3B7A5B',
                  lineHeight: 1.5,
                }}
              >
                {language === 'en' ? item.school : item.schoolZh}
              </p>

              {/* GPA + honors */}
              <p
                style={{
                  margin: '2px 0 0',
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: '14px',
                  color: '#9B9B9B',
                  lineHeight: 1.5,
                }}
              >
                {item.gpa}
                {item.honors && (
                  <span> · {language === 'en' ? item.honors : item.honorsZh}</span>
                )}
              </p>

              {/* Courses */}
              <p
                style={{
                  margin: '2px 0 0',
                  fontFamily: "'Source Serif 4', 'Noto Serif SC', serif",
                  fontSize: '14px',
                  color: '#9B9B9B',
                  lineHeight: 1.5,
                }}
              >
                {language === 'en' ? item.courses : item.coursesZh}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
