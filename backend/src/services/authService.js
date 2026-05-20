const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const generateToken = require("../utils/generateToken");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const token = generateToken(user);

  return {
    user,
    token,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user);

  return {
    user,
    token,
  };
};


module.exports = {
  registerUser,
  loginUser,
};