'use client';

import React, { useState } from 'react';
import Link from 'next/link';

/* =======================
   KIỂU DỮ LIỆU
======================= */
type OrderStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'RENTED'
  | 'COMPLETED'
  | 'CANCELLED';

type Order = {
  id: number;
  status: OrderStatus;
  totalPrice: number;
  startDate: string;
  endDate: string;
  user: {
    name: string;
    email: string;
  };
  product: {
    name: string;
  };
};

/* =======================
   MOCK DATA
======================= */
const MOCK_ORDERS: Order[] = [
  {
    id: 1001,
    status: 'PENDING',
    totalPrice: 1200000,
    startDate: '2025-01-05',
    endDate: '2025-01-07',
    user: { name: 'Nguyễn Văn A', email: 'a@gmail.com' },
    product: { name: 'Váy Dạ Hội Kim Sa' }
  },
  {
    id: 1002,
    status: 'RENTED',
    totalPrice: 800000,
    startDate: '2025-01-03',
    endDate: '2025-01-04',
    user: { name: 'Trần Thị B', email: 'b@gmail.com' },
    product: { name: 'Vest Nam Cao Cấp' }
  },
  {
    id: 1003,
    status: 'COMPLETED',
    totalPrice: 500000,
    startDate: '2024-12-28',
    endDate: '2024-12-29',
    user: { name: 'Lê Minh C', email: 'c@gmail.com' },
    product: { name: 'Áo Dài Truyền Thống' }
  }
];

/* =======================
   PAGE
======================= */
export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [filterStatus, setFilterStatus] = useState<'ALL' | OrderStatus>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  /* =======================
     UPDATE STATUS (LOCAL)
  ======================= */
  const handleUpdateStatus = (id: number, newStatus: OrderStatus) => {
    if (!confirm(`Đổi trạng thái đơn #${id}?`)) return;

    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  /* =======================
     FILTER + SEARCH
  ======================= */
  const filteredOrders = orders.filter(order => {
    const matchStatus =
      filterStatus === 'ALL' || order.status === filterStatus;

    const matchSearch =
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toString().includes(searchTerm);

    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900">
      {/* HEADER */}
      <div className="flex justify-between items-end mb-6">
        <h1 className="text-3xl font-bold">Quản Lý Đơn Thuê</h1>
        <Link
          href="/admin"
          className="px-4 py-2 bg-white border rounded hover:bg-gray-50 text-sm"
        >
          ⬅ Quay lại Dashboard
        </Link>
      </div>

      {/* TOOLBAR */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4 justify-between">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Tìm theo tên khách hoặc mã đơn..."
          className="border px-4 py-2 rounded-lg w-full md:w-1/3"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />

        {/* FILTER */}
        <select
          className="border px-3 py-2 rounded-lg text-sm"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as any)}
        >
          <option value="ALL">Tất cả</option>
          <option value="PENDING">⏳ Chờ duyệt</option>
          <option value="APPROVED">🚚 Đã duyệt</option>
          <option value="RENTED">🤝 Đang thuê</option>
          <option value="COMPLETED">✅ Hoàn thành</option>
          <option value="CANCELLED">❌ Đã hủy</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Đơn</th>
              <th className="px-6 py-4">Khách</th>
              <th className="px-6 py-4">Thời gian</th>
              <th className="px-6 py-4">Tổng tiền</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Xử lý</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-500">
                  Không có đơn hàng
                </td>
              </tr>
            ) : (
              filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-bold text-blue-600">
                    #{order.id}
                    <div className="text-sm text-gray-700 font-medium">
                      {order.product.name}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-medium">{order.user.name}</div>
                    <div className="text-xs text-gray-500">
                      {order.user.email}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm">
                    <div>Từ: {order.startDate}</div>
                    <div>Đến: {order.endDate}</div>
                  </td>

                  <td className="px-6 py-4 font-bold text-orange-600">
                    {order.totalPrice.toLocaleString()}đ
                  </td>

                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>

                  <td className="px-6 py-4 text-right">
                    <select
                      className="border px-2 py-1 rounded text-xs"
                      value={order.status}
                      onChange={e =>
                        handleUpdateStatus(
                          order.id,
                          e.target.value as OrderStatus
                        )
                      }
                    >
                      <option value="PENDING">⏳ Chờ duyệt</option>
                      <option value="APPROVED">🚚 Đã duyệt</option>
                      <option value="RENTED">🤝 Đang thuê</option>
                      <option value="COMPLETED">✅ Hoàn thành</option>
                      <option value="CANCELLED">❌ Hủy</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =======================
   STATUS BADGE
======================= */
function StatusBadge({ status }: { status: OrderStatus }) {
  const map: any = {
    PENDING: 'bg-yellow-100 text-yellow-700',
    APPROVED: 'bg-blue-100 text-blue-700',
    RENTED: 'bg-purple-100 text-purple-700',
    COMPLETED: 'bg-green-100 text-green-700',
    CANCELLED: 'bg-red-100 text-red-700'
  };

  const label: any = {
    PENDING: 'Chờ duyệt',
    APPROVED: 'Đã duyệt',
    RENTED: 'Đang thuê',
    COMPLETED: 'Hoàn thành',
    CANCELLED: 'Đã hủy'
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-bold ${map[status]}`}
    >
      {label[status]}
    </span>
  );
}
