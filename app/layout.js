import './globals.css'
import { Inter } from 'next/font/google'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Fortress - Non-Profit Organization',
  description: 'Supporting communities through education, healthcare, and sustainable development',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  )
}