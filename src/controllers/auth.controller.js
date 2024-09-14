const sendErrorResponse = require("../error/validation.error");
const {
  login_user,
  register_user,
  delete_user,
  get_all_users,
} = require("../service/auth.service");
const {
  login_query_validator,
  register_query_validator,
} = require("../validation/auth.validation");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const { error } = login_query_validator.validate({ username, password });
    if (error) return sendErrorResponse(res, error.details[0].message);

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
    const { error } = register_query_validator.validate({
      username,
      password,
      email,
    });
    if (error) return sendErrorResponse(res, error.details[0].message);

    const response = await register_user(username, password, email);
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
