import "./page.css";

const haberler = [
    {
        tarih: "15 Nisan 2026",
        kategori: "Proje",
        baslik: "Elazığ Şehir Hastanesi Ek Binası Teslim Edildi",
        ozet:
            "500 yataklı tam teşekküllü modern hastane bloğu, uluslararası FIDIC standartlarında zamanında tamamlanarak Sağlık Bakanlığı'na teslim edildi.",
    },
    {
        tarih: "2 Mart 2026",
        kategori: "Duyuru",
        baslik: "Bend Yapı, Orta Asya'da Yeni Projeye İmza Attı",
        ozet:
            "Şirketimiz, Kazakistan'da sürdürülebilir enerji santrali inşaatı için uluslararası konsorsiyumla sözleşme imzaladı.",
    },
    {
        tarih: "18 Şubat 2026",
        kategori: "Basın",
        baslik: "İnşaat Sektöründe 'Yılın Firması' Ödülü",
        ozet:
            "Türkiye İnşaat Müteahhitleri Derneği tarafından bu yıl 'En İyi Kamu Projeleri' kategorisinde ödül aldık.",
    },
    {
        tarih: "10 Ocak 2026",
        kategori: "Proje",
        baslik: "Erbil Yaşam Merkezi 1. Etap Tamamlandı",
        ozet:
            "Irak'ın Erbil kentinde sürdürdüğümüz 300 konutluk akıllı şehir projesinin ilk etabı başarıyla tamamlandı.",
    },
    {
        tarih: "5 Aralık 2025",
        kategori: "Duyuru",
        baslik: "ISO 9001:2015 Kalite Belgemizi Yeniledik",
        ozet:
            "Uluslararası kalite yönetim sistemimizi güncel standartlarla yeniden belgelendirdik.",
    },
    {
        tarih: "20 Kasım 2025",
        kategori: "Basın",
        baslik: "Keban Barajı Renovasyon Projesi Medyada",
        ozet:
            "Türkiye'nin en önemli su yapısı projelerinden biri olan Keban Barajı renovasyonu ulusal medyada geniş yer buldu.",
    },
];

const kategoriBadge = {
    "Proje": { bg: "rgba(16,185,129,0.1)", renk: "#10b981", border: "rgba(16,185,129,0.3)" },
    "Duyuru": { bg: "rgba(245,158,11,0.1)", renk: "#f59e0b", border: "rgba(245,158,11,0.3)" },
    "Basın": { bg: "rgba(139,92,246,0.1)", renk: "#8b5cf6", border: "rgba(139,92,246,0.3)" },
};

export default function HaberlerPage() {
    return (
        <main className="haberler-page page-padding">
            <div className="page-hero">
                <div className="container">
                    <h1 className="page-title animate-slide-up">
                        Haberler & <span className="glow-text">Duyurular</span>
                    </h1>
                    <p className="page-desc animate-slide-up delay-100">
                        Bend Yapı'dan en güncel gelişmeler, proje haberleri ve sektör duyuruları.
                    </p>
                </div>
            </div>

            <section className="haberler-liste container">
                <div className="haberler-grid">
                    {haberler.map((h, i) => {
                        const badge = kategoriBadge[h.kategori] || kategoriBadge["Duyuru"];
                        return (
                            <article
                                key={i}
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
                                        {h.kategori}
                                    </span>
                                    <time className="haber-tarih">{h.tarih}</time>
                                </header>
                                <h2 className="haber-baslik">{h.baslik}</h2>
                                <p className="haber-ozet">{h.ozet}</p>
                                <button className="haber-devami">Devamını Oku →</button>
                            </article>
                        );
                    })}
                </div>

                <p className="ref-not" style={{ marginTop: "40px" }}>
                    * Haberler temsili olarak eklenmiştir. Gerçek içerikler admin panelinden güncellenecektir.
                </p>
            </section>
        </main>
    );
}
