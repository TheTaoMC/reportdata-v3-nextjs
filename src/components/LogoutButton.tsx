// components/LogoutButton.tsx
"use client";
import { useRouter } from "next/navigation";
import { Button } from "@chakra-ui/react"

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // ลบ Token จาก Session Storage
    router.push("/login"); // Redirect ไปยัง Login
  };

  return (
    <Button onClick={handleLogout}>ออกจากระบบ</Button>
  );
}
