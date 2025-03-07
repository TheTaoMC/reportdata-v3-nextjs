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

        <Flex align="center" gap={2}>
          {token && (<>
            <Link as={NextLink} href="/" fontWeight="medium" color={color}>
              Dashboard
            </Link>
            <Button size="sm" borderRadius='xl' onClick={() => router.push("/dashboard")}>Dashboard</Button>

            {/* Drop Down Menu */}

            <MenuRoot>
              <MenuTrigger asChild>
                <Button size="sm" borderRadius='xl'>ข้อมูล</Button>
              </MenuTrigger>
              <MenuContent position={"fixed"} top={"55px"} right={"90px"}>
                <MenuItem value="new-txt" onClick={() => router.push("/users")}>ผู้ใช้งาน</MenuItem>
                <MenuItem value="new-file">New File...</MenuItem>
                <MenuItem value="new-win">New Window</MenuItem>
                <MenuItem value="open-file">Open File...</MenuItem>
                <MenuItem value="export">Export</MenuItem>
              </MenuContent>
            </MenuRoot>
          </>
          )}


          {/* Logout Button */}
          {token ? (
            <Button borderRadius='xl'
              onClick={handleLogout} // Pass the function reference
              colorScheme="red"
              size="sm"
            >
              ออกจากระบบ
            </Button>
          ) : (
            <Button borderRadius='xl'
              onClick={handleLogout} // Pass the function reference
              colorScheme="red"
              size="sm"
            >
              เข้าสู่ระบบ
            </Button>
          )}
        </Flex>
      </Flex>
      {token && (

        <Text className="flex justify-end">
          Welcome, {name} role is: {role}
        </Text>
      )}

    </Box>
  );
};

export default Navbar;
