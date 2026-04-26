import { getDictionary } from "@/utils/dictionary";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import "./page.css";

export default async function Home({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  let featuredProjects = [];

  try {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (data && data.length > 0) {
      featuredProjects = data;
    }
  } catch (err) {
    console.error("Öne çıkan projeler yüklenirken hata:", err);
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content animate-fade-in">
          <h1 className="hero-title">
            {dict.hero.title1} <span className="glow-text">{dict.hero.title2}</span>
          </h1>
          <p className="hero-subtitle">
            {dict.hero.desc}
          </p>
          <div className="hero-actions delay-200">
            <Link href={`/${lang}/projeler`} className="btn-primary hero-cta-primary">{dict.hero.btn1}</Link>
            <Link href={`/${lang}/kurumsal`} className="btn-secondary">{dict.hero.btn2}</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats bg-surface">
        <div className="container">
          <div className="stats-grid animate-slide-up delay-200">
            <div className="stat-card glass-panel" style={{ padding: '30px', borderRadius: '16px' }}>
              <h2 className="stat-number glow-text">20+</h2>
              <p className="stat-label">{dict.stats.exp}</p>
            </div>
            <div className="stat-card glass-panel" style={{ padding: '30px', borderRadius: '16px' }}>
              <h2 className="stat-number glow-text">50+</h2>
              <p className="stat-label">{dict.stats.projects}</p>
            </div>
            <div className="stat-card glass-panel" style={{ padding: '30px', borderRadius: '16px' }}>
              <h2 className="stat-number glow-text">5+</h2>
              <p className="stat-label">{dict.stats.countries}</p>
            </div>
            <div className="stat-card glass-panel" style={{ padding: '30px', borderRadius: '16px' }}>
              <h2 className="stat-number glow-text">%100</h2>
              <p className="stat-label">{dict.stats.satisfaction}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services section">
        <div className="container">
          <div className="section-header text-center animate-slide-up">
            <h2 className="section-title">{dict.homePage.servicesTitle} <span>{dict.homePage.servicesTitleSpan}</span></h2>
            <p className="section-desc">{dict.homePage.servicesDesc}</p>
          </div>

          <div className="services-grid animate-slide-up delay-100">
            <div className="service-card glass-panel">
              <div className="service-icon animate-float">⚡</div>
              <h3>{dict.homePage.service1Title}</h3>
              <p>{dict.homePage.service1Desc}</p>
              <Link href={`/${lang}/hizmetler`} className="service-link">{dict.homePage.serviceMore} &rarr;</Link>
            </div>

            <div className="service-card glass-panel delay-100">
              <div className="service-icon animate-float" style={{ animationDelay: '0.5s' }}>🏢</div>
              <h3>{dict.homePage.service2Title}</h3>
              <p>{dict.homePage.service2Desc}</p>
              <Link href={`/${lang}/hizmetler`} className="service-link">{dict.homePage.serviceMore} &rarr;</Link>
            </div>

            <div className="service-card glass-panel delay-200">
              <div className="service-icon animate-float" style={{ animationDelay: '1s' }}>🌊</div>
              <h3>{dict.homePage.service3Title}</h3>
              <p>{dict.homePage.service3Desc}</p>
              <Link href={`/${lang}/hizmetler`} className="service-link">{dict.homePage.serviceMore} &rarr;</Link>
            </div>

            <div className="service-card glass-panel delay-300">
              <div className="service-icon animate-float" style={{ animationDelay: '1.5s' }}>🏥</div>
              <h3>{dict.homePage.service4Title}</h3>
              <p>{dict.homePage.service4Desc}</p>
              <Link href={`/${lang}/hizmetler`} className="service-link">{dict.homePage.serviceMore} &rarr;</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="featured-projects section bg-surface">
        <div className="container">
          <div className="section-header text-center animate-slide-up">
            <h2 className="section-title">{dict.homePage.featuredTitle} <span>{dict.homePage.featuredTitleSpan}</span></h2>
            <p className="section-desc">{dict.homePage.featuredDesc}</p>
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
                {dict.projects.loading}
              </div>
            )}
          </div>

          <div className="text-center" style={{ marginTop: '50px' }}>
            <Link href={`/${lang}/projeler`} className="btn-primary">{dict.homePage.allProjectsBtn}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

