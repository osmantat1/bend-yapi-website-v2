"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session && pathname !== "/admin/login") {
                router.push("/admin/login");
            }
            setChecking(false);
        };

        checkUser();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === "SIGNED_IN") {
                    if (pathname === "/admin/login") router.push("/admin");
                } else if (event === "SIGNED_OUT") {
                    router.push("/admin/login");
                }
            }
        );

        return () => authListener.subscription.unsubscribe();
    }, [pathname, router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    if (checking) return <div style={{ padding: "50px", textAlign: "center", marginTop: "100px" }}>Sisteme Giriş Yapılıyor... Yetki Kontrol Ediliyor...</div>;

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#fff" }}>
            {/* Sidebar */}
            <aside style={{ width: "250px", backgroundColor: "#1e1e1e", color: "#fff", padding: "20px", display: "flex", flexDirection: "column" }}>
                <Link href="/" target="_blank" style={{ color: "#00aced", textDecoration: "none", fontSize: "14px", marginBottom: "30px", fontWeight: "bold" }}>
                    &larr; Siteye Dön
                </Link>

                <h2 style={{ fontSize: "20px", marginBottom: "40px", borderBottom: "1px solid #333", paddingBottom: "10px" }}>
                    BEND YAPI
                </h2>

                <nav style={{ display: "flex", flexDirection: "column", gap: "15px", flex: 1 }}>
                    <Link href="/admin" style={{ color: "#ddd", textDecoration: "none" }}>Gösterge Paneli</Link>
                    <Link href="/admin/projeler" style={{ color: "#ddd", textDecoration: "none" }}>Projeler (İş Bitirme)</Link>
                    <Link href="/admin/referanslar" style={{ color: "#ddd", textDecoration: "none" }}>Referanslar</Link>
                    <Link href="/admin/haberler" style={{ color: "#ddd", textDecoration: "none" }}>Haberler</Link>
                    <Link href="/admin/iletisim" style={{ color: "#ddd", textDecoration: "none" }}>İletişim</Link>
                </nav>

                <button
                    onClick={handleLogout}
                    style={{ background: "#d9534f", color: "white", border: "none", padding: "10px", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }}
                >
                    Çıkış Yap
                </button>
            </aside>

            {/* İçerik Alanı */}
            <main style={{ flex: 1, backgroundColor: "#f9f9f9", padding: "30px" }}>
                {children}
            </main>
        </div>
    );
}
