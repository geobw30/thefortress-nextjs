import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SessionWrapper from "../components/layout/SessionWrapper";
import MainContentWrapper from "../components/layout/MainContentWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Fortress - Non-Profit Organization",
  description:
    "Supporting girls and women through education, healthcare, and sustainable development",
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon.ico",
    apple: "/icons/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper session={session}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <MainContentWrapper>
                {children}
                <SpeedInsights />
              </MainContentWrapper>
            </main>
            <Footer />
          </div>
        </SessionWrapper>
      </body>
    </html>
  );
}
