import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { useAuthStore } from "src/stores/auth";

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Adding navigation guards
  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    // Check if the route requires authentication
    // Check if the route requires authentication
    if (to.meta.requiresAuth) {
      if (!authStore.isAuthenticated) {
        next({ name: "login" });
      } else if (to.meta.role && authStore.role !== to.meta.role) {
        // If the user's role doesn't match the route's required role
        next("/unauthorized");
      } else {
        next();
      }
    } else {
      next();
    }
  });

  return Router;
});
