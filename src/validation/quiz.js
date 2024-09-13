const joi = require("joi");

exports.create_quiz_validator = joi.object({
  title: joi.string().required(),
  category: joi.string().required(),
  level: joi.string().required(),
  questions: joi
    .array()
    .items(
      joi.object({
        questionText: joi.string().required(),
        options: joi
          .array()
          .items(
            joi.object({
              text: joi.string().required(),
              isCorrect: joi.boolean().required(),
            })
          )
          .min(1)
          .required(),
      })
    )
    .min(1)
    .required(),
});

exports.quizzes_byCategory_validator = joi.object({
  category: joi.string().required(),
});
exports.quizzes_byLevel_validator = joi.object({
  level: joi.string().required(),
});
