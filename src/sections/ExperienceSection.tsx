import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  role: string;
  roleZh: string;
  company: string;
  companyZh: string;
  location: string;
  locationZh: string;
  dates: string;
  details: string[];
  detailsZh: string[];
  supervisor?: string;
  supervisorZh?: string;
  courses?: string;
  coursesZh?: string;
}

const experiences: ExperienceItem[] = [
  {
    role: 'Senior Research Data Scientist',
    roleZh: '高级研究数据科学家',
    company: 'Tencent, Weixin Experimentation Platform',
    companyZh: '腾讯，微信实验平台',
    location: 'Shanghai / Shenzhen, China',
    locationZh: '中国上海 / 深圳',
    dates: 'Jun. 2020 – Aug. 2020, Jun. 2021 – Aug. 2021, Jul. 2022 – Present',
    details: [
      "Designed and implemented experimental designs and causal inference algorithms for both randomized and observational settings under marketplace and temporal interference, leveraging Scala (Spark), C++, and Python for large-scale deployment in Weixin's experimentation platform.",
      'Led the development, productization, and internal adoption of the company-wide open-source large-scale causal inference toolkit; designed and delivered 10+ data science training programs.',
      'Engineered scalable end-to-end pipelines for matching-based causal inference and uplift modeling across three major business units.',
    ],
    detailsZh: [
      '在 marketplace 和时间干扰下，为随机和观察性场景设计并实现了实验设计和因果推断算法，利用 Scala (Spark)、C++ 和 Python 在微信实验平台大规模部署。',
      '领导了公司级开源大规模因果推断工具包的开发、产品化和内部推广；设计并交付了10余个数据科学培训项目。',
      '构建了基于匹配的因果推断和 uplift 建模的可扩展端到端流水线，覆盖三个主要业务部门。',
    ],
  },
  {
    role: 'Teaching Assistant & Undergraduate Student Instructor',
    roleZh: '教学助理与本科生讲师',
    company: 'UC Berkeley',
    companyZh: '加州大学伯克利分校',
    location: 'Berkeley, CA',
    locationZh: '伯克利，加州',
    dates: 'Aug. 2019 – May 2022',
    details: [
      'Taught weekly sections for 30 students; held office hours; wrote and graded exams; maintained class infrastructure.',
    ],
    detailsZh: [
      '每周为30名学生授课；举办答疑时间；编写和批改考试；维护课程基础设施。',
    ],
    courses: 'Probability for Data Science, Principles and Techniques of Data Science',
    coursesZh: '数据科学概率，数据科学原理与技术',
  },
  {
    role: 'Research Assistant',
    roleZh: '研究助理',
    company: 'RISELab, UC Berkeley',
    companyZh: 'RISELab, 加州大学伯克利分校',
    location: 'Berkeley, CA',
    locationZh: '伯克利，加州',
    dates: 'Aug. 2019 – Aug. 2020',
    details: [
      'Researched randomized linear algebra and uncertainty quantification for SVD; ran experiments comparing algorithms in Ray.',
    ],
    detailsZh: [
      '研究随机线性代数和SVD的不确定性量化；在Ray中运行算法比较实验。',
    ],
    supervisor: 'Supervisor: Benjamin Erichson',
    supervisorZh: '导师：Benjamin Erichson',
  },
  {
    role: 'Algorithm Engineer Intern',
    roleZh: '算法工程师实习生',
    company: 'Longfor Properties Co. Ltd',
    companyZh: '龙湖集团',
    location: 'Beijing, China',
    locationZh: '中国北京',
    dates: 'May 2019 – Aug. 2019',
    details: [
      'Rotational role in data management platform, CV team, and NLP team. Designed and implemented customer clustering algorithms.',
    ],
    detailsZh: [
      '在数据管理平台、计算机视觉团队和自然语言处理团队轮岗。设计和实现客户聚类算法。',
    ],
  },
];

function ExperienceRow({ item, language }: { item: ExperienceItem; language: string }) {
  const t = (en: string, zh: string) => (language === 'en' ? en : zh);
  const details = language === 'en' ? item.details : item.detailsZh;

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Role + dates on same line */}
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
            {t(item.role, item.roleZh)}
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

      {/* Company + location */}
      <p
        style={{
          margin: '2px 0 0',
          fontFamily: "'Source Serif 4', 'Noto Serif SC', serif",
          fontSize: '14px',
          color: '#3B7A5B',
          lineHeight: 1.5,
        }}
      >
        {t(item.company, item.companyZh)}
        {item.location && (
          <span style={{ color: '#9B9B9B' }}>
            {' · '}
            {t(item.location, item.locationZh)}
          </span>
        )}
      </p>

      {/* Supervisor */}
      {item.supervisor && (
        <p
          style={{
            margin: '2px 0 0',
            fontFamily: "'Source Serif 4', serif",
            fontSize: '14px',
            color: '#9B9B9B',
            lineHeight: 1.5,
          }}
        >
          {t(item.supervisor, item.supervisorZh || '')}
        </p>
      )}

      {/* Courses */}
      {item.courses && (
        <p
          style={{
            margin: '2px 0 0',
            fontFamily: "'Source Serif 4', 'Noto Serif SC', serif",
            fontSize: '14px',
            color: '#9B9B9B',
            lineHeight: 1.5,
          }}
        >
          {t(item.courses, item.coursesZh || '')}
        </p>
      )}

      {/* Bullet details */}
      {details.length > 0 && (
        <ul style={{ margin: '6px 0 0', padding: 0, listStyle: 'none' }}>
          {details.map((detail, i) => (
            <li
              key={i}
              className="flex gap-2"
              style={{
                fontFamily: "'Source Serif 4', 'Noto Serif SC', serif",
                fontSize: '14px',
                color: '#5A5A5A',
                lineHeight: 1.6,
                marginTop: i > 0 ? '4px' : 0,
              }}
            >
              <span style={{ color: '#3B7A5B', flexShrink: 0 }}>·</span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ExperienceSection() {
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
      id="experience"
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
          {t('Experience', '工作经历')}
        </h2>

        <div ref={listRef}>
          {experiences.map((item, i) => (
            <ExperienceRow key={i} item={item} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
}
