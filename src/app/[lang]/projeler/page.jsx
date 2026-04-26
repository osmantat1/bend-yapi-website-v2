import { getDictionary } from "@/utils/dictionary";
import { supabase } from "@/lib/supabase";
import ProjelerClient from "./ProjelerClient";
import "./page.css";

export default async function ProjelerPage({ params }) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    let projeler = [];

    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) projeler = data;
    } catch (error) {
        console.error('Projeler yüklenirken hata:', error.message);
    }

    return (
        <main className="projeler-page page-padding">
            <ProjelerClient
                initialProjeler={projeler}
                dict={dict.projects}
                lang={lang}
            />
        </main>
    );
}
