// app/admin/revenue/page.tsx
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function RevenuePage() {
  // 1. Lấy tất cả đơn hàng
  const orders = await prisma.order.findMany();

  // 2. Tính toán số liệu
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const totalOrders = orders.length;
  const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Báo Cáo Doanh Thu</h1>

      {/* Các thẻ chỉ số */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
           <p className="text-gray-500 text-sm font-bold uppercase">Tổng Doanh Thu</p>
           <p className="text-3xl font-bold text-emerald-600 mt-2">{totalRevenue.toLocaleString()}đ</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
           <p className="text-gray-500 text-sm font-bold uppercase">Tổng Số Đơn</p>
           <p className="text-3xl font-bold text-blue-600 mt-2">{totalOrders} đơn</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-orange-100">
           <p className="text-gray-500 text-sm font-bold uppercase">Trung Bình / Đơn</p>
           <p className="text-3xl font-bold text-orange-600 mt-2">{avgOrderValue.toLocaleString()}đ</p>
        </div>
      </div>

      {/* Biểu đồ giả lập (Placeholder) */}
      <div className="bg-white p-6 rounded-xl shadow-sm h-80 flex flex-col justify-center items-center border border-dashed text-gray-400">
          <span className="text-4xl mb-2">📈</span>
          <p>Khu vực hiển thị biểu đồ tăng trưởng (Cần tích hợp thư viện Chart.js sau)</p>
      </div>
    </div>
  );
}