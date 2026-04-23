"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import "./page.css";

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (data && data.length > 0) {
          setFeaturedProjects(data);
        }
      } catch (err) {
        console.error("Öne çıkan projeler yüklenirken hata:", err);
      }
    }
    fetchFeatured();
  }, []);
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content animate-fade-in">
          <h1 className="hero-title">Kalite ve Güvenden <span className="glow-text">Taviz Vermeyiz</span></h1>
          <p className="hero-subtitle">
            2005 yılından beri dünya standartlarında yeni yaşam merkezleri kuruyoruz.
            Su yapıları, yüksek katlı konutlar, AVM'ler ve kamu taahhütlerinde uzmanız.
          </p>
          <div className="hero-actions delay-200">
            <Link href="/projeler" className="btn-primary">Projeleri İncele</Link>
            <Link href="/kurumsal" className="btn-secondary">Hakkımızda</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats bg-surface">
        <div className="container">
          <div className="stats-grid animate-slide-up delay-200">
            <div className="stat-card glass-panel" style={{ padding: '30px', borderRadius: '16px' }}>
              <h2 className="stat-number glow-text">20+</h2>
              <p className="stat-label">Yıllık Deneyim</p>
            </div>
            <div className="stat-card glass-panel" style={{ padding: '30px', borderRadius: '16px' }}>
              <h2 className="stat-number glow-text">50+</h2>
              <p className="stat-label">Tamamlanan Proje</p>
            </div>
            <div className="stat-card glass-panel" style={{ padding: '30px', borderRadius: '16px' }}>
              <h2 className="stat-number glow-text">5+</h2>
              <p className="stat-label">Farklı Ülke</p>
            </div>
            <div className="stat-card glass-panel" style={{ padding: '30px', borderRadius: '16px' }}>
              <h2 className="stat-number glow-text">%100</h2>
              <p className="stat-label">Müşteri Memnuniyeti</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services section">
        <div className="container">
          <div className="section-header text-center animate-slide-up">
            <h2 className="section-title">Uzmanlık <span>Alanlarımız</span></h2>
            <p className="section-desc">Deneyimli mühendislik kadromuzla geniş bir yelpazede hizmet sunuyoruz.</p>
          </div>

          <div className="services-grid animate-slide-up delay-100">
            <div className="service-card glass-panel">
              <div className="service-icon animate-float">⚡</div>
              <h3>Enerji Santralleri</h3>
              <p>Karmaşık santral yapılarını tecrübeli teknik personelimizle inşa ediyoruz.</p>
              <Link href="/hizmetler" className="service-link">Detaylı Bilgi &rarr;</Link>
            </div>

            <div className="service-card glass-panel delay-100">
              <div className="service-icon animate-float" style={{ animationDelay: '0.5s' }}>🏢</div>
              <h3>Konut ve AVM</h3>
              <p>Yüksek katlı yapılarda kalite normlarına uygun, modern yaşam merkezleri.</p>
              <Link href="/hizmetler" className="service-link">Detaylı Bilgi &rarr;</Link>
            </div>

            <div className="service-card glass-panel delay-200">
              <div className="service-icon animate-float" style={{ animationDelay: '1s' }}>🌊</div>
              <h3>Baraj ve HES</h3>
              <p>Yüksek beceri gerektiren su yapılarında eşsiz bir deneyime sahibiz.</p>
              <Link href="/hizmetler" className="service-link">Detaylı Bilgi &rarr;</Link>
            </div>

            <div className="service-card glass-panel delay-300">
              <div className="service-icon animate-float" style={{ animationDelay: '1.5s' }}>🏥</div>
              <h3>Kamu Taahhütleri</h3>
              <p>Hastane, okul ve rehabilitasyon merkezleri FIDIC şartlarına uygun yapılır.</p>
              <Link href="/hizmetler" className="service-link">Detaylı Bilgi &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="featured-projects section bg-surface">
        <div className="container">
          <div className="section-header text-center animate-slide-up">
            <h2 className="section-title">Öne Çıkan <span>Projeler</span></h2>
            <p className="section-desc">Gerçeğe dönüştürdüğümüz vizyoner projelerimizden bazıları.</p>
          </div>

          <div className="projects-grid animate-slide-up delay-100">
            {featuredProjects.length > 0 ? (
              featuredProjects.map((proje, i) => (
                <div key={proje.id} className={`project-card glass-panel delay-${i * 100}`}>
                  <div className="project-image" style={{ backgroundImage: `url(${proje.cover_image || 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=600'})` }}>
                    <span className="project-category">{proje.category}</span>
                  </div>
                  <div className="project-content">
                    <h3>{proje.title}</h3>
                    <p className="project-meta">{proje.geo_location} | {proje.start_to_finish && proje.start_to_finish.slice(0, 4)}</p>
                    <p className="project-desc">{proje.construction_zone && proje.construction_zone.slice(0, 70)}...</p>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", gridColumn: "1/-1", padding: "40px", color: "#999" }}>
                Projeler sisteme girildiğinde burada listelenecektir.
              </div>
            )}
          </div>

          <div className="text-center" style={{ marginTop: '50px' }}>
            <Link href="/projeler" className="btn-primary">Tüm Projeleri Gör</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
