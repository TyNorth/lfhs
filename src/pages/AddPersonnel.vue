<template>
  <q-page class="add-personnel-page">
    <q-toolbar class="q-mb-md">
      <q-toolbar-title>
        Add Personnel - Lake Forest High School
      </q-toolbar-title>
      <q-btn
        flat
        icon="arrow_back"
        @click="goBack"
        label="Back"
        color="primary"
      />
    </q-toolbar>

    <q-card class="q-pa-md">
      <q-card-section>
        <q-select
          v-model="selectedRole"
          label="Select Role"
          :options="roleOptions"
          outlined
          class="q-mb-md"
        />
        <q-form @submit.prevent="handleSubmit">
          <q-input
            v-model="form.name"
            label="Name"
            outlined
            class="q-mb-md"
            :rules="[(val) => !!val || 'Name is required']"
          />
          <q-input
            v-model="form.department"
            label="Department"
            outlined
            class="q-mb-md"
            :rules="[(val) => !!val || 'Department is required']"
          />
          <q-input
            v-model="form.roomNumber"
            label="Room Number"
            outlined
            class="q-mb-md"
          />
          <q-input
            v-model="form.email"
            label="Email"
            outlined
            class="q-mb-md"
            :rules="[(val) => !!val || 'Email is required']"
          />
          <q-input
            v-model="form.phone"
            label="Phone"
            outlined
            class="q-mb-md"
          />
          <q-input
            v-model="form.studentId"
            label="Student ID"
            outlined
            class="q-mb-md"
            :rules="[(val) => !!val || 'Student ID is required']"
          />
          <q-input
            v-model="form.gradeLevel"
            label="Grade Level"
            outlined
            class="q-mb-md"
            :rules="[(val) => !!val || 'Grade Level is required']"
          />
          <q-input
            v-model="form.parentName"
            label="Parent Name"
            outlined
            class="q-mb-md"
          />
          <q-input
            v-model="form.parentEmail"
            label="Parent Email"
            outlined
            class="q-mb-md"
          />

          <q-btn
            label="Submit"
            color="primary"
            type="submit"
            class="full-width q-mt-md"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usePersonnelStore } from "src/stores/personnel";

const router = useRouter();
const personnelStore = usePersonnelStore();

const selectedRole = ref(null);
const roleOptions = [
  { label: "Educator", value: "educator" },
  { label: "Student", value: "student" },
];

const form = ref({
  name: "",
  department: "",
  roomNumber: "",
  email: "",
  phone: "",
  studentId: "",
  gradeLevel: "",
  parentName: "",
  parentEmail: "",
});

const handleSubmit = () => {
  if (selectedRole.value === "educator") {
    personnelStore.addPersonnel({
      ...form.value,
      role: "educator",
    });
  } else if (selectedRole.value === "student") {
    personnelStore.addPersonnel({
      ...form.value,
      role: "student",
    });
  }
  router.push({ name: "AdminDashboard" });
};

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.add-personnel-page {
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

.text-h6 {
  color: #1e3a5f;
  font-weight: bold;
}

.full-width {
  width: 100%;
}
</style>
