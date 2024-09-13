const joi = require("joi");

exports.submit_score_validator = joi.object({
  userId: joi.object().required(),
  category: joi.string().required(),
  score: joi.number().required(),
  quizId: joi.string().required(),
});
