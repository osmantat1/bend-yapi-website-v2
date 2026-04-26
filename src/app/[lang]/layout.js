import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import ReferansCarousel from "@/components/ReferansCarousel/ReferansCarousel";
import { getDictionary } from "@/utils/dictionary";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  return {
    title: lang === 'en' ? "Bend Yapı | Shopping Malls, Dams, Schools, Housing Projects" : "Bend Yapı | Alışveriş Merkezi, Baraj, Okul, Konut Projeleri",
    description: lang === 'en' ? "Bend Yapı Construction. Building world-class new living centers without compromising quality and trust." : "Bend Yapı İnşaat. Kalite ve güvenden taviz vermeden dünya standartlarında yeni yaşam merkezleri kuruyoruz.",
    keywords: ["Bend Yapı", "inşaat", "taahhüt", "baraj yapımı", "konut projesi", "okul inşaatı", "construction", "dam", "housing"],
  }
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="app-container">
      <Navbar dict={dict.navbar} currentLang={lang} />
      <main className="main-content">
        {children}
      </main>
      <ReferansCarousel />
      <Footer dict={dict.footer} currentLang={lang} />
      <WhatsAppButton />
    </div>
  );
}
