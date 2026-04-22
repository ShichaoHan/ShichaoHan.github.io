import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Paper {
  title: string;
  titleZh: string;
  authors: string;
  venue: string;
  link?: string;
}

interface WorkingPaper {
  title: string;
  titleZh: string;
  authors: string;
  year: string;
  status: string;
  statusZh: string;
  statusType: 'in-prep' | 'under-review';
  note: string;
  noteZh: string;
}

const publishedPapers: Paper[] = [
  {
    title: 'MultiObjMatch: Matching with Optimal Tradeoffs between Multiple Objectives in R',
    titleZh: 'MultiObjMatch：R语言中多目标最优权衡的匹配方法',
    authors: 'Shichao Han, Samuel D. Pimentel',
    venue: 'Observational Studies 10.2 (2024): 1–32',
    link: '#',
  },
  {
    title: 'Sequential Optimum Test with Multi-armed Bandits for Online Experimentation',
    titleZh: '基于多臂老虎机的在线实验序贯最优检验',
    authors: 'Fang Kong, Penglei Zhao, Shichao Han, Yong Wang, Shuai Li',
    venue: 'CIKM 2024',
    link: '#',
  },
  {
    title: 'Relationship between the TyG index and diabetic kidney disease in patients with type-2 diabetes mellitus',
    titleZh: '2型糖尿病患者TyG指数与糖尿病肾病的关系',
    authors: 'Liangjing Lv, Yangmei Zhou, Xiangjun Chen, Lilin Gong, Jinshan Wu, Wenjin Luo, Yan Shen, Shichao Han, Jinbo Hu, Yue Wang, Qifu Li, Zhihong Wang',
    venue: 'Diabetes, Metabolic Syndrome and Obesity (2021): 3299–3306',
    link: '#',
  },
  {
    title: 'Early-onset type 2 diabetes: A high-risk factor for proliferative diabetic retinopathy in patients with microalbuminuria',
    titleZh: '早发性2型糖尿病：微量白蛋白尿患者增生性糖尿病视网膜病变的高危因素',
    authors: 'Xinlu Lv, Xi Ran, Xiangjun Chen, Ting Luo, Jinbo Hu, Yue Wang, Zhiping Liu, Qianna Zhen, Xiurong Liu, Li Zheng, Ying Tang, Qinying Zhao, Shichao Han, Yangmei Zhou, Wenjin Luo, Lina Yang, Qifu Li, Zhihong Wang',
    venue: 'Medicine 99.19 (2020): e20189',
    link: '#',
  },
  {
    title: 'Perirenal fat thickness is significantly associated with the risk for development of chronic kidney disease in diabetic patients',
    titleZh: '肾周脂肪厚度与糖尿病患者慢性肾病发生风险显著相关',
    authors: 'Xiangjun Chen, Yun Mao, Jinbo Hu, Shichao Han, Lilin Gong, Ting Luo, Shumin Yang, Hua Qing, Yue Wang, Zhipeng Du, Mei Mei, Li Zheng, Xinlu Lv, Ying Tang, Qinying Zhao, Yangmei Zhou, John Cijiang He, Qifu Li, Zhihong Wang',
    venue: 'Diabetes 70.10 (2021): 2322–2332',
    link: '#',
  },
];

const workingPapers: WorkingPaper[] = [
  {
    title: 'LLM-Driven Causal Discovery and Inference: A Multi-Agent Bayesian Framework',
    titleZh: '基于大语言模型的因果发现与推断：多智能体贝叶斯框架',
    authors: 'Chen Wang, Shan Huang, Shichao Han, Yong Wang',
    year: '2026',
    status: 'In Preparation',
    statusZh: '准备中',
    statusType: 'in-prep',
    note: 'We explore how large language models can help uncover group-specific causal mechanisms from historical A/B tests and leverage them to improve downstream causal inference.',
    noteZh: '我们探索大语言模型如何从历史A/B测试中揭示群体特定的因果机制，并利用它们改进下游因果推断。',
  },
  {
    title: 'Estimating Treatment Effects under Recommender Interference: A Structured Neural Networks Approach',
    titleZh: '推荐系统干扰下的处理效应估计：结构化神经网络方法',
    authors: 'Ruohan Zhan, Shichao Han, Yuchen Hu, Zhenling Jiang',
    year: '2024',
    status: 'Under Review',
    statusZh: '审稿中',
    statusType: 'under-review',
    note: 'Under major revision at Management Science. Extended abstract appeared in ACM EC\'24.',
    noteZh: '在Management Science大幅修改中。扩展摘要发表于ACM EC\'24。',
  },
  {
    title: 'Enhancing External Validity in Experiments with Ongoing Sampling',
    titleZh: '通过持续采样增强实验的外部效度',
    authors: 'Chen Wang, Shichao Han, Shan Huang',
    year: '2024',
    status: 'In Preparation',
    statusZh: '准备中',
    statusType: 'in-prep',
    note: 'Extended abstract appeared in ACM EC\'24.',
    noteZh: '扩展摘要发表于ACM EC\'24。',
  },
];

function PaperCard({ paper, index, language }: { paper: Paper; index: number; language: string }) {
  const t = (en: string, zh: string) => (language === 'en' ? en : zh);
  const authorParts = paper.authors.split('Shichao Han');

  return (
    <div
      className="paper-card p-5 transition-all duration-300"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E5E5',
        borderRadius: '4px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.06)';
      }}
    >
      <span
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '14px',
          fontWeight: 600,
          color: '#3B7A5B',
        }}
      >
        [{index + 1}]
      </span>
      <h3
        className="mt-2"
        style={{
          fontFamily: "'Cormorant Garamond', 'Noto Serif SC', serif",
          fontSize: '18px',
          fontWeight: 600,
          color: '#2C3E50',
          lineHeight: 1.4,
        }}
      >
        {t(paper.title, paper.titleZh)}
      </h3>
      <p
        className="mt-2"
        style={{
          fontFamily: "'Source Serif 4', 'Noto Serif SC', serif",
          fontSize: '14px',
          color: '#5A5A5A',
          lineHeight: 1.5,
        }}
      >
        {authorParts.length > 1 ? (
          <>
            {authorParts[0]}
            <strong style={{ fontWeight: 600 }}>Shichao Han</strong>
            {authorParts[1]}
          </>
        ) : (
          paper.authors
        )}
      </p>
      <p
        className="mt-1.5"
        style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: '14px',
          color: '#9B9B9B',
        }}
      >
        {paper.venue}
      </p>
      {paper.link && (
        <div className="mt-3">
          <a
            href={paper.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 transition-opacity duration-200 hover:opacity-70"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '14px',
              fontWeight: 500,
              color: '#3B7A5B',
              textDecoration: 'underline',
            }}
          >
            <ExternalLink size={12} />
            {t('Access here', '点击访问')}
          </a>
        </div>
      )}
    </div>
  );
}

function WorkingPaperCard({ paper, index, language }: { paper: WorkingPaper; index: number; language: string }) {
  const t = (en: string, zh: string) => (language === 'en' ? en : zh);
  const authorParts = paper.authors.split('Shichao Han');

  return (
    <div
      className="paper-card p-5 transition-all duration-300"
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E5E5',
        borderRadius: '4px',
        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.06)';
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '14px',
            fontWeight: 600,
            color: '#3B7A5B',
          }}
        >
          [{index + 1}]
        </span>
        <span
          className="shrink-0"
          style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: '12px',
            padding: '2px 10px',
            borderRadius: '4px',
            backgroundColor: paper.statusType === 'under-review' ? '#3B7A5B' : '#F5F0EB',
            color: paper.statusType === 'under-review' ? '#FFFFFF' : '#9B9B9B',
            border: paper.statusType === 'under-review' ? 'none' : '1px solid #E5E5E5',
          }}
        >
          {t(paper.status, paper.statusZh)}
        </span>
      </div>
      <h3
        className="mt-2"
        style={{
          fontFamily: "'Cormorant Garamond', 'Noto Serif SC', serif",
          fontSize: '18px',
          fontWeight: 600,
          color: '#2C3E50',
          lineHeight: 1.4,
        }}
      >
        {t(paper.title, paper.titleZh)}
      </h3>
      <p
        className="mt-2"
        style={{
          fontFamily: "'Source Serif 4', 'Noto Serif SC', serif",
          fontSize: '14px',
          color: '#5A5A5A',
          lineHeight: 1.5,
        }}
      >
        {authorParts.length > 1 ? (
          <>
            {authorParts[0]}
            <strong style={{ fontWeight: 600 }}>Shichao Han</strong>
            {authorParts[1]}
          </>
        ) : (
          paper.authors
        )}
      </p>
      <p
        className="mt-1.5"
        style={{
          fontFamily: "'Source Serif 4', 'Noto Serif SC', serif",
          fontSize: '14px',
          color: '#9B9B9B',
          lineHeight: 1.5,
        }}
      >
        {t(paper.note, paper.noteZh)}
      </p>
    </div>
  );
}

export default function ResearchSection() {
  const { language } = useLanguage();
  const t = (en: string, zh: string) => (language === 'en' ? en : zh);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pubLabelRef = useRef<HTMLParagraphElement>(null);
  const pubGridRef = useRef<HTMLDivElement>(null);
  const wpLabelRef = useRef<HTMLParagraphElement>(null);
  const wpGridRef = useRef<HTMLDivElement>(null);

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
    )
      .fromTo(
        pubLabelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        pubGridRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 },
        '-=0.3'
      )
      .fromTo(
        wpLabelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )
      .fromTo(
        wpGridRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12 },
        '-=0.3'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="research"
      ref={sectionRef}
      className="px-6 md:px-8"
      style={{ paddingTop: '64px', paddingBottom: '64px' }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Section Heading */}
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
          {t('Research', '研究')}
        </h2>

        {/* Published Papers Label */}
        <p
          ref={pubLabelRef}
          style={{
            fontFamily: "'Cormorant Garamond', 'Noto Serif SC', serif",
            fontSize: '20px',
            fontWeight: 600,
            color: '#3B7A5B',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '16px',
          }}
        >
          {t('Published Papers', '已发表论文')}
        </p>

        {/* Published Papers Grid */}
        <div
          ref={pubGridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {publishedPapers.map((paper, i) => (
            <PaperCard key={i} paper={paper} index={i} language={language} />
          ))}
        </div>

        {/* Working Papers Label */}
        <p
          ref={wpLabelRef}
          style={{
            fontFamily: "'Cormorant Garamond', 'Noto Serif SC', serif",
            fontSize: '20px',
            fontWeight: 600,
            color: '#3B7A5B',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginTop: '48px',
            marginBottom: '16px',
          }}
        >
          {t('Working Papers', '工作论文')}
        </p>

        {/* Working Papers Grid */}
        <div
          ref={wpGridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {workingPapers.map((paper, i) => (
            <WorkingPaperCard key={i} paper={paper} index={i} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
}
