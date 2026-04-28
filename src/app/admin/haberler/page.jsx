"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const defaultForm = {
    title: "",
    summary: "",
    category: "Duyuru",
    published_at: new Date().toISOString().slice(0, 10),
};

const categories = ["Duyuru", "Proje", "Basın"];

export default function AdminHaberler() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState(defaultForm);

    useEffect(() => {
        fetchNews();
    }, []);

    const getAccessToken = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) {
            throw new Error("Oturum bulunamadı. Lütfen tekrar giriş yapın.");
        }
        return session.access_token;
    };

    const fetchNews = async () => {
        try {
            const token = await getAccessToken();
            const response = await fetch("/api/admin/news", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result?.error || "Haberler yüklenemedi.");
            }

            setNews(result.news || []);
        } catch (err) {
            alert("Haberler yüklenemedi: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const handleAdd = async (event) => {
        event.preventDefault();
        setSaving(true);

        try {
            const token = await getAccessToken();
            const response = await fetch("/api/admin/news", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ news: form }),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result?.error || "Haber eklenemedi.");
            }

            setForm(defaultForm);
            event.target.reset();
            await fetchNews();
        } catch (err) {
            alert("Haber eklenemedi: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Bu haberi silmek istediğinize emin misiniz?")) {
            return;
        }

        try {
            const token = await getAccessToken();
            const response = await fetch("/api/admin/news", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ id }),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result?.error || "Haber silinemedi.");
            }

            setNews((current) => current.filter((item) => item.id !== id));
        } catch (err) {
            alert("Haber silinemedi: " + err.message);
        }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
                <h1 style={{ color: "#333" }}>Haber Yönetimi</h1>
            </div>

            <form onSubmit={handleAdd} style={{ background: "#fff", padding: "20px", borderRadius: "8px", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "15px", marginBottom: "40px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column" }}>
                    <label style={{ color: "#333", marginBottom: "5px", fontWeight: "bold" }}>Başlık</label>
                    <input required type="text" value={form.title} onChange={(e) => handleChange("title", e.target.value)} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} placeholder="Haber başlığı" />
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ color: "#333", marginBottom: "5px", fontWeight: "bold" }}>Kategori</label>
                    <select value={form.category} onChange={(e) => handleChange("category", e.target.value)} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ color: "#333", marginBottom: "5px", fontWeight: "bold" }}>Yayın Tarihi</label>
                    <input type="date" value={form.published_at} onChange={(e) => handleChange("published_at", e.target.value)} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
                </div>

                <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column" }}>
                    <label style={{ color: "#333", marginBottom: "5px", fontWeight: "bold" }}>Açıklama</label>
                    <textarea required rows={5} value={form.summary} onChange={(e) => handleChange("summary", e.target.value)} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", resize: "vertical" }} placeholder="Haber açıklaması" />
                </div>

                <button type="submit" disabled={saving} style={{ gridColumn: "1 / -1", background: "#00aced", color: "white", padding: "12px 20px", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer" }}>
                    {saving ? "Ekleniyor..." : "+ Yeni Haber Yayınla"}
                </button>
            </form>

            {loading ? (
                <p>Yükleniyor...</p>
            ) : news.length === 0 ? (
                <div style={{ background: "#fff", padding: "40px", textAlign: "center", borderRadius: "8px", color: "#666" }}>
                    Henüz haber eklenmemiş.
                </div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                    {news.map((item) => (
                        <article key={item.id} style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: "12px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", alignItems: "center" }}>
                                <span style={{ background: "rgba(0,172,237,0.12)", color: "#0090c8", padding: "4px 10px", borderRadius: "999px", fontSize: "12px", fontWeight: 700 }}>{item.category}</span>
                                <time style={{ color: "#777", fontSize: "12px" }}>{item.published_at}</time>
                            </div>
                            <h3 style={{ color: "#222", margin: 0 }}>{item.title}</h3>
                            <p style={{ color: "#555", lineHeight: 1.6, margin: 0 }}>{item.summary}</p>
                            <button onClick={() => handleDelete(item.id)} style={{ marginTop: "auto", background: "#ff4757", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: 600 }}>
                                Sil
                            </button>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}