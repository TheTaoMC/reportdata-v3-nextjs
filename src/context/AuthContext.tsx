// context/AuthContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{
  role: string | null;
  token: string | null;
  name: string | null;
}>({ role: null, token: null, name: null });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("useEffect called");
    const storedToken = sessionStorage.getItem("token");

    if (!storedToken) {
      router.push("/login"); // Redirect ไปยัง Login หากไม่มี Token
      return;
    }

    try {
      const decoded: any = jwt.decode(storedToken);
      const userRole = decoded?.Role || null;
      const userName = decoded?.Username || null;

      if (!userRole) {
        router.push("/login"); // Redirect ไปยัง Login หากไม่มี Role
        return;
      }

      setToken(storedToken); // เก็บ Token ใน State
      setRole(userRole); // เก็บ Role ใน State
      setName(userName); // เก็บ Role ใน State

      console.log("Auth Context Updated:", {
        role: userRole,
        token: storedToken,
        name: userName,
      });
    } catch (error) {
      console.error("Invalid token");
      router.push("/login"); // Redirect ไปยัง Login หาก Token ไม่ถูกต้อง
    }
  }, [router]);

  return (
    <AuthContext.Provider value={{ role, token, name }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
