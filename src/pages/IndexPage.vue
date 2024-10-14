<template>
  <q-page class="index-page">
    <div class="welcome-container">
      <q-card class="welcome-card">
        <q-card-section>
          <div class="text-h4 text-center">
            Welcome to Lake Forest High School Personnel Management System
          </div>
          <div class="text-subtitle1 text-center q-mt-sm">
            Please select an option below to continue.
          </div>
        </q-card-section>

        <q-card-section class="navigation-section">
          <q-btn
            label="Login to Dashboard"
            icon="login"
            flat
            color="primary"
            @click="navigateTo('/login')"
            class="q-mb-md"
            full-width
          />
          <q-btn
            label="View School Directory"
            icon="school"
            flat
            color="primary"
            @click="navigateTo('/directory')"
            class="q-mb-md"
            full-width
          />
          <q-btn
            label="Help & Support"
            icon="help"
            flat
            color="primary"
            @click="navigateTo('/help')"
            class="q-mb-md"
            full-width
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};
</script>

<style scoped>
.index-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #add8e6, #1e3a5f);
  padding: 20px;
}

.welcome-container {
  max-width: 600px;
  width: 100%;
}

.welcome-card {
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.navigation-section {
  margin-top: 30px;
}
</style>
