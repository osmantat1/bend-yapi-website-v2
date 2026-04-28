"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const defaultOffices = [
    {
        office_key: "head_office",
        title: "Merkez Ofis",
        address: "Ataşehir Mah. Serdarlar Sok. No: 27/A Elazığ / Türkiye",
        phone: "+90 (424) 247 62 00",
        fax: "+90 (424) 247 63 00",
        email: "info@bendyapi.com.tr",
        map_url: "https://www.google.com/maps?q=Atasehir+Mah.+Serdarlar+Sok.+No:+27/A+Elazig/Turkey&output=embed",
        whatsapp_url: "https://wa.me/905324545648?text=Merhaba, proje teklifi almak istiyorum.",
        order_index: 1,
    },
    {
        office_key: "iraq_branch",
        title: "Irak Şubesi",
        address: "Erbil Gate No: 120 Erbil / Irak",
        phone: "(00 964) 750 420 78 77",
        fax: "(00 964) 770 392 99 50",
        email: "info@bendyapi.com.tr",
        map_url: "",
        whatsapp_url: "",
        order_index: 2,
    },
];

export default function AdminIletisim() {
    const [offices, setOffices] = useState(defaultOffices);
    const [loading, setLoading] = useState(true);
    const [savingKey, setSavingKey] = useState("");

    useEffect(() => {
        fetchOffices();
    }, []);

    const getAccessToken = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.access_token) {
            throw new Error("Oturum bulunamadı. Lütfen tekrar giriş yapın.");
        }

        return session.access_token;
    };

    const fetchOffices = async () => {
        try {
            const token = await getAccessToken();
            const response = await fetch("/api/admin/contact", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result?.error || "İletişim bilgileri yüklenemedi.");
            }

            if (result.offices?.length) {
                setOffices(result.offices);
            }
        } catch (err) {
            alert("İletişim bilgileri yüklenemedi: " + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (index, field, value) => {
        setOffices((current) => current.map((office, officeIndex) => officeIndex === index ? { ...office, [field]: value } : office));
    };

    const handleSave = async (office) => {
        setSavingKey(office.office_key);

        try {
            const token = await getAccessToken();
            const response = await fetch("/api/admin/contact", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ office }),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result?.error || "İletişim bilgileri kaydedilemedi.");
            }

            setOffices((current) => current.map((item) => item.office_key === office.office_key ? result.office : item));
        } catch (err) {
            alert("İletişim bilgileri kaydedilemedi: " + err.message);
        } finally {
            setSavingKey("");
        }
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", borderBottom: "2px solid #ddd", paddingBottom: "10px" }}>
                <h1 style={{ color: "#333" }}>İletişim Bilgileri</h1>
            </div>

            {loading ? (
                <p>Yükleniyor...</p>
            ) : (
                <div style={{ display: "grid", gap: "24px" }}>
                    {offices.map((office, index) => (
                        <section key={office.office_key || index} style={{ background: "#fff", padding: "24px", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                                <h2 style={{ margin: 0, color: "#222" }}>{office.title}</h2>
                                <button onClick={() => handleSave(office)} disabled={savingKey === office.office_key} style={{ background: "#00aced", color: "white", padding: "10px 16px", border: "none", borderRadius: "5px", fontWeight: "bold", cursor: "pointer" }}>
                                    {savingKey === office.office_key ? "Kaydediliyor..." : "Kaydet"}
                                </button>
                            </div>

                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "15px" }}>
                                <Field label="Başlık" value={office.title || ""} onChange={(value) => handleChange(index, "title", value)} />
                                <Field label="Adres" value={office.address || ""} onChange={(value) => handleChange(index, "address", value)} textarea />
                                <Field label="Telefon" value={office.phone || ""} onChange={(value) => handleChange(index, "phone", value)} />
                                <Field label="Faks" value={office.fax || ""} onChange={(value) => handleChange(index, "fax", value)} />
                                <Field label="E-Posta" value={office.email || ""} onChange={(value) => handleChange(index, "email", value)} />
                                <Field label="Harita URL" value={office.map_url || ""} onChange={(value) => handleChange(index, "map_url", value)} />
                                <Field label="WhatsApp URL" value={office.whatsapp_url || ""} onChange={(value) => handleChange(index, "whatsapp_url", value)} />
                                <Field label="Sıra" value={String(office.order_index ?? index + 1)} onChange={(value) => handleChange(index, "order_index", value)} />
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
}

function Field({ label, value, onChange, textarea = false }) {
    return (
        <label style={{ display: "flex", flexDirection: "column", gap: "6px", color: "#333", fontWeight: 600 }}>
            <span>{label}</span>
            {textarea ? (
                <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={4} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", resize: "vertical" }} />
            ) : (
                <input value={value} onChange={(event) => onChange(event.target.value)} style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }} />
            )}
        </label>
    );
}