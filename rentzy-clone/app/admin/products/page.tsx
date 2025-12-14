// app/admin/products/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Định nghĩa kiểu dữ liệu cho sản phẩm
type Product = {
  id: number;
  name: string;
  price: number;
  category: string | null;
  image: string | null;
  status: string;
};

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('ALL');

  // Form data để thêm mới
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Váy',
    image: '',
    description: ''
  });

  // 1. Load dữ liệu từ API khi vào trang
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Lỗi load sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  // 2. Xử lý thêm mới sản phẩm
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        alert("Thêm sản phẩm thành công!");
        setIsModalOpen(false); // Đóng modal
        setFormData({ name: '', price: '', category: 'Váy', image: '', description: '' }); // Reset form
        fetchProducts(); // Load lại danh sách
      } else {
        alert("Lỗi khi thêm sản phẩm");
      }
    } catch (error) {
      alert("Lỗi kết nối");
    }
  };

  // 3. Tính toán thống kê (Logic Frontend)
  const totalProducts = products.length;
  const rentingCount = products.filter(p => p.status === 'RENTED').length;
  const availableCount = products.filter(p => p.status === 'AVAILABLE').length;

  // 4. Lọc sản phẩm theo danh mục
  const filteredProducts = filterCategory === 'ALL' 
    ? products 
    : products.filter(p => p.category === filterCategory);

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans text-gray-900">
      
      {/* Header & Stats */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">Kho Sản Phẩm</h1>
                <p className="text-gray-500">Quản lý nhập xuất, trạng thái đồ cho thuê</p>
            </div>
            <div className="flex gap-3">
                <Link href="/admin" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 font-medium">⬅ Quay lại</Link>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 font-medium flex items-center gap-2"
                >
                    <span>+</span> Thêm sản phẩm
                </button>
            </div>
        </div>

        {/* Các thẻ thống kê nhanh */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard label="Tổng kho" value={totalProducts} color="bg-blue-50 text-blue-700" />
            <StatCard label="Đang cho thuê" value={rentingCount} color="bg-orange-50 text-orange-700" />
            <StatCard label="Sẵn sàng" value={availableCount} color="bg-green-50 text-green-700" />
        </div>
      </div>

      {/* Bộ lọc & Bảng dữ liệu */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {/* Toolbar Lọc */}
        <div className="p-4 border-b border-gray-100 flex gap-4 items-center bg-gray-50">
            <span className="font-bold text-sm text-gray-600">Lọc theo:</span>
            <select 
                className="px-3 py-1 border rounded text-sm outline-none focus:ring-2 focus:ring-orange-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
            >
                <option value="ALL">Tất cả danh mục</option>
                <option value="Váy">👗 Váy Dạ Hội</option>
                <option value="Vest">👔 Vest Nam</option>
                <option value="Áo Dài">👘 Áo Dài</option>
                <option value="Phụ Kiện">👜 Phụ Kiện</option>
            </select>
        </div>

        <table className="w-full text-left">
          <thead className="bg-white text-gray-500 uppercase text-xs font-bold border-b">
            <tr>
              <th className="px-6 py-4">Mã SP</th>
              <th className="px-6 py-4">Sản phẩm</th>
              <th className="px-6 py-4">Danh mục</th>
              <th className="px-6 py-4">Giá thuê/ngày</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
                <tr><td colSpan={6} className="text-center py-8">Đang tải dữ liệu...</td></tr>
            ) : filteredProducts.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500">Không tìm thấy sản phẩm nào.</td></tr>
            ) : (
                filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-mono text-xs text-gray-500">#SP-{product.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden flex-shrink-0 border">
                             {product.image ? <img src={product.image} className="w-full h-full object-cover" /> : <div className="w-full h-full grid place-items-center text-[10px]">NO IMG</div>}
                        </div>
                        <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">{product.category || 'Khác'}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-orange-600">{product.price.toLocaleString()}đ</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                        product.status === 'AVAILABLE' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-red-50 text-red-600 border-red-200'
                    }`}>
                      {product.status === 'AVAILABLE' ? 'Sẵn sàng' : 'Đang thuê'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Sửa</button>
                    <button className="text-red-500 hover:text-red-700 text-sm font-medium">Xóa</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- MODAL (POPUP) THÊM SẢN PHẨM --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold">Thêm Sản Phẩm Mới</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                </div>
                
                <form onSubmit={handleAddProduct} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tên sản phẩm</label>
                        <input 
                            required type="text" 
                            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Ví dụ: Váy dạ hội kim sa"
                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Giá thuê (VNĐ)</label>
                            <input 
                                required type="number" 
                                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="500000"
                                value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                            <select 
                                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                                value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                            >
                                <option value="Váy">Váy Dạ Hội</option>
                                <option value="Vest">Vest Nam</option>
                                <option value="Áo Dài">Áo Dài</option>
                                <option value="Phụ Kiện">Phụ Kiện</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Link ảnh (URL)</label>
                        <input 
                            type="text" 
                            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="https://imgur.com/..."
                            value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})}
                        />
                    </div>

                    <button type="submit" className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 mt-4">
                        Lưu Sản Phẩm
                    </button>
                </form>
            </div>
        </div>
      )}

    </div>
  );
}

// Component con hiển thị thống kê
function StatCard({ label, value, color }: any) {
    return (
        <div className={`p-4 rounded-xl border border-gray-100 shadow-sm bg-white flex items-center justify-between`}>
            <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{label}</p>
                <p className="text-2xl font-bold mt-1 text-gray-800">{value}</p>
            </div>
            <div className={`px-3 py-1 rounded text-xs font-bold ${color}`}>
                {value > 0 ? 'Active' : 'Empty'}
            </div>
        </div>
    )
}