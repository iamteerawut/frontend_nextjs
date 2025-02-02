"use server";

import { revalidatePath } from "next/cache";
import { User } from "../types/User";
import { redirect } from "next/dist/server/api-utils";

export async function getUsers(): Promise<User[] | any> {
  const res = await fetch("http://localhost:8081/api/users");
  if (!res.ok) {
    return [] as User[];
  }
  const data = await res.json();
  return data as User[];
}

export async function saveUser(
  formData: FormData,
  userId?: number,
): Promise<any> {
  const computeEndpoint =
    userId != 0
      ? process.env.NEXT_PUBLIC_BE_URL + "users/" + userId
      : process.env.NEXT_PUBLIC_BE_URL + "users";
  const computeRequest = {
    method: userId != 0 ? "PUT" : "POST",
    body: formData,
  };
  const res = await fetch(computeEndpoint, computeRequest);
  if (!res.ok) {
    return { message: "Error" };
  }
  revalidatePath('/')
  return { message: "Successfully" };
}

export async function deleteUser(userId: number | undefined) {
  if (userId !== undefined) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}/users/${userId}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      return { message: "Error" };
    }
    revalidatePath('/')
    return { message: "Successfully" };
  }
}

export async function sendEmail(formData: FormData): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BE_URL}emails/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!res.ok) {
    return { message: "Error" };
  }
  return { message: "Successfully" };
}
