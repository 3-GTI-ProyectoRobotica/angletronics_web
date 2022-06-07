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

    static GetRegistrosByUserId(id,done){ 
        db.QueryStatment("Select * from registros_reciclaje where id_usuario = '"+id+" order by id DESC';", function(error,result){
            if(error){
                console.log(error)
            }else{
                if(result.lenght == 0){
                    return done(null, null)
                }else{
                    var registros_reciclaje = []

                    result.forEach(element => 
                        registros_reciclaje.push(new registro_reciclaje(element.id_registro_reciclaje,element.imagen,element.clasificacion,element.id_usuario,element.fecha)));
                    return done(null,registros_reciclaje);
                }
            }
        })
     } 
}