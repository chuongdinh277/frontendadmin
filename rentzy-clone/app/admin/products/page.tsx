'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

/* =======================
   TYPE
======================= */
type Product = {
  id: number;
  name: string;
  price: number;
  category: string | null;
  image: string | null;
  status: 'AVAILABLE' | 'RENTED';
};

/* =======================
   MOCK DATA (FRONTEND ONLY)
======================= */
const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Váy Dạ Hội Kim Sa',
    price: 500000,
    category: 'Váy',
    image: '',
    status: 'AVAILABLE',
  },
  {
    id: 2,
    name: 'Vest Nam Cao Cấp',
    price: 400000,
    category: 'Vest',
    image: '',
    status: 'RENTED',
  },
  {
    id: 3,
    name: 'Áo Dài Truyền Thống',
    price: 300000,
    category: 'Áo Dài',
    image: '',
    status: 'AVAILABLE',
  },
];

/* =======================
   PAGE
======================= */
export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('ALL');

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Váy',
    image: '',
  });

  /* =======================
     LOAD MOCK DATA
  ======================= */
  useEffect(() => {
    setProducts(MOCK_PRODUCTS);
    setLoading(false);
  }, []);

  /* =======================
     ADD PRODUCT (FRONTEND)
  ======================= */
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      id: Date.now(),
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      image: formData.image || null,
      status: 'AVAILABLE',
    };

    setProducts([newProduct, ...products]);
    setIsModalOpen(false);
    setFormData({ name: '', price: '', category: 'Váy', image: '' });
  };

  /* =======================
     STATS
  ======================= */
  const totalProducts = products.length;
  const rentingCount = products.filter(p => p.status === 'RENTED').length;
  const availableCount = products.filter(p => p.status === 'AVAILABLE').length;

  const filteredProducts =
    filterCategory === 'ALL'
      ? products
      : products.filter(p => p.category === filterCategory);

  /* =======================
     RENDER
  ======================= */
  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-900">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-3xl font-bold">Kho Sản Phẩm</h1>
            <p className="text-gray-500">Quản lý sản phẩm cho thuê</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin" className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              ⬅ Quay lại
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              + Thêm sản phẩm
            </button>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard label="Tổng kho" value={totalProducts} color="bg-blue-50 text-blue-700" />
          <StatCard label="Đang cho thuê" value={rentingCount} color="bg-orange-50 text-orange-700" />
          <StatCard label="Sẵn sàng" value={availableCount} color="bg-green-50 text-green-700" />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 border-b bg-gray-50 flex gap-4 items-center">
          <span className="font-bold text-sm text-gray-600">Lọc theo:</span>
          <select
            className="border px-3 py-1 rounded text-sm"
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
          >
            <option value="ALL">Tất cả</option>
            <option value="Váy">Váy</option>
            <option value="Vest">Vest</option>
            <option value="Áo Dài">Áo Dài</option>
            <option value="Phụ Kiện">Phụ Kiện</option>
          </select>
        </div>

        <table className="w-full text-left">
          <thead className="text-xs uppercase bg-white border-b">
            <tr>
              <th className="px-6 py-4">Mã</th>
              <th className="px-6 py-4">Sản phẩm</th>
              <th className="px-6 py-4">Danh mục</th>
              <th className="px-6 py-4">Giá/ngày</th>
              <th className="px-6 py-4">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-6">Đang tải...</td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  Không có sản phẩm
                </td>
              </tr>
            ) : (
              filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-xs font-mono">#SP-{p.id}</td>
                  <td className="px-6 py-4 font-medium">{p.name}</td>
                  <td className="px-6 py-4 text-sm">{p.category}</td>
                  <td className="px-6 py-4 font-bold text-orange-600">
                    {p.price.toLocaleString()}đ
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-bold rounded-full ${
                        p.status === 'AVAILABLE'
                          ? 'bg-green-50 text-green-600'
                          : 'bg-red-50 text-red-600'
                      }`}
                    >
                      {p.status === 'AVAILABLE' ? 'Sẵn sàng' : 'Đang thuê'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <form
            onSubmit={handleAddProduct}
            className="bg-white p-6 rounded-xl w-full max-w-md space-y-4"
          >
            <h3 className="text-lg font-bold">Thêm sản phẩm</h3>

            <input
              required
              placeholder="Tên sản phẩm"
              className="w-full border px-3 py-2 rounded"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
            />

            <input
              required
              type="number"
              placeholder="Giá thuê"
              className="w-full border px-3 py-2 rounded"
              value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })}
            />

            <select
              className="w-full border px-3 py-2 rounded"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Váy">Váy</option>
              <option value="Vest">Vest</option>
              <option value="Áo Dài">Áo Dài</option>
              <option value="Phụ Kiện">Phụ Kiện</option>
            </select>

            <input
              placeholder="Link ảnh"
              className="w-full border px-3 py-2 rounded"
              value={formData.image}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
            />

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Huỷ
              </button>
              <button className="px-4 py-2 bg-black text-white rounded">
                Lưu
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

/* =======================
   STAT CARD
======================= */
function StatCard({ label, value, color }: any) {
  return (
    <div className="p-4 rounded-xl bg-white border shadow-sm flex justify-between">
      <div>
        <p className="text-xs uppercase text-gray-400 font-bold">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className={`px-3 py-1 text-xs font-bold rounded ${color}`}>
        {value > 0 ? 'Active' : 'Empty'}
      </div>
    </div>
  );
}
