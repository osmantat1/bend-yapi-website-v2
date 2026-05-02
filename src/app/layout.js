import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <div className="bg-fixed-layer"></div>
        {children}
      </body>
    </html>
  );
}
