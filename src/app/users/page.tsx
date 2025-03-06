// app/users/page.tsx
"use client";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useAuth } from "@/context/AuthContext";
import { Button, Text, Flex,Container } from "@chakra-ui/react"

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

    <Container maxW='8xl'>
      <Flex justify='center'>
        <div><Text padding="2" textStyle="4xl">ผู้ใช้งาน</Text></div>
      </Flex>

      <div className="flex justify-end p-4">
        <Text>Welcome, {name} role is: {role}</Text>
      </div>
      <div>
        <Button>เพิ่ม</Button>
        <Button>แก้ไข</Button>
        <Button colorPalette='red'>ลบ</Button>
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
    </Container>
  );
}
