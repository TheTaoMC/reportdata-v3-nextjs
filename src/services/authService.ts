// services/authService.ts
import jwt from "jsonwebtoken";
import db from "@/lib/db";
import { RowDataPacket } from "mysql2/promise"; // Import the necessary type

interface User extends RowDataPacket {
  Username: string;
  FullName: string;
  Pwd: string;
  Cancel: number;
  CanEditUser: number;
}

export async function login(Username: string, Pwd: string) {
  console.log(Username, Pwd);

  try {
    // Fetch user data from the database
    const [rows]: [User[], unknown] = await db.execute(
      "SELECT Username, FullName, Pwd, CAST(Cancel AS UNSIGNED) AS Cancel, CAST(CanEditUser AS UNSIGNED) AS CanEditUser FROM Users WHERE Username = ?",
      [Username]
    );

    const user = rows[0];

    if (!user || Pwd !== user.Pwd) {
      return { success: false, message: "Invalid credentials", status: 401 };
    }

    if (user.Cancel === 1) {
      return { success: false, message: "Account is cancelled", status: 403 };
    }

    // Create JWT Token
    const secretKey = process.env.JWT_SECRET || "default-secret-key";
    const token = jwt.sign(
      {
        Username: user.Username,
        FullName: user.FullName,
        Role: user.CanEditUser === 1 ? "admin" : "user",
      },
      secretKey,
      { expiresIn: "1h" }
    );

    return { success: true, token };
  } catch (error) {
    console.error(error);
    return { success: false, message: "An error occurred", status: 500 };
  }
}
