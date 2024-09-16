const sendErrorResponse = require("../error/validation.error");
const { sendEmailWithTemplate } = require("../utils/email");
const userService = require("../service/user.service");

class UserController {
  async login(req, res) {
    const { username, password } = req.body;
    try {
      const response = await userService.login(username, password);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async signup(req, res) {
    const { username, password, email } = req.body;
    try {
      const response = await userService.signup(username, password, email);
      if (response.error) {
        return res
          .status(response.statusCode)
          .json({ message: response.message });
      }

      const data = {
        subject: "Welcome to Express Template",
        username: username,
      };
      await sendEmailWithTemplate(email, data);
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Signup error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteUser(req, res) {
    const { userId } = req.params;
    try {
      const response = await userService.deleteUser(userId);
      if (response.status === "success") res.cookie("jwt", "", { maxAge: 0 });

      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllUsers(req, res) {
    try {
      const response = await userService.getAllUsers();
      return res.status(response.statusCode).send(response);
    } catch (err) {
      console.error("Get users error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUser(req, res) {
    const { id } = req.params;
    try {
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    } catch (err) {
      console.error("Get user error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateUser(req, res) {
    const { id } = req.params;
    try {
      const updatedUser = await userService.updateUser(id, req.body);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(updatedUser);
    } catch (err) {
      console.error("Update user error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new UserController();
