import Image from "next/image";
import Link from "next/link";
import { getContactOffices } from "@/lib/siteContent";
import "./Footer.css";

export default async function Footer({ dict = {}, currentLang = "tr" }) {
    const currentYear = new Date().getFullYear();
    const prefix = `/${currentLang}`;
    const offices = await getContactOffices();
    const primaryOffice = offices.find((office) => office.office_key === "head_office") || offices[0] || null;
    const footerAddress = primaryOffice?.address || dict.address || "Atasehir Neighborhood, Serdarlar Street, No: 27/A Elazig / Turkey";
    const footerPhone = primaryOffice?.phone || "+90 (424) 247 62 00";
    const footerEmail = primaryOffice?.email || "info@bendyapi.com.tr";

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* Brand Info */}
                    <div className="footer-brand">
                        <Link href={prefix} className="footer-logo">
                            <Image
                                src="/assets/logo/bend-yapı-logo.png"
                                alt="Bend Yapı"
                                width={300}
                                height={100}
                                className="footer-logo-image"
                                priority={false}
                            />
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
                            <li><strong>{dict.addressLabel || "Address:"}</strong> {footerAddress}</li>
                            <li><strong>{dict.emailLabel || "Email:"}</strong> {footerEmail}</li>
                            <li><strong>{dict.phoneLabel || "Phone:"}</strong> {footerPhone}</li>
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
