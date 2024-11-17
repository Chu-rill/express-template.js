const express = require("express");
const authController = require("./auth.controller.js");
const {
  login_query_validator,
  register_query_validator,
} = require("./auth.validation.js");
const validator = require("../../middleWare/ValidationMiddleware.js");

const authRoutes = express.Router();

authRoutes.post(
  "/signup",
  validator.validateSchema(register_query_validator),
  authController.signup
);
authRoutes.post(
  "/login",
  validator.validateSchema(login_query_validator),
  authController.login
);

module.exports = authRoutes;
