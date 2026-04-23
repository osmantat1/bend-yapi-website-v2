import "./page.css";

export default function IletisimPage() {
    return (
        <main className="iletisim-page page-padding">
            <div className="page-hero">
                <div className="container">
                    <h1 className="page-title animate-slide-up">
                        İletişim & <span className="glow-text">Ulaşım</span>
                    </h1>
                    <p className="page-desc animate-slide-up delay-100">
                        Projeleriniz için bize ulaşın. Merkez ofisimiz ve Irak şubemiz ile
                        hizmetinizdeyiz.
                    </p>
                </div>
            </div>

            <section className="iletisim-kapsam container">
                <div className="iletisim-grid">

                    {/* Head Office */}
                    <div className="iletisim-bilgiler glass-panel animate-slide-up delay-100">
                        <h2 className="bilgi-baslik">Head Office (Merkez)</h2>

                        <div className="bilgi-satir">
                            <span className="bilgi-icon">📍</span>
                            <div>
                                <p className="bilgi-etiket">Address</p>
                                <p className="bilgi-deger">
                                    Atasehir Mah. Serdarlar Sok. No: 27/A <br />
                                    Elazig / Turkey
                                </p>
                            </div>
                        </div>

                        <div className="bilgi-satir">
                            <span className="bilgi-icon">📞</span>
                            <div>
                                <p className="bilgi-etiket">Phone</p>
                                <a href="tel:+904242476200" className="bilgi-deger bilgi-link">
                                    +90 (424) 247 62 00
                                </a>
                            </div>
                        </div>

                        <div className="bilgi-satir">
                            <span className="bilgi-icon">📠</span>
                            <div>
                                <p className="bilgi-etiket">Fax</p>
                                <p className="bilgi-deger">+90 (424) 247 63 00</p>
                            </div>
                        </div>

                        <div className="bilgi-satir">
                            <span className="bilgi-icon">✉️</span>
                            <div>
                                <p className="bilgi-etiket">Email</p>
                                <a href="mailto:info@bendyapi.com.tr" className="bilgi-deger bilgi-link">
                                    info@bendyapi.com.tr
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Iraq Branch */}
                    <div className="iletisim-bilgiler glass-panel animate-slide-up delay-200">
                        <h2 className="bilgi-baslik">Iraq Branch (Irak Şubesi)</h2>

                        <div className="bilgi-satir">
                            <span className="bilgi-icon">📍</span>
                            <div>
                                <p className="bilgi-etiket">Address</p>
                                <p className="bilgi-deger">
                                    Erbil Gate No: 120 <br />
                                    Erbil / IRAQ
                                </p>
                            </div>
                        </div>

                        <div className="bilgi-satir">
                            <span className="bilgi-icon">📞</span>
                            <div>
                                <p className="bilgi-etiket">Phone</p>
                                <a href="tel:009647504207877" className="bilgi-deger bilgi-link">
                                    (00 964) 750 420 78 77
                                </a>
                            </div>
                        </div>

                        <div className="bilgi-satir">
                            <span className="bilgi-icon">📠</span>
                            <div>
                                <p className="bilgi-etiket">Fax</p>
                                <p className="bilgi-deger">(00 964) 770 392 99 50</p>
                            </div>
                        </div>

                        <div className="bilgi-satir">
                            <span className="bilgi-icon">✉️</span>
                            <div>
                                <p className="bilgi-etiket">Email</p>
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
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Head Office Harita</h3>
                            <a
                                href="https://wa.me/904242476200?text=Merhaba, proje teklifi almak istiyorum."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                WhatsApp İletişim
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
