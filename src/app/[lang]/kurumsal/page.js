import Link from "next/link";
import "./page.css";

export default function KurumsalPage() {
    return (
        <main className="kurumsal-page page-padding section">
            {/* Sayfa Üst Başlık (Hero) */}
            <div className="page-hero">
                <div className="container">
                    <h1 className="page-title animate-slide-up">Kurumsal <span className="glow-text">BEND YAPI</span></h1>
                    <p className="page-desc animate-slide-up delay-100">
                        2005 yılından bu yana vizyoner projelerle Türkiye ve dünyanın dört bir yanında geleceği inşa ediyoruz.
                    </p>
                </div>
            </div>

            {/* Hakkımızda Metin Bölümü */}
            <section className="about-section container">
                <div className="glass-panel content-box animate-slide-up delay-200">
                    <h2 className="content-title">Biz Kimiz?</h2>
                    <p className="content-text">
                        Bend Yapı İnşaat, modern mimarinin sunduğu yenilikleri, sağlam mühendislik ilkeleriyle harmanlayarak kusursuz yapılar inşa etmeyi vizyon edinmiştir. Çeyrek asrı aşan deneyimimizle su yapıları, enerji santralleri, yüksek katlı konutlar, AVM'ler ve geniş ölçekli kamu taahhütleri alanlarında sektörün öncü firmalarından biri olmanın gururunu yaşıyoruz.
                    </p>
                    <p className="content-text">
                        Özellikle Baraj, HES (Hidroelektrik Santrali) ve karmaşık endüstriyel tesislerin yapımındaki bilgi birikimimiz, ülkemizin ve uluslararası arenanın zor projelerini zamanında ve eksiksiz olarak tamamlamamızı sağlamıştır.
                    </p>

                    <h3 className="content-subtitle">Misyonumuz</h3>
                    <p className="content-text">
                        Doğaya saygılı, yüksek teknoloji ile donatılmış, insan yaşam kalitesini eksenine alan güvenli yapılar inşa etmek; işverenlerin beklentilerini etik değerlere bağlı kalarak en üst seviyede karşılamak.
                    </p>

                    <h3 className="content-subtitle">Vizyonumuz</h3>
                    <p className="content-text">
                        Küresel inşaat sektöründe söz sahibi, ülkemizi yurtdışında gururla temsil eden, daima yeniliklere açık bir marka olmak.
                    </p>
                </div>
            </section>

            {/* Neden Biz (Small Stats/Pointers) */}
            <section className="why-us bg-surface section">
                <div className="container">
                    <div className="section-header text-center">
                        <h2 className="section-title">Neden <span>Bend Yapı?</span></h2>
                    </div>

                    <div className="why-grid">
                        <div className="why-card glass-panel animate-slide-up">
                            <div className="why-icon">🏗️</div>
                            <h3>Teknik Uzmanlık</h3>
                            <p>Global tecrübeye sahip mühendis kadromuzla, en zorlu zemin şartlarında dahi başarılı projelere imza atıyoruz.</p>
                        </div>
                        <div className="why-card glass-panel animate-slide-up delay-100">
                            <div className="why-icon">🌍</div>
                            <h3>Uluslararası Standartlar</h3>
                            <p>FIDIC (Müşavir Mühendisler Uluslararası Federasyonu) sözleşme normlarına hâkim olarak süreç yönetimi sağlıyoruz.</p>
                        </div>
                        <div className="why-card glass-panel animate-slide-up delay-200">
                            <div className="why-icon">🤝</div>
                            <h3>Sürdürülebilir Güven</h3>
                            <p>Teslim ettiğimiz tüm projelerde dürüstlük, şeffaflık ve kalite vazgeçilmez kalite manifestosudur.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sertifikalar / CTA */}
            <section className="cta-section container text-center animate-slide-up delay-200">
                <h2 className="glow-text" style={{ fontSize: '2rem', marginBottom: '16px' }}>Geleceği Birlikte İnşa Edelim</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '30px' }}>Projeleriniz veya ortaklık konularında profesyonel çözümler için bizimle iletişime geçin.</p>
                <div className="cta-actions">
                    <Link href="/iletisim" className="btn-primary">İletişime Geçin</Link>
                    <Link href="/projeler" className="btn-secondary" style={{ marginLeft: '16px' }}>Projelerimizi Görün</Link>
                </div>
            </section>
        </main>
    );
}
