"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
    const [stats, setStats] = useState({ projeler: 0, referanslar: 0 });

    useEffect(() => {
        async function fetchStats() {
            try {
                const { count: pCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
                const { count: rCount } = await supabase.from('references').select('*', { count: 'exact', head: true });
                setStats({ projeler: pCount || 0, referanslar: rCount || 0 });
            } catch (err) {
                console.error("İstatistikler alınamadı", err);
            }
        }
        fetchStats();
    }, []);

    return (
        <div>
            <h1 style={{ color: "#333", borderBottom: "2px solid #ddd", paddingBottom: "10px", marginBottom: "30px" }}>Dashboard</h1>

            <p style={{ color: "#666", marginBottom: "40px" }}>
                Bend Yapı Yönetim Paneline hoş geldiniz. Sol menüyü kullanarak projelerinizi ve referans şirketlerinizi yönetebilirsiniz.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div style={{ background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", textAlign: "center" }}>
                    <h3 style={{ color: "#888", fontSize: "16px" }}>Toplam Proje (İş Bitirme)</h3>
                    <div style={{ fontSize: "40px", fontWeight: "bold", color: "#1e1e1e", marginTop: "10px" }}>{stats.projeler}</div>
                </div>
                <div style={{ background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", textAlign: "center" }}>
                    <h3 style={{ color: "#888", fontSize: "16px" }}>Toplam Referans</h3>
                    <div style={{ fontSize: "40px", fontWeight: "bold", color: "#1e1e1e", marginTop: "10px" }}>{stats.referanslar}</div>
                </div>
            </div>
        </div>
    );
}
