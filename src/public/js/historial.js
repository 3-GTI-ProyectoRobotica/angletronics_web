function crearGrafica(){
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Plastico', 'Vidrio', 'Carton'],
        datasets: [{
        label: 'Easy as',
        data: [1, 2, 3],
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
}
document.addEventListener("DOMContentLoaded", function(event) {
    //código a ejecutar cuando el DOM está listo para recibir acciones
    //console.log("he cargado")
    crearGrafica();
});