"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import "./page.css";

export default function ProjeDetayPage() {
    const params = useParams();
    const id = params?.id;

    const [proje, setProje] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProject() {
            if (!id) return;
            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('slug', id)
                    .single();

                if (error) throw error;
                if (data) setProje(data);
            } catch (error) {
                console.error("Proje yüklenemedi:", error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProject();
    }, [id]);

    if (loading) return <main className="proje-detay-page page-padding"><div className="container" style={{ textAlign: "center", paddingTop: "80px" }}>Yükleniyor...</div></main>;

    if (!proje) return <main className="proje-detay-page page-padding"><div className="container" style={{ textAlign: "center", paddingTop: "80px" }}>Proje bulunamadı.</div></main>;

    return (
        <main className="proje-detay-page page-padding">
            <div className="container">

                {/* Breadcrumb Navbar */}
                <nav className="breadcrumb">
                    <Link href="/">Home</Link> /
                    <Link href="/projeler">Projects</Link> /
                    <span style={{ color: "#00aced", textTransform: 'capitalize' }}>{proje.category}</span> /
                    <span className="current">{proje.title}</span>
                </nav>

                <div className="detay-layout">

                    {/* SOL TARAF: Resimler */}
                    <div className="detay-sol">
                        <div className="main-image-wrapper">
                            <Image
                                src={proje.cover_image || "/assets/Gemini_Generated_Image_ymfniiymfniiymfn.png"}
                                alt={proje.title}
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                            {/* İş Bitirme Tooltip */}
                            {proje.is_bitirme && (
                                <div className="is-bitirme-tooltip">
                                    İş bitirme belgesini<br />görmek için tıklayınız
                                </div>
                            )}
                        </div>

                        {/* Galeri Thumbnail'ları */}
                        <div className="gallery-thumbnails">
                            {proje.gallery && proje.gallery.map((img, idx) => (
                                <div key={idx} className="thumb-wrapper">
                                    <Image
                                        src={img}
                                        alt={`Gallery ${idx + 1}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SAĞ TARAF: İçerik / Tablo */}
                    <div className="detay-sag">
                        <h1 className="proje-isim">{proje.title}</h1>

                        <div className="info-table">
                            <div className="info-row">
                                <div className="info-label">Geo Location</div>
                                <div className="info-value">: {proje.geo_location}</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Start-to-Finish Date</div>
                                <div className="info-value">: {proje.start_to_finish}</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Employer</div>
                                <div className="info-value">: {proje.employer}</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Budget</div>
                                <div className="info-value">: {proje.budget}</div>
                            </div>
                            <div className="info-row">
                                <div className="info-label">Construction Zone</div>
                                <div className="info-value">: {proje.construction_zone}</div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Geri Butonu */}
                <div style={{ marginTop: '20px' }}>
                    <Link href="/projeler" className="btn-back">
                        Back to Projects
                    </Link>
                </div>

            </div>
        </main>
    );
}
