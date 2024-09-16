const express = require("express");
const userController = require("../controllers/user.controller");
const { protect } = require("../middleWare/jwt");

const userRoutes = express.Router();

userRoutes.get("/users", protect, userController.getAllUsers);
userRoutes.get("/user/:id", protect, userController.getUser);

userRoutes.put("/users/:id", protect, userController.updateUser);
// userRoutes.delete(
//   "/deleteUser/:userId",
//   protect,
//   userController.deleteUserById
// );

module.exports = userRoutes;
