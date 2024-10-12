<template>
  <q-layout>
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="toggleLeftDrawer"
          aria-label="Toggle left drawer"
        />
        <q-toolbar-title>
          Lake Forest High School - Personnel Management System
        </q-toolbar-title>
        <q-space />
        <q-btn
          flat
          icon="logout"
          label="Logout"
          @click="handleLogout"
          color="white"
        />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item clickable v-if="isAdmin" @click="navigateTo('/admin')">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Admin Dashboard</q-item-section>
        </q-item>

        <q-item clickable v-if="isEducator" @click="navigateTo('/educator')">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>Educator Dashboard</q-item-section>
        </q-item>

        <q-item clickable v-if="isStudent" @click="navigateTo('/student')">
          <q-item-section avatar>
            <q-icon name="class" />
          </q-item-section>
          <q-item-section>Student Dashboard</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const handleLogout = () => {
  authStore.logout();
};

const navigateTo = (path) => {
  router.push(path);
};

// Role-based visibility
const isAdmin = authStore.role === "admin";
const isEducator = authStore.role === "educator";
const isStudent = authStore.role === "student";
</script>

<style scoped>
.q-header {
  background-color: #1e3a5f;
  color: #ffffff;
}

.q-drawer {
  width: 250px;
}
</style>
