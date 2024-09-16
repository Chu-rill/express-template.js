const express = require("express");
const userController = require("../controllers/user.controller");
const { protect } = require("../middleWare/jwt");
const validator = require("../middleWare/ValidationMiddleware");
const {
  login_query_validator,
  register_query_validator,
} = require("../validation/auth.validation");
const userRoutes = express.Router();

userRoutes.get("/users", protect, userController.getAllUsers);
userRoutes.get("/user/:id", protect, userController.getUser);
userRoutes.post(
  "/signup",
  validator.validateSchema(register_query_validator),
  userController.signup
);
userRoutes.post(
  "/login",
  validator.validateSchema(login_query_validator),
  userController.login
);
userRoutes.put("/users/:id", protect, userController.updateUser);
// userRoutes.delete(
//   "/deleteUser/:userId",
//   protect,
//   userController.deleteUserById
// );

module.exports = userRoutes;
