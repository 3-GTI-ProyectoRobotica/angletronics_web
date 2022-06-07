/**
 * @author: Sergi Sirvent Sempere y Juan Carlos Hernández
 * @fecha: 06/2022
 * @description: Este fichero controla la creación del historial de reciclaje y de la gráfica de esta misma página
 */
var paginaHistorial = 1;
function crearGrafica(n_plastico,n_vidrio,n_carton){
    
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Plastico', 'Vidrio', 'Carton'],
        datasets: [{
        label: 'Easy as',
        data: [1, 2, 3],
        data: [n_plastico, n_vidrio, n_carton],
        backgroundColor:[
            'rgb(255, 222, 0)',
            'rgb(0, 168, 76)',
            'rgb(91, 155, 213)'
        ]
        }],
    },
    options: {
        legend:{
            display:false,
        },
        responsive: true,
        
    }
    });
    //console.log(chart.data.datasets[0].data[X]); ///PARA ACCEDER A LOS DATOS

    let contadorPlastico = chart.data.datasets[0].data[0];
    document.getElementById("contadorPlastico").innerHTML = "Contador plastico: "+contadorPlastico;
    let contadorVidrio = chart.data.datasets[0].data[1];
    document.getElementById("contadorVidrio").innerHTML = "Contador vidrio: "+contadorVidrio;
    let contadorCarton = chart.data.datasets[0].data[2];
    document.getElementById("contadorCarton").innerHTML = "Contador carton: "+contadorCarton;

    document.addEventListener("DOMContentLoaded", function(event) {
        //código a ejecutar cuando el DOM está listo para recibir acciones
        //console.log("he cargado")
        crearGrafica();
    });
}

function cargarHistorial(listaElementos, pagina){
    let tope = pagina*3;
    let ini = tope-3;
    if(tope>listaElementos.length){
        tope = listaElementos.length;
    }
    var columnaFotos = "",columnaFecha ="",columnaHora="",columnaClasificacion="";
    for(var i =ini; i<tope;i++){
        let result = listaElementos[i].imagen.lastIndexOf("/");
        var img_name = listaElementos[i].imagen.substring(result+1);
        columnaFotos +="<img id='camara' src='/assets/fotos_reciclaje/"+img_name+"' > <br>";
        columnaHora +="<h4>"+new Date(listaElementos[i].fecha).toLocaleTimeString('en-US', {hour: '2-digit',minute: '2-digit',});+"</h4>"
        columnaFecha +="<h4>"+new Date(listaElementos[i].fecha).toLocaleDateString('en-US')+"</h4>"
        columnaClasificacion +="<img id='azul' src='/assets/fotosPanel/"+listaElementos[i].clasificacion+".png'> <br>"
    }
    document.getElementById("columnaFotos").innerHTML= columnaFotos;
    document.getElementById("columnaFecha").innerHTML= columnaFecha;
    document.getElementById("columnaHora").innerHTML= columnaHora;
    document.getElementById("columnaClasificacion").innerHTML= columnaClasificacion;
}

