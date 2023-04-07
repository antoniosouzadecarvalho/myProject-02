const Sequelize = require("sequelize");
const connection = require("../database/database");


const Usuarios = connection.define("usuarios", {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Usuarios.sync({force: false});

module.exports = Usuarios;