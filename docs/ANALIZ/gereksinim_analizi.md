# 📄 Gereksinim Analizi — PRD
> **Proje:** Bend Yapı — Kurumsal Web Sitesi  
> **Versiyon:** 1.0  
> **Tarih:** 21 Nisan 2026  
> **Kaynak:** `docs/ANALIZ/analiz_master.md`  
> **Durum:** ✅ ONAY BEKLENİYOR — Frontend geliştirmeye hazır

---

## 1. 🎯 Proje Özeti

**Bend Yapı**, Türkiye merkezli bir inşaat ve taahhüt firmasıdır. Mevcut web sitesi (2016 yapım, `bendyapi.com.tr`) eskimiş durumda. Hedef: **3 gün içinde** modern, dark-mode, animasyonlu, çift dilli (TR/EN) ve admin panelli yeni bir kurumsal web sitesi geliştirmek.

---

## 2. 👥 Hedef Kitle

| Segment | Beklenti |
|---------|----------|
| İnşaat yaptırmak isteyen müşteriler | Firma güvenilirliği, referanslar, iletişim |
| Daha önceki işleri araştıran müşteriler | Proje galerisi, kategoriler, detaylar |
| Potansiyel iş ortakları | Kurumsal bilgi, belgeler, hizmet kapsamı |

---

## 3. 🗂️ Site Haritası

```
bendyapi.com.tr/
├── / (Ana Sayfa)
├── /kurumsal (Hakkımızda)
├── /projeler (Tüm Projeler)
│   ├── ?durum=biten
│   └── ?durum=devam-eden
├── /hizmetler
├── /referanslar
├── /haberler
├── /iletisim
├── /is-bitirme-belgeleri
├── /belgeler (İndirme Merkezi)
└── /admin (CMS Paneli — korumalı)
    ├── /admin/projeler
    └── /admin/referanslar
```

---

## 4. 📐 Tasarım Sistemi

### 4.1 Renk Paleti
| Token | Değer | Kullanım |
|-------|-------|---------|
| `--color-bg` | `#0A0A0A` | Ana arka plan (derin siyah) |
| `--color-surface` | `#141414` | Kart/panel arka planı |
| `--color-border` | `#1E1E1E` | Çizgiler, ayırıcılar |
| `--color-accent` | `#D4A017` | Sarı vurgu (CTA, hover, icon) |
| `--color-accent-light` | `#F0C040` | Hover state, parlak sarı |
| `--color-text-primary` | `#FFFFFF` | Ana metin |
| `--color-text-secondary` | `#A0A0A0` | Yardımcı metin, alt yazı |

### 4.2 Tipografi
- **Font:** `Inter` (Google Fonts) — başlıklar için `weight: 700-900`, gövde için `400-500`
- **Başlık:** Büyük, bold, uppercase seçenekli
- **Hiyerarşi:** H1 → 56px / H2 → 40px / H3 → 28px / Body → 16px

### 4.3 Tasarım Tarzı
- **Dark mode** — ağırlıklı siyah zemin
- **Modern / Minimal / Lüks** — premium inşaat firması hissi
- **Altın/Sarı vurgu** — güvenilirlik ve kalite mesajı
- **Micro-animasyonlar** — scroll, hover, giriş efektleri
- **Glassmorphism** — kart ve panel elementlerde
- **Parallax** — ana sayfa hero bölümünde

---

## 5. 📋 Sayfa Detayları

### 5.1 Ana Sayfa (`/`)
- **Hero:** Tam ekran, firma sloganı, animasyonlu arka plan (inşaat görseli + overlay)
- **Hizmet Özetleri:** 4 ana kategori, ikon + başlık + kısa açıklama
- **Seçilmiş Projeler:** Son 3-4 proje kartı (admin'den dinamik)
- **Firma Rakamları:** Yıl, proje sayısı, ülke vb. (sayaç animasyonu)
- **WhatsApp Butonu:** Sabit konumda, sağ alt köşe (tüm sayfalarda)
- **CTA:** "Projelerimizi İnceleyin" → `/projeler`

### 5.2 Kurumsal / Hakkımızda (`/kurumsal`)
- Firma tarihçesi, misyon, vizyon
- Ekip (isteğe bağlı, sonradan eklenebilir)
- Sertifikalar / Yetkinlikler

### 5.3 Projeler (`/projeler`)
- **Filtre:** Tüm Projeler / Biten / Devam Eden
- **Proje Kartı:** Fotoğraf (dummy), Proje Adı, Lokasyon, Yıl, Kategori, Kısa Açıklama
- **Detay Sayfası:** `/projeler/[slug]` — büyük görsel + tam açıklama

### 5.4 Hizmetler (`/hizmetler`)
- Kategoriler (eski siteden): Enerji Santralleri, Konut/AVM, Baraj/HES, Kamu Taahhütleri
- Her hizmet için ikon + başlık + açıklama

### 5.5 Referanslar (`/referanslar`)
- Referans listesi (logo + firma adı + proje)
- Admin panelinden yönetilir

### 5.6 Haberler (`/haberler`)
- Haber listesi + detay sayfası
- Şimdilik statik/dummy — sonradan CMS'e eklenebilir

### 5.7 İletişim (`/iletisim`)
- İletişim bilgileri (adres, telefon, e-posta)
- Form YOK — WhatsApp CTA butonu
- Sosyal medya linkleri (URL'ler sonradan eklenecek)

### 5.8 İş Bitirme Belgeleri (`/is-bitirme-belgeleri`)
- ⚠️ **S10 Yanıtlanmadı** — Şimdilik "liste görünümü + PDF linki" olarak tasarlanacak, sonradan güncellenir

### 5.9 Belgeler / İndirme Merkezi (`/belgeler`)
- Dosya listesi (PDF/DOC) — indirme linkleri
- Şimdilik statik

---

## 6. 🔐 Admin Paneli (`/admin`)

### Kapsam
| Modül | İşlemler |
|-------|----------|
| Projeler | Ekle, Düzenle, Sil |
| Referanslar | Ekle, Düzenle, Sil |

> **İçerik Stratejisi:** Gerekli veriler (fotoğraf, metin vb.) önce developer'a sorulacak. Eğer veri mevcut değilse, o alanlar dummy (placeholder) verilerle oluşturulacaktır. Site yayına alındıktan sonra bu bilgiler ve detaylar Admin Paneli aracılığıyla müşteri tarafından tamamen değiştirilebilir / düzenlenebilir olacaktır.

### Erişim
- Basit şifre koruması (Next.js middleware + env variable)
- Supabase Authentication (önerilen)

### Veri Modeli — Projeler (Supabase)
```sql
projects (
  id          uuid PRIMARY KEY,
  title_tr    text,
  title_en    text,
  location    text,
  year        int,
  status      text, -- 'biten' | 'devam-eden'
  category    text,
  description_tr text,
  description_en text,
  image_url   text,
  created_at  timestamp
)
```

### Veri Modeli — Referanslar (Supabase)
```sql
references (
  id          uuid PRIMARY KEY,
  name        text,
  project     text,
  logo_url    text,
  created_at  timestamp
)
```

---

## 7. 🌍 Çok Dil Desteği (TR / EN)

- Next.js `i18n` routing: `bendyapi.com.tr/` (TR) ve `bendyapi.com.tr/en/` (EN)
- İçerik: Tüm statik metinler çift dilli
- Projeler: `title_tr`, `description_tr` + `title_en`, `description_en`

---

## 8. ⚡ WhatsApp Entegrasyonu

- Sayfanın sağ alt köşesinde sabit (sticky) WhatsApp butonu
- Tüm sayfalarda görünür
- Tıklanınca: `https://wa.me/90XXXXXXXXXX` formatında yönlendirme
- Numara: Daha sonra eklenecek (env variable ile)

---

## 9. 🔍 SEO Gereksinimleri

- Her sayfa için `<title>` ve `<meta description>` (TR + EN)
- `sitemap.xml` otomatik oluşturma (Next.js)
- `robots.txt`
- Open Graph meta etiketleri (sosyal medya paylaşımı için)
- Semantic HTML — `<article>`, `<section>`, `<main>`, `<nav>`
- Görsel alt etiketleri

---

## 10. 🛠️ Teknik Altyapı

| Katman | Teknoloji |
|--------|-----------|
| Frontend | Next.js 14 (App Router) |
| Styling | Vanilla CSS (CSS Variables) |
| Animasyon | CSS Animations + Framer Motion |
| Veritabanı | Supabase (PostgreSQL) |
| Auth | Supabase Auth (admin) |
| Ortam | Docker + docker-compose |
| Deployment | HAVSAN Cloud (Coolify) — karar aşamasında |
| Domain | bendyapi.com.tr |

---

## 11. 🗓️ Geliştirme Planı (3 Gün)

| Gün | Görev |
|-----|-------|
| **Gün 1** | Docker kurulumu, tasarım sistemi (CSS tokens), Navbar, Footer, Ana Sayfa, Projeler sayfası |
| **Gün 2** | Kurumsal, Hizmetler, Referanslar, İletişim, Haberler, Belgeler sayfaları + WhatsApp butonu |
| **Gün 3** | Admin paneli, Supabase entegrasyonu, TR/EN i18n, SEO, test ve deployment hazırlığı |

> ⚠️ **Not:** Tüm sayfalar önce dummy data ile tamamlanır, ardından Supabase entegrasyonu yapılır.

---

## 12. ✅ Tanımlı Olmayan 1 Madde

| Soru | Durum | Karar |
|------|-------|-------|
| İş Bitirme Belgeleri sayfası detayı | ❓ Yanıtlanmadı | Varsayılan: liste + PDF indirme linki |

---

*Bu doküman `docs/ANALIZ/analiz_master.md` kaynaklıdır. Kod veya doküman arasında fark oluşursa bu dosya güncellenir.*
