import { useEffect, useState, useCallback } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

const navItems = [
  { id: 'about', labelEn: 'About', labelZh: '关于' },
  { id: 'research', labelEn: 'Research', labelZh: '研究' },
  { id: 'presentations', labelEn: 'Talks', labelZh: '演讲' },
  { id: 'experience', labelEn: 'Experience', labelZh: '经历' },
  { id: 'education', labelEn: 'Education', labelZh: '教育' },
];

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navItems.forEach((item) => {
      const section = document.getElementById(item.id);
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(item.id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleNavClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 88;
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center"
      style={{
        backgroundColor: '#F5F0EB',
        borderBottom: '1px solid #E5E5E5',
      }}
    >
      <div className="max-w-[1100px] w-full mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* Site Title */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="text-[28px] font-semibold tracking-tight cursor-pointer"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: '#2C3E50' }}
        >
          Shichao Han
        </button>

        {/* Desktop Nav + Language Toggle */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative transition-colors duration-300 cursor-pointer bg-transparent border-none"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '18px',
                    fontWeight: 500,
                    color: isActive ? '#3B7A5B' : '#2C3E50',
                    paddingBottom: '2px',
                    borderBottom: isActive ? '1px solid #3B7A5B' : '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#3B7A5B';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#2C3E50';
                  }}
                >
                  {t(item.labelEn, item.labelZh)}
                </button>
              );
            })}
          </div>

          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center rounded-full cursor-pointer overflow-hidden"
            style={{
              border: '1px solid #3B7A5B',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            <span
              className="px-3 py-1 transition-colors duration-300"
              style={{
                backgroundColor: language === 'en' ? '#3B7A5B' : 'transparent',
                color: language === 'en' ? '#FFFFFF' : '#3B7A5B',
              }}
            >
              EN
            </span>
            <span
              className="px-3 py-1 transition-colors duration-300"
              style={{
                backgroundColor: language === 'zh' ? '#3B7A5B' : 'transparent',
                color: language === 'zh' ? '#FFFFFF' : '#3B7A5B',
              }}
            >
              中
            </span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center rounded-full cursor-pointer overflow-hidden"
            style={{
              border: '1px solid #3B7A5B',
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '12px',
              fontWeight: 600,
            }}
          >
            <span
              className="px-2 py-0.5 transition-colors duration-300"
              style={{
                backgroundColor: language === 'en' ? '#3B7A5B' : 'transparent',
                color: language === 'en' ? '#FFFFFF' : '#3B7A5B',
              }}
            >
              EN
            </span>
            <span
              className="px-2 py-0.5 transition-colors duration-300"
              style={{
                backgroundColor: language === 'zh' ? '#3B7A5B' : 'transparent',
                color: language === 'zh' ? '#FFFFFF' : '#3B7A5B',
              }}
            >
              中
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col gap-1.5 p-2 cursor-pointer bg-transparent border-none"
            aria-label="Toggle menu"
          >
            <span
              className="block w-5 h-0.5 transition-transform duration-300"
              style={{
                backgroundColor: '#2C3E50',
                transform: mobileMenuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              }}
            />
            <span
              className="block w-5 h-0.5 transition-opacity duration-300"
              style={{
                backgroundColor: '#2C3E50',
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-5 h-0.5 transition-transform duration-300"
              style={{
                backgroundColor: '#2C3E50',
                transform: mobileMenuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="absolute top-16 left-0 right-0 md:hidden flex flex-col items-center py-4 gap-4"
          style={{
            backgroundColor: '#F5F0EB',
            borderBottom: '1px solid #E5E5E5',
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="transition-colors duration-300 cursor-pointer bg-transparent border-none"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '20px',
                  fontWeight: 500,
                  color: isActive ? '#3B7A5B' : '#2C3E50',
                }}
              >
                {t(item.labelEn, item.labelZh)}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
