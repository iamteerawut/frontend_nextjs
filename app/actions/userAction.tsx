"use server";

import { User } from "../types/User";


export async function getUsers(): Promise<User[]> {
    const response = await fetch('http://localhost:8081/api/users');
    const data = await response.json();
    return data as User[];
};

export async function saveUser(user: User) {
    const response = await fetch('http://localhost:8081/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    console.log(response);


    console.log("Submitted data: ");
    return { success: true, message: "Successfully" };
}

export async function deleteUser(userId: number) {
    await fetch(`http://localhost:8081/api/users/${userId}`, {
        method: 'DELETE',
    });
    console.log("delete success")
}

export async function sendEmail(formData: FormData): Promise<void> {
    console.log('send email');
    const response = await fetch('http://localhost:8081/api/emails/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    console.log(response);
}
