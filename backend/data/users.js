import bcrypt from "bcryptjs";

const users = [
  {
    name: "Simi",
    email: "simi@test.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Deea",
    email: "deea@test.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "John",
    email: "john@test.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
