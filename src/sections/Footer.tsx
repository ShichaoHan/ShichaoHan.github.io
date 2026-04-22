import { useLanguage } from '@/hooks/useLanguage';

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer
      className="w-full py-8 text-center"
      style={{ backgroundColor: '#2C3E50' }}
    >
      <p
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '14px',
          fontWeight: 400,
          color: '#9B9B9B',
        }}
      >
        {language === 'en' ? '\u00A9 2025 Shichao Han' : '\u00A9 2025 \u97E9\u4E16\u8D85'}
      </p>
    </footer>
  );
}
