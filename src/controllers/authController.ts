// controllers/authController.ts
import { login as authServiceLogin } from "@/services/authService";

export async function POST(request: Request) {
  try {
    const { Username, Pwd } = await request.json();
    const result = await authServiceLogin(Username, Pwd);

    if (!result.success) {
      return new Response(
        JSON.stringify({ message: result.message, status: result.status }),
        {
          status: result.status,
        }
      );
    }

    return new Response(JSON.stringify(result.data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
    });
  }
}
