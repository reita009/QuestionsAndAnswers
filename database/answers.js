const Sequelize = require("sequelize");
const connection = require("./database");
const Ask = require("./ask");

const Answers = connection.define("answers", {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  askId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

Answers.sync({ force: false });

module.exports = Answers;
