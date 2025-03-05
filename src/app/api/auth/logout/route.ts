// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // ลบ Token (ในกรณีนี้เราไม่ได้จัดเก็บ Token ใน Server)
    return NextResponse.json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
