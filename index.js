const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Ask = require("./database/ask");
const Answers = require("./database/answers");

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
  Ask.findAll({ raw: true, order: [["id", "DESC"]] }).then((askList) => {
    console.log(askList);
    res.render("index", { askList: askList });
  });
});

app.get("/ask", (req, res) => {
  res.render("ask");
});

app.get("/ask/:id", (req, res) => {
  let id = req.params.id;
  Ask.findOne({
    where: { id: id },
  }).then((ask) => {
    if (ask != undefined) {
      Answers.findAll({
        where: { askId: id },
        order: [["id", "DESC"]],
      }).then((answers) => {
        res.render("oneAsk", {
          ask: ask,
          answers: answers,
        });
      });

      // res.render("oneAsk");
    } else {
      res.redirect("/");
    }
  });
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
app.post("/answers", (req, res) => {
  let body = req.body.body;
  let askId = req.body.ask;

  Answers.create({
    body: body,
    askId: askId,
  }).then(() => {
    res.redirect("/ask/" + askId);
  });
});

app.listen(8080, (err) => {
  if (err) {
    console.log(`Houve um erro: ${err}`);
  } else {
    console.log("Servidor rodando na porta 8080");
  }
});
