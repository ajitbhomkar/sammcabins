'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import AuthGuard from '@/components/admin/AuthGuard'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  
  // Don't apply auth guard to login page
  const isLoginPage = pathname === '/admin/login'

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <AuthGuard>
      <AdminLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
        {children}
      </AdminLayout>
    </AuthGuard>
  )
}
