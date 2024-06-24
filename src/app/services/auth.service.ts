export interface LoginTypes {
  email: string;
  password: string;
}
export interface LoginRes {
  message: string;
}
export const login = async (body: LoginTypes): Promise<LoginRes> => {
  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: body.email, password: body.password }),
  });
  const data = await response.json();
  if (response.ok) {
    return { message: data.message };
  } else {
    return { message: data.message || "An error occurred during login" };
  }
};
