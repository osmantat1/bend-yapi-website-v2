import Link from "next/link";
import "./Footer.css";

export default function Footer({ dict = {}, currentLang = "tr" }) {
    const currentYear = new Date().getFullYear();
    const prefix = `/${currentLang}`;

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand Info */}
                    <div className="footer-brand">
                        <Link href={prefix} className="footer-logo">
                            <span>BEND</span> YAPI
                        </Link>
                        <p className="footer-desc">
                            {dict.description || "Since 2005, we have been building world-class new living centers without compromising quality and trust."}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h3>{dict.quickLinksTitle || "Quick Links"}</h3>
                        <ul>
                            <li><Link href={`${prefix}/kurumsal`}>{dict.links?.about || "Corporate"}</Link></li>
                            <li><Link href={`${prefix}/projeler`}>{dict.links?.projects || "Projects"}</Link></li>
                            <li><Link href={`${prefix}/hizmetler`}>{dict.links?.services || "Services"}</Link></li>
                            <li><Link href={`${prefix}/referanslar`}>{dict.links?.references || "References"}</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-contact">
                        <h3>{dict.contactTitle || "Contact"}</h3>
                        <ul>
                            <li><strong>{dict.addressLabel || "Address:"}</strong> {dict.address || "Atasehir Neighborhood, Serdarlar Street, No: 27/A Elazig / Turkey"}</li>
                            <li><strong>{dict.emailLabel || "Email:"}</strong> info@bendyapi.com.tr</li>
                            <li><strong>{dict.phoneLabel || "Phone:"}</strong> +90 (424) 247 62 00</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} {dict.copyright || "Bend Yapi Construction Contracting Co. All rights reserved."}</p>
                </div>
            </div>
        </footer>
    );
}
