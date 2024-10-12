// src/stores/personnel.js
import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import mockUsers from "src/mocks/mockUsers";

export const usePersonnelStore = defineStore("personnel", {
  state: () => ({
    personnel: mockUsers, // Using mock users as the initial personnel data
  }),
  getters: {
    getAllStudents: (state) => {
      return state.personnel.filter((person) => person.role === "student");
    },
    getAllEducators: (state) => {
      return state.personnel.filter((person) => person.role === "educator");
    },
    getAllAdmins: (state) => {
      return state.personnel.filter((person) => person.role === "admin");
    },
    getStudentById: (state) => (id) => {
      return state.personnel.find(
        (person) => person.role === "student" && person.username === id
      );
    },
    getEducatorById: (state) => (id) => {
      return state.personnel.find(
        (person) => person.role === "educator" && person.username === id
      );
    },
  },
  actions: {
    addPersonnel(personData) {
      // Assign a unique ID using nanoid and add new personnel
      const newPerson = {
        ...personData,
        id: nanoid(),
      };
      this.personnel.push(newPerson);
    },
    assignClassToEducator(educatorId, classId) {
      const educator = this.getEducatorById(educatorId);
      if (educator) {
        if (!educator.assignedClasses) {
          educator.assignedClasses = [];
        }
        if (!educator.assignedClasses.includes(classId)) {
          educator.assignedClasses.push(classId);
        }
      }
    },
    removeClassFromEducator(educatorId, classId) {
      const educator = this.getEducatorById(educatorId);
      if (educator && educator.assignedClasses) {
        educator.assignedClasses = educator.assignedClasses.filter(
          (id) => id !== classId
        );
      }
    },
    enrollStudentInClass(studentId, classId) {
      const student = this.getStudentById(studentId);
      if (student) {
        if (!student.enrolledClasses) {
          student.enrolledClasses = [];
        }
        if (!student.enrolledClasses.includes(classId)) {
          student.enrolledClasses.push(classId);
        }
      }
    },
    unenrollStudentFromClass(studentId, classId) {
      const student = this.getStudentById(studentId);
      if (student && student.enrolledClasses) {
        student.enrolledClasses = student.enrolledClasses.filter(
          (id) => id !== classId
        );
      }
    },
  },
});
