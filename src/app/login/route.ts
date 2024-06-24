import { validUser } from "@/utils";
import { randomStringAsBase64Url } from "@/utils/generateToken";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === validUser.email && password === validUser.password) {
    const authToken = randomStringAsBase64Url(20);
    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    response.cookies.set("token", authToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  }
  return NextResponse.json({ message: "Invalid credentails" }, { status: 401 });
}
