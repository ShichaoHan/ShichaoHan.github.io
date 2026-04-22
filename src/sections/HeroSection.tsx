import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { t, language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
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
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        textColRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 },
        '-=0.5'
      );

    if (tagsRef.current) {
      tl.fromTo(
        tagsRef.current.children,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08 },
        '-=0.3'
      );
    }

    return () => { tl.kill(); };
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
      className="px-6 md:px-8"
      style={{ paddingTop: '120px', paddingBottom: '64px' }}
    >
      <div className="max-w-[800px] mx-auto">
        {/* Two-column: photo left, text right */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
          {/* Portrait */}
          <div
            ref={portraitRef}
            className="shrink-0 overflow-hidden"
            style={{
              borderRadius: '4px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            }}
          >
            <img
              src="/assets/photo.jpg"
              alt="Shichao Han"
              style={{ width: '220px', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Text column */}
          <div ref={textColRef} className="flex flex-col">
            {/* Name */}
            <h1
              style={{
                fontFamily: "'Cormorant Garamond', 'Noto Serif SC', serif",
                fontSize: '44px',
                fontWeight: 600,
                color: '#2C3E50',
                lineHeight: 1.15,
                margin: 0,
              }}
            >
              {t('Shichao Han', '韩士超')}
            </h1>

            {/* Affiliation */}
            <p
              style={{
                fontFamily: "'Cormorant Garamond', 'Noto Serif SC', serif",
                fontSize: '18px',
                fontWeight: 500,
                color: '#5A5A5A',
                marginTop: '10px',
                marginBottom: 0,
              }}
            >
              {t(
                'Senior Data Scientist, Tencent Weixin Experimentation Platform',
                '高级数据科学家，腾讯微信实验平台'
              )}
            </p>

            {/* Contact Row */}
            <div
              className="flex flex-wrap items-center gap-x-4 gap-y-2"
              style={{ fontSize: '14px', color: '#9B9B9B', marginTop: '10px' }}
            >
              <span className="flex items-center gap-1.5">
                <Mail size={14} color="#9B9B9B" />
                <span style={{ fontFamily: "'Source Serif 4', serif" }}>hansc5577@gmail.com</span>
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
              style={{
                fontFamily: "'Source Serif 4', 'Noto Serif SC', serif",
                fontSize: '15px',
                lineHeight: 1.7,
                color: '#5A5A5A',
                marginTop: '20px',
                marginBottom: 0,
              }}
            >
              {language === 'en' ? (
                <>
                  I am a Senior Data Scientist at Tencent&apos;s Weixin Experimentation Platform, developing and applying methods from causal inference, experimental design, econometrics, statistics, and machine learning. I serve as the product manager of Fast-Causal-Inference, an open-source large-scale causal inference toolkit used internally across Tencent and released to the{' '}
                  <a
                    href="https://github.com/Tencent/fast-causal-inference"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#3B7A5B', textDecoration: 'underline' }}
                  >
                    open-source community
                  </a>
                  . My research focuses on causal evaluation of marketplace interventions, scalable experimentation infrastructure, and observational study methodologies for large-scale platforms.
                </>
              ) : (
                <>
                  我是腾讯微信实验平台的高级数据科学家，致力于开发和应用因果推断、实验设计、计量经济学、统计学和机器学习等领域的方法。我担任 Fast-Causal-Inference 的产品负责人——这是一个大规模开源因果推断工具包，在腾讯内部广泛使用，并已向{' '}
                  <a
                    href="https://github.com/Tencent/fast-causal-inference"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#3B7A5B', textDecoration: 'underline' }}
                  >
                    开源社区
                  </a>
                  发布。我的研究聚焦于平台干预的因果评估、可扩展的实验基础设施，以及面向大规模平台的观察性研究方法。
                </>
              )}
            </p>
          </div>
        </div>

        {/* Research Interests */}
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '16px',
            fontWeight: 600,
            color: '#3B7A5B',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginTop: '40px',
            marginBottom: '12px',
          }}
        >
          {t('Research Interests', '研究兴趣')}
        </p>
        <div ref={tagsRef} className="flex flex-wrap gap-2">
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
