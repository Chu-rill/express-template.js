const sendErrorResponse = require("../error/validation.error");
const {
  login_user,
  register_user,
  delete_user,
  get_all_users,
} = require("../service/auth.service");
const { sendEmailWithTemplate } = require("../utils/email");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await login_user(username, password);
    return res.status(response.statusCode).send(response);
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.signup = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const response = await register_user(username, password, email);
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
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await delete_user(userId);
    if (response.status === "success") res.cookie("jwt", "", { maxAge: 0 });

    return res.status(response.statusCode).send(response);
  } catch (err) {
    console.error("Delete error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const response = await get_all_users();
    return res.status(response.statusCode).send(response);
  } catch (err) {
    console.error("Get users error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
