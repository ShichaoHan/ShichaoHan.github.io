import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const affilRef = useRef<HTMLParagraphElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        once: true,
      },
    });

    tl.fromTo(
      portraitRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        nameRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.55'
      )
      .fromTo(
        affilRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.45'
      )
      .fromTo(
        contactRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.35'
      )
      .fromTo(
        bioRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.3'
      );

    if (tagsRef.current) {
      const tags = tagsRef.current.children;
      tl.fromTo(
        tags,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08 },
        '-=0.3'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const researchTagsEn = [
    'Causal Inference',
    'Observational Studies',
    'Health Management',
    'Data Science',
    'Machine Learning',
  ];

  const researchTagsZh = ['因果推断', '观察性研究', '健康管理', '数据科学', '机器学习'];

  const tags = t('en', 'zh') === 'en' ? researchTagsEn : researchTagsZh;

  return (
    <section
      id="about"
      ref={sectionRef}
      className="flex flex-col items-center text-center px-6 md:px-8"
      style={{ paddingTop: '120px', paddingBottom: '64px' }}
    >
      <div className="max-w-[900px] w-full flex flex-col items-center">
        {/* Portrait */}
        <div
          ref={portraitRef}
          className="overflow-hidden"
          style={{
            borderRadius: '4px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          }}
        >
          <img
            src="/assets/photo.jpg"
            alt="Shichao Han"
            className="w-64 md:w-80 object-cover"
            style={{ aspectRatio: '3/4' }}
          />
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="mt-8"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '48px',
            fontWeight: 600,
            color: '#2C3E50',
            lineHeight: 1.2,
          }}
        >
          {t('Shichao Han', '韩士超')}
        </h1>

        {/* Affiliation */}
        <p
          ref={affilRef}
          className="mt-3"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '20px',
            fontWeight: 500,
            color: '#5A5A5A',
          }}
        >
          {t(
            "Senior Research Data Scientist, Tencent WeChat Team",
            "高级研究数据科学家，腾讯微信团队"
          )}
        </p>

        {/* Contact Row */}
        <div
          ref={contactRef}
          className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
          style={{ fontSize: '14px', color: '#9B9B9B' }}
        >
          <span className="flex items-center gap-1.5">
            <Mail size={14} color="#9B9B9B" />
            <span style={{ fontFamily: "'Source Serif 4', serif" }}>hansc5577@gmail.com</span>
          </span>
          <span style={{ color: '#9B9B9B' }}>·</span>
          <span className="flex items-center gap-1.5">
            <Phone size={14} color="#9B9B9B" />
            <span style={{ fontFamily: "'Source Serif 4', serif" }}>(+86) 15025399090</span>
          </span>
          <span style={{ color: '#9B9B9B' }}>·</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} color="#9B9B9B" />
            <span style={{ fontFamily: "'Source Serif 4', serif" }}>
              {t('Shanghai / Shenzhen, China', '中国上海 / 深圳')}
            </span>
          </span>
        </div>

        {/* Bio */}
        <p
          ref={bioRef}
          className="mt-6 max-w-[700px]"
          style={{
            fontFamily: "'Source Serif 4', 'Noto Serif SC', serif",
            fontSize: '15px',
            lineHeight: 1.65,
            color: '#5A5A5A',
          }}
        >
          {t(
            "I am a Senior Research Data Scientist at Tencent's WeChat Team, developing and applying methods from causal inference, experimental design, econometrics, statistics, and machine learning. My research focuses on causal evaluation of marketplace interventions, scalable experimentation infrastructure, and observational study methodologies for large-scale platforms.",
            "我是腾讯微信团队的高级研究数据科学家，致力于开发和应用因果推断、实验设计、计量经济学、统计学和机器学习等领域的方法。我的研究聚焦于平台干预的因果评估、可扩展的实验基础设施，以及面向大规模平台的观察性研究方法。"
          )}
        </p>

        {/* Research Interests Label */}
        <p
          className="mt-8"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '16px',
            fontWeight: 600,
            color: '#3B7A5B',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {t('Research Interests', '研究兴趣')}
        </p>

        {/* Research Tags */}
        <div
          ref={tagsRef}
          className="mt-3 flex flex-wrap justify-center gap-2"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5"
              style={{
                fontFamily: "'Source Serif 4', 'Noto Serif SC', serif",
                fontSize: '14px',
                color: '#5A5A5A',
                border: '1px solid #E5E5E5',
                borderRadius: '4px',
                backgroundColor: '#FFFFFF',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
