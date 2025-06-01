const Sequelize = require("sequelize");

const connection = new Sequelize("askReta", "root", "lira0509", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
