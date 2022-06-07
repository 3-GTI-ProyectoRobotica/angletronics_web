/**
 * @author: Juan Carlos Hernández
 * @fecha: 06/2022
 * @description: Este fichero controla el modelo usuario que se guarda en la base de datos sql
 */
const bcrypt = require('bcrypt-nodejs')
const res = require('express/lib/response')
const db = require('../controller/database')


module.exports = class usuario {
    constructor(id_usuario,nombre,mail,password) {
        this.id_usuario = id_usuario
        this.nombre = nombre
        this.mail = mail
        this.password = password 
    }
  
      save(done){
          db.QueryStatment("INSERT INTO `usuario`(`nombre`, `mail`, `password`)"+
           "VALUES ('"+this.nombre+"','"+this.mail+"','"+this.password+"')", function(error,result){
              if(error){
                  console.log(error)
              }else{
                  return done(null, result)
              }
          })
      }
  
      comparePassword(password){
          return bcrypt.compareSync(password,this.password)
      }
  
      static EncryptPassword(password){
          return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      }
  
      static CheckIfUserExists(mail,done){
          db.QueryStatment("Select * from usuario where mail = '"+mail+"';", function(error,result){
              if(error){
                  console.log(error)
              }else{
                if(result.length > 0){
                    return done(null, new usuario(result[0].id_usuario, result[0].nombre, result[0].mail, result[0].password))
                  }else{
                    return done(null, null)
                  }
              }
          })
      }
  
      static GetUserById(id){ 
          db.QueryStatment("Select * from usuario where id = '"+id+"';", function(error,result){
              if(error){
                  console.log(error)
              }else{
                  if(result.lenght == 0){
                      return done(null, null)
                  }else{
                      return done(null, new usuario(result.id_usuario, result.mail, result.password))
                  }
              }
          })
       } 
}