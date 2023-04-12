const express = require("express");
const { addListener } = require("nodemon");
const app = express();
const connection = require("./database/database");

//Lib para pegar dados de formulario via verbo POST
const bodyParser = require("body-parser");

//Lib renderiza html5
app.set("view engine", "ejs");


//Conexão com Banco de Dados
connection.authenticate()
    .then(() => {
        console.log("Conectado com sucesso!")
    })
    .catch(err => {
        console.log(err)
    })

//Modulo tabela de usuarios
const Usuarios = require("./Usuarios/ModelUsuarios")

//Configurando body-parse no express
app.use(bodyParser.urlencoded({extends: false}));
app.use(bodyParser.json());

//Configurando arquivos estaticos
app.use(express.static('public'));




const ControllerUsuarios = require('./Usuarios/controllerUsuarios');

//Modulo Controlo de rotas
app.use("/", ControllerUsuarios);


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