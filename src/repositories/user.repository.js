const User = require("../models/User");

const getUserByUsername = async (username) => User.findOne({ username });
const createUser = async (userData) => User.create(userData);
const deleteUserById = async (userId) => User.findByIdAndDelete(userId);
const getAllUsers = async () => User.find();

module.exports = { getUserByUsername, createUser, deleteUserById, getAllUsers };
