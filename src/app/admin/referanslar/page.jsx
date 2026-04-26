"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminReferanslar() {
    const [referanslar, setReferanslar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [companyName, setCompanyName] = useState("");
    const [logoFile, setLogoFile] = useState(null);

    useEffect(() => {
        fetchReferanslar();
    }, []);

    const fetchReferanslar = async () => {
        const { data, error } = await supabase.from('references').select('*').order('created_at', { ascending: false });
        if (!error && data) setReferanslar(data);
        setLoading(false);
    };

    const uploadLogo = async (file) => {
        const {
            data: { session }
        } = await supabase.auth.getSession();

        if (!session?.access_token) {
            throw new Error("Oturum bulunamadı. Lütfen tekrar giriş yapın.");
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'references');

        const response = await fetch('/api/admin/uploads', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${session.access_token}`
            },
            body: formData
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result?.error || 'Logo yüklenemedi.');
        }

        return result.publicUrl;
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const {
                data: { session }
            } = await supabase.auth.getSession();

            if (!session?.access_token) {
                throw new Error("Oturum bulunamadı. Lütfen tekrar giriş yapın.");
            }

            let logo_url = "";
            if (logoFile) {
                logo_url = await uploadLogo(logoFile);
            }

            const response = await fetch('/api/admin/references', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    reference: {
                        company_name: companyName,
                        logo_url
                    }
                })
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result?.error || 'Referans eklenemedi.');
            }

            // Sıfırla ve listeyi yenile
            setCompanyName("");
            setLogoFile(null);
            e.target.reset(); // File inputu siler
            fetchReferanslar();
        } catch (err) {
            alert("Referans eklenemedi: " + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Referansı silmek istediğinize emin misiniz?")) {
            const { error } = await supabase.from('references').delete().eq('id', id);
            if (!error) {
                setReferanslar(referanslar.filter(r => r.id !== id));
            }
        }
    };

    return (
        <div>
            <h1 style={{ color: "#333", borderBottom: "2px solid #ddd", paddingBottom: "10px", marginBottom: "30px" }}>Referans Yönetimi</h1>

            {/* Yeni Ekleme Formu */}
            <form onSubmit={handleAdd} style={{ background: "#fff", padding: "20px", borderRadius: "8px", display: "flex", gap: "15px", alignItems: "flex-end", marginBottom: "40px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <label style={{ color: "#333", marginBottom: "5px", fontWeight: "bold" }}>Şirket/Kurum Adı</label>
                    <input required type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} placeholder="Kurum Adı" />
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <label style={{ color: "#333", marginBottom: "5px", fontWeight: "bold" }}>Logo Resmi</label>
                    <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} style={{ padding: "9px", border: "1px dashed #00aced", borderRadius: "5px" }} />
                </div>
                <button type="submit" disabled={saving} style={{ background: "#00aced", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer", height: "42px" }}>
                    {saving ? "Ekleniyor..." : "+ Hızlı Ekle"}
                </button>
            </form>

            {/* Liste */}
            {loading ? (
                <p>Yükleniyor...</p>
            ) : referanslar.length === 0 ? (
                <p style={{ color: "#666" }}>Henüz referans logo eklenmemiş.</p>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
                    {referanslar.map(ref => (
                        <div key={ref.id} style={{ background: "#fff", padding: "15px", borderRadius: "8px", textAlign: "center", boxShadow: "0 2px 4px rgba(0,0,0,0.05)", position: "relative" }}>
                            <div style={{ height: "100px", marginBottom: "15px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <img src={ref.logo_url || "/assets/Gemini_Generated_Image_ymfniiymfniiymfn.png"} alt={ref.company_name} style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} />
                            </div>
                            <h4 style={{ color: "#333", margin: "0 0 10px 0", fontSize: "14px" }}>{ref.company_name}</h4>
                            <button onClick={() => handleDelete(ref.id)} style={{ background: "#ff4757", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "12px", width: "100%" }}>Sil</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
