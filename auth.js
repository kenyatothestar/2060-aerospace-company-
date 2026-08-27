const crypto = require("crypto");

const users = new Map();

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function createUser(username, password) {
  if (!username || !password) {
    throw new Error("Username and password required");
  }

  if (users.has(username)) {
    throw new Error("User already exists");
  }

  users.set(username, {
    username,
    passwordHash: hashPassword(password)
  });

  return { username };
}

function login(username, password) {
  const user = users.get(username);

  if (!user || user.passwordHash !== hashPassword(password)) {
    return null;
  }

  return {
    username: user.username,
    token: crypto.randomBytes(24).toString("hex")
  };
}

module.exports = {
  createUser,
  login
};
