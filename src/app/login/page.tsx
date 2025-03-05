// app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!username || !password) {
        setError("กรุณากรอกชื่อผู้ใช้งาน และ รหัสผ่าน");
        return;
      }
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username: username, Pwd: password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("errorData ", errorData);

        if (errorData.status === 401) {
          setError("ชื่อผู้ใช้งาน หรือ รหัสผ่าน ไม่ถูกต้อง" || "Login failed");
          return;
        }
        if (errorData.status === 403) {
          setError("ไม่มีสิทธิ์เข้าใช้ระบบ" || "Login failed");
          return;
        }
        return;
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.token); // เก็บ Token ใน Session Storage
      router.push("/users"); // Redirect ไปยัง /users
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-4 border border-blue-300 rounded-md">
        <div className="text-2xl flex justify-center my-2">เข้าสู่ระบบ</div>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="flex justify-between">
              <div className="w-24">
                <label>ชื่อผู้ใช้งาน :</label>
              </div>
              <InputText
                className="h-8"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="w-24">
              <label>รหัสผ่าน :</label>
            </div>

            <Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              toggleMask
            />
          </div>
          <div className="flex justify-center mt-4">
            <Button label="ตกลง" size="small" className="h-8 w-full" />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}
