import { getDictionary } from "@/utils/dictionary";
import { getAllNews } from "@/lib/siteContent";
import "./page.css";

const kategoriBadge = {
    "Proje": { bg: "rgba(16,185,129,0.1)", renk: "#10b981", border: "rgba(16,185,129,0.3)" },
    "Duyuru": { bg: "rgba(245,158,11,0.1)", renk: "#f59e0b", border: "rgba(245,158,11,0.3)" },
    "Basın": { bg: "rgba(139,92,246,0.1)", renk: "#8b5cf6", border: "rgba(139,92,246,0.3)" },
};

export default async function HaberlerPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const haberler = await getAllNews();

    const formatDate = (value) => {
        const date = value ? new Date(value) : null;
        if (!date || Number.isNaN(date.getTime())) return value || "";
        return new Intl.DateTimeFormat(lang === "en" ? "en-US" : "tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    return (
        <main className="haberler-page page-padding">
            <div className="page-hero">
                <div className="container">
                    <h1 className="page-title animate-slide-up">
                        {dict.newsPage.title} & <span className="glow-text">{dict.newsPage.titleSpan}</span>
                    </h1>
                    <p className="page-desc animate-slide-up delay-100">
                        {dict.newsPage.desc}
                    </p>
                </div>
            </div>

            <section className="haberler-liste container">
                <div className="haberler-grid">
                    {haberler.length > 0 ? haberler.map((h, i) => {
                        const badge = kategoriBadge[h.category] || kategoriBadge["Duyuru"];
                        return (
                            <article
                                key={h.id || i}
                                className={`haber-card glass-panel animate-slide-up delay-${(i % 3) * 100}`}
                            >
                                <header className="haber-header">
                                    <span
                                        className="haber-kategori"
                                        style={{
                                            background: badge.bg,
                                            color: badge.renk,
                                            borderColor: badge.border,
                                        }}
                                    >
                                        {h.category}
                                    </span>
                                    <time className="haber-tarih">{formatDate(h.published_at || h.created_at)}</time>
                                </header>
                                <h2 className="haber-baslik">{h.title}</h2>
                                <p className="haber-ozet">{h.summary}</p>
                            </article>
                        );
                    }) : (
                        <div className="haberler-empty" style={{ gridColumn: "1 / -1" }}>
                            {dict.newsPage.empty}
                        </div>
                    )}
                </div>

                <p className="ref-not" style={{ marginTop: "40px" }}>
                    {dict.newsPage.note}
                </p>
            </section>
        </main>
    );
}
