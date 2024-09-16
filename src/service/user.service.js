const jwt = require("jsonwebtoken");
const { comparePassword, encrypt } = require("../utils/encryption");
const {
  passwordMismatchError,
  doesNotExistError,
  defaultError,
  noDuplicateError,
} = require("../error/error");
const httpStatus = require("http-status");
const userRepository = require("../repositories/user.repository");

class UserService {
  async login(username, password) {
    try {
      const user = await userRepository.getUserByUsername(username);
      if (!user) return doesNotExistError;

      const isPasswordCorrect = await comparePassword(password, user.password);
      if (!isPasswordCorrect) return passwordMismatchError;

      const payload = { username: user.username, id: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_LIFETIME,
      });

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        user: { username: user.username, id: user._id },
        token,
      };
    } catch (error) {
      console.error(error);
      return defaultError(error);
    }
  }

  async signup(username, password, email) {
    try {
      let user = await userRepository.getUserByUsername(username);
      if (user) return noDuplicateError;

      const hashedPassword = await encrypt(password);
      user = await userRepository.createUser({
        username,
        password: hashedPassword,
        email,
      });

      if (!user) return defaultError;
      return {
        status: "success",
        error: false,
        statusCode: httpStatus.CREATED,
        user: { username, email },
      };
    } catch (error) {
      console.error(error);
      return defaultError(error);
    }
  }

  async deleteUser(userId) {
    try {
      const user = await userRepository.deleteUserById(userId);
      if (!user) return doesNotExistError;

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "User deleted successfully",
      };
    } catch (error) {
      console.error(error);
      return defaultError(error);
    }
  }

  async getAllUsers() {
    try {
      const users = await userRepository.getAllUsers();
      if (!users || users.length === 0)
        return { status: "error", message: "No users found." };

      return {
        status: "success",
        error: false,
        statusCode: httpStatus.OK,
        message: "Users retrieved successfully",
        data: users,
      };
    } catch (error) {
      console.error(error);
      return defaultError(error);
    }
  }
}

module.exports = new UserService();
