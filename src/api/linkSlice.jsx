import { runtimeConfig } from "../config/runtime";

export async function getLinks() {
    const { apiBase, token } = runtimeConfig;

    const response = await fetch(`${apiBase}/links`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }

    return response.json();
}

export async function createLink(link) {
    const { apiBase, token } = runtimeConfig;

    const response = await fetch(`${apiBase}/links`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(link),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }

    return response.json();
}
