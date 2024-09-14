const {
  getUserByUsername,
  createUser,
  deleteUserById,
  getAllUsers,
} = require("../repositories/user.repository");
const jwt = require("jsonwebtoken");
const { comparePassword, encrypt } = require("../utils/encryption");
const {
  passwordMismatchError,
  doesNotExistError,
  defaultError,
  noDuplicateError,
} = require("../error/error");
const httpStatus = require("http-status");

const login_user = async (username, password) => {
  try {
    const user = await getUserByUsername(username);
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
    console.log(error);
    return defaultError(error);
  }
};

const register_user = async (username, password, email) => {
  try {
    let user = await getUserByUsername(username);
    if (user) return noDuplicateError;

    const hashedPassword = await encrypt(password);
    user = await createUser({ username, password: hashedPassword, email });

    return {
      status: "success",
      error: false,
      statusCode: httpStatus.CREATED,
      user: { username, email },
    };
  } catch (error) {
    console.log(error);
    return defaultError(error);
  }
};

const delete_user = async (userId) => {
  try {
    let user = await deleteUserById(userId);
    if (!user) return doesNotExistError;

    return {
      status: "success",
      error: false,
      statusCode: httpStatus.OK,
      message: "User deleted successfully",
    };
  } catch (error) {
    console.log(error);
    return defaultError;
  }
};

const get_all_users = async () => {
  try {
    let users = await getAllUsers();
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
    console.log(error);
    return defaultError;
  }
};

module.exports = { login_user, register_user, delete_user, get_all_users };
