// components/EditButton.tsx
"use client";
import { useRouter } from "next/navigation";

export default function EditButton({ onEdit }: { onEdit: () => void }) {
  return (
    <button
      onClick={onEdit}
      style={{
        padding: "10px 20px",
        background: "#2196f3",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      แก้ไข
    </button>
  );
}
