"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import trDict from "@/dictionaries/tr.json";
import enDict from "@/dictionaries/en.json";
import "./page.css";

// SVG Icons as components
const GeoIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

const EmployerIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const BudgetIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"></line>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
    </svg>
);

const ZoneIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
);

const BackIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

const CloseIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

const ChevronLeftIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

const ChevronRightIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

export default function ProjeDetayPage() {
    const params = useParams();
    const id = params?.id;
    const currentLang = params?.lang || "tr";
    const dictionary = currentLang === "en" ? enDict : trDict;
    const projectLabels = dictionary.projects || {};
    const navLabels = dictionary.navbar || {};

    const [proje, setProje] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    const allImages = useMemo(() => {
        if (!proje) return [];

        const images = [
            proje.cover_image,
            ...(Array.isArray(proje.gallery) ? proje.gallery : [])
        ].filter(Boolean);

        return Array.from(new Set(images));
    }, [proje]);

    useEffect(() => {
        async function loadContent() {
            if (!id) return;
            try {
                const projectResponse = await supabase
                    .from('projects')
                    .select('*')
                    .eq('slug', id)
                    .single();

                if (projectResponse.error) throw projectResponse.error;
                if (projectResponse.data) {
                    setProje(projectResponse.data);
                    setActiveImage(projectResponse.data.cover_image);
                }
            } catch (error) {
                console.error("Yükleme hatası:", error.message);
            } finally {
                setLoading(false);
            }
        }
        loadContent();
    }, [id, currentLang]);

    useEffect(() => {
        if (!allImages.length) return;

        const currentIndex = allImages.indexOf(activeImage);
        if (currentIndex >= 0) {
            setLightboxIndex(currentIndex);
            return;
        }

        setLightboxIndex(0);
        setActiveImage(allImages[0]);
    }, [activeImage, allImages]);

    useEffect(() => {
        if (!isLightboxOpen) return;

        function onKeyDown(event) {
            if (event.key === "Escape") {
                setIsLightboxOpen(false);
            }

            if (event.key === "ArrowRight") {
                setLightboxIndex((prev) => (prev + 1) % allImages.length);
            }

            if (event.key === "ArrowLeft") {
                setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
            }
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isLightboxOpen, allImages.length]);

    function openLightbox(image) {
        if (!allImages.length) return;

        const index = allImages.indexOf(image);
        const nextIndex = index >= 0 ? index : 0;

        setLightboxIndex(nextIndex);
        setActiveImage(allImages[nextIndex]);
        setIsLightboxOpen(true);
    }

    function showPrevImage() {
        if (!allImages.length) return;
        setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }

    function showNextImage() {
        if (!allImages.length) return;
        setLightboxIndex((prev) => (prev + 1) % allImages.length);
    }

    if (loading) return (
        <main className="proje-detay-page page-padding">
            <div className="container" style={{ textAlign: "center", paddingTop: "80px" }}>
                <div className="loader"></div>
                <p style={{ marginTop: "20px", color: "rgba(255,255,255,0.5)" }}>{projectLabels.loading || "Yükleniyor..."}</p>
            </div>
        </main>
    );

    if (!proje) return (
        <main className="proje-detay-page page-padding">
            <div className="container" style={{ textAlign: "center", paddingTop: "80px" }}>
                <h2 style={{ color: "#ffffff" }}>{projectLabels.notFound || "Proje bulunamadı."}</h2>
                <Link href={`/${currentLang}/projeler`} className="btn-back" style={{ marginTop: "20px" }}>
                    <BackIcon /> {projectLabels.back || "Projelere Dön"}
                </Link>
            </div>
        </main>
    );

    return (
        <main className="proje-detay-page page-padding">
            <div className="container">

                {/* Breadcrumb Navbar */}
                <nav className="breadcrumb">
                    <Link href={`/${currentLang}`}>{navLabels.home || 'Home'}</Link>
                    <span>/</span>
                    <Link href={`/${currentLang}/projeler`}>{navLabels.projects || 'Projects'}</Link>
                    <span>/</span>
                    <span className="current">{proje.title}</span>
                </nav>

                <div className="detay-layout">

                    {/* SOL TARAF: Resimler */}
                    <div className="detay-sol">
                        <div className="main-image-wrapper">
                            <Image
                                src={activeImage || "/assets/Gemini_Generated_Image_ymfniiymfniiymfn.png"}
                                alt={proje.title}
                                fill
                                priority
                                style={{ objectFit: 'cover' }}
                            />
                            <button
                                type="button"
                                className="image-zoom-trigger"
                                onClick={() => openLightbox(activeImage || allImages[0])}
                            >
                                {projectLabels.show || "Show"}
                            </button>
                            {/* İş Bitirme Belgesi */}
                            {proje.is_bitirme && (
                                <div className="is-bitirme-tooltip">
                                    {projectLabels.certificate || 'Work Completion Certificate'}
                                </div>
                            )}
                        </div>

                        {/* Galeri Thumbnail'ları */}
                        {allImages.length > 1 && (
                            <div className="gallery-thumbnails">
                                {allImages.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className={`thumb-wrapper ${activeImage === img ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveImage(img);
                                            openLightbox(img);
                                        }}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Gallery ${idx + 1}`}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* SAĞ TARAF: İçerik / Detaylar */}
                    <div className="detay-sag">
                        <h1 className="proje-isim">{proje.title}</h1>

                        <div className="info-table">
                            {proje.geo_location && (
                                <div className="info-row">
                                    <div className="info-icon"><GeoIcon /></div>
                                    <div className="info-content">
                                        <span className="info-label">{projectLabels.location || 'Location'}</span>
                                        <span className="info-value">{proje.geo_location}</span>
                                    </div>
                                </div>
                            )}

                            {proje.start_to_finish && (
                                <div className="info-row">
                                    <div className="info-icon"><CalendarIcon /></div>
                                    <div className="info-content">
                                        <span className="info-label">{projectLabels.date || 'Date Range'}</span>
                                        <span className="info-value">{proje.start_to_finish}</span>
                                    </div>
                                </div>
                            )}

                            {proje.employer && (
                                <div className="info-row">
                                    <div className="info-icon"><EmployerIcon /></div>
                                    <div className="info-content">
                                        <span className="info-label">{projectLabels.employer || 'Employer'}</span>
                                        <span className="info-value">{proje.employer}</span>
                                    </div>
                                </div>
                            )}

                            {proje.budget && (
                                <div className="info-row">
                                    <div className="info-icon"><BudgetIcon /></div>
                                    <div className="info-content">
                                        <span className="info-label">{projectLabels.budget || 'Budget'}</span>
                                        <span className="info-value">{proje.budget}</span>
                                    </div>
                                </div>
                            )}

                            {proje.construction_zone && (
                                <div className="info-row">
                                    <div className="info-icon"><ZoneIcon /></div>
                                    <div className="info-content">
                                        <span className="info-label">{projectLabels.zone || 'Construction Zone'}</span>
                                        <span className="info-value">{proje.construction_zone}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="btn-back-container">
                            <Link href={`/${currentLang}/projeler`} className="btn-back">
                                <BackIcon /> {projectLabels.back || 'Back to Projects'}
                            </Link>
                        </div>
                    </div>
                </div>

                {isLightboxOpen && allImages.length > 0 && (
                    <div className="lightbox-overlay" onClick={() => setIsLightboxOpen(false)}>
                        <button
                            type="button"
                            className="lightbox-close"
                            onClick={() => setIsLightboxOpen(false)}
                            aria-label="Close lightbox"
                        >
                            <CloseIcon />
                        </button>

                        {allImages.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    className="lightbox-nav lightbox-prev"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        showPrevImage();
                                    }}
                                    aria-label="Previous image"
                                >
                                    <ChevronLeftIcon />
                                </button>

                                <button
                                    type="button"
                                    className="lightbox-nav lightbox-next"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        showNextImage();
                                    }}
                                    aria-label="Next image"
                                >
                                    <ChevronRightIcon />
                                </button>
                            </>
                        )}

                        <div className="lightbox-content" onClick={(event) => event.stopPropagation()}>
                            <Image
                                src={allImages[lightboxIndex]}
                                alt={`${proje.title} - ${lightboxIndex + 1}`}
                                fill
                                sizes="100vw"
                                style={{ objectFit: "contain" }}
                                priority
                            />
                        </div>

                        <div className="lightbox-counter">
                            {lightboxIndex + 1} / {allImages.length}
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}

