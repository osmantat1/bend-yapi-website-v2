"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ProjeEkle() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "", slug: "", category: "ongoing", is_bitirme: false,
        geo_location: "", start_to_finish: "", employer: "", budget: "", construction_zone: ""
    });
    const [coverFile, setCoverFile] = useState(null);
    const [galleryFiles, setGalleryFiles] = useState([]);

    // Kategori seçenekleri dummy verilere göre 'ongoing' | 'completed' vs.
    const kategoriler = [
        { id: "completed", label: "Completed Projects" },
        { id: "ongoing", label: "Ongoing Projects" }
    ];

    const generateSlug = (text) => {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Boşlukları tireyle değiştir
            .replace(/[^\w\-]+/g, '')       // Alfanümerik olmayanları sil
            .replace(/\-\-+/g, '-')         // Çoklu tireleri tek tireye çevir
            .trim();
    };

    const uploadImage = async (file, folder) => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) {
            throw new Error("Oturum bulunamadı. Lütfen tekrar giriş yapın.");
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', folder);

        const response = await fetch('/api/admin/uploads', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.access_token}`
            },
            body: formData
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result?.error || 'Resim yüklenemedi.');
        }

        return result.publicUrl;
    };

    const handleTitleChange = (e) => {
        setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const {
                data: { session }
            } = await supabase.auth.getSession();

            if (!session?.access_token) {
                throw new Error("Oturum bulunamadı. Lütfen tekrar giriş yapın.");
            }

            let cover_url = "";
            let gallery_urls = [];

            if (coverFile) {
                cover_url = await uploadImage(coverFile, 'projects');
                gallery_urls.push(cover_url);
            }

            if (galleryFiles && galleryFiles.length > 0) {
                const uploadedUrls = await Promise.all(Array.from(galleryFiles).map(file => uploadImage(file, 'projects')));
                gallery_urls = [...gallery_urls, ...uploadedUrls];
            }

            const response = await fetch('/api/admin/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    project: {
                        ...formData,
                        cover_image: cover_url,
                        gallery: gallery_urls
                    }
                })
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result?.error || 'Proje eklenemedi.');
            }

            router.push("/admin/projeler");
        } catch (err) {
            alert("Hata: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 style={{ color: "#333", borderBottom: "2px solid #ddd", paddingBottom: "10px", marginBottom: "30px" }}>Yeni Proje Ekle</h1>

            <form onSubmit={handleSubmit} style={{ background: "#fff", padding: "30px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "20px" }}>

                <div style={{ display: "flex", gap: "20px" }}>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <label style={{ color: "#333", marginBottom: "5px", fontWeight: "bold" }}>Proje Başlığı</label>
                        <input required type="text" value={formData.title} onChange={handleTitleChange} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                    </div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <label style={{ color: "#333", marginBottom: "5px", fontWeight: "bold" }}>Kısa Link (Slug)</label>
                        <input required type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f9f9f9" }} />
                    </div>
                </div>

                <div style={{ display: "flex", gap: "20px" }}>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                        <label style={{ color: "#333", marginBottom: "5px", fontWeight: "bold" }}>Kategori</label>
                        <select required value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                            {kategoriler.map(k => <option key={k.id} value={k.id}>{k.label}</option>)}
                        </select>
                    </div>
                    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px", marginTop: "25px" }}>
                        <input type="checkbox" checked={formData.is_bitirme} onChange={(e) => setFormData({ ...formData, is_bitirme: e.target.checked })} id="iş-bitirme" style={{ width: "20px", height: "20px" }} />
                        <label htmlFor="iş-bitirme" style={{ color: "#333", fontWeight: "bold" }}>İş Bitirme Belgesi Var Mı?</label>
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ color: "#333", marginBottom: "5px", fontWeight: "bold" }}>Kapak Resmi</label>
                        <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} style={{ padding: "10px", border: "1px dashed #00aced", borderRadius: "5px" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ color: "#333", marginBottom: "5px", fontWeight: "bold" }}>Galeri Resimleri (Çoklu Seçim)</label>
                        <input type="file" multiple accept="image/*" onChange={(e) => setGalleryFiles(e.target.files)} style={{ padding: "10px", border: "1px dashed #2ecc71", borderRadius: "5px" }} />
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ color: "#333", marginBottom: "5px", fontWeight: "bold" }}>Lokasyon (Geo Location)</label>
                        <input type="text" value={formData.geo_location} onChange={(e) => setFormData({ ...formData, geo_location: e.target.value })} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} placeholder="Kayseri / Türkiye" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ color: "#333", marginBottom: "5px", fontWeight: "bold" }}>Tarih Aralığı</label>
                        <input type="text" value={formData.start_to_finish} onChange={(e) => setFormData({ ...formData, start_to_finish: e.target.value })} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} placeholder="15.08.2023 - Devam Ediyor" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ color: "#333", marginBottom: "5px", fontWeight: "bold" }}>İşveren (Employer)</label>
                        <input type="text" value={formData.employer} onChange={(e) => setFormData({ ...formData, employer: e.target.value })} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} placeholder="Kayseri Valiliği" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ color: "#333", marginBottom: "5px", fontWeight: "bold" }}>Bütçe</label>
                        <input type="text" value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} placeholder="125.000.000 ₺" />
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ color: "#333", marginBottom: "5px", fontWeight: "bold" }}>Proje Açıklaması (Construction Zone)</label>
                    <textarea rows="4" value={formData.construction_zone} onChange={(e) => setFormData({ ...formData, construction_zone: e.target.value })} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", resize: "vertical" }}></textarea>
                </div>

                <button type="submit" disabled={loading} style={{ background: "#2ecc71", color: "white", padding: "15px", border: "none", borderRadius: "5px", fontSize: "16px", cursor: "pointer", fontWeight: "bold", marginTop: "10px" }}>
                    {loading ? "Kaydediliyor ve Yükleniyor..." : "Projeyi Kaydet"}
                </button>
            </form>
        </div>
    );
}
