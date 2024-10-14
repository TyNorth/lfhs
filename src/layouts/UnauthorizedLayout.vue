<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-negative text-white">
      <q-toolbar>
        <q-toolbar-title>
          Unauthorized Access - Lake Forest High School
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
// No additional script setup required for layout
</script>

<style scoped>
.q-header {
  background-color: #b71c1c;
  color: #ffffff;
}
</style>
