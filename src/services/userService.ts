// services/userService.ts
import db from "@/lib/db";
import bcrypt from "bcrypt";

export async function getUserList() {
  const [rows] = await db.execute(
    "SELECT Username, FullName, Pwd, CAST(Cancel AS UNSIGNED) AS Cancel ,CAST(CanEditUser AS UNSIGNED) AS CanEditUser FROM Users"
  );
  return rows;
}

interface UserData {
  Username: string;
  FullName: string;
  Pwd: string;
  Cancel?: boolean;
  CanEditUser?: boolean;
}

export async function createUser(data: UserData) {
  const { Username, FullName, Pwd, Cancel, CanEditUser } = data;

  if (!Username || !FullName || !Pwd) {
    throw new Error("Missing required fields");
  }

  const hashedPassword = await bcrypt.hash(Pwd, 10);
  await db.execute(
    "INSERT INTO users (Username, FullName, Pwd, Cancel, CanEditUser) VALUES (?, ?, ?, ?, ?)",
    [Username, FullName, hashedPassword, Cancel || false, CanEditUser || false]
  );

  return { Username, FullName };
}
