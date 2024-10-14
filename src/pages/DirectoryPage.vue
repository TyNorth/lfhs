<template>
  <q-page class="directory-page">
    <q-toolbar class="q-mb-md">
      <q-toolbar-title
        >School Directory - Lake Forest High School</q-toolbar-title
      >
    </q-toolbar>

    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Staff Directory</div>
      </q-card-section>
      <q-card-section>
        <div class="directory-grid">
          <q-card
            v-for="person in directoryList"
            :key="person.id"
            class="directory-card"
            style="width: 200px"
          >
            <q-img
              src="src/assets/lakeForest.png"
              alt="Profile Image"
              class="directory-img"
            />
            <q-card-section>
              <div class="text-subtitle1">{{ person.name }}</div>
              <div class="text-caption">{{ person.department }}</div>
            </q-card-section>
            <q-card-actions align="center">
              <q-btn
                flat
                icon="email"
                :label="`Send Email`"
                color="primary"
                :href="`mailto:${person.email}`"
              />
            </q-card-actions>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePersonnelStore } from "src/stores/personnel";

const personnelStore = usePersonnelStore();
const directoryList = ref([]);

onMounted(() => {
  directoryList.value = personnelStore.personnel
    .filter((person) => person.role === "admin" || person.role === "educator")
    .map((person) => {
      const [firstName, lastName] = person.username.split(".");
      return {
        ...person,
        name: `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${
          lastName.charAt(0).toUpperCase() + lastName.slice(1)
        }`,
        email: `${person.username}@lf.k12.de.us`,
      };
    });
});
</script>

<style scoped>
.directory-page {
  padding: 20px;
}

.q-toolbar {
  background-color: #1e3a5f;
  color: #fff;
}

.q-card {
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.directory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.directory-card {
  max-width: 200px;
  margin: auto;
}

.directory-img {
  height: 150px;
  object-fit: cover;
}
</style>
