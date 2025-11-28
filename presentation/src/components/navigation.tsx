"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Menu, 
  X, 
  Home, 
  Shield, 
  GitBranch, 
  Monitor, 
  Settings,
  Layers
} from "lucide-react"
import Link from "next/link"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Architecture", href: "/architecture", icon: Layers },
  { name: "Security", href: "/security", icon: Shield },
  { name: "CI/CD", href: "/cicd", icon: GitBranch },
  { name: "Monitoring", href: "/monitoring", icon: Monitor },
  { name: "Implementation", href: "/implementation", icon: Settings },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const toggleMobileMenu = () => {
    console.log('Mobile menu toggle clicked, current state:', mobileMenuOpen)
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Cortex AI Platform
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="relative z-50 -m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-slate-300 hover:bg-slate-800 transition-all duration-200 active:bg-slate-700 min-h-[44px] min-w-[44px] border-2 border-transparent hover:border-slate-600"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
            <div className="relative">
              <Menu className={`h-6 w-6 transition-all duration-200 ${mobileMenuOpen ? 'rotate-90 scale-0' : 'rotate-0 scale-100'}`} />
              <X className={`absolute top-0 left-0 h-6 w-6 transition-all duration-200 ${mobileMenuOpen ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
            </div>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 text-sm font-semibold leading-6 text-slate-100 hover:text-blue-400 transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          ))}
        </div>

      </nav>
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Mobile menu panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-slate-900 shadow-2xl border-l border-slate-700 lg:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Menu
                </span>
                <button
                  type="button"
                  className="rounded-lg p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              {/* Navigation links */}
              <div className="px-4 py-6 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 text-base font-medium text-slate-300 hover:text-blue-400 hover:bg-slate-800 rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}