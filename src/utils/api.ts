export type RegisterRequest = {
    email: string;
    password: string;
    name: string;
    role: "student" | "teacher" | string;
};

export type AuthResponse = {
    token: string;
};

const BASE_URL = "http://localhost:8080";

export async function register(requestBody: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const message = await safeReadError(response);
        throw new Error(message);
    }

    return (await response.json()) as AuthResponse;
}

export type LoginRequest = {
    email: string;
    password: string;
};

export async function login(requestBody: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        const message = await safeReadError(response);
        throw new Error(message);
    }

    return (await response.json()) as AuthResponse;
}

async function safeReadError(response: Response): Promise<string> {
    try {
        const data = await response.json();
        if (data && typeof data.message === "string") return data.message;
        return `Request failed with status ${response.status}`;
    } catch {
        return `Request failed with status ${response.status}`;
    }
}


