const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const app = require("../app");

const startTestServer = () =>
  new Promise((resolve) => {
    const server = http.createServer(app);
    server.listen(0, "127.0.0.1", () => resolve(server));
  });

test("health endpoint returns the standard success shape", async () => {
  const server = await startTestServer();
  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      success: true,
      message: "WebTutor_BE is running",
      data: { service: "backend", environment: "development" },
    });
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
});

test("unknown routes return the standard error shape", async () => {
  const server = await startTestServer();
  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/missing`);
    assert.equal(response.status, 404);
    assert.deepEqual(await response.json(), {
      success: false,
      message: "Route not found: GET /missing",
    });
  } finally {
    await new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  }
});
