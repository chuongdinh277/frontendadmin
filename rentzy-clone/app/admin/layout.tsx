// app/admin/layout.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Dùng để kiểm tra đang ở trang nào để tô màu menu

// Menu dữ liệu
// app/admin/layout.tsx
const navItems = [
  { label: 'Tổng quan', icon: '📊', href: '/admin' },
  { label: 'Sản phẩm', icon: '👗', href: '/admin/products' },
  { label: 'Đơn thuê', icon: '📦', href: '/admin/orders' },
  { label: 'Khách hàng', icon: '👥', href: '/admin/customers' },
  { label: 'Doanh thu', icon: '💰', href: '/admin/revenue' },
  { label: 'Báo cáo', icon: '📑', href: '/admin/reports' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased flex">
      
      {/* --- SIDEBAR CỐ ĐỊNH --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r border-slate-200 transition-transform duration-200 ease-in-out
          md:static md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="h-16 flex items-center justify-center border-b border-slate-200">
          <div className="text-xl font-bold">
            RENTZY<span className="text-orange-500">ADMIN</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`w-full text-left flex items-center px-4 py-3 rounded-lg cursor-pointer font-medium transition ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span className="text-lg mr-2">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-200 space-y-3">
          <div className="rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-500">Hiệu suất tuần</p>
            <p className="text-lg font-bold text-slate-900">+18%</p>
            <p className="text-xs text-emerald-600 font-semibold">Ổn định</p>
          </div>
          <button className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-sm font-semibold">
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Overlay cho mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* --- PHẦN RUỘT THAY ĐỔI (CHILDREN) --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header chung */}
        <header className="h-16 px-4 md:px-6 flex items-center justify-between border-b border-slate-200 bg-white sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100"
              onClick={() => setSidebarOpen((s) => !s)}
            >
              ☰
            </button>
            <div>
              <p className="text-sm text-slate-500">Bảng điều khiển</p>
              <h1 className="text-xl font-bold text-slate-900">Quản trị hệ thống</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="w-9 h-9 rounded-full bg-orange-500 text-white font-semibold grid place-items-center">
                A
              </div>
          </div>
        </header>

        {/* Nội dung trang con sẽ hiện ở đây */}
        <main className="flex-1 overflow-y-auto p-6">
            {children}
        </main>
      </div>
    </div>
  );
}