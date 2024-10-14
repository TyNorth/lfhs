<template>
  <q-page class="error-unauthorized">
    <div class="q-pa-md flex flex-center column">
      <q-icon name="lock" size="100px" color="negative" class="q-mb-md" />
      <div class="text-h4 text-negative q-mb-md">Unauthorized Access</div>
      <div class="text-subtitle1 text-center q-mb-lg">
        You do not have permission to view this page.
      </div>
      <q-btn label="Go Back to Home" color="primary" @click="goHome" />
    </div>
  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goHome = () => {
  router.push("/");
};
</script>

<style scoped>
.error-unauthorized {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
