require("dotenv").config();

const http = require("node:http");
const app = require("./app");
const { connectDatabase } = require("./src/configs/database");

const port = Number(process.env.PORT || 5003);
const server = http.createServer(app);

const start = async () => {
  await connectDatabase();
  server.listen(port, () => {
    console.log(`WebTutor_BE listening on port ${port}`);
  });
};

start().catch((error) => {
  console.error("Backend startup failed:", error.message);
  process.exitCode = 1;
});

module.exports = { server, start };
