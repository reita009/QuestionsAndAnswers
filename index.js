const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Ask = require("./database/ask");

//Database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com o banco");
  })
  .catch((error) => {
    console.log(error);
  });

//new partials
//<%- include ('partials/header.ejs);%>

//Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//rotas
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/ask", (req, res) => {
  res.render("ask");
});

app.post("/saveask", (req, res) => {
  let title = req.body.title;
  let desc = req.body.desc;
  Ask.create({
    title: title,
    desc: desc,
  }).then(() => {
    console.log("Dados inserido com Sucesso!");
    res.redirect("/");
  });
  //res.send(`Formulario recebido (${title})  (${desc})`);
});

app.listen(8080, (err) => {
  if (err) {
    console.log(`Houve um erro: ${err}`);
  } else {
    console.log("Servidor rodando na porta 8080");
  }
});
