const express = require("express");
const authRoutes = express.Router();
const {
  login,
  signup,
  deleteUser,
  getAllUsers,
} = require("../controllers/auth.controller");
const { protect } = require("../middleWare/jwt");
const validator = require("../middleWare/ValidationMiddleware");
const {
  login_query_validator,
  register_query_validator,
} = require("../validation/auth.validation");

authRoutes.post(
  "/login",
  validator.validateSchema(login_query_validator),
  login
);
authRoutes.post(
  "/signup",
  validator.validateSchema(register_query_validator),
  signup
);
authRoutes.post("/deleteUser/:userId", protect, deleteUser);
authRoutes.get("/getUsers", protect, getAllUsers);
module.exports = authRoutes;
