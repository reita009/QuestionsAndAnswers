const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(8080, (err) => {
  if (err) {
    console.log(`Houve um erro: ${err}`);
  } else {
    console.log("Servidor rodando na porta 8080");
  }
});
