import { User } from "@/types";

export const setAuth = (user: User) => {
  localStorage.setItem("token", user.token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getAuth = (): User | null => {
  if (typeof window === "undefined") return null;

  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem("token");
  } catch (err) {
    console.error("LocalStorage access blocked:", err);
    return null;
  }
};

export const removeAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const isAdmin = (): boolean => {
  const user = getAuth();
  return user?.role === "admin";
};
