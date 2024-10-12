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
        <div class="text-h6">Manage Personnel</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Add Personnel"
          icon="add"
          color="primary"
          @click="addPersonnel"
        />
      </q-card-actions>
      <q-table
        :rows="personnelList"
        :columns="personnelColumns"
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
              @click="editPersonnel(props.row)"
            />
            <q-btn
              flat
              icon="delete"
              color="negative"
              @click="deletePersonnel(props.row.id)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>
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

const personnelList = ref([]);
const selectedRows = ref([]);
const pagination = ref({ page: 1, rowsPerPage: 10 });

const personnelColumns = [
  { name: "name", align: "left", label: "Name", field: "name" },
  { name: "role", align: "left", label: "Role", field: "role" },
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
  // Logic for adding new personnel (e.g., open add personnel dialog)
  console.log("Add Personnel clicked");
};

const editPersonnel = (personnel) => {
  // Logic for editing personnel details (e.g., open edit personnel dialog)
  console.log("Edit Personnel clicked", personnel);
};

const deletePersonnel = (id) => {
  // Logic for deleting personnel by ID
  console.log("Delete Personnel clicked", id);
};

const handleLogout = () => {
  authStore.logout();
  router.push("/login");
};

onMounted(() => {
  personnelList.value = personnelStore.personnel;
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
