"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import "./page.css";

export default function ProjelerPage() {
    const [filtre, setFiltre] = useState("all");
    const [projeler, setProjeler] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProjeler() {
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                if (data) setProjeler(data);
            } catch (error) {
                console.error('Projeler yüklenirken hata:', error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProjeler();
    }, []);

    const filtrelenmisProjeler = projeler.filter(p => filtre === "all" || p.category === filtre);

    return (
        <main className="projeler-page page-padding">
            <div className="container">

                {/* Sayfa Başlığı */}
                <h1 className="page-title animate-slide-up" style={{ textAlign: "center", marginBottom: "40px" }}>
                    Tüm <span className="glow-text">Projelerimiz</span>
                </h1>

                {/* Filtreleme Butonları */}
                <div className="filter-tabs animate-slide-up delay-100">
                    <button
                        className={`filter-btn ${filtre === "all" ? "active" : ""}`}
                        onClick={() => setFiltre("all")}
                    >
                        All Projects
                    </button>
                    <button
                        className={`filter-btn filter-completed ${filtre === "completed" ? "active" : ""}`}
                        onClick={() => setFiltre("completed")}
                    >
                        Completed Projects
                    </button>
                    <button
                        className={`filter-btn filter-ongoing ${filtre === "ongoing" ? "active" : ""}`}
                        onClick={() => setFiltre("ongoing")}
                    >
                        Ongoing Projects
                    </button>
                </div>

                {/* Proje Grid */}
                <div className="projekt-grid animate-slide-up delay-200">
                    {loading ? (
                        <p style={{ textAlign: "center", gridColumn: "1/-1", padding: "40px", color: "#ccc" }}>Yükleniyor...</p>
                    ) : filtrelenmisProjeler.length === 0 ? (
                        <p style={{ textAlign: "center", gridColumn: "1/-1", padding: "40px", color: "#ccc" }}>Henüz proje eklenmedi.</p>
                    ) : (
                        filtrelenmisProjeler.map((proje) => (
                            <div key={proje.id} className="projekt-card">
                                {/* Proje Resmi */}
                                <div className="projekt-image-wrapper">
                                    <Image
                                        src={proje.cover_image || "/assets/Gemini_Generated_Image_ymfniiymfniiymfn.png"}
                                        alt={proje.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>

                                {/* İş Bitirme Kurdelesi */}
                                {proje.is_bitirme && (
                                    <div className="is-bitirme-ribbon">
                                        İŞ BİTİRME BELGESİ
                                    </div>
                                )}

                                {/* Alt Bilgi Şeridi */}
                                <div className="projekt-footer">
                                    <h3 className="projekt-title">{proje.title}</h3>
                                    <Link href={`/projeler/${proje.slug}`} className="projekt-show-btn">
                                        Show
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </main>
    );
}
