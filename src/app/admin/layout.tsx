'use client'

import { useState } from 'react'
import AdminLayout from '@/components/admin/AdminLayout'

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AdminLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}>
      {children}
    </AdminLayout>
  )
}
