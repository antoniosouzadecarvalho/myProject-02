const Sequelize = require("sequelize");


const connection = new Sequelize('myproject-02', 'root', 'amin2003', {
    host: "localhost",
    dialect: "mysql"
});


module.exports = connection;