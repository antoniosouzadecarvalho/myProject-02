const express = require("express");
const router = express.Router();

//Modulo ModelUsuarios
const Usuarios = require("./ModelUsuarios");

// EndPoint: Exibir EJS(./views/formulario.ejs)
router.get("/cadastro", (req, res) => {
    res.render("cadastro")
});

// EndPoint: Persistir USUÁRIO no DB
router.post("/criar", (req, res) => {
    //Dados cadastro
    let {nome, email, idade} = req.body;

    //Validação (simples)
    if(nome == undefined || email == undefined || idade == undefined){
        res.redirect("/");
    }else{

        Usuarios.create({nome: nome, email: email, idade: idade})
            .then(() => {
                res.redirect("/");
            })
            .catch(err => {
                console.log(err);
            });
    }
});

// EndPoint: Exibir EJS(./views/atualizar.ejs)
router.get("/atualizar/:id", (req, res) => {
    let id = req.params.id;

    Usuarios.findByPk(id)
        .then(resulth => {
            res.render("atualizar", {usuario: resulth});
        })
        .catch(err => {
            console.log(err);
        })
});


// EndPoint: Atualizar USUÁRIO pelo ID no DB
router.post("/atualizacao", (req, res) => {
    //Dados atualizar
    let {id, nome, email, idade} = req.body;

    Usuarios.update({nome: nome, email: email, idade: idade}, {
        where: {
            id: id
        }
    })
    .then(() => {
        res.redirect("/")
    })
    .catch(err => {
        console.log(err)
    })
});

// EndPoint: Deletar USUÁRIO pelo ID no DB
router.get("/deletar/:id", (req, res) => {
    let id = req.params.id;

    Usuarios.destroy({
        where: {
            id: id
        }
    })
    .then(() => {
        res.redirect("/");
    })
    .catch(err => {
        console.log(err)
    })
})







module.exports = router;