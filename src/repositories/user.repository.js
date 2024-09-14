const User = require("../models/User");

const getUserByUsername = async (username) => {
  const user = await User.findOne({ username });
  return user;
};
const createUser = async (username, password, email) => {
  const user = await User.create({
    username,
    password,
    email,
  });
  return user;
};
const deleteUserById = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  return user;
};
const getAllUsers = async () => {
  const user = await User.find();
  return user;
};

module.exports = { getUserByUsername, createUser, deleteUserById, getAllUsers };
