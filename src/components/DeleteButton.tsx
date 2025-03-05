// components/DeleteButton.tsx
"use client";
import { useRouter } from "next/navigation";

export default function DeleteButton({ onDelete }: { onDelete: () => void }) {
    return (
        <button
            onClick={onDelete}
            style={{
                padding: "10px 20px",
                background: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
            }}
        >
            ลบ
        </button>
    );
}