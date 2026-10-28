import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { pageMetadata, siteUrl } from "@/lib/metadata";
const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  subsets: ["latin", "cyrillic"],
});
import type { ReactNode } from "react";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
export const metadata: Metadata = {
  ...pageMetadata(
    "NoteHub",
    "NoteHub is a simple and efficient application for managing personal notes. Create, search and organize your notes in one place.",
    "/",
  ),
  metadataBase: siteUrl,
};
export default function RootLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${roboto.className}`}>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
