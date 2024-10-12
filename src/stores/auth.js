// src/stores/auth.js
import { defineStore } from "pinia";
import router from "src/router/routes.js"; // Import the router directly to avoid issues with useRouter in Pinia actions
import mockUsers from "src/mocks/mockUsers"; // Import mock users

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    role: null, // 'admin', 'educator', 'student'
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user && !!state.token,
    isAdmin: (state) => state.role === "admin",
    isEducator: (state) => state.role === "educator",
    isStudent: (state) => state.role === "student",
  },
  actions: {
    async login(userData) {
      try {
        // Validate user credentials using mock users
        const user = mockUsers.find(
          (u) =>
            u.username === userData.username && u.password === userData.password
        );

        if (!user) {
          throw new Error("Invalid username or password");
        }

        // Set user data after successful login
        this.user = user.username;
        this.role = user.role;
        this.token = user.token;

        // Set route dynamically based on role
        switch (this.role) {
          case "admin":
            router.push("/admin");
            break;
          case "educator":
            router.push("/educator");
            break;
          case "student":
            router.push("/student");
            break;
          default:
            router.push("/");
        }
      } catch (error) {
        console.error("Login failed", error);
        throw new Error("Login failed");
      }
    },
    logout() {
      this.user = null;
      this.role = null;
      this.token = null;
      router.push("/login");
    },
  },
});
