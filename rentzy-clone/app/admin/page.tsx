// app/admin/page.tsx
'use client';
import React from 'react';
import Link from 'next/link';

// Giữ nguyên dữ liệu của bạn
const stats = [
  { label: 'Doanh thu tháng', value: '150,2M đ', trend: '+12% MoM', tone: 'text-emerald-600', bg: 'bg-emerald-50' },
  { label: 'Đơn đang thuê', value: '24', trend: '8 đang giao', tone: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Đơn chờ duyệt', value: '5', trend: '3 cần gọi', tone: 'text-amber-600', bg: 'bg-amber-50' },
  { label: 'Tổng sản phẩm', value: '128', trend: '12 hết size', tone: 'text-purple-600', bg: 'bg-purple-50' },
];

const orders = [
  { id: '#ORD-001', user: 'Nguyễn Văn A', item: 'Váy Dạ Hội Luxury', status: 'Đang thuê', pill: 'bg-blue-100 text-blue-800', price: '500.000đ' },
  { id: '#ORD-002', user: 'Trần Thị B', item: 'Áo Dài Cách Tân', status: 'Chờ duyệt', pill: 'bg-amber-100 text-amber-800', price: '350.000đ' },
  { id: '#ORD-003', user: 'Lê Văn C', item: 'Vest Nam Công Sở', status: 'Đã trả', pill: 'bg-emerald-100 text-emerald-800', price: '200.000đ' },
  { id: '#ORD-004', user: 'Phạm Thị D', item: 'Đầm Maxi Đi Biển', status: 'Quá hạn', pill: 'bg-rose-100 text-rose-800', price: '180.000đ' },
];

const activities = [
  { time: '09:20', text: 'Xác nhận đơn #ORD-005 - giao hôm nay' },
  { time: '08:50', text: 'Thêm sản phẩm “Đầm Satin Midi”' },
  { time: '08:10', text: 'Khách hàng Minh K. thanh toán 1.200.000đ' },
  { time: 'Hôm qua', text: 'Hoàn tất trả đồ #ORD-003, đánh giá 5★' },
];

const topProducts = [
  { name: 'Váy Dạ Hội Luxury', rented: 18 },
  { name: 'Suit Navy Slim', rented: 14 },
  { name: 'Áo Dài Cách Tân', rented: 12 },
  { name: 'Đầm Maxi Biển', rented: 10 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </section>

      {/* Charts & Top Products */}
      <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">Doanh thu 30 ngày</h3>
            <button className="text-sm text-blue-600 hover:underline">Xuất CSV</button>
          </div>
          <div className="p-4">
              <div className="h-40 flex items-center justify-center bg-gray-50 rounded border border-dashed text-gray-400 text-sm">
                  [Biểu đồ doanh thu sẽ nằm ở đây]
              </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">Sản phẩm top</h3>
            <Link href="/admin/products" className="text-sm text-blue-600 hover:underline">Xem kho</Link>
          </div>
          <div className="p-4 space-y-3">
            {topProducts.map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">{p.name}</p>
                  <p className="text-xs text-slate-500">Tần suất thuê cao</p>
                </div>
                <span className="text-sm font-semibold text-blue-600">{p.rented} lượt</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Orders & Activity */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">Đơn thuê gần đây</h3>
            <Link href="/admin/orders" className="text-sm text-blue-600 hover:underline">Xem tất cả</Link>
          </div>
          <table className="w-full text-sm text-slate-600">
            <thead className="bg-slate-50 uppercase text-xs font-semibold text-slate-500">
              <tr>
                <th className="px-6 py-3 text-left">Mã đơn</th>
                <th className="px-6 py-3 text-left">Khách hàng</th>
                <th className="px-6 py-3 text-left">Sản phẩm</th>
                <th className="px-6 py-3 text-left">Trạng thái</th>
                <th className="px-6 py-3 text-left">Tổng tiền</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <TableRow key={order.id} {...order} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">Hoạt động</h3>
          </div>
          <div className="p-4 space-y-4 flex-1">
            {activities.map((act) => (
              <div key={act.time} className="flex gap-3">
                <div className="w-14 text-xs font-semibold text-slate-500">{act.time}</div>
                <div className="flex-1 text-sm text-slate-700">{act.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InfoCard title="Khách hàng mới" value="142" subtitle="7 ngày qua" tone="text-blue-600" highlight="+9% so với trước" />
        <InfoCard title="Tỉ lệ hoàn trả đúng hạn" value="93%" subtitle="Theo tuần" tone="text-emerald-600" highlight="Ổn định" />
        <InfoCard title="Đánh giá trung bình" value="4.8★" subtitle="1.240 lượt" tone="text-amber-600" highlight="Giữ chất lượng" />
      </section>
    </div>
  );
}

// --- Components Con ---
function StatCard({ label, value, trend, tone, bg }: any) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white shadow-sm p-4 ${bg}`}>
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
      <p className={`text-sm font-semibold mt-1 ${tone}`}>{trend}</p>
    </div>
  );
}

function TableRow({ id, user, item, status, pill, price }: any) {
  return (
    <tr className="hover:bg-slate-50">
      <td className="px-6 py-4 font-semibold text-slate-900">{id}</td>
      <td className="px-6 py-4">{user}</td>
      <td className="px-6 py-4">{item}</td>
      <td className="px-6 py-4">
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${pill}`}>{status}</span>
      </td>
      <td className="px-6 py-4 font-semibold text-slate-900">{price}</td>
    </tr>
  );
}

function InfoCard({ title, value, subtitle, highlight, tone }: any) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-4">
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{title}</p>
      <p className="text-2xl font-bold text-slate-900 mt-2">{value}</p>
      <p className="text-sm text-slate-500">{subtitle}</p>
      <p className={`text-sm font-semibold mt-1 ${tone}`}>{highlight}</p>
    </div>
  );
}