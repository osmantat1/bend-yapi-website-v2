"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import "./page.css";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            // Başarılıysa admin paneline yönlendir
            router.push("/admin");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h2>Bend Yapı Yönetim Paneli</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Email Adresi</label>
                        <input
                            type="email"
                            required
                            placeholder="admin@bendyapi.com.tr"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <label>Şifre</label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && <div className="error-alert">{error}</div>}

                    <button type="submit" disabled={loading} className="login-btn">
                        {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
                    </button>
                </form>
            </div>
        </div>
    );
}
