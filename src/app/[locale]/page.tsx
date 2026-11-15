import {getTranslations, setRequestLocale} from 'next-intl/server';
import {Link} from '@/i18n/navigation';

type Props = {params: Promise<{locale: string}>};
export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('home');
  return <main style={{maxWidth: 960, margin: '0 auto', padding: 'clamp(24px, 8vw, 96px) 24px'}}>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16}}>
      <strong style={{fontSize: 28}}>NOVA 🛍️</strong>
      <nav aria-label={t('languageNav')}><Link href='/' locale='fa'>FA</Link> {' / '} <Link href='/' locale='en'>EN</Link></nav>
    </div>
    <section style={{paddingBlock: 90}}>
      <p style={{color: '#f46b24', fontWeight: 700}}>{t('eyebrow')}</p>
      <h1 style={{fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.2}}>{t('headline')}</h1>
      <p style={{fontSize: 20, lineHeight: 1.8}}>{t('description')}</p>
      <p style={{fontSize: 14, opacity: .7}}>{t('phaseNotice')}</p>
    </section>
  </main>;
}
