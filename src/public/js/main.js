document.addEventListener('DOMContentLoaded', event => {
    
    document.getElementById("btn_dis").addEventListener("click", disconnect)
    document.getElementById("btn_direccion").addEventListener("click", enviarDireccion)


    document.getElementById("btn_delante").addEventListener("click", () => {
        call_service("delante")
    })
    document.getElementById("btn_atras").addEventListener("click", () => {
        call_service("atras")
    })
    document.getElementById("btn_izquierda").addEventListener("click", () => {
        call_service("izquierda")
    })
    document.getElementById("btn_der").addEventListener("click", () => {
        call_service("derecha")
    })
    document.getElementById("btn_stop").addEventListener("click", () => {
        call_service("parar")
    })
    
    console.log("Nombre:"+document.getElementById("img_ultimo_reciclaje").src)

    data = {
        // ros connection
        ros: null,
        rosbridge_address: 'ws://127.0.0.1:9090/', //   'ws://192.168.0.133:9090/'
        connected: false,

        // service information 
          service_busy: false, 
          service_response: ''
    }

    function enviarDireccion(){
        console.log("Clic en enviar")

        data.ros = new ROSLIB.Ros({
            url: 'ws://' + document.getElementById("direccionRobot").value + ':9090/'
        })
        data.ros.on("connection", () => {
            data.connected = true
            console.log("Conexion con ROSBridge correcta")
            document.getElementById("conectTxt").innerHTML = "Robot conectado";

            let topic = new ROSLIB.Topic({
                ros: data.ros,
                name: '/odom',
                messageType: 'nav_msgs/msg/Odometry'
            })
                
            
            topic.subscribe((message) => {
                data.position = message.pose.pose.position
                document.getElementById("pos_x").innerHTML = data.position.x.toFixed(2)
                document.getElementById("pos_y").innerHTML = data.position.y.toFixed(2)
            })
        
		})
        data.ros.on("error", (error) => {
            console.log("Se ha producido algun error mientras se intentaba realizar la conexion")
            console.log(error)
            document.getElementById("conectTxt").innerHTML = "Error de conexion al robot";

        })
        
    }


    function disconnect(){
	      data.ros.close()        
	      data.connected = false
        console.log('Clic en botón de desconexión')
        document.getElementById("conectTxt").innerHTML = "Robot desconectado";

    }
    function call_service(valor){
        data.service_busy = true
        data.service_response = ''	
    
      //definimos los datos del servicio
        let service = new ROSLIB.Service({
            ros: data.ros,
            name: '/movement',
            serviceType: 'custom_interface/srv/MyMoveMsg'
        })
    
        let request = new ROSLIB.ServiceRequest({
            move: valor
        })
    
        service.callService(request, (result) => {
            data.service_busy = false
            data.service_response = JSON.stringify(result)
        }, (error) => {
            data.service_busy = false
            console.error(error)
        })	

    }







    
    
});
