// controllers/userController.ts
import { getUserList, createUser } from "@/services/userService";

export async function GET() {
  try {
    const users = await getUserList();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newUser = await createUser(data);
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch {
    return new Response(JSON.stringify({ error: "Failed to create user" }), {
      status: 500,
    });
  }
}
