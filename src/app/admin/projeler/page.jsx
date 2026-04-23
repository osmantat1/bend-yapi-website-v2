"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminProjeler() {
    const [projeler, setProjeler] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProjeler();
    }, []);

    const fetchProjeler = async () => {
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (!error && data) setProjeler(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (confirm("Bu projeyi silmek istediğinize emin misiniz? (Bağlı resimler storage'da kalabilir)")) {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (!error) {
                setProjeler(projeler.filter(p => p.id !== id));
            } else {
                alert("Silinirken hata oluştu: " + error.message);
            }
        }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
                <h1 style={{ color: "#333" }}>Projeler (İş Bitirme)</h1>
                <Link href="/admin/projeler/yeni" style={{ background: "#00aced", color: "white", padding: "10px 20px", textDecoration: "none", borderRadius: "5px", fontWeight: "bold" }}>
                    + Yeni Ekle
                </Link>
            </div>

            {loading ? (
                <p>Yükleniyor...</p>
            ) : projeler.length === 0 ? (
                <div style={{ background: "#fff", padding: "40px", textAlign: "center", borderRadius: "8px", color: "#666" }}>
                    Henüz proje eklenmemiş.
                </div>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                    <thead style={{ background: "#f1f2f6", color: "#333", textAlign: "left" }}>
                        <tr>
                            <th style={{ padding: "15px" }}>Kapak</th>
                            <th style={{ padding: "15px" }}>Başlık</th>
                            <th style={{ padding: "15px" }}>Kategori</th>
                            <th style={{ padding: "15px" }}>İşlem</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projeler.map(proje => (
                            <tr key={proje.id} style={{ borderBottom: "1px solid #f1f2f6" }}>
                                <td style={{ padding: "15px" }}>
                                    <img src={proje.cover_image || "/assets/Gemini_Generated_Image_ymfniiymfniiymfn.png"} alt={proje.title} style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                                </td>
                                <td style={{ padding: "15px", color: "#333" }}>{proje.title}</td>
                                <td style={{ padding: "15px", color: "#666" }}>{proje.category}</td>
                                <td style={{ padding: "15px" }}>
                                    <button
                                        onClick={() => handleDelete(proje.id)}
                                        style={{ background: "#ff4757", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}
                                    >
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
