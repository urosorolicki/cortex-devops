import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Cortex AI Platform - DevOps Architecture",
  description: "Production-ready DevOps architecture for on-premise AI platform with GPU inference services",
  keywords: ["DevOps", "AI", "Kubernetes", "GPU", "Infrastructure", "Security", "CI/CD"],
  authors: [{ name: "Uros Orolicki" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
          <Navigation />
          <main className="relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
