import type { Metadata } from "next";
import { Roboto  } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Toaster } from "sonner";

const roboto = Roboto ({
  variable: "--font-Redaction-10",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mediqueue",
  description: "MediQueue - Tutor Booking System app",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={roboto.className}
    >
      <body className="min-h-full flex flex-col">
        <Toaster/>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
