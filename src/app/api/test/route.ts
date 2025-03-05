// app/api/test/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.execute("SELECT * FROM Users");
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "test Failed to fetch data" },
      { status: 500 }
    );
  }
}
