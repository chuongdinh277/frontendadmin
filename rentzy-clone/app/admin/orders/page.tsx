// app/admin/orders/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Định nghĩa kiểu dữ liệu (cho code đỡ báo lỗi đỏ)
type Order = {
  id: number;
  status: string;
  totalPrice: number;
  startDate: string;
  endDate: string;
  user: { name: string; email: string };
  product: { name: string; image: string };
};

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Load dữ liệu khi vào trang
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Lỗi tải đơn hàng");
    } finally {
      setLoading(false);
    }
  };

  // 2. Hàm đổi trạng thái đơn (Gọi API PATCH)
  const handleUpdateStatus = async (id: number, newStatus: string) => {
    // Hỏi xác nhận cho chắc
    if (!confirm(`Bạn muốn đổi trạng thái đơn #${id} thành ${newStatus}?`)) return;

    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });

      if (res.ok) {
        alert("Cập nhật thành công!");
        fetchOrders(); // Load lại bảng
      } else {
        alert("Lỗi cập nhật");
      }
    } catch (error) {
      alert("Lỗi kết nối");
    }
  };

  // 3. Logic Lọc & Tìm kiếm
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'ALL' || order.status === filterStatus;
    const matchesSearch = 
        order.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        order.id.toString().includes(searchTerm);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans text-gray-900">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Quản Lý Đơn Thuê</h1>

        </div>
        <Link href="/admin" className="px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 font-medium text-sm">
            ⬅ Quay lại Dashboard
        </Link>
      </div>

      {/* Toolbar: Tìm kiếm & Lọc */}
      <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Ô tìm kiếm */}
        <div className="relative w-full md:w-1/3">
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            <input 
                type="text" 
                placeholder="Tìm tên khách hoặc mã đơn..." 
                className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Bộ lọc trạng thái */}
        <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-600">Trạng thái:</span>
            <select 
                className="border px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
            >
                <option value="ALL">Tất cả</option>
                <option value="PENDING">🟡 Chờ duyệt</option>
                <option value="APPROVED">🔵 Đã duyệt / Đang giao</option>
                <option value="RENTED">🟣 Đang thuê</option>
                <option value="COMPLETED">🟢 Hoàn thành (Đã trả)</option>
                <option value="CANCELLED">🔴 Đã hủy</option>
            </select>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold border-b">
            <tr>
              <th className="px-6 py-4">Đơn hàng</th>
              <th className="px-6 py-4">Khách hàng</th>
              <th className="px-6 py-4">Thời gian</th>
              <th className="px-6 py-4">Tổng tiền</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Xử lý</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
                 <tr><td colSpan={6} className="text-center py-8">Đang tải đơn hàng...</td></tr>
            ) : filteredOrders.length === 0 ? (
                 <tr><td colSpan={6} className="text-center py-8 text-gray-500">Không tìm thấy đơn hàng nào.</td></tr>
            ) : (
                filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition">
                  {/* Cột 1: Thông tin sản phẩm & Mã */}
                  <td className="px-6 py-4">
                    <div className="font-bold text-blue-600">#{order.id}</div>
                    <div className="text-sm font-medium text-gray-800 mt-1">{order.product.name}</div>
                  </td>

                  {/* Cột 2: Khách hàng */}
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{order.user.name || "Khách lẻ"}</div>
                    <div className="text-xs text-gray-500">{order.user.email}</div>
                  </td>

                  {/* Cột 3: Thời gian */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex flex-col">
                        <span>Từ: {new Date(order.startDate).toLocaleDateString('vi-VN')}</span>
                        <span>Đến: {new Date(order.endDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </td>

                  {/* Cột 4: Tổng tiền */}
                  <td className="px-6 py-4 font-bold text-orange-600 text-base">
                    {order.totalPrice.toLocaleString()}đ
                  </td>

                  {/* Cột 5: Badge Trạng thái */}
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>

                  {/* Cột 6: Hành động (Nút bấm) */}
                  <td className="px-6 py-4 text-right">
                    <select 
                        className="text-xs border px-2 py-1 rounded bg-white hover:bg-gray-50 cursor-pointer outline-none"
                        value={order.status}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                    >
                        <option value="PENDING">⏳ Chờ duyệt</option>
                        <option value="APPROVED">🚚 Giao hàng</option>
                        <option value="RENTED">🤝 Đang thuê</option>
                        <option value="COMPLETED">✅ Đã trả / Xong</option>
                        <option value="CANCELLED">❌ Hủy đơn</option>
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

// Component con hiển thị màu trạng thái
function StatusBadge({ status }: { status: string }) {
    let colorClass = "bg-gray-100 text-gray-600";
    let label = status;

    switch (status) {
        case 'PENDING':
            colorClass = "bg-yellow-100 text-yellow-700 border border-yellow-200";
            label = "Chờ duyệt";
            break;
        case 'APPROVED':
            colorClass = "bg-blue-100 text-blue-700 border border-blue-200";
            label = "Đã duyệt";
            break;
        case 'RENTED':
            colorClass = "bg-purple-100 text-purple-700 border border-purple-200";
            label = "Đang thuê";
            break;
        case 'COMPLETED':
            colorClass = "bg-green-100 text-green-700 border border-green-200";
            label = "Hoàn thành";
            break;
        case 'CANCELLED':
            colorClass = "bg-red-100 text-red-700 border border-red-200";
            label = "Đã hủy";
            break;
    }

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${colorClass}`}>
            {label}
        </span>
    );
}