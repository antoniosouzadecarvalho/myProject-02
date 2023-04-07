const express = require("express");
const router = express.Router();

//Modulo tabela do banco de dados
const Usuarios = require("./ModelUsuarios");


router.get("/formulario", (req, res) => {
    res.render("formulario")
});

router.post("/criar", (req, res) => {
    //Dados da rota formulario
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


//Atualizar dados do usuario
router.post("/atualizacao", (req, res) => {
    //Dados do formulario da rota atualizar
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