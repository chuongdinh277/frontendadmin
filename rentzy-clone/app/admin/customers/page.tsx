// app/admin/customers/page.tsx
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function CustomersPage() {
  // Lấy danh sách User, sắp xếp người mới nhất lên đầu
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { orders: true } } } // Đếm xem họ đã thuê bao nhiêu đơn
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Danh Sách Khách Hàng</h1>
      
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-bold">
            <tr>
              <th className="px-6 py-4">Tên khách hàng</th>
              <th className="px-6 py-4">Email / Liên hệ</th>
              <th className="px-6 py-4">Vai trò</th>
              <th className="px-6 py-4">Số đơn đã thuê</th>
              <th className="px-6 py-4">Ngày tham gia</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        {user.name || "Chưa đặt tên"}
                    </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 font-bold text-center w-32">
                    {user._count.orders}
                </td>
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