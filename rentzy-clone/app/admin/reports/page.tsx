// app/admin/reports/page.tsx
export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Xuất Báo Cáo</h1>
      <p className="text-gray-500">Tải xuống các báo cáo chi tiết về hoạt động kinh doanh.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Báo cáo bán hàng */}
        <div className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-center">
            <div>
                <h3 className="font-bold text-lg">Báo cáo Doanh thu tháng này</h3>
                <p className="text-sm text-gray-500">Định dạng: Excel (.xlsx)</p>
            </div>
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 font-bold">
                ⬇ Tải xuống
            </button>
        </div>

        {/* Báo cáo tồn kho */}
        <div className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-center">
            <div>
                <h3 className="font-bold text-lg">Báo cáo Tồn kho sản phẩm</h3>
                <p className="text-sm text-gray-500">Định dạng: PDF</p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-bold">
                ⬇ Tải xuống
            </button>
        </div>

        {/* Báo cáo khách hàng */}
        <div className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-center">
            <div>
                <h3 className="font-bold text-lg">Danh sách Khách hàng VIP</h3>
                <p className="text-sm text-gray-500">Định dạng: CSV</p>
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold">
                ⬇ Tải xuống
            </button>
        </div>

      </div>
    </div>
  );
}