// app/api/products/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. API Lấy danh sách sản phẩm
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi lấy dữ liệu" }, { status: 500 });
  }
}

// 2. API Thêm sản phẩm mới
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, category, image, description } = body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price), // Chuyển đổi chuỗi thành số
        category,
        image,
        description,
        status: 'AVAILABLE', // Mặc định là sẵn sàng
      }
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi tạo sản phẩm" }, { status: 500 });
  }
}