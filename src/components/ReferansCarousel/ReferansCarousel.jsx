"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { usePathname } from "next/navigation";
import "./ReferansCarousel.css";

export default function ReferansCarousel() {
    const [referansLogolari, setReferansLogolari] = useState([]);
    const pathname = usePathname();

    useEffect(() => {
        async function fetchReferences() {
            try {
                const { data } = await supabase.from('references').select('*').order('created_at', { ascending: true });
                if (data && data.length > 0) {
                    setReferansLogolari(data);
                }
            } catch (err) {
                console.error("Carousel referansları yüklenemedi", err);
            }
        }
        fetchReferences();
    }, []);

    // Eğer veri yoksa veya Admin panelindeysek karuseli gizle
    if (referansLogolari.length === 0) return null;
    if (pathname && pathname.startsWith("/admin")) return null;

    return (
        <section className="referans-carousel-wrapper">
            <div className="container" style={{ textAlign: "center", marginBottom: "20px" }}>
                <h3 className="carousel-title">Çözüm Ortaklarımız & <span className="glow-text">Referanslarımız</span></h3>
            </div>
            <div className="carousel-container">
                <div className="carousel-track">
                    {/* İlk set */}
                    {referansLogolari.map((ref, i) => (
                        <div className="carousel-slide" key={`first-${i}`}>
                            <div className="logo-card">
                                <Image
                                    src={ref.logo_url || "/assets/Gemini_Generated_Image_ymfniiymfniiymfn.png"}
                                    alt={ref.company_name}
                                    width={120}
                                    height={80}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    ))}
                    {/* Kesintisiz döngü için ikinci kopya */}
                    {referansLogolari.map((ref, i) => (
                        <div className="carousel-slide" key={`second-${i}`}>
                            <div className="logo-card">
                                <Image
                                    src={ref.logo_url || "/assets/Gemini_Generated_Image_ymfniiymfniiymfn.png"}
                                    alt={ref.company_name}
                                    width={120}
                                    height={80}
                                    style={{ objectFit: 'contain' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
