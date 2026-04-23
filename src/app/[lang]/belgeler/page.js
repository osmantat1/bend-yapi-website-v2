import "./page.css";

const belgeler = [
    { ad: "ISO 9001:2015 Kalite Belgesi", tip: "PDF", tarih: "2025", indirme: "#" },
    { ad: "ISO 14001 Çevre Belgesi", tip: "PDF", tarih: "2025", indirme: "#" },
    { ad: "ISO 45001 İş Sağlığı Belgesi", tip: "PDF", tarih: "2024", indirme: "#" },
    { ad: "Müteahhitlik Belgesi (Sınıf H)", tip: "PDF", tarih: "2024", indirme: "#" },
    { ad: "Ticaret Sicil Gazetesi", tip: "PDF", tarih: "2024", indirme: "#" },
    { ad: "Vergi Levhası", tip: "PDF", tarih: "2025", indirme: "#" },
];

const isBitirmeBelgeleri = [
    {
        proje: "Elazığ Şehir Hastanesi Ek Binası",
        isveren: "Sağlık Bakanlığı",
        yil: "2022",
        arsiv: "#",
    },
    {
        proje: "Erbil Yaşam Merkezi 1. Etap",
        isveren: "Erbil Belediyesi",
        yil: "2023",
        arsiv: "#",
    },
    {
        proje: "Keban Barajı Renovasyon",
        isveren: "EÜAŞ",
        yil: "2024",
        arsiv: "#",
    },
];

export default function BelgelerPage() {
    return (
        <main className="belgeler-page page-padding">
            <div className="page-hero">
                <div className="container">
                    <h1 className="page-title animate-slide-up">
                        Belgeler & <span className="glow-text">İndirme Merkezi</span>
                    </h1>
                    <p className="page-desc animate-slide-up delay-100">
                        Firmamıza ait sertifikalar, yeterlilik belgeleri ve proje tamamlama
                        dokümanlarına buradan erişebilirsiniz.
                    </p>
                </div>
            </div>

            <div className="belgeler-kapsam container">
                {/* Firma Belgeleri */}
                <section className="belge-seksiyon animate-slide-up delay-100">
                    <h2 className="seksiyon-baslik">📋 Firma Belgeleri & Sertifikalar</h2>
                    <div className="belge-liste">
                        {belgeler.map((b, i) => (
                            <div key={i} className="belge-satir glass-panel">
                                <div className="belge-sol">
                                    <span className="belge-ikon">📄</span>
                                    <div>
                                        <p className="belge-ad">{b.ad}</p>
                                        <p className="belge-meta">
                                            {b.tip} &middot; {b.tarih}
                                        </p>
                                    </div>
                                </div>
                                <a href={b.indirme} className="btn-indir">
                                    ↓ İndir
                                </a>
                            </div>
                        ))}
                    </div>
                </section>

                {/* İş Bitirme Belgeleri */}
                <section className="belge-seksiyon animate-slide-up delay-200">
                    <h2 className="seksiyon-baslik">🏗️ İş Bitirme Belgeleri</h2>
                    <div className="belge-liste">
                        {isBitirmeBelgeleri.map((b, i) => (
                            <div key={i} className="belge-satir glass-panel">
                                <div className="belge-sol">
                                    <span className="belge-ikon">🏢</span>
                                    <div>
                                        <p className="belge-ad">{b.proje}</p>
                                        <p className="belge-meta">
                                            İşveren: {b.isveren} &middot; {b.yil}
                                        </p>
                                    </div>
                                </div>
                                <a href={b.arsiv} className="btn-indir">
                                    ↓ Görüntüle
                                </a>
                            </div>
                        ))}
                    </div>
                    <p className="belge-not">
                        * Tüm belgeler dijital arşivde mevcuttur. Detaylı bilgi için lütfen bizimle
                        iletişime geçin.
                    </p>
                </section>
            </div>
        </main>
    );
}
