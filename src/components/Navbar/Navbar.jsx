"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "./Navbar.css";

export default function Navbar({ dict = {}, currentLang = "tr" }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (pathname && pathname.startsWith("/admin")) return null;

    return (
        <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
            <div className="container navbar-container">
                {/* Logo */}
                <Link href={`/${currentLang}`} className="logo-container">
                    <div className="logo-placeholder">
                        <Image
                            src="/assets/logo/bend-yapı-logo.png"
                            alt="Bend Yapı Logo"
                            width={500}
                            height={170}
                            style={{ objectFit: 'contain', width: '100%', height: 'auto', maxWidth: '320px' }}
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Menu */}
                <nav className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
                    <Link href={`/${currentLang}`} className="nav-link" onClick={() => setMobileMenuOpen(false)}>{dict?.home || "Ana Sayfa"}</Link>
                    <Link href={`/${currentLang}/kurumsal`} className="nav-link" onClick={() => setMobileMenuOpen(false)}>{dict?.about || "Kurumsal"}</Link>
                    <Link href={`/${currentLang}/hizmetler`} className="nav-link" onClick={() => setMobileMenuOpen(false)}>{dict?.services || "Hizmetler"}</Link>
                    <Link href={`/${currentLang}/projeler`} className="nav-link" onClick={() => setMobileMenuOpen(false)}>{dict?.projects || "Projeler"}</Link>
                    <Link href={`/${currentLang}/referanslar`} className="nav-link" onClick={() => setMobileMenuOpen(false)}>{dict?.references || "Referanslar"}</Link>
                    <Link href={`/${currentLang}/haberler`} className="nav-link" onClick={() => setMobileMenuOpen(false)}>{dict?.news || "Haberler"}</Link>
                    <Link href={`/${currentLang}/iletisim`} className="nav-link" onClick={() => setMobileMenuOpen(false)}>{dict?.contact || "İletişim"}</Link>

                    {/* Lang */}
                    <div className="lang-switcher">
                        <Link href={pathname ? pathname.replace(`/${currentLang}`, '/tr') : '/tr'} className={currentLang === 'tr' ? "active" : ""} style={{ textDecoration: "none", color: "inherit" }}>TR</Link>
                        <span style={{ margin: "0 5px", color: "rgba(255, 255, 255, 0.4)" }}>|</span>
                        <Link href={pathname ? pathname.replace(`/${currentLang}`, '/en') : '/en'} className={currentLang === 'en' ? "active" : ""} style={{ textDecoration: "none", color: "inherit" }}>EN</Link>
                    </div>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className={`mobile-toggle ${mobileMenuOpen ? "open" : ""}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </header>
    );
}
