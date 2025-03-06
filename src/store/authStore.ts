// app/store/authStore.ts
import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface AuthState {
  role: string | null;
  token: string | null;
  name: string | null;
  setAuth: (token: string) => void; // รับเฉพาะ Token
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  token: null,
  name: null,

  // ฟังก์ชันสำหรับตั้งค่า Token และ Decode
  setAuth: (token: string) => {
    try {
      const decoded: any = jwtDecode(token); // Decode Token
      const role = decoded?.Role || null;
      const name = decoded?.Username || null;

      // บันทึกค่าลงใน Store
      set({ role, token, name });

      // บันทึก Token ลงใน sessionStorage
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.setItem("token", token);
      }
    } catch (error) {
      console.error("Invalid token:", error);
      set({ role: null, token: null, name: null });
    }
  },

  // ฟังก์ชันสำหรับล้างค่า
  resetAuth: () => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem("token"); // ลบ Token จาก sessionStorage
    }
    set({ role: null, token: null, name: null });
  },
}));

// เมื่อแอปโหลดครั้งแรก ดึง Token จาก sessionStorage และตั้งค่าใน Store
const initializeAuth = () => {
  if (typeof sessionStorage !== "undefined") {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      useAuthStore.getState().setAuth(storedToken); // ใช้ setAuth เพื่อ Decode และตั้งค่า
    }
  }
};

initializeAuth();
