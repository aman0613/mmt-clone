import { API_BASE_URL } from "./api";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type AuthResponse = {
  token: string;
  user: AuthUser;
};

type ApiErrorResponse = {
  message?: string;
};

const AUTH_TOKEN_KEY = "mmt_auth_token";
const AUTH_USER_KEY = "mmt_auth_user";

const getErrorMessage = async (response: Response): Promise<string> => {
  const errorData: ApiErrorResponse = await response.json().catch(() => ({}));

  return errorData.message || "Something went wrong. Please try again.";
};

const saveAuthData = (authData: AuthResponse): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(AUTH_TOKEN_KEY, authData.token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(authData.user));
};

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getCurrentUserFromStorage = (): AuthUser | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedUser = localStorage.getItem(AUTH_USER_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    localStorage.removeItem(AUTH_USER_KEY);
    return null;
  }
};

export const clearAuthData = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

export const register = async (
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const authData: AuthResponse = await response.json();

  saveAuthData(authData);

  return authData;
};

export const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error(await getErrorMessage(response));
  }

  const authData: AuthResponse = await response.json();

  saveAuthData(authData);

  return authData;
};

export const getCurrentUser = async (): Promise<AuthUser> => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("You are not logged in");
  }

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearAuthData();
    }

    throw new Error(await getErrorMessage(response));
  }

  const user: AuthUser = await response.json();

  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }

  return user;
};
