import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
    const user = useAuthStore((state) => state.user);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const login = useAuthStore((state) => state.login);
    const logout = useAuthStore((state) => state.logout);

    return { user, isLoggedIn, login, logout };
};