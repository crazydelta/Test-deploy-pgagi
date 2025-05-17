import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import {
  FiMenu,
  FiBell,
  FiHome,
  FiCloud,
  FiFileText,
  FiTrendingUp,
  FiUser,
} from 'react-icons/fi'
import { useState } from 'react'

interface LayoutProps {
  children: React.ReactNode
  darkMode: boolean
  toggleDarkMode: () => void
}

export default function Layout({ children, darkMode, toggleDarkMode }: LayoutProps) {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = [
    { label: 'Dashboard', href: '/', icon: <FiHome /> },
    { label: 'Weather', href: '/weather', icon: <FiCloud /> },
    { label: 'News', href: '/news', icon: <FiFileText /> },
    { label: 'Finance', href: '/finance', icon: <FiTrendingUp /> },
    { label: 'Profile', href: '/profile', icon: <FiUser /> },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 transform transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:inset-auto`}
      >
        <div className="px-6 py-5.5 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">PGAGI Dashboard</h1>
        </div>
        <nav className="flex flex-col p-4 space-y-1">
          {navItems.map(({ label, href, icon }) => {
            const active = router.pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 ${
                  active ? 'bg-gray-300 dark:bg-gray-700 font-semibold' : ''
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                {icon}
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main section */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 w-full flex items-center justify-between px-4 py-4 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          {/* Mobile menu */}
          <div className="md:hidden">
            <button
              className="text-gray-900 dark:text-white"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <FiMenu size={24} />
            </button>
          </div>

          <div className="flex-1 text-center md:text-left md:ml-0"></div>

          {/* Header right section */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              title="Toggle theme"
            >
              {darkMode ? '🌞' : '🌙'}
            </button>

            <button
              className="p-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
              title="Notifications"
            >
              <FiBell size={20} />
            </button>

            {/* Replace with static placeholder or your own profile logic */}
            <Link href="/profile">
              <Image
                src="https://ui-avatars.com/api/?name=User"
                alt="Profile"
                className="w-8 h-8 rounded-full border-2 border-gray-400 hover:scale-105 transition cursor-pointer"
                width={500} height={300}
              />
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 text-gray-900 dark:text-white">{children}</main>
      </div>
    </div>
  )
}
