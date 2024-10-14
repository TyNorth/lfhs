// src/mocks/mockClasses.js

const mockClasses = [
  // Mathematics Department
  {
    id: "math101",
    name: "Algebra I",
    description:
      "Introduction to basic algebraic concepts, including variables, equations, and functions.",
    educator: "maria.santiago",
    enrolledStudents: ["john.doe", "alice.johnson", "mark.smith"],
  },
  {
    id: "math102",
    name: "Geometry",
    description:
      "Study of geometric shapes, theorems, and proofs, focusing on problem-solving skills.",
    educator: "maria.santiago",
    enrolledStudents: ["sarah.brown", "rachael.hall"],
  },

  // Science Department
  {
    id: "sci101",
    name: "Biology I",
    description:
      "Introduction to biological concepts, including cells, genetics, and ecosystems.",
    educator: "rachael.homestead",
    enrolledStudents: ["john.doe", "sarah.brown", "emma.james"],
  },
  {
    id: "sci102",
    name: "Chemistry I",
    description:
      "Basic concepts of chemical reactions, atomic structure, and periodic trends.",
    educator: "rachael.homestead",
    enrolledStudents: ["alice.johnson", "luke.wilson"],
  },

  // History Department
  {
    id: "hist101",
    name: "World History",
    description:
      "An overview of key events, cultures, and historical figures from ancient to modern times.",
    educator: "craig.mcnally",
    enrolledStudents: ["mark.smith", "rachael.hall", "emma.james"],
  },
  {
    id: "hist102",
    name: "U.S. History",
    description:
      "Study of major events, people, and movements that shaped the history of the United States.",
    educator: "craig.mcnally",
    enrolledStudents: ["sarah.brown", "luke.wilson"],
  },
];

export default mockClasses;
