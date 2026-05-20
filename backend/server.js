require("dotenv").config();

const app = require("./src/app");
const prisma = require("./src/config/prisma");

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Test Database Connection
    await prisma.$connect();

    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

startServer();