// src/mocks/mockUsers.js

const mockUsers = [
  // Admins
  {
    id: "admin-001",
    username: "angeline.rivello",
    password: "admin123",
    token: "admin-ar-004",
    role: "admin",
    department: "Principal",
  },
  {
    id: "admin-002",
    username: "john.reichenberg",
    password: "admin123",
    token: "admin-jr-002",
    role: "admin",
    department: "Assistant Principal",
  },
  {
    id: "admin-003",
    username: "jessica.leone",
    password: "admin123",
    token: "admin-jl-003",
    role: "admin",
    department: "Assistant Principal",
  },
  {
    id: "admin-004",
    username: "georgia.davis",
    password: "admin123",
    token: "admin-gd-004",
    role: "admin",
    department: "Counselor",
  },

  // Educators
  {
    id: "edu-001",
    username: "maria.santiago",
    role: "educator",
    department: "Mathematics",
    homeAddress: "123 Maple St, Lake Forest",
    phone: "123-456-7890",
    roomNumber: "B101",
    personalEmail: "maria.santiago@gmail.com",
    emergencyContact: "John Santiago - 987-654-3210",
    password: "educator123",
    token: "edu-token-001",
  },
  {
    id: "edu-002",
    username: "rachael.homestead",
    role: "educator",
    department: "Science",
    homeAddress: "456 Oak Ave, Lake Forest",
    phone: "234-567-8901",
    roomNumber: "C202",
    personalEmail: "rachael.homestead@yahoo.com",
    emergencyContact: "Linda Homestead - 876-543-2109",
    password: "educator123",
    token: "edu-token-002",
  },
  {
    id: "edu-003",
    username: "craig.mcnally",
    role: "educator",
    department: "History",
    homeAddress: "789 Pine Rd, Lake Forest",
    phone: "345-678-9012",
    roomNumber: "A303",
    personalEmail: "craig.mcnally@hotmail.com",
    emergencyContact: "Sarah McNally - 765-432-1098",
    password: "educator123",
    token: "edu-token-003",
  },

  // Students
  {
    id: "stu-001",
    username: "john.doe",
    role: "student",
    studentId: "S001",
    gradeLevel: "10",
    homeNumber: "123-555-6789",
    parentFirstName: "Jane",
    parentLastName: "Doe",
    parentEmail: "jane.doe@gmail.com",
    homeAddress: "321 Birch St, Lake Forest",
    password: "student123",
    token: "stu-token-001",
  },
  {
    id: "stu-002",
    username: "alice.johnson",
    role: "student",
    studentId: "S002",
    gradeLevel: "11",
    homeNumber: "234-555-7890",
    parentFirstName: "Bob",
    parentLastName: "Johnson",
    parentEmail: "bob.johnson@gmail.com",
    homeAddress: "654 Cedar St, Lake Forest",
    password: "student123",
    token: "stu-token-002",
  },
  {
    id: "stu-003",
    username: "mark.smith",
    role: "student",
    studentId: "S003",
    gradeLevel: "9",
    homeNumber: "345-555-8901",
    parentFirstName: "Emily",
    parentLastName: "Smith",
    parentEmail: "emily.smith@yahoo.com",
    homeAddress: "987 Spruce St, Lake Forest",
    password: "student123",
    token: "stu-token-003",
  },
  {
    id: "stu-004",
    username: "sarah.brown",
    role: "student",
    studentId: "S004",
    gradeLevel: "12",
    homeNumber: "456-555-9012",
    parentFirstName: "Michael",
    parentLastName: "Brown",
    parentEmail: "michael.brown@hotmail.com",
    homeAddress: "159 Willow St, Lake Forest",
    password: "student123",
    token: "stu-token-004",
  },
  {
    id: "stu-005",
    username: "rachael.hall",
    role: "student",
    studentId: "S005",
    gradeLevel: "10",
    homeNumber: "567-555-0123",
    parentFirstName: "Anna",
    parentLastName: "Hall",
    parentEmail: "anna.hall@gmail.com",
    homeAddress: "753 Elm St, Lake Forest",
    password: "student123",
    token: "stu-token-005",
  },
  {
    id: "stu-006",
    username: "luke.wilson",
    role: "student",
    studentId: "S006",
    gradeLevel: "11",
    homeNumber: "678-555-1234",
    parentFirstName: "George",
    parentLastName: "Wilson",
    parentEmail: "george.wilson@gmail.com",
    homeAddress: "852 Aspen St, Lake Forest",
    password: "student123",
    token: "stu-token-006",
  },
  {
    id: "stu-007",
    username: "emma.james",
    role: "student",
    studentId: "S007",
    gradeLevel: "9",
    homeNumber: "789-555-2345",
    parentFirstName: "Nina",
    parentLastName: "James",
    parentEmail: "nina.james@yahoo.com",
    homeAddress: "951 Walnut St, Lake Forest",
    password: "student123",
    token: "stu-token-007",
  },
];

export default mockUsers;
