import Link from "next/link";
import { getDictionary } from "@/utils/dictionary";
import "./page.css";

export default async function KurumsalPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const content = dict.aboutPage;

    return (
        <main className="kurumsal-page page-padding section">
            {/* Sayfa Üst Başlık (Hero) */}
            <div className="page-hero">
                <div className="container">
                    <h1 className="page-title animate-slide-up">{content.title} <span className="glow-text">BEND YAPI</span></h1>
                    <p className="page-desc animate-slide-up delay-100">
                        {content.desc}
                    </p>
                </div>
            </div>

            {/* Hakkımızda Metin Bölümü */}
            <section className="about-section container">
                <div className="glass-panel content-box animate-slide-up delay-200">
                    <h2 className="content-title">{content.whoTitle}</h2>
                    <p className="content-text">
                        {content.whoText1}
                    </p>
                    <p className="content-text">
                        {content.whoText2}
                    </p>

                    <h3 className="content-subtitle">{content.missionTitle}</h3>
                    <p className="content-text">
                        {content.missionText}
                    </p>

                    <h3 className="content-subtitle">{content.visionTitle}</h3>
                    <p className="content-text">
                        {content.visionText}
                    </p>
                </div>
            </section>

            {/* Neden Biz (Small Stats/Pointers) */}
            <section className="why-us bg-surface section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">{content.whyTitle} <span>{content.whyTitleSpan}</span></h2>
                    </div>

                    <div className="why-grid">
                        <div className="why-card glass-panel animate-slide-up">
                            <div className="why-icon">🏗️</div>
                            <h3>{content.whyCard1Title}</h3>
                            <p>{content.whyCard1Desc}</p>
                        </div>
                        <div className="why-card glass-panel animate-slide-up delay-100">
                            <div className="why-icon">🌍</div>
                            <h3>{content.whyCard2Title}</h3>
                            <p>{content.whyCard2Desc}</p>
                        </div>
                        <div className="why-card glass-panel animate-slide-up delay-200">
                            <div className="why-icon">🤝</div>
                            <h3>{content.whyCard3Title}</h3>
                            <p>{content.whyCard3Desc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sertifikalar / CTA */}
            <section className="cta-section container text-center animate-slide-up delay-200">
                <h2 className="glow-text" style={{ fontSize: '2rem', marginBottom: '16px' }}>{content.ctaTitle}</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>{content.ctaDesc}</p>
                <div className="cta-actions">
                    <Link href={`/${lang}/iletisim`} className="btn-primary">{content.ctaBtn1}</Link>
                    <Link href={`/${lang}/projeler`} className="btn-secondary" style={{ marginLeft: '16px' }}>{content.ctaBtn2}</Link>
                </div>
            </section>
        </main>
    );
}

