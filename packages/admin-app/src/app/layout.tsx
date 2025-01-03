import Header from "@features/Header";
import "./globals.css";
import { ModalProvider } from "~/contexts/modal";
import Modal from "@features/Modal";

export const runtime = "edge";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ModalProvider>
      <html lang="en" className="bg-white text-slate-900">
        <body className="relative w-[100vw]">
          <Header className="fixed top-0 left-0 right-0 z-[998]" />
          <div className="relative w-full h-[100vh] pt-header">{children}</div>
          <Modal />
        </body>
      </html>
    </ModalProvider>
  );
}
