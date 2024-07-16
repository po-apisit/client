import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // ตรวจสอบเส้นทาง
  if (request.nextUrl.pathname === '/') {
    // เปลี่ยนเส้นทางไปที่ /home/hero
    return NextResponse.redirect(new URL('/community', request.url));
  }
  // ปล่อยให้ผ่านไปที่เส้นทางอื่นๆ โดยไม่เปลี่ยนแปลง
  return NextResponse.next();
}

// ระบุว่า middleware นี้จะทำงานที่เส้นทางใดบ้าง
export const config = {
  matcher: '/',
};
