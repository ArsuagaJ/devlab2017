$(document).ready(function(){
    $("#btnBusquedaListados").click(function(){
        ocultarDivMensaje();
        vaciarTabla();
        realizarBusqueda();
    });
    
    // revisar el hecho que no toma los datos cuando presionamos el modal
    /*var nombreLista = "";
    var descLista = "";
    var estado = "";
    var fechaInicio = "";
    var fechaFin = "";
    var fila = "";
    $("#tblTablaOculta").find('tr').click(function(){
        fila = $(this);
        var celdas = this.getElementsByTagName("td");
        nombreLista = celdas[0].firstChild.nodeValue;
        descLista = celdas[4].firstChild.nodeValue;
        estado = celdas[1].firstChild.nodeValue;
        fechaInicio = celdas[2].firstChild.nodeValue;
        fechaFin = celdas[3].firstChild.nodeValue;
        //alert(nombreLista);
        cargarDatos(nombreLista,descLista,estado,fechaInicio,fechaFin);
    
        // de la siguiente forma mostramos el modal y hacemos alguna accion
        $("#modalModificar").on('show.bs.modal', function (e) {
            cargarDatos(nombreLista,descLista,estado,fechaInicio,fechaFin);
            //alert("Modal Mostrada con Evento de Boostrap");
        });
    });*/
    /*$('#AddDate').on('hidden.bs.modal', function (e) {
        alert("Modal Cerrada");
    })*/
});

function cargarDatosDeFila(){
    var nombreLista = "";
    var descLista = "";
    var estado = "";
    var fechaInicio = "";
    var fechaFin = "";
    var fila = "";
    // tomamos los datos de la fila y los cargamos en la funcion que estamos trabajando
    $("#tblTablaOculta").find('tr').click(function(){
        fila = $(this);
        var celdas = this.getElementsByTagName("td");
        nombreLista = celdas[0].firstChild.nodeValue;
        descLista = celdas[4].firstChild.nodeValue;
        estado = celdas[1].firstChild.nodeValue;
        fechaInicio = celdas[2].firstChild.nodeValue;
        fechaFin = celdas[3].firstChild.nodeValue;
        alert(nombreLista);
        cargarDatos(nombreLista,descLista,estado,fechaInicio,fechaFin);
    });
}

function cargarDatos(strNombre,strDescripcion,estado,fechaInicio,fechaFin){
    $("#inpNombreListado").attr("value",strNombre);
    $("#txtDescripcion").text(strDescripcion);
    //$("#inpPuntos").attr("value",parseInt(strCantidadPuntos));
    $("#desde").attr("value",fechaInicio);
    $("#hasta").attr("value",fechaFin);
}

function ocultarDivMensaje(){
    $("#divMensaje").removeClass("visible-block");
    $("#divMensaje").addClass("hidden");
}

function mostrarDivMensaje(){
    $("#divMensaje").removeClass("hidden");
    $("#divMensaje").addClass("visible-block");
}

function realizarBusqueda(){
    var estadoCanje = 0; // este es el filtro con el que le indicamos con el numero 0 para buscar por listados que no tengan ningun canje dentro de sus codigos
    
    var parametro = {
       "estado_canje": estadoCanje
    };
    
    $.ajax({
        data:  parametro, // los datos que van a ser recuperados desde el php
        url:   '../php/getListadosDeCodigosSinCanjes.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
        type:  'get'
        }).done(function(respuesta){
            //alert(respuesta);
            if(respuesta[0].resultado === "nodata"){ // si la consulta devuelve vacia, mostramos un mensaje correspondiente
                mostrarDivMensaje();
                $("#pMensaje").text("No hay registros con esos datos");
            }
            if (respuesta[0].resultado === "ok"){ // si tenemos al menos 1 registro, generamos la tabla con los registros devueltos por el server
                //console.log(respuesta);
                generarTabla(respuesta);
            }
            else{
                console.log("Se ha producido un error con los datos enviados por el servidor"); // si algo falla, lo guardamos en el log
            }
        });
}

function vaciarTabla(){
    $("#tblTablaOculta #tblResultado tr").remove();
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
        var celda6 = document.createElement("td"); // aca van los botones de baja y modificacion
        
        var nombreListado = objetoJSON[i].nombre;
        var split = nombreListado.split("/"); // separamos la ruta completa de acceso a los listados
        nombreListado = split[2]; // establecemos solo el nombre para mostrar en la tabla
        var descripcListado = objetoJSON[i].descripcion;
        var estado = objetoJSON[i].estado;
        var fechaInicio = objetoJSON[i].fechaInicio;
        var fechaFin = objetoJSON[i].fechaFin;
        
        var nombreBtnModalModificar = "btnModalModificar"+objetoJSON[i].id;//+i; esto no me estaria funcionando
        var nombreBtnModalDarBaja = "btnModalDarBaja"+objetoJSON[i].id;//+i; esto tapoco me estaria funcando
        
        var botonModificar = document.createElement("button");
        var iconoModifi = document.createElement("i");
        botonModificar.className = "btn btn-warning";
        botonModificar.setAttribute("id",nombreBtnModalModificar);
        botonModificar.setAttribute("data-toggle","modal");
        botonModificar.setAttribute("data-target","#modalModificar");
        iconoModifi.className = "glyphicon glyphicon-pencil";

        botonModificar.appendChild(iconoModifi);

        var botonBaja = document.createElement("button");
        var iconoBaja = document.createElement("i");
        botonBaja.className = "btn btn-danger";
        botonBaja.setAttribute("id",nombreBtnModalDarBaja);
        botonBaja.setAttribute("data-toggle","modal");
        botonBaja.setAttribute("data-target","#myModal");
        iconoBaja.className = "glyphicon glyphicon-remove";

        botonBaja.appendChild(iconoBaja);
        
        var textoCelda1 = document.createTextNode(nombreListado);
        var textoCelda2 = document.createTextNode(estado);
        var textoCelda3 = document.createTextNode(fechaInicio);
        var textoCelda4 = document.createTextNode(fechaFin);
        var textoCelda5 = document.createTextNode(descripcListado);
        
        celda1.appendChild(textoCelda1);
        celda2.appendChild(textoCelda2);
        celda3.appendChild(textoCelda3);
        celda4.appendChild(textoCelda4);
        celda5.appendChild(textoCelda5);
        celda6.appendChild(botonModificar);
        celda6.appendChild(botonBaja);
            
        hilera.appendChild(celda1);
        hilera.appendChild(celda2);
        hilera.appendChild(celda3);
        hilera.appendChild(celda4);
        hilera.appendChild(celda5);
        hilera.appendChild(celda6);
 
        tbody.appendChild(hilera); //agrega la hilera al final de la tabla
    }
}
