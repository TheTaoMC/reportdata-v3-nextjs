// components/AddButton.tsx
"use client";
import { useRouter } from "next/navigation";

export default function AddButton({ onAdd }: { onAdd: () => void }) {
    return (
        <button
            onClick={onAdd}
            style={{
                padding: "10px 20px",
                background: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }}
        >
            เพิ่ม
        </button>
    );
}