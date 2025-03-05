// app/users/page.tsx
"use client";
import { useEffect, useState } from "react";
import LogoutButton from "@/components/LogoutButton";
import jwt from "jsonwebtoken";
import AddButton from "@/components/AddButton";
import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import { useAuth } from "@/context/AuthContext";

interface User {
  Username: string;
  FullName: string;
  Cancel: string;
  CanEditUser: string;
  OldPk: string;
}

export default function UsersPage() {
  const { role, token, name } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const data = await response.json();
      console.log(data);

      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <div>
        <h1>Welcome, {name}</h1>
        <p>Your role is: {role}</p>
      </div>
      <div>
        <AddButton />
        <DeleteButton />
        <EditButton />
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.Username}>
            <strong>{user.FullName}</strong> ({user.Username}) |
            {user.Cancel ? "Cancelled" : "Active"} |{user.Cancel}
            {user.CanEditUser ? "Can Edit" : "Cannot Edit"}|{user.CanEditUser}
          </li>
        ))}
      </ul>
      <LogoutButton />
    </div>
  );
}
