<template>
  <q-page class="login-page">
    <div class="login-container">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="text-h5 text-center">
            Welcome to Lake Forest High School
          </div>
          <div class="text-subtitle2 text-center text-blue">
            Personnel Management System
          </div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="handleLogin">
            <q-input
              v-model="username"
              label="Username"
              outlined
              dense
              clearable
              :rules="[(val) => !!val || 'Username is required']"
              class="q-mb-md"
            />

            <q-input
              v-model="password"
              label="Password"
              type="password"
              outlined
              dense
              clearable
              :rules="[(val) => !!val || 'Password is required']"
              class="q-mb-md"
            />

            <q-btn
              label="Login"
              color="primary"
              type="submit"
              class="full-width q-mt-md"
              :loading="loading"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            flat
            label="Forgot Password?"
            color="dark"
            class="text-blue"
            @click="handleForgotPassword"
          />
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const loading = ref(false);
const loginError = ref(null);

const authStore = useAuthStore();
const router = useRouter();
const $q = useQuasar();

const handleLogin = async () => {
  loading.value = true;
  loginError.value = null;
  try {
    // Attempt to log in with provided credentials
    await authStore.login({
      username: username.value,
      password: password.value,
    });

    // Redirect based on role
    if (authStore.role) {
      switch (authStore.role) {
        case "admin":
          router.push("/admin");
          $q.notify({
            type: "positive",
            message: "Login successful! Welcome, Admin.",
          });
          break;
        case "educator":
          router.push("/educator");
          $q.notify({
            type: "positive",
            message: "Login successful! Welcome, Educator.",
          });
          break;
        case "student":
          router.push("/student");
          $q.notify({
            type: "positive",
            message: "Login successful! Welcome, Student.",
          });
          break;
        default:
          await router.push("/");
      }
    } else {
      throw new Error("User role is not defined");
    }
  } catch (error) {
    // Handle login error (e.g., show error notification)
    $q.notify({
      type: "negative",
      message: "Invalid username or password. Please try again.",
    });
    console.error("Login failed", error);
  } finally {
    loading.value = false;
  }
};

const handleForgotPassword = () => {
  // Logic for handling password reset (e.g., redirect to forgot password page)
  console.log("Forgot password clicked");
};
</script>

<style scoped>
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(45deg, #add8e6, #1e3a5f);
}

.login-container {
  width: 400px;
  max-width: 90%;
}

.q-card {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.text-h5 {
  color: #1e3a5f;
  font-weight: bold;
}

.text-blue {
  color: #1e90ff;
}

.full-width {
  width: 100%;
}
</style>
