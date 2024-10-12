<template>
  <q-page class="educator-dashboard">
    <q-toolbar class="q-mb-md">
      <q-toolbar-title>
        Educator Dashboard - Lake Forest High School
      </q-toolbar-title>
      <q-btn
        flat
        icon="logout"
        @click="handleLogout"
        label="Logout"
        color="primary"
      />
    </q-toolbar>

    <q-card class="q-pa-md q-mb-md">
      <q-card-section>
        <div class="text-h6">My Classes</div>
      </q-card-section>
      <q-table
        :rows="classesList"
        :columns="classesColumns"
        row-key="id"
        v-model:pagination="pagination"
        flat
        bordered
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              flat
              icon="visibility"
              color="primary"
              @click="toggleClassDetails(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-card class="q-pa-md" v-if="selectedClass">
      <q-card-section>
        <div class="text-h6">Class Details</div>
      </q-card-section>
      <q-card-section>
        <div><strong>Class Name:</strong> {{ selectedClass.name }}</div>
        <div><strong>Description:</strong> {{ selectedClass.description }}</div>
        <div><strong>Enrolled Students:</strong></div>
        <q-list>
          <q-item v-for="student in selectedClassRoster" :key="student.id">
            <q-item-section>{{ student.name }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useClassesStore } from "src/stores/classes";
import { useAuthStore } from "src/stores/auth";
import { usePersonnelStore } from "src/stores/personnel";
import { useRouter } from "vue-router";
import mockClasses from "src/mocks/mockClasses";

const classesStore = useClassesStore();
const authStore = useAuthStore();
const personnelStore = usePersonnelStore();
const router = useRouter();

const classesList = ref([]);
const selectedClass = ref(null);
const selectedClassRoster = ref([]);
const pagination = ref({ page: 1, rowsPerPage: 10 });

const classesColumns = [
  { name: "name", align: "left", label: "Class Name", field: "name" },
  {
    name: "description",
    align: "left",
    label: "Description",
    field: "description",
  },
  {
    name: "actions",
    align: "center",
    label: "Actions",
    field: "actions",
    sortable: false,
  },
];

const toggleClassDetails = (cls) => {
  if (selectedClass.value && selectedClass.value.id === cls.id) {
    selectedClass.value = null;
    selectedClassRoster.value = [];
  } else {
    selectedClass.value = cls;
    selectedClassRoster.value = cls.enrolledStudents.map((studentId) => {
      const student = personnelStore.getStudentById(studentId);
      return student
        ? { id: studentId, name: student.username }
        : { id: studentId, name: "Unknown" };
    });
  }
};

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

onMounted(() => {
  // Filter mock classes based on the educator's username
  classesList.value = mockClasses.filter(
    (cls) => cls.educator === authStore.user
  );
});
</script>

<style scoped>
.educator-dashboard {
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
</style>
