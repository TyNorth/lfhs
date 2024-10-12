// src/stores/classes.js
import { defineStore } from "pinia";
import { nanoid } from "nanoid"; // For generating unique IDs
import { usePersonnelStore } from "./personnel";
import mockClasses from "src/mocks/mockClasses"; // Import mock classes data

export const useClassesStore = defineStore("classes", {
  state: () => ({
    classes: mockClasses, // Use mock classes as initial data
  }),
  getters: {
    getClassById: (state) => (id) => {
      return state.classes.find((cls) => cls.id === id);
    },
    getClassesByEducatorId: (state) => (educatorId) => {
      return state.classes.filter((cls) => cls.educator === educatorId);
    },
    getClassesByStudentId: (state) => (studentId) => {
      return state.classes.filter((cls) =>
        cls.enrolledStudents.includes(studentId)
      );
    },
  },
  actions: {
    addClass(classData) {
      // Assign a unique ID using nanoid
      const newClass = {
        ...classData,
        id: nanoid(),
        educator: classData.educator || null,
        enrolledStudents: classData.enrolledStudents || [],
      };
      this.classes.push(newClass);
    },
    updateClass(id, updatedDetails) {
      const index = this.classes.findIndex((cls) => cls.id === id);
      if (index !== -1) {
        this.classes[index] = { ...this.classes[index], ...updatedDetails };
      }
    },
    deleteClass(id) {
      this.classes = this.classes.filter((cls) => cls.id !== id);

      // Clean up any personnel references
      const personnelStore = usePersonnelStore();
      personnelStore.removeClassFromEducator(id);
      personnelStore.getAllStudents.forEach((student) => {
        personnelStore.unenrollStudentFromClass(student.id, id);
      });
    },
    assignEducatorToClass(classId, educatorId) {
      const cls = this.getClassById(classId);
      if (cls) {
        cls.educator = educatorId;

        // Assign class to the educator
        const personnelStore = usePersonnelStore();
        personnelStore.assignClassToEducator(educatorId, classId);
      }
    },
    enrollStudentInClass(classId, studentId) {
      const cls = this.getClassById(classId);
      if (cls) {
        if (!cls.enrolledStudents.includes(studentId)) {
          cls.enrolledStudents.push(studentId);

          // Enroll student in class via personnel store
          const personnelStore = usePersonnelStore();
          personnelStore.enrollStudentInClass(studentId, classId);
        }
      }
    },
    removeEducatorFromClass(classId) {
      const cls = this.getClassById(classId);
      if (cls) {
        const previousEducatorId = cls.educator;
        cls.educator = null;

        // Remove class reference from the educator
        const personnelStore = usePersonnelStore();
        personnelStore.removeClassFromEducator(previousEducatorId, classId);
      }
    },
    unenrollStudentFromClass(classId, studentId) {
      const cls = this.getClassById(classId);
      if (cls) {
        cls.enrolledStudents = cls.enrolledStudents.filter(
          (id) => id !== studentId
        );

        // Unenroll student via personnel store
        const personnelStore = usePersonnelStore();
        personnelStore.unenrollStudentFromClass(studentId, classId);
      }
    },
  },
});
