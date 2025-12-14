'use client';

import React, { useMemo } from 'react';

/* =======================
   KIỂU DỮ LIỆU
======================= */
type Order = {
  id: number;
  totalPrice: number;
};

/* =======================
   MOCK DATA
======================= */
const MOCK_ORDERS: Order[] = [
  { id: 1, totalPrice: 1200000 },
  { id: 2, totalPrice: 800000 },
  { id: 3, totalPrice: 1500000 },
  { id: 4, totalPrice: 500000 }
];

export default function RevenuePage() {

  /* =======================
     TÍNH TOÁN DOANH THU
  ======================= */
  const { totalRevenue, totalOrders, avgOrderValue } = useMemo(() => {
    const totalRevenue = MOCK_ORDERS.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    const totalOrders = MOCK_ORDERS.length;
    const avgOrderValue =
      totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return { totalRevenue, totalOrders, avgOrderValue };
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Báo Cáo Doanh Thu
      </h1>

      {/* Thẻ chỉ số */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Tổng Doanh Thu"
          value={`${totalRevenue.toLocaleString()}đ`}
          color="text-emerald-600"
        />
        <MetricCard
          title="Tổng Số Đơn"
          value={`${totalOrders} đơn`}
          color="text-blue-600"
        />
        <MetricCard
          title="Trung Bình / Đơn"
          value={`${avgOrderValue.toLocaleString()}đ`}
          color="text-orange-600"
        />
      </div>

      {/* Placeholder biểu đồ */}
      <div className="bg-white p-6 rounded-xl shadow-sm h-80 flex flex-col justify-center items-center border border-dashed text-gray-400">
        <span className="text-4xl mb-2">📈</span>
        <p className="text-center">
          Khu vực hiển thị biểu đồ tăng trưởng <br />
          (Demo frontend – có thể tích hợp Chart.js sau)
        </p>
      </div>
    </div>
  );
}

/* =======================
   COMPONENT CON
======================= */
function MetricCard({
  title,
  value,
  color
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <p className="text-gray-500 text-sm font-bold uppercase">
        {title}
      </p>
      <p className={`text-3xl font-bold mt-2 ${color}`}>
        {value}
      </p>
    </div>
  );
}
