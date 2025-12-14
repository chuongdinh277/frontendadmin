// app/register/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Gọi API Backend
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Đăng ký thành công! Giờ hãy đăng nhập nhé.");
        router.push('/login'); 
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Đăng ký Rentzy</h2>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Họ và tên</label>
              <input 
                type="text" required 
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-orange-500"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" required 
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-orange-500"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700">Mật khẩu</label>
              <input 
                type="password" required 
                className="w-full px-3 py-2 border rounded-md outline-none focus:ring-orange-500"
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm text-center">{error}</div>}

          <button 
            type="submit" disabled={loading}
            className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800"
          >
            {loading ? 'Đang xử lý...' : 'Đăng ký tài khoản'}
          </button>
        </form>
        
        <div className="text-center mt-4">
           <Link href="/login" className="text-orange-600 hover:text-orange-500 font-medium">
             Đã có tài khoản? Đăng nhập ngay
           </Link>
        </div>
      </div>
    </div>
  );
}