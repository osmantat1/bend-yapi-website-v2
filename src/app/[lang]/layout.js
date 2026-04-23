import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import ReferansCarousel from "@/components/ReferansCarousel/ReferansCarousel";
import { getDictionary } from "@/utils/dictionary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "900"],
});

export async function generateMetadata({ params: { lang } }) {
  return {
    title: lang === 'en' ? "Bend Yapı | Shopping Malls, Dams, Schools, Housing Projects" : "Bend Yapı | Alışveriş Merkezi, Baraj, Okul, Konut Projeleri",
    description: lang === 'en' ? "Bend Yapı Construction. Building world-class new living centers without compromising quality and trust." : "Bend Yapı İnşaat. Kalite ve güvenden taviz vermeden dünya standartlarında yeni yaşam merkezleri kuruyoruz.",
    keywords: ["Bend Yapı", "inşaat", "taahhüt", "baraj yapımı", "konut projesi", "okul inşaatı", "construction", "dam", "housing"],
  }
}

export default async function RootLayout({ children, params }) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={`${inter.variable}`}>
      <body>
        <div className="app-container">
          <Navbar dict={dict.navbar} currentLang={lang} />
          <main className="main-content">
            {children}
          </main>
          <ReferansCarousel />
          <Footer />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}
