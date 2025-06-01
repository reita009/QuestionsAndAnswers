const Sequelize = require("sequelize");
const connection = require("./database");
const { type } = require("os");

const Ask = connection.define("ask", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  desc: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

Ask.sync({ force: false }).then(() => {});

module.exports = Ask;
