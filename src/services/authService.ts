// services/authService.ts
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "@/lib/db";

export async function login(Username: string, Pwd: string) {
  console.log(Username, Pwd);

  try {
    // ดึงข้อมูลผู้ใช้งานจากฐานข้อมูล
    const [rows] = await db.execute(
      "SELECT Username, FullName, Pwd, CAST(Cancel AS UNSIGNED) AS Cancel ,CAST(CanEditUser AS UNSIGNED) AS CanEditUser FROM Users WHERE Username = ?",
      [Username]
    );

    const user = rows[0];

    /* if (!user || !(await bcrypt.compare(Pwd, user.Pwd))) { */

    /*     const isPasswordValid = await bcrypt.compare(Pwd, user.Pwd);
    if (!isPasswordValid) {
      return { success: false, message: "Invalid credentials", status: 401 };
    } */

    if (!user || Pwd !== user.Pwd) {
      return { success: false, message: "Invalid credentials", status: 401 };
    }

    if (user.Cancel === 1) {
      return { success: false, message: "Account is cancelled", status: 403 };
    }

    // สร้าง JWT Token
    const secretKey = process.env.JWT_SECRET || "default-secret-key"; // อ่านค่า Secret Key จาก Environment Variable
    const token = jwt.sign(
      {
        Username: user.Username,
        FullName: user.FullName,
        Role: user.CanEditUser === 1 ? "admin" : "user", // กำหนด Role จาก CanEditUser
      },
      secretKey,
      { expiresIn: "1h" } // กำหนดอายุของ Token เป็น 1 ชั่วโมง
    );

    return {
      success: true,
      data: { token, user },
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Database error", status: 500 };
  }
}
