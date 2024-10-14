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
        <q-img
          src="src/assets/lakeForest.png"
          alt="Lake Forest Logo"
          style="
            max-width: 50px;
            max-height: 50px;
            margin-right: 15px;
            object-fit: contain;
          "
        />
        <q-toolbar-title>
          Lake Forest High School - Personnel Management System
        </q-toolbar-title>
        <q-space />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item
          clickable
          v-if="isAdmin"
          :active="isActive('/admin')"
          @click="navigateTo('/admin')"
        >
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>Admin Dashboard</q-item-section>
        </q-item>
        <q-item
          clickable
          v-if="isAdmin"
          :active="isActive('/directory')"
          @click="navigateTo('/directory')"
        >
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>Personnel Directory</q-item-section>
        </q-item>

        <q-item
          clickable
          v-if="isEducator"
          :active="isActive('/educator')"
          @click="navigateTo('/educator')"
        >
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>Educator Dashboard</q-item-section>
        </q-item>
        <q-item
          clickable
          v-if="isEducator"
          :active="isActive('/gradebook')"
          @click="navigateTo('/gradebook')"
        >
          <q-item-section avatar>
            <q-icon name="book" />
          </q-item-section>
          <q-item-section>Gradebook</q-item-section>
        </q-item>
        <q-item
          clickable
          v-if="isEducator"
          :active="isActive('/directory')"
          @click="navigateTo('/directory')"
        >
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>Personnel Directory</q-item-section>
        </q-item>

        <q-item
          clickable
          v-if="isStudent"
          :active="isActive('/student')"
          @click="navigateTo('/student')"
        >
          <q-item-section avatar>
            <q-icon name="class" />
          </q-item-section>
          <q-item-section>Student Dashboard</q-item-section>
        </q-item>
        <q-item
          clickable
          v-if="isStudent"
          :active="isActive('/grades')"
          @click="navigateTo('/grades')"
        >
          <q-item-section avatar>
            <q-icon name="assessment" />
          </q-item-section>
          <q-item-section>Grades</q-item-section>
        </q-item>

        <q-item
          clickable
          :active="isActive('/directory')"
          @click="navigateTo('/directory')"
        >
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>School Directory</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "src/stores/auth";
import { useRouter, useRoute } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();
const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const navigateTo = (path) => {
  router.push(path);
};

const isActive = (path) => {
  return route.path === path;
};

// Role-based visibility
const isAdmin = computed(() => authStore.role === "admin");
const isEducator = computed(() => authStore.role === "educator");
const isStudent = computed(() => authStore.role === "student");
</script>

<style scoped>
.q-header {
  background-color: #1e3a5f;
  color: #ffffff;
}

.q-drawer {
  width: 250px;
}

.q-item--active {
  background-color: #e0f7fa !important;
}
</style>
