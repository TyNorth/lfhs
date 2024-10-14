// src/router/routes.js

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") }, // Landing/Login Page
      {
        path: "login",
        component: () => import("pages/LoginPage.vue"),
        name: "login",
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/AdminDashboard.vue") },
    ],
    meta: {
      requiresAuth: true,
      role: "admin",
    },
  },
  {
    path: "/directory",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/DirectoryPage.vue") },
    ],
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/educator",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/EducatorDashboard.vue") },
    ],
    meta: {
      requiresAuth: true,
      role: "educator",
    },
  },
  {
    path: "/student",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/StudentDashboard.vue") },
    ],
    meta: {
      requiresAuth: true,
      role: "student",
    },
  },
  {
    path: "/add-personnel",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/AddPersonnel.vue") }],
    meta: {
      requiresAuth: true,
      role: "admin",
    },
  },
  {
    path: "/edit-personnel/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/EditPersonnel.vue") },
    ],
    meta: {
      requiresAuth: true,
      props: true,
    },
  },
  {
    path: "/unauthorized",
    component: () => import("layouts/UnauthorizedLayout.vue"),
    children: [
      { path: "", component: () => import("pages/ErrorUnauthorized.vue") },
    ],
    meta: {
      requiresAuth: false,
    },
  },

  // Always leave this as last one
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
