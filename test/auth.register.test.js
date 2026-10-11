const test = require("node:test");
const assert = require("node:assert/strict");

process.env.ACCESS_TOKEN_SECRET ||= "test-access-secret-at-least-32-characters";
process.env.REFRESH_TOKEN_SECRET ||= "test-refresh-secret-at-least-32-characters";
process.env.EMAIL_MODE = "console";

const userRepository = require("../src/repositories/user.repository");
const otpRepository = require("../src/repositories/otp.repository");
const pendingRegistrationRepository = require("../src/repositories/pendingRegistration.repository");
const authService = require("../src/services/auth.service");

test("register lưu đăng ký tạm đã hash và gửi OTP console", async (t) => {
  const calls = {};

  t.mock.method(userRepository, "findByEmail", async () => null);
  t.mock.method(pendingRegistrationRepository, "upsert", async (data) => {
    calls.pending = data;
    return data;
  });
  t.mock.method(otpRepository, "findLatestActiveByEmailAndType", async () => null);
  t.mock.method(otpRepository, "create", async (data) => {
    calls.otp = data;
    return { _id: "otp-id", ...data };
  });
  const result = await authService.register({
    fullName: "Nguyen Van A",
    email: "register@example.com",
    password: "SecurePass@123",
    phone: "0912345678",
    dateOfBirth: "2000-01-01",
  });

  assert.deepStrictEqual(result, { email: "register@example.com" });
  assert.equal(calls.pending.email, "register@example.com");
  assert.notEqual(calls.pending.password, "SecurePass@123");
  assert.match(calls.pending.password, /^\$2[aby]\$/);
  assert.equal(calls.pending.role, "user");
  assert.equal(calls.otp.email, "register@example.com");
  assert.equal(calls.otp.type, "register");
  assert.match(calls.otp.otp, /^[a-f0-9]{64}$/);
});
