<template>
  <q-page class="edit-personnel">
    <q-toolbar class="q-mb-md">
      <q-btn
        flat
        round
        dense
        icon="arrow_back"
        @click="goBack"
        aria-label="Go back"
      />
      <q-toolbar-title>Edit Personnel Details</q-toolbar-title>
    </q-toolbar>

    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Personnel Information</div>
      </q-card-section>
      <q-card-section>
        <q-form>
          <div v-if="personnelRole === 'student'">
            <q-input
              v-model="form.firstName"
              label="First Name"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="form.lastName"
              label="Last Name"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="form.studentId"
              label="Student ID"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="form.gradeLevel"
              label="Grade Level"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="form.homeNumber"
              label="Home Number"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="form.parentFirstName"
              label="Parent First Name"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="form.parentLastName"
              label="Parent Last Name"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="form.parentEmail"
              label="Parent Email"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="form.homeAddress"
              label="Home Address"
              outlined
              class="q-mb-md"
            />
          </div>
          <div v-if="personnelRole === 'educator'">
            <q-input
              v-model="form.firstName"
              label="First Name"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="form.lastName"
              label="Last Name"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="form.department"
              label="Department"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="form.homeAddress"
              label="Home Address"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="form.phone"
              label="Phone"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="form.roomNumber"
              label="Room Number"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="form.personalEmail"
              label="Personal Email"
              outlined
              class="q-mb-md"
            />
            <q-input
              v-model="form.emergencyContact"
              label="Emergency Contact"
              outlined
              class="q-mb-md"
            />
          </div>
        </q-form>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" @click="goBack" />
        <q-btn label="Save" color="primary" @click="savePersonnelDetails" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { usePersonnelStore } from "src/stores/personnel";

const router = useRouter();
const route = useRoute();
const personnelStore = usePersonnelStore();

const form = ref({});
const personnelRole = ref("");

const goBack = () => {
  router.back();
};

const savePersonnelDetails = async () => {
  const db = await getPersonnelDatabase();
  const collection = db.personnel;

  try {
    const personnelDoc = await collection
      .findOne({ selector: { id: form.value.id } })
      .exec();
    if (personnelDoc) {
      // Update existing personnel document
      await personnelDoc.atomicUpdate((oldData) => {
        return { ...oldData, ...form.value };
      });
    } else {
      // Insert as a new document if not found
      await collection.insert(form.value);
    }
    console.log("Save Personnel Details", form.value);
    goBack();
  } catch (error) {
    console.error("Failed to save personnel details", error);
  }
};

onMounted(() => {
  const personnelId = route.params.id;
  const personnel = personnelStore.getPersonnelById(personnelId);
  if (personnel) {
    const [firstName, lastName] = personnel.username.split(".");
    form.value = {
      firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
      studentId: personnel.studentId || "",
      gradeLevel: personnel.gradeLevel || "",
      homeNumber: personnel.homeNumber || "",
      parentFirstName: personnel.parentFirstName || "",
      parentLastName: personnel.parentLastName || "",
      parentEmail: personnel.parentEmail || "",
      homeAddress: personnel.homeAddress || "",
      department: personnel.department || "",
      phone: personnel.phone || "",
      roomNumber: personnel.roomNumber || "",
      personalEmail: personnel.personalEmail || "",
      emergencyContact: personnel.emergencyContact || "",
    };
    personnelRole.value = personnel.role;
  }
});
</script>

<style scoped>
.edit-personnel {
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
</style>
