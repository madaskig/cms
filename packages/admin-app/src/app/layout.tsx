import "./globals.css";

export const runtime = "edge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-white text-slate-900">
      <body>
        <main className="relative w-[100vw] min-h-[100vh]">{children}</main>
      </body>
    </html>
  );
}
