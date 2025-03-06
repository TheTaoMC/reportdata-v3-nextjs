// components/Navbar.tsx
"use client";
import { Box, Flex, Link, Text, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const { role, token, name } = useAuth();
  const bg = "gray.800";
  const color = "white";

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Remove Token from Session Storage
    router.push("/login"); // Redirect to Login
  };

  return (
    <Box as="nav" bg={bg} color={color} py={4} px={8} boxShadow="sm">
      <Flex align="center" justify="space-between">
        {/* Logo */}
        <Text fontSize="xl" fontWeight="bold">
          My App
        </Text>

        {/* Navigation Links */}
        <Flex align="center" gap={4}>
          <Link as={NextLink} href="/" fontWeight="medium" color={color}>
            Home
          </Link>
          <Link as={NextLink} href="/about" fontWeight="medium" color={color}>
            About
          </Link>
          <Link as={NextLink} href="/contact" fontWeight="medium" color={color}>
            Contact
          </Link>

          {/* Logout Button */}
          <Button
            onClick={handleLogout} // Pass the function reference
            colorScheme="red"
            size="sm"
          >
            ออกจากระบบ
          </Button>
        </Flex>
      </Flex>
      <Text className="flex justify-end">Welcome, {name} role is: {role}</Text>
    </Box>
  );
};

export default Navbar;