// app/login/page.tsx
"use client";
import { useRouter } from "next/navigation";

import { Button, Input, Stack, Text, Box } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { useForm } from "react-hook-form";

interface FormValues {
  username: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username: data.username, Pwd: data.password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("errorData ", errorData);

        if (errorData.status === 401) {
          toast("ชื่อผู้ใช้งาน หรือ รหัสผ่าน ไม่ถูกต้อง");
          return;
        }
        if (errorData.status === 403) {
          toast("ไม่มีสิทธิ์เข้าใช้ระบบ");
          return;
        }
        return;
      }

      const responseData = await response.json();
      sessionStorage.setItem("token", responseData.token); // เก็บ Token ใน Session Storage
      router.push("/users"); // Redirect ไปยัง /users
    } catch (err) {
      toast("กรุณาลองใหม่อีกครั้ง");
    }
  });

  const toast = (e) =>
    toaster.create({
      title: e,
      type: "error",
    });

  return (
    <>
      <div className="w-full bg-red-500 mx-[20px]">
        <div className="flex justify-center items-center h-[90vh] ">
          <Box bg="gray.100" shadow="md" borderRadius="md" padding="4" className="w-[25%]">
            <div className="p-10 m-10">
              <Text paddingY='2' textStyle="2xl">เข้าสู่ระบบ</Text>
            </div>
            <form onSubmit={onSubmit}>
              <Stack gap="4" align="flex-start" maxW="md">
                <Field
                  label="ชื่อผู้ใช้งาน"
                  invalid={!!errors.username}
                  errorText={errors.username?.message}
                >
                  <Input
                    borderWidth="1px"
                    borderColor='blackAlpha.500'
                    {...register("username", {
                      required: "กรุณากรอกชื่อผู้ใช้งาน",
                      validate: (value) => {
                        if (value.trim() === "") {
                          return "Username cannot be empty or just whitespace";
                        }
                        /*                       if (value.length < 3) {
                        return "Username must be at least 3 characters long";
                      } */
                        return true;
                      },
                    })}
                  />
                </Field>
                <Field
                  label="รหัสผ่าน"
                  invalid={!!errors.password}
                  errorText={errors.password?.message}
                >
                  <PasswordInput
                    borderWidth="1px"
                    borderColor='blackAlpha.500'
                    {...register("password", {
                      required: "กรุณากรอกรหัสผ่าน",
                      validate: (value) => {
                        if (value.trim() === "") {
                          return "Password cannot be empty or just whitespace";
                        }
                        /*                       if (value.length < 6) {
                        return "Password must be at least 6 characters long";
                      } */
                        return true;
                      },
                    })}
                  />
                </Field>
                <Button className="w-full" type="submit">
                  ตกลง
                </Button>
                <Toaster />
              </Stack>
            </form>
          </Box>
        </div>
      </div>
    </>
  );
}
