// app/auth-layout.tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();


  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect ไปยัง Login หากไม่มี Token
    }
  }, [router]);

  return <>{children}</>;
}
