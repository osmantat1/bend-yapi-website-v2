import "./page.css";

const hizmetler = [
    {
        icon: "⚡",
        baslik: "Enerji Santralleri",
        aciklama:
            "Karmaşık santral yapılarını tecrübeli teknik personelimizle inşa ediyoruz. Termik, hidrolik ve doğal gaz santrallerinde mühendislik çözümleri sunuyoruz.",
        detaylar: [
            "Termik santral yapımı ve renovasyonu",
            "Doğal gaz kombine çevrim santralleri",
            "Enerji iletim altyapısı",
            "Yenilenebilir enerji tesisleri",
        ],
    },
    {
        icon: "🏢",
        baslik: "Konut & AVM",
        aciklama:
            "Yüksek katlı yapılarda kalite normlarına uygun, modern yaşam merkezleri ve alışveriş kompleksleri tasarlayıp inşa ediyoruz.",
        detaylar: [
            "Yüksek katlı rezidans projeleri",
            "Alışveriş ve yaşam merkezleri",
            "Akıllı bina sistemleri entegrasyonu",
            "İç mekân düzenleme ve peyzaj",
        ],
    },
    {
        icon: "🌊",
        baslik: "Baraj & HES",
        aciklama:
            "Yüksek beceri gerektiren su yapılarında eşsiz bir deneyime sahibiz. Ülkemizin ve bölgemizin kritik su altyapı projelerini hayata geçiriyoruz.",
        detaylar: [
            "Beton ve toprak dolgu barajlar",
            "Hidroelektrik santraller (HES)",
            "Sulama kanalları ve tüneller",
            "Taşkın koruma yapıları",
        ],
    },
    {
        icon: "🏥",
        baslik: "Kamu Taahhütleri",
        aciklama:
            "Hastane, okul ve rehabilitasyon merkezleri FIDIC şartlarına uygun olarak, uluslararası standartlarda ve süreçte teslim edilir.",
        detaylar: [
            "Tam teşekküllü hastane binaları",
            "Eğitim kurumları ve kampüsler",
            "Kamu hizmet binaları",
            "Rehabilitasyon ve sosyal tesisler",
        ],
    },
];

export default function HizmetlerPage() {
    return (
        <main className="hizmetler-page page-padding">
            {/* Sayfa Hero */}
            <div className="page-hero">
                <div className="container">
                    <h1 className="page-title animate-slide-up">
                        Hizmet <span className="glow-text">Alanlarımız</span>
                    </h1>
                    <p className="page-desc animate-slide-up delay-100">
                        20 yılı aşkın deneyim ve uzman mühendislik kadromuzla dört ana alanda
                        güvenilir çözümler sunuyoruz.
                    </p>
                </div>
            </div>

            {/* Hizmet Kartları */}
            <section className="hizmetler-grid-section container">
                <div className="hizmetler-grid">
                    {hizmetler.map((h, i) => (
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
                    Projeniz Mi Var?
                </h2>
                <p style={{ color: "var(--color-text-secondary)", marginBottom: "30px" }}>
                    Uzman ekibimiz sizin için en uygun çözümü tasarlasın. WhatsApp üzerinden hemen
                    iletişime geçin.
                </p>
                <a
                    href="https://wa.me/90XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                >
                    WhatsApp ile İletişim
                </a>
            </section>
        </main>
    );
}
