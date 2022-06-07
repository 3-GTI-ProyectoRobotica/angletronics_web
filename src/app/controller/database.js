/**
 * @author: Juan Carlos Hernández
 * @fecha: 05/2022
 * @description: Documento que prepara la conexión con la bbdd de sql y la web
 */
const db_info = require('../../config/database')
const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : db_info.host,
    user     : db_info.user,
    password : db_info.password,
    database : db_info.database
  });

module.exports = class usuario {
    static QueryStatment(statement, done){
        //connection.connect();
        connection.query(statement, function (error, results, fields) {
            if (error){
                throw error;
            }else{
                return done(null, results)
            }
        });
        //connection.end()
    }
}
