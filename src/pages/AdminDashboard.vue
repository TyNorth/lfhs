<template>
  <q-page class="admin-dashboard">
    <q-toolbar class="q-mb-md">
      <q-toolbar-title>
        Admin Dashboard - Lake Forest High School
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
        <q-tabs v-model="activeTab" class="text-primary">
          <q-tab name="educators" label="Educators" icon="school" />
          <q-tab name="students" label="Students" icon="people" />
        </q-tabs>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-btn
          flat
          label="Add Personnel"
          icon="add"
          color="primary"
          class="q-mb-md"
          @click="addPersonnel"
        />
        <q-table
          v-if="activeTab === 'educators'"
          :rows="educatorList"
          :columns="educatorColumns"
          row-key="id"
          v-model:pagination="pagination"
          selection="multiple"
          v-model:selected-rows="selectedRows"
          flat
          bordered
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                flat
                icon="edit"
                color="primary"
                @click="navigateToEditPersonnel(props.row)"
              />
              <q-btn
                flat
                icon="delete"
                color="negative"
                @click="confirmDeletePersonnel(props.row)"
              />
            </q-td>
          </template>
        </q-table>

        <q-table
          v-if="activeTab === 'students'"
          :rows="studentList"
          :columns="studentColumns"
          row-key="id"
          v-model:pagination="pagination"
          selection="multiple"
          v-model:selected-rows="selectedRows"
          flat
          bordered
        >
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                flat
                icon="edit"
                color="primary"
                @click="navigateToEditPersonnel(props.row)"
              />
              <q-btn
                flat
                icon="delete"
                color="negative"
                @click="confirmDeletePersonnel(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm Deletion</div>
        </q-card-section>

        <q-card-section>
          <div>
            Please enter <strong>{{ deleteName }}</strong> to confirm deletion.
          </div>
          <q-input
            v-model="confirmationName"
            label="Enter Name"
            outlined
            dense
            class="q-mt-md"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="cancelDelete" />
          <q-btn
            label="Delete"
            color="negative"
            :disable="confirmationName !== deleteName"
            @click="deletePersonnel(deleteId)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePersonnelStore } from "src/stores/personnel";
import { useAuthStore } from "src/stores/auth";
import { useRouter } from "vue-router";

const personnelStore = usePersonnelStore();
const authStore = useAuthStore();
const router = useRouter();

const educatorList = ref([]);
const studentList = ref([]);
const selectedRows = ref([]);
const pagination = ref({ page: 1, rowsPerPage: 10 });
const activeTab = ref("educators");
const deleteDialog = ref(false);
const deleteId = ref(null);
const deleteName = ref("");
const confirmationName = ref("");

const educatorColumns = [
  { name: "name", align: "left", label: "Name", field: "name" },
  {
    name: "department",
    align: "left",
    label: "Department",
    field: "department",
  },
  { name: "email", align: "left", label: "Email", field: "email" },
  {
    name: "actions",
    align: "center",
    label: "Actions",
    field: "actions",
    sortable: false,
  },
];

const studentColumns = [
  { name: "name", align: "left", label: "Name", field: "name" },
  { name: "studentId", align: "left", label: "Student ID", field: "studentId" },
  {
    name: "gradeLevel",
    align: "left",
    label: "Grade Level",
    field: "gradeLevel",
  },
  { name: "email", align: "left", label: "Email", field: "email" },
  {
    name: "actions",
    align: "center",
    label: "Actions",
    field: "actions",
    sortable: false,
  },
];

const addPersonnel = () => {
  // Logic for adding new personnel
  console.log("Add Personnel clicked");
  router.push("/add-personnel");
};

const navigateToEditPersonnel = (personnel) => {
  router.push({
    name: "EditPersonnel",
    params: { id: personnel.id, role: personnel.role },
  });
};

const confirmDeletePersonnel = (personnel) => {
  deleteId.value = personnel.id;
  deleteName.value = personnel.name;
  confirmationName.value = "";
  deleteDialog.value = true;
};

const cancelDelete = () => {
  deleteDialog.value = false;
};

const deletePersonnel = (id) => {
  // Logic for deleting personnel by ID
  console.log("Delete Personnel clicked", id);
  deleteDialog.value = false;
};

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

onMounted(() => {
  educatorList.value = personnelStore.personnel
    .filter((personnel) => personnel.role === "educator")
    .map((educator) => {
      const [firstName, lastName] = educator.username.split(".");
      return {
        ...educator,
        name: `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${
          lastName.charAt(0).toUpperCase() + lastName.slice(1)
        }`,
        email: `${educator.username}@lf.k12.de.us`,
      };
    });

  studentList.value = personnelStore.personnel
    .filter((personnel) => personnel.role === "student")
    .map((student) => {
      const [firstName, lastName] = student.username.split(".");
      return {
        ...student,
        name: `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${
          lastName.charAt(0).toUpperCase() + lastName.slice(1)
        }`,
        email: `${student.username}@lf.k12.de.us`,
      };
    });
});
</script>

<style scoped>
.admin-dashboard {
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
