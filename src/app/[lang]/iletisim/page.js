import { getDictionary } from "@/utils/dictionary";
import "./page.css";

export default async function IletisimPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const content = dict.contactPage;

    return (
        <main className="iletisim-page page-padding">
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

            <section className="iletisim-kapsam container">
                <div className="iletisim-grid">

                    {/* Head Office */}
                    <div className="iletisim-bilgiler glass-panel animate-slide-up delay-100">
                        <h2 className="bilgi-baslik">{content.headOffice}</h2>

                        <div className="bilgi-satir">
                            <span className="bilgi-icon">📍</span>
                            <div>
                                <p className="bilgi-etiket">{content.addressLabel}</p>
                                <p className="bilgi-deger">
                                    {content.addressHead}
                                </p>
                            </div>
                        </div>

                        <div className="bilgi-satir">
                            <span className="bilgi-icon">📞</span>
                            <div>
                                <p className="bilgi-etiket">{content.phoneLabel}</p>
                                <a href="tel:+904242476200" className="bilgi-deger bilgi-link">
                                    +90 (424) 247 62 00
                                </a>
                            </div>
                        </div>

                        <div className="bilgi-satir">
                            <span className="bilgi-icon">📠</span>
                            <div>
                                <p className="bilgi-etiket">{content.faxLabel}</p>
                                <p className="bilgi-deger">+90 (424) 247 63 00</p>
                            </div>
                        </div>

                        <div className="bilgi-satir">
                            <span className="bilgi-icon">✉️</span>
                            <div>
                                <p className="bilgi-etiket">{content.emailLabel}</p>
                                <a href="mailto:info@bendyapi.com.tr" className="bilgi-deger bilgi-link">
                                    info@bendyapi.com.tr
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Iraq Branch */}
                    <div className="iletisim-bilgiler glass-panel animate-slide-up delay-200">
                        <h2 className="bilgi-baslik">{content.iraqOffice}</h2>

                        <div className="bilgi-satir">
                            <span className="bilgi-icon">📍</span>
                            <div>
                                <p className="bilgi-etiket">{content.addressLabel}</p>
                                <p className="bilgi-deger">
                                    {content.addressIraq}
                                </p>
                            </div>
                        </div>

                        <div className="bilgi-satir">
                            <span className="bilgi-icon">📞</span>
                            <div>
                                <p className="bilgi-etiket">{content.phoneLabel}</p>
                                <a href="tel:009647504207877" className="bilgi-deger bilgi-link">
                                    (00 964) 750 420 78 77
                                </a>
                            </div>
                        </div>

                        <div className="bilgi-satir">
                            <span className="bilgi-icon">📠</span>
                            <div>
                                <p className="bilgi-etiket">{content.faxLabel}</p>
                                <p className="bilgi-deger">(00 964) 770 392 99 50</p>
                            </div>
                        </div>

                        <div className="bilgi-satir">
                            <span className="bilgi-icon">✉️</span>
                            <div>
                                <p className="bilgi-etiket">{content.emailLabel}</p>
                                <a href="mailto:info@bendyapi.com.tr" className="bilgi-deger bilgi-link">
                                    info@bendyapi.com.tr
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Harita ve Teklif Container */}
                <div className="map-and-offer-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '30px',
                    marginTop: '30px'
                }}>
                    <div className="merkez-kart glass-panel animate-slide-up delay-300">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{content.mapTitle}</h3>
                            <a
                                href="https://wa.me/905324545648?text=Merhaba, proje teklifi almak istiyorum."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                {content.waBtn}
                            </a>
                        </div>

                        <div className="map-container" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                            <iframe
                                src="https://www.google.com/maps?q=Atasehir+Mah.+Serdarlar+Sok.+No:+27/A+Elazig/Turkey&output=embed"
                                width="100%"
                                height="400"
                                style={{ border: 0, display: "block" }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>

            </section>
        </main>
    );
}

