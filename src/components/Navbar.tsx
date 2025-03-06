// components/Navbar.tsx
"use client";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

const Navbar = () => {
  const bg = "gray.800";
  const color = "white";
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
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
