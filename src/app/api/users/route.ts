/* // app/api/users/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.execute(
      "SELECT Username, FullName, Pwd, CAST(Cancel AS UNSIGNED) AS Cancel ,CAST(CanEditUser AS UNSIGNED) AS CanEditUser FROM Users;"
    );

    // ส่งค่ากลับไปยัง Frontend โดยตรง
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
} */

// app/api/users/route.ts
import { GET as UserGet, POST as UserPost } from "@/controllers/userController";

export const GET = UserGet;
export const POST = UserPost;
