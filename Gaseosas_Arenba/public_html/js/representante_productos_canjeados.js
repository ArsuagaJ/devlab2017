$(document).ready(function(){
    
    $("#btnInforme2").on("click", function() {
	$("#idTablaInforme2").show(); 
        
        vaciarTabla();
        /*ocultarMensaje();*/
        realizarBusqueda();
    });
	
    var producto = "";    
    var nombre = "";
    var apellido = "";
    var provincia = "";
    var localidad = "";
    var fechaDeCanje = "";
    
    // tomamos los datos de la fila y los cargamos en la funcion que estamos trabajando
    $("#tblTablaOculta").find('tr').click(function(){
        fila = $(this);
        var celdas = this.getElementsByTagName("td");
        producto = celdas[0].firstChild.nodeValue;
        nombre = celdas[1].firstChild.nodeValue;
        apellido = celdas[2].firstChild.nodeValue;
        provincia = celdas[3].firstChild.nodeValue;
        localidad = celdas[4].firstChild.nodeValue;
        fechaDeCanje = celdas[5].firstChild.nodeValue;
        cargarDatos(producto,nombre,apellido,provincia,localidad,fechaDeCanje);
    });
});
   function vaciarTabla(){
    $("#tblTablaOculta #tblResultado tr").remove();
    } 
   
   function realizarBusqueda(){
    //var rex = new RegExp($("#filtrar").val(), 'i');
    var valorABuscarPrimeraFecha = $("#primerafecha").val();
    var valorABuscarSegundaFecha = $("#segundafecha").val();

   
         
    var parametros = {
        //"nameDescrip" : rex.test($(this).text())
        "valorABuscarPrimeraFecha" : valorABuscarPrimeraFecha,
        "valorABuscarSegundaFecha" : valorABuscarSegundaFecha
        
    };
    $.ajax({
        data:  parametros, // los datos que van a ser recuperados desde el php
        url:   '../php/getCanjePorFecha.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
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
    var producto = "";
    var nombre = "";
    var apellido = "";
    var provincia = "";
    var localidad = "";
    var fechaDeCanje = "";
    // tomamos los datos de la fila y los cargamos en la funcion que estamos trabajando
    $("#tblTablaOculta").find('tr').click(function(){
        fila = $(this);
        var celdas = this.getElementsByTagName("td");
        producto = celdas[0].firstChild.nodeValue;
        nombre = celdas[1].firstChild.nodeValue;
        apellido = celdas[2].firstChild.nodeValue;
        provincia = celdas[3].firstChild.nodeValue;
        localidad = celdas[4].firstChild.nodeValue;
        fechaDeCanje = celdas[5].firstChild.nodeValue;
        cargarDatos(producto,nombre,apellido,provincia,localidad,fechaDeCanje);
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
        var celda6 = document.createElement("td");
        
        var producto = objetoJSON[i].producto;
        var nombre = objetoJSON[i].nombre;
        var apellido = objetoJSON[i].apellido;
        var provincia = objetoJSON[i].provincia;
        var localidad = objetoJSON[i].localidad;
        var fechaDeCanje = objetoJSON[i].fechaDeCanje;
        
        
        var textoCelda1 = document.createTextNode(producto);
        var textoCelda2 = document.createTextNode(nombre);
        var textoCelda3 = document.createTextNode(apellido);
        var textoCelda4 = document.createTextNode(provincia);
        var textoCelda5 = document.createTextNode(localidad);
        var textoCelda6 = document.createTextNode(fechaDeCanje);
        
        celda1.appendChild(textoCelda1);
        celda2.appendChild(textoCelda2);
        celda3.appendChild(textoCelda3);
        celda4.appendChild(textoCelda4);
        celda5.appendChild(textoCelda5);
        celda6.appendChild(textoCelda6);
            
        hilera.appendChild(celda1);
        hilera.appendChild(celda2);
        hilera.appendChild(celda3);
        hilera.appendChild(celda4);
        hilera.appendChild(celda5);
        hilera.appendChild(celda6);
 
        tbody.appendChild(hilera); //agrega la hilera al final de la tabla
    }
    }


function mostrarDivMensaje(){
    $("#divMensaje").removeClass("hidden");
    $("#divMensaje").addClass("visible-block");
}
