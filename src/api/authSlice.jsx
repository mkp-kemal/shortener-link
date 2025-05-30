import { runtimeConfig } from "../config/runtime";

export async function loginUser(credentials) {
    const { apiBase, token } = runtimeConfig;

    const response = await fetch(`${apiBase}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }

    return response.json();
}
