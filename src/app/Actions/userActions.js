"use server";

import { signIn } from "next-auth/react";

export async function authenticate(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const response = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (response?.error) {
    return response.error;
  }

  return null;
}
