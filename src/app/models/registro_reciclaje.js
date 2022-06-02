const res = require('express/lib/response')
const db = require('../controller/database')

module.exports = class registro_reciclaje {
    constructor(id_registro,imagen,clasificacion,id_usuario,fecha) {
        this.id_registro = id_registro
        this.imagen = imagen
        this.clasificacion = clasificacion
        this.id_usuario = id_usuario
        this.fecha = fecha
    }
    //INSERT INTO `registros_reciclaje`(`imagen`,`clasificacion`,`id_usuario`,`fecha`) VALUES ('ruta','vidrio',15,'2020-09-16 15:14:24')
    save(done){
        db.QueryStatment("INSERT INTO `registros_reciclaje`(`imagen`,`clasificacion`,`id_usuario`,`fecha`,)"+
        "VALUES ('"+this.imagen+"','"+this.clasificacion+"','"+this.id_usuario+"','"+this.fecha+"')",function(error,result){
            if(error){
                console.log(error)
            }else{
                return done(null, result)
            }
        })
    }

    static GetRegistrosByUserId(id){ 
        db.QueryStatment("Select * from registros_reciclaje where id_usuario = '"+id+"';", function(error,result){
            if(error){
                console.log(error)
            }else{
                if(result.lenght == 0){
                    return done(null, null)
                }else{
                    /*
                    lista_registros = []
                    for
                    return done(null, new usuario(result.id_usuario, result.mail, result.password))

                    */
                    console.log(result)
                }
            }
        })
     } 
}