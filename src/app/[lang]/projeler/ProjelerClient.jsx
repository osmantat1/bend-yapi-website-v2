"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "./page.css";

const ShowArrowIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
);

const ChipCompletedIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);

const ChipOngoingIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9"></circle>
        <polyline points="12 7 12 12 16 14"></polyline>
    </svg>
);

export default function ProjelerClient({ initialProjeler, dict, lang }) {
    const [filtre, setFiltre] = useState("all");

    const filtrelenmisProjeler = initialProjeler.filter(p => filtre === "all" || p.category === filtre);

    return (
        <div className="container">
            {/* Sayfa Başlığı */}
            <h1 className="page-title animate-slide-up" style={{ textAlign: "center", marginBottom: "40px" }}>
                {dict.title} <span className="glow-text">{dict.titleSpan}</span>
            </h1>

            {/* Filtreleme Butonları */}
            <div className="filter-tabs animate-slide-up delay-100">
                <button
                    className={`filter-btn ${filtre === "all" ? "active" : ""}`}
                    onClick={() => setFiltre("all")}
                >
                    {dict.all}
                </button>
                <button
                    className={`filter-btn filter-completed ${filtre === "completed" ? "active" : ""}`}
                    onClick={() => setFiltre("completed")}
                >
                    {dict.completed}
                </button>
                <button
                    className={`filter-btn filter-ongoing ${filtre === "ongoing" ? "active" : ""}`}
                    onClick={() => setFiltre("ongoing")}
                >
                    {dict.ongoing}
                </button>
            </div>

            {/* Proje Grid */}
            <div className="projekt-grid animate-slide-up delay-200">
                {filtrelenmisProjeler.length === 0 ? (
                    <p style={{ textAlign: "center", gridColumn: "1/-1", padding: "40px", color: "#ccc" }}>
                        {dict.notFound}
                    </p>
                ) : (
                    filtrelenmisProjeler.map((proje) => (
                        <article key={proje.id} className="projekt-card glass-panel">
                            <div className="projekt-image-wrapper">
                                <Image
                                    src={proje.cover_image || "/assets/Gemini_Generated_Image_ymfniiymfniiymfn.png"}
                                    alt={proje.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />

                                {proje.is_bitirme && (
                                    <div className="is-bitirme-ribbon">
                                        {dict.certificate}
                                    </div>
                                )}
                            </div>

                            <div className="projekt-info-panel">
                                <h3 className="projekt-title">{proje.title}</h3>

                                <div className="projekt-footer">
                                    <span className={`projekt-chip ${proje.category === "completed" ? "chip-completed" : "chip-ongoing"}`}>
                                        <span className="chip-icon">
                                            {proje.category === "completed" ? <ChipCompletedIcon /> : <ChipOngoingIcon />}
                                        </span>
                                        {proje.category === "completed" ? dict.completed : dict.ongoing}
                                    </span>
                                    <Link href={`/${lang}/projeler/${proje.slug}`} className="projekt-show-btn">
                                        <span>{dict.show}</span>
                                        <span className="show-btn-icon"><ShowArrowIcon /></span>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </div>
    );
}
