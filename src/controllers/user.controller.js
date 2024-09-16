const sendErrorResponse = require("../error/validation.error");
const userService = require("../service/user.service");

class UserController {
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
