export default function sitemap() {
    const baseUrl = "https://www.bendyapi.com.tr"

    const routes = [
        "",
        "/kurumsal",
        "/hizmetler",
        "/projeler",
        "/referanslar",
        "/haberler",
        "/iletisim",
        "/belgeler",
    ];

    const langs = ["tr", "en"];

    const sitemapEntries = [];

    for (const lang of langs) {
        for (const route of routes) {
            sitemapEntries.push({
                url: `${baseUrl}/${lang}${route}`,
                lastModified: new Date().toISOString(),
                changeFrequency: "weekly",
                priority: route === "" ? 1 : 0.8,
            });
        }
    }

    return sitemapEntries;
}
