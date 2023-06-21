const express = require("express");
const app = express();
const connection = require("./database/database");

// Body-Parser
const bodyParser = require("body-parser");

// EJS
app.set("view engine", "ejs");


//Conexão com Banco de Dados
connection.authenticate()
    .then(() => {
        console.log("Conectado com sucesso!")
    })
    .catch(err => {
        console.log(err)
    })

//Modulo ModelUsuários
const Usuarios = require("./Usuarios/ModelUsuarios")

//Config body-parse no express
app.use(bodyParser.urlencoded({extends: false}));
app.use(bodyParser.json());


// Modulo EndPoints Usuários
const ControllerUsuarios = require('./Usuarios/controllerUsuarios');

// Config EndPoints no express
app.use("/", ControllerUsuarios);

// EndPoint: Raiz
app.get("/", (req, res) => {
    Usuarios.findAll()
        .then(resulth => {
            res.render("index", {usuarios: resulth});
        })
        .catch(err => {
            console.log(err);
        })
});


app.listen(3000, () => {
    console.log("Servidor iniciado!");
})