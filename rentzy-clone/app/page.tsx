import React from 'react';

export default function RentzyHome() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      
      {/* --- PHẦN 1: HEADER (MENU) --- */}
      <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-extrabold tracking-tighter cursor-pointer">
            RENTZY<span className="text-orange-600">.VN</span>
          </div>

          {/* Search Bar - Ẩn trên mobile, hiện trên PC */}
          <div className="hidden md:flex flex-1 mx-8">
            <input 
              type="text" 
              placeholder="Tìm kiếm trang phục, thương hiệu..." 
              className="w-full bg-gray-100 rounded-full px-5 py-2 outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 text-sm font-semibold">
            <button className="hidden sm:block hover:text-orange-600">Cho thuê đồ</button>
            <button className="hover:text-orange-600">Đăng nhập</button>
            <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition">
              Giỏ hàng (0)
            </button>
          </div>
        </div>
      </nav>

      {/* --- PHẦN 2: BANNER QUẢNG CÁO --- */}
      <section className="relative h-[400px] bg-black text-white flex items-center justify-center">
        {/* Ảnh nền mờ (Giả lập) */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-pink-900 opacity-50"></div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Tủ Đồ Vô Tận Của Bạn</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Thuê trang phục thiết kế cao cấp với giá chỉ từ 100k/ngày
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transition transform">
            Khám Phá Ngay
          </button>
        </div>
      </section>

      {/* --- PHẦN 3: DANH SÁCH SẢN PHẨM (GRID) --- */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          🔥 Xu Hướng Mới Nhất
        </h2>

        {/* Grid Layout: Giống RecyclerView GridLayoutManager */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          
          {/* Sản phẩm 1 */}
          <ProductItem 
            title="Váy Dạ Hội Sparkle" 
            price="350.000đ" 
            img="https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=500&auto=format&fit=crop&q=60"
          />

          {/* Sản phẩm 2 */}
          <ProductItem 
            title="Áo Dài Cách Tân" 
            price="200.000đ" 
            img="https://images.unsplash.com/photo-1583391733958-e02d07e8693d?w=500&auto=format&fit=crop&q=60"
          />

          {/* Sản phẩm 3 */}
          <ProductItem 
            title="Đầm Dự Tiệc Trắng" 
            price="450.000đ" 
            img="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&auto=format&fit=crop&q=60"
          />

          {/* Sản phẩm 4 */}
          <ProductItem 
            title="Blazer Công Sở" 
            price="150.000đ" 
            img="https://images.unsplash.com/photo-1548865166-51f7871e416a?w=500&auto=format&fit=crop&q=60"
          />
          
        </div>
      </main>
    </div>
  );
}

// --- COMPONENT CON (Giống ViewHolder/Fragment) ---
function ProductItem({ title, price, img }: { title: string, price: string, img: string }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl mb-3 aspect-[3/4]">
        <img 
          src={img} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          Mới
        </div>
      </div>
      <h3 className="font-medium text-lg text-gray-800">{title}</h3>
      <p className="text-orange-600 font-bold">{price} <span className="text-sm text-gray-500 font-normal">/ 3 ngày</span></p>
    </div>
  )
}