$(document).ready(function(){
    
    $("#btnInforme1").on("click", function() {
	$("#btnInforme1").show(); 
        
        vaciarTabla();
        /*ocultarMensaje();*/
        realizarBusqueda();
    });
	
    var idLista = "";    
    var fechaInicio = "";
    var fechaFin = "";
    var totalCodigos = "";
    var codigosCanjeados = "";

    
    // tomamos los datos de la fila y los cargamos en la funcion que estamos trabajando
    $("#tblTablaOculta").find('tr').click(function(){
        fila = $(this);
        var celdas = this.getElementsByTagName("td");
        idLista = celdas[0].firstChild.nodeValue;
        fechaInicio = celdas[1].firstChild.nodeValue;
        fechaFin = celdas[2].firstChild.nodeValue;
        totalCodigos = celdas[3].firstChild.nodeValue;
        codigosCanjeados = celdas[4].firstChild.nodeValue;
        cargarDatos(idLista,fechaInicio,fechaFin,totalCodigos,codigosCanjeados);
    });
});
   function vaciarTabla(){
    $("#tblTablaOculta #tblResultado tr").remove();
    } 
   
   function realizarBusqueda(){
 
    $.ajax({
        //data:  parametros, // los datos que van a ser recuperados desde el php
        url:   '../php/getCodigosInformados.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
        type:  'get'
         
        }).done(function(respuesta){
            console.log(respuesta);
            if(respuesta[0].resultado === "nodata"){
                mostrarDivMensaje();
                $("#pMensaje").text("No hay registros con esos datos");
            }
            if (respuesta[0].resultado === "ok") {
                console.log(JSON.stringify(respuesta));
                //mostramos la tabla si existe coincidencia
                $("#tblTablaOculta").removeClass("hidden");
                $("#tblTablaOculta").addClass("visible-block");
                $('.buscar tr').show();
                generarTabla(respuesta);
            }
            else{
                console.log("Se ha producido un error con los datos enviados por el servidor");
                mostrarDivMensaje();
                $("#pMensaje").text("No hay registros entre estas fechas");
            }
        });
    }
    
    function cargarDatosDeFila(){
    var idLista = "";
    var fechaInicio = "";
    var fechaFin = "";
    var totalCodigos = "";
    var codigosCanjeados = "";
    // tomamos los datos de la fila y los cargamos en la funcion que estamos trabajando
    $("#tblTablaOculta").find('tr').click(function(){
        fila = $(this);
        var celdas = this.getElementsByTagName("td");
        idLista = celdas[0].firstChild.nodeValue;
        fechaInicio = celdas[1].firstChild.nodeValue;
        fechaFin = celdas[2].firstChild.nodeValue;
        totalCodigos = celdas[3].firstChild.nodeValue;
        codigosCanjeados = celdas[4].firstChild.nodeValue;
        cargarDatos(idLista,fechaInicio,fechaFin,totalCodigos,codigosCanjeados);
    });
}

function generarTabla(objetoJSON){
    
    var tabla   = document.getElementById("tblTablaOculta");
    var tbody = tabla.tBodies[0];//Crea un elemento <table>

    var longitud = Object.keys(objetoJSON).length;
    // crea las hileras
    for (var i = 1; i < longitud; i++) {
        var hilera = document.createElement("tr");//Crea las hileras de la tabla
        var celda1 = document.createElement("td");
        var celda2 = document.createElement("td");
        var celda3 = document.createElement("td");
        var celda4 = document.createElement("td");
        var celda5 = document.createElement("td");

        
        var idLista = objetoJSON[i].idLista;
        var fechaInicio = objetoJSON[i].fechaInicio;
        var fechaFin = objetoJSON[i].fechaFin;
        var totalCodigos = objetoJSON[i].totalCodigos;
        var codigosCanjeados = objetoJSON[i].codigosCanjeados;

            
        var textoCelda1 = document.createTextNode(idLista);
        var textoCelda2 = document.createTextNode(fechaInicio);
        var textoCelda3 = document.createTextNode(fechaFin);
        var textoCelda4 = document.createTextNode(totalCodigos);
        var textoCelda5 = document.createTextNode(codigosCanjeados);
        
        celda1.appendChild(textoCelda1);
        celda2.appendChild(textoCelda2);
        celda3.appendChild(textoCelda3);
        celda4.appendChild(textoCelda4);
        celda5.appendChild(textoCelda5);
            
        hilera.appendChild(celda1);
        hilera.appendChild(celda2);
        hilera.appendChild(celda3);
        hilera.appendChild(celda4);
        hilera.appendChild(celda5);
 
        tbody.appendChild(hilera); //agrega la hilera al final de la tabla
    }
    }


function mostrarDivMensaje(){
    $("#divMensaje").removeClass("hidden");
    $("#divMensaje").addClass("visible-block");
}
