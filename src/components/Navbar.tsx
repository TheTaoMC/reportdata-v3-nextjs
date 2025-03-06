// components/Navbar.tsx
"use client";
import {
  Box,
  Flex,
  Link,
  Text,
  Button,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  MenuTriggerItem,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

const Navbar = () => {
  const { role, name, token } = useAuthStore();
  const resetAuth = useAuthStore((state) => state.resetAuth);
  const router = useRouter();
  const bg = "gray.800";
  const color = "white";

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Remove Token from Session Storage
    resetAuth(); // Reset Auth Store
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

          {/* Drop Down Menu */}

          <MenuRoot>
            <MenuTrigger asChild>
              <Button size="sm">Open</Button>
            </MenuTrigger>
            <MenuContent position={"absolute"} top={"55px"} right={"70px"}>
              <MenuItem value="new-txt">New Text File</MenuItem>
              <MenuItem value="new-file">New File...</MenuItem>
              <MenuItem value="new-win">New Window</MenuItem>
              <MenuItem value="open-file">Open File...</MenuItem>
              <MenuItem value="export">Export</MenuItem>
            </MenuContent>
          </MenuRoot>

          {/* Logout Button */}
          {token ? (
            <Button
              onClick={handleLogout} // Pass the function reference
              colorScheme="red"
              size="sm"
            >
              ออกจากระบบ
            </Button>
          ) : (
            <Button
              onClick={handleLogout} // Pass the function reference
              colorScheme="red"
              size="sm"
            >
              เข้าสู่ระบบ
            </Button>
          )}
        </Flex>
      </Flex>
      <Text className="flex justify-end">
        Welcome, {name} role is: {role}
      </Text>
    </Box>
  );
};

export default Navbar;
