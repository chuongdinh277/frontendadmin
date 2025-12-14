'use client';

import React, { useState } from 'react';

/* =======================
   KIỂU DỮ LIỆU
======================= */
type UserRole = 'ADMIN' | 'USER';

type Customer = {
  id: number;
  name: string | null;
  email: string;
  role: UserRole;
  ordersCount: number;
  createdAt: string;
};

/* =======================
   MOCK DATA
======================= */
const MOCK_CUSTOMERS: Customer[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    email: 'a@gmail.com',
    role: 'USER',
    ordersCount: 3,
    createdAt: '2024-11-12'
  },
  {
    id: 2,
    name: 'Trần Thị B',
    email: 'b@gmail.com',
    role: 'USER',
    ordersCount: 1,
    createdAt: '2024-12-01'
  },
  {
    id: 3,
    name: 'Admin Root',
    email: 'admin@rentzy.vn',
    role: 'ADMIN',
    ordersCount: 0,
    createdAt: '2024-10-05'
  }
];

/* =======================
   PAGE
======================= */
export default function CustomersPage() {
  const [users] = useState<Customer[]>(MOCK_CUSTOMERS);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Danh Sách Khách Hàng
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-4">Tên khách hàng</th>
              <th className="px-6 py-4">Email / Liên hệ</th>
              <th className="px-6 py-4">Vai trò</th>
              <th className="px-6 py-4 text-center">Số đơn đã thuê</th>
              <th className="px-6 py-4">Ngày tham gia</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.map(user => (
              <tr key={user.id} className="hover:bg-gray-50">
                {/* NAME */}
                <td className="px-6 py-4 font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                      {user.name
                        ? user.name.charAt(0).toUpperCase()
                        : 'U'}
                    </div>
                    {user.name || 'Chưa đặt tên'}
                  </div>
                </td>

                {/* EMAIL */}
                <td className="px-6 py-4 text-gray-600">
                  {user.email}
                </td>

                {/* ROLE */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-bold ${
                      user.role === 'ADMIN'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/* ORDER COUNT */}
                <td className="px-6 py-4 font-bold text-center">
                  {user.ordersCount}
                </td>

                {/* CREATED */}
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
