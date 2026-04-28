import { getDictionary } from "@/utils/dictionary";
import { getContactOffices } from "@/lib/siteContent";
import "./page.css";

export default async function IletisimPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const content = dict.contactPage;
    const offices = await getContactOffices();

    const officeCards = offices.length > 0 ? offices : [
        {
            office_key: "head_office",
            title: content.headOffice,
            address: content.addressHead,
            phone: "+90 (424) 247 62 00",
            fax: "+90 (424) 247 63 00",
            email: "info@bendyapi.com.tr",
            map_url: "https://www.google.com/maps?q=Atasehir+Mah.+Serdarlar+Sok.+No:+27/A+Elazig/Turkey&output=embed",
            whatsapp_url: "https://wa.me/905324545648?text=Merhaba, proje teklifi almak istiyorum.",
        },
        {
            office_key: "iraq_branch",
            title: content.iraqOffice,
            address: content.addressIraq,
            phone: "(00 964) 750 420 78 77",
            fax: "(00 964) 770 392 99 50",
            email: "info@bendyapi.com.tr",
            map_url: "",
            whatsapp_url: "",
        },
    ];

    const primaryOffice = officeCards[0];

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
                    {officeCards.map((office, index) => (
                        <div key={office.office_key || index} className={`iletisim-bilgiler glass-panel animate-slide-up delay-${(index + 1) * 100}`}>
                            <h2 className="bilgi-baslik">{office.title}</h2>

                            <div className="bilgi-satir">
                                <span className="bilgi-icon">📍</span>
                                <div>
                                    <p className="bilgi-etiket">{content.addressLabel}</p>
                                    <p className="bilgi-deger">{office.address}</p>
                                </div>
                            </div>

                            <div className="bilgi-satir">
                                <span className="bilgi-icon">📞</span>
                                <div>
                                    <p className="bilgi-etiket">{content.phoneLabel}</p>
                                    <a href={`tel:${String(office.phone || "").replace(/[^+0-9]/g, "")}`} className="bilgi-deger bilgi-link">
                                        {office.phone}
                                    </a>
                                </div>
                            </div>

                            <div className="bilgi-satir">
                                <span className="bilgi-icon">📠</span>
                                <div>
                                    <p className="bilgi-etiket">{content.faxLabel}</p>
                                    <p className="bilgi-deger">{office.fax}</p>
                                </div>
                            </div>

                            <div className="bilgi-satir">
                                <span className="bilgi-icon">✉️</span>
                                <div>
                                    <p className="bilgi-etiket">{content.emailLabel}</p>
                                    <a href={`mailto:${office.email}`} className="bilgi-deger bilgi-link">
                                        {office.email}
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}

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
                                href={primaryOffice.whatsapp_url || "https://wa.me/905324545648?text=Merhaba, proje teklifi almak istiyorum."}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary"
                            >
                                {content.waBtn}
                            </a>
                        </div>

                        <div className="map-container" style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid var(--color-border)" }}>
                                <iframe
                                    src={primaryOffice.map_url || "https://www.google.com/maps?q=Atasehir+Mah.+Serdarlar+Sok.+No:+27/A+Elazig/Turkey&output=embed"}
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

