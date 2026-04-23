import Link from "next/link";
import "./Footer.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand Info */}
                    <div className="footer-brand">
                        <Link href="/" className="footer-logo">
                            <span>BEND</span> YAPI
                        </Link>
                        <p className="footer-desc">
                            2005 yılından beri deneyimimizle kalite ve güvenden taviz vermeden
                            dünya standartlarında yeni yaşam merkezleri kuruyoruz.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h3>Hızlı Linkler</h3>
                        <ul>
                            <li><Link href="/kurumsal">Kurumsal</Link></li>
                            <li><Link href="/projeler">Projeler</Link></li>
                            <li><Link href="/hizmetler">Hizmetler</Link></li>
                            <li><Link href="/referanslar">Referanslar</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-contact">
                        <h3>İletişim</h3>
                        <ul>
                            <li><strong>Adres:</strong> İstanbul, Türkiye</li>
                            <li><strong>E-Posta:</strong> info@bendyapi.com.tr</li>
                            <li><strong>Telefon:</strong> +90 555 555 55 55</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Bend Yapı İnşaat Taah. San. ve Tic. Ltd. Şti. Tüm Hakları Saklıdır.</p>
                </div>
            </div>
        </footer>
    );
}
