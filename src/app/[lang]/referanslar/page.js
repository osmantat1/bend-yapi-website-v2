import { getDictionary } from "@/utils/dictionary";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import "./page.css";

export default async function ReferanslarPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const content = dict.referencesPage;
    let referanslar = [];

    try {
        const { data, error } = await supabase
            .from('references')
            .select('*')
            .order('created_at', { ascending: true });

        if (error) throw error;
        if (data) referanslar = data;
    } catch (err) {
        console.error("Referanslar yüklenemedi:", err.message);
    }

    return (
        <main className="referanslar-page page-padding">
            {/* Hero */}
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

            {/* Referans Şirketleri Logoları */}
            <section className="sirket-liste container animate-slide-up delay-200">
                <div className="sirket-grid">
                    {referanslar.length === 0 ? (
                        <p style={{ textAlign: "center", gridColumn: "1/-1", padding: "40px", color: "#ccc" }}>
                            {content.notFound}
                        </p>
                    ) : (
                        referanslar.map((ref, i) => (
                            <div key={ref.id || i} className={`sirket-card glass-panel delay-${(i % 5) * 100}`}>
                                <div className="sirket-logo-placeholder">
                                    <Image
                                        src={ref.logo_url || "/assets/Gemini_Generated_Image_ymfniiymfniiymfn.png"}
                                        alt={ref.company_name}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        sizes="(max-width: 768px) 100vw, 20vw"
                                    />
                                </div>
                                <div className="sirket-info">
                                    <h3 className="sirket-ad">{ref.company_name}</h3>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <p className="ref-not" style={{ marginTop: '50px' }}>
                    {content.note}
                </p>
            </section>
        </main>
    );
}
