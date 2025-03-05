// app/api/users/add/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/lib/db";

export async function POST(request: Request) {
    const { Username, FullName, Pwd, Cancel, CanEditUser } = await request.json();

    if (!Username || !FullName || !Pwd) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
        // Hash Password
        const hashedPassword = await bcrypt.hash(Pwd, 10);

        // Insert into database
        await db.execute(
            "INSERT INTO users (Username, FullName, Pwd, Cancel, CanEditUser) VALUES (?, ?, ?, ?, ?)",
            [Username, FullName, hashedPassword, Cancel || false, CanEditUser || false]
        );

        return NextResponse.json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}