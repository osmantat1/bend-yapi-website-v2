import { getDictionary } from "@/utils/dictionary";
import "./page.css";

export default async function HizmetlerPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const content = dict.servicesPage;

    return (
        <main className="hizmetler-page page-padding">
            {/* Sayfa Hero */}
            <div className="page-hero">
                <div className="container">
                    <h1 className="page-title animate-slide-up">
                        {content.title} <span className="glow-text">{content.titleSpan}</span>
                    </h1>
                    <p className="page-desc animate-slide-up delay-100">
                        {content.desc}
                    </p>
                </div>
            </div>

            {/* Hizmet Kartları */}
            <section className="hizmetler-grid-section container">
                <div className="hizmetler-grid">
                    {content.items.map((h, i) => (
                        <div
                            key={i}
                            className={`hizmet-card glass-panel animate-slide-up delay-${i * 100}`}
                        >
                            <div className="hizmet-icon animate-float">{h.icon}</div>
                            <h2 className="hizmet-baslik">{h.baslik}</h2>
                            <p className="hizmet-aciklama">{h.aciklama}</p>
                            <ul className="hizmet-liste">
                                {h.detaylar.map((d, j) => (
                                    <li key={j}>
                                        <span className="liste-ok">→</span> {d}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Alt CTA */}
            <section className="cta-section container text-center animate-slide-up delay-300">
                <h2 className="glow-text" style={{ fontSize: "2rem", marginBottom: "16px" }}>
                    {content.ctaTitle}
                </h2>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: "30px" }}>
                    {content.ctaDesc}
                </p>
                <a
                    href="https://wa.me/905324545648"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                >
                    {content.ctaBtn}
                </a>
            </section>
        </main>
    );
}
