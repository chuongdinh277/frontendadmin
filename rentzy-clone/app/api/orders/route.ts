// app/api/orders/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Lấy danh sách đơn hàng
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,    // Lấy thông tin khách
        product: true  // Lấy thông tin sản phẩm
      }
    });
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi lấy đơn hàng" }, { status: 500 });
  }
}

// 2. Cập nhật trạng thái đơn hàng (Duyệt, Hủy, Hoàn thành)
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body; // Lấy ID đơn và Trạng thái mới

    const updatedOrder = await prisma.order.update({
      where: { id: id },
      data: { status: status }
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi cập nhật" }, { status: 500 });
  }
}