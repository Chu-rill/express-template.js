const { defaultError } = require("../error/error");
const Leaderboard = require("../models/leaderboard_model");

const submit_score = async (userId, category, score, quizId) => {
  try {
    const leaderboard = await Leaderboard.updateScore(
      userId,
      category,
      score,
      quizId
    );
    return {
      status: "success",
      error: false,
      statusCode: 200,
      message: "Score updated",
      leaderboard,
    };
  } catch (error) {
    console.log(error);
    return defaultError;
  }
};

const get_scores = async () => {
  try {
    const score = await Leaderboard.find();

    return {
      status: "success",
      error: false,
      statusCode: 200,
      score,
    };
  } catch (error) {
    console.log(error);
    return defaultError(error);
  }
};
module.exports = { submit_score, get_scores };
