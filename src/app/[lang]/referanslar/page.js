"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import "./page.css";

export default function ReferanslarPage() {
    const [referanslar, setReferanslar] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchReferences() {
            try {
                const { data, error } = await supabase
                    .from('references')
                    .select('*')
                    .order('created_at', { ascending: true });

                if (error) throw error;
                if (data) setReferanslar(data);
            } catch (err) {
                console.error("Referanslar yüklenemedi:", err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchReferences();
    }, []);

    return (
        <main className="referanslar-page page-padding">
            {/* Hero */}
            <div className="page-hero">
                <div className="container">
                    <h1 className="page-title animate-slide-up">
                        Şirket <span className="glow-text">Referanslarımız</span>
                    </h1>
                    <p className="page-desc animate-slide-up delay-100">
                        Bend Yapı olarak sektörün önde gelen kurum ve firmalarıyla güçlü
                        çözüm ortaklıkları kurduk.
                    </p>
                </div>
            </div>

            {/* Referans Şirketleri Logoları */}
            <section className="sirket-liste container animate-slide-up delay-200">
                <div className="sirket-grid">
                    {loading ? (
                        <p style={{ textAlign: "center", gridColumn: "1/-1", padding: "40px", color: "#ccc" }}>Yükleniyor...</p>
                    ) : referanslar.length === 0 ? (
                        <p style={{ textAlign: "center", gridColumn: "1/-1", padding: "40px", color: "#ccc" }}>Henüz referans eklenmedi.</p>
                    ) : (
                        referanslar.map((ref, i) => (
                            <div key={ref.id || i} className={`sirket-card glass-panel delay-${(i % 5) * 100}`}>
                                <div className="sirket-logo-placeholder">
                                    <Image
                                        src={ref.logo_url || "/assets/Gemini_Generated_Image_ymfniiymfniiymfn.png"}
                                        alt={ref.company_name}
                                        fill
                                        style={{ objectFit: 'contain' }}
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
                    * Referans logolarımız admin paneli üzerinden tam yetkiyle güncellenebilir olacaktır.
                </p>
            </section>
        </main>
    );
}
