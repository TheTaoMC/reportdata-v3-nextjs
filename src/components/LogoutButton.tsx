// components/LogoutButton.tsx
"use client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // ลบ Token จาก Session Storage
    router.push("/login"); // Redirect ไปยัง Login
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "10px 20px",
        background: "#ff4d4d",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}
