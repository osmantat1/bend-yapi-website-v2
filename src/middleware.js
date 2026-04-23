import { NextResponse } from 'next/server'

const locales = ['tr', 'en']
const defaultLocale = 'tr'

function getLocale(request) {
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage && acceptLanguage.includes('en')) {
        return 'en';
    }
    return defaultLocale;
}

export function middleware(request) {
    const { pathname } = request.nextUrl

    // Yönetim paneli, logolar ve public (assets vb) next dosyalarına dokunulmaz.
    if (
        pathname.startsWith('/admin') ||
        pathname.startsWith('/assets') ||
        pathname.startsWith('/_next') ||
        pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    // Yolun herhangi bir locale (/tr veya /en) ile başlayıp başlamadığını kontrol edin
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return NextResponse.next();

    // Rota bulunamadıysa (Örn: /hakkimizda -> /tr/hakkimizda) Locale ekleyip yönlendir
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip static files and api routes
        '/((?!api|_next/static|_next/image|assets|favicon.ico).*)',
    ],
}
