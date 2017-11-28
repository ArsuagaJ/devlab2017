$(document).ready(function(){
    $("#btnBusquedaListados").click(function(){
        ocultarDivMensaje();
        vaciarTabla();
        realizarBusqueda();
    });
    

    /*$("#tblTablaOculta tbody").find('tr').click(function(){
        fila = $(this);
        var celdas = this.getElementsByTagName("td");
        nombreLista = celdas[0].firstChild.nodeValue;
        descLista = celdas[4].firstChild.nodeValue;
        estado = celdas[1].firstChild.nodeValue;
        fechaInicio = celdas[2].firstChild.nodeValue;
        fechaFin = celdas[3].firstChild.nodeValue;
            //alert(nombreLista);
        cargarDatos(nombreLista,descLista,estado,fechaInicio,fechaFin);
        console.log("algo?: "+nombreLista);
        /*$("#modalModificar").on('show.bs.modal', function (e) {
            //cargarDatos(nombreLista,descLista,estado,fechaInicio,fechaFin);
        });*/
    //});*/
    
    var nombreLista = "";
    var descLista = "";
    var estado = "";
    var fechaInicio = "";
    var fechaFin = "";
    var botonModif;
    var botonVista;
    var id;
    
    $("#modalVista").on('show.bs.modal', function (e) {
        var row = $(e.relatedTarget).parent().parent();
        var celdas= row.children();
        
        botonVista = celdas[5].firstChild;
        id = botonVista.getAttribute("id").substr(-2,2);//obtenemos el id referente a la fila mencionada
        id = parseInt(id);
        console.log(id);
        var parametro = {
            "id" : id
        };
        // generamos un ajax nuevo con los valores de los campos que se guardaran en la tabla "lista de codigos"
        $.ajax({
            data:  parametro, // los datos que van a ser recuperados desde el php
            url:   '../php/getCodigosPorLista.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
            type:  'get',
            beforeSend: function procesandoArchivo() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                imprimirMensaje("Mostrando códigos, aguarde unos instantes...");
            }
        }).done(function(result){
            $("#txtVistaDescripcion").text(result[1]);
            /*if(result === 0){
                alert("rrorr");
            }*/
            mostrarCodigos(result);
            console.log("Mostrando Codigos en PopUp");
            //console.log(result);
        });;
    });
    
    $("#modalBaja").on('show.bs.modal', function (e) {
        var row = $(e.relatedTarget).parent().parent();
        var celdas= row.children();
        
        botonModif = celdas[5].lastChild;
        id = botonModif.getAttribute("id").substr(-2,2);//obtenemos el id referente a la fila mencionada
        
        id = parseInt(id);
        $("#btnModalBajaConfirmar").click(function(){
            var parametro = {
                    "id" : id
                };
                // generamos un ajax nuevo con los valores de los campos que se guardaran en la tabla "lista de codigos"
                $.ajax({
                    data:  parametro, // los datos que van a ser recuperados desde el php
                    url:   '../php/deleteListaCodigos.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
                    type:  'post',
                    beforeSend: function procesandoArchivo() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                        imprimirMensaje("Dando de baja el archivo de códigos, aguarde unos instantes...");
                    }
                }).done(function(result){
                    /*if(result === 0){
                        alert("rrorr");
                    }*/
                    imprimirMensaje("Se ha dado de baja correctamente el archivo de codigos");
                    console.log("Archivo Procesado Correctamente(BAJA DE ARCHIVO)");
                    //console.log(result);
                });;
        });
    });
    
    $("#modalBaja").on('hidden.bs.modal', function (e) {
        ocultarDivMensaje();
        vaciarTabla();
        realizarBusqueda(); // actualizamos la tabla para que apliquen los cambios
        vaciarCacheDeDatos();
        imprimirMensaje("Se ha dado de baja correctamente el archivo de codigos");
        $('#modalMensaje').modal('show');
    });
    
    $("#modalModificar").on('show.bs.modal', function (e) {
        
        // lo siguiente funciona. lo tome de la web pero no lo entiendo mucho..
        
        var row = $(e.relatedTarget).parent().parent();
        var celdas= row.children();
        
        botonModif = celdas[5].firstChild.nextSibling; // con esto obtenemos el "siguiente hermano" del primero, o sea, el boton modificar
        id = botonModif.getAttribute("id");//.substr(-2,2);//obtenemos el id referente a la fila mencionada
        var spli = id.split("-");
        id = parseInt(spli[1]);
        

        //alert(boton.getAttribute("id"));
        // obtenemos cada uno de los valores referentes de la fila que tomamos..
        nombreLista = celdas[0].firstChild.nodeValue;
        descLista = celdas[4].firstChild.nodeValue;
        if(celdas[1].firstChild.nodeValue === "Activo"){
            estado = "0";
        }else{
            estado = "1";
        }
        fechaInicio = celdas[2].firstChild.nodeValue;
        fechaFin = celdas[3].firstChild.nodeValue;
        setFechaActual($("#desde")); // le seteamos la fecha actual al input de fecha desde y el valor minimo
        setFechaActual($("#hasta")); // le seteamos la fecha actual al input de fecha hasta y el valor minimo
        
        cargarDatos(nombreLista,descLista,estado,fechaInicio,fechaFin);
        $("#btnModalModificarConfirmar").click(function(){
            //alert(botonModif.getAttribute("id"));
            //alert(id);
            if(validarFechaMayorActual($("#desde").val()) && validarFechaMayorActual($("#hasta").val())){
                var fechaDesde = $("#desde").val();
                var fechaHasta = $("#hasta").val();
                var estate = $("#selEstado").val();
                var descrip = $("#txtDescripcion").val();
                var rutaArchivo = nombreLista;
                var estado = true;
                if(estate === "1"){
                    estado = 1;
                }
                var parametros = {
                    "fechaDesde" : fechaDesde,
                    "fechaHasta" : fechaHasta,
                    "descrip" : descrip,
                    "path" : "../archivos/"+rutaArchivo,
                    "estado" : estado,
                    "id" : id
                };
                // generamos un ajax nuevo con los valores de los campos que se guardaran en la tabla "lista de codigos"
                $.ajax({
                    data:  parametros, // los datos que van a ser recuperados desde el php
                    url:   '../php/updateListaCodigos.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
                    type:  'post',
                    beforeSend: function procesandoArchivo() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                        imprimirMensaje("Actualizando archivo de códigos, aguarde unos instantes...");
                    }
                }).done(function(result){
                    /*if(result === 0){
                        alert("rrorr");
                    }*/
                    imprimirMensaje("Se ha actualizado correctamente el archivo de codigos"+rutaArchivo);
                    console.log("Archivo Procesado Correctamente");
                    //console.log(result);
                });;
            }else{
                imprimirMensajeModal("Error al actualizar el archivo de codigos"+rutaArchivo);
            }
        });
    });
    
    $('#modalModificar').on('hidden.bs.modal', function (e) {
        ocultarDivMensaje();
        vaciarTabla();
        realizarBusqueda(); // actualizamos la tabla para que apliquen los cambios
        vaciarCacheDeDatos();
    });
});

function imprimirMensajeModal(strMensaje){
    $("#pModalMensaje").text(strMensaje);
}

function imprimirMensaje(strMensaje){
    $("#pMensaje").text(strMensaje);
}

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
        //alert(nombreLista);
        cargarDatos(nombreLista,descLista,estado,fechaInicio,fechaFin);
    });
}

function cargarDatos(strNombre,strDescripcion,estado,fechaInicio,fechaFin){
    $("#inpNombreListado").attr("value",strNombre);
    $("#txtDescripcion").text(strDescripcion);
    //$("#inpPuntos").attr("value",parseInt(strCantidadPuntos));
    var inpEstado =  $("#selEstado");
    if(estado === "Activo"){
        inpEstado.attr("value","1");
    }else{
        inpEstado.attr("value","2");
    }
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

function vaciarCacheDeDatos(){
    $("#inpNombreListado").attr("value","");
    $("#txtDescripcion").text("");
    $("#selEstado").attr("value","");
    $("#desde").attr("value","");
    $("#hasta").attr("value","");
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
                $("#pMensaje").text("No hay registros activos con Codigos sin Canjear");
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
    $("#tblTablaOculta tbody tr").remove();
}

function mostrarCodigos(objetoJSON){

    var longitud = Object.keys(objetoJSON).length;
    var string = "";
    var temp = 0;
    var estad = "";
    for (var i = 1; i < longitud; i++) {
        string = string+objetoJSON[i].codigo+", ";
    }
    $("#txtVistaDescripcion").text(string);
}

function generarTabla(objetoJSON){
    
    var tabla   = document.getElementById("tblTablaOculta");
    var tbody = tabla.tBodies[0];//Crea un elemento <table>
    tbody.setAttribute("id","tbodyMuestra");

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
        var estado;
        if(objetoJSON[i].estado === "0"){
            estado ="Activo";
        }else
        {
            estado = "Inactivo";
        };
        var fechaInicio = objetoJSON[i].fechaInicio;
        var fechaFin = objetoJSON[i].fechaFin;
        
        var nombreBtnModalModificar = "btnModalModificar-"+objetoJSON[i].id;//+i; esto no me estaria funcionando
        var nombreBtnModalDarBaja = "btnModalDarBaja-"+objetoJSON[i].id;//+i; esto tapoco me estaria funcando
        var nombreBtnModalVista = "btnModalVista-"+objetoJSON[i].id;//+i; esto tapoco me estaria funcando
        
        var botonVista = document.createElement("button");
        var iconoVista = document.createElement("i");
        botonVista.className = "btn btn-info";
        botonVista.setAttribute("id",nombreBtnModalVista);
        botonVista.setAttribute("data-toggle","modal");
        botonVista.setAttribute("data-target","#modalVista");
        botonVista.setAttribute("title","Ver Codigos de esta lista");
        iconoVista.className = "glyphicon glyphicon-eye-open";

        botonVista.appendChild(iconoVista);
        
        var botonModificar = document.createElement("button");
        var iconoModifi = document.createElement("i");
        botonModificar.className = "btn btn-warning";
        botonModificar.setAttribute("id",nombreBtnModalModificar);
        botonModificar.setAttribute("data-toggle","modal");
        botonModificar.setAttribute("data-target","#modalModificar");
        botonModificar.setAttribute("title","Modificar datos de la lista");
        iconoModifi.className = "glyphicon glyphicon-pencil";

        botonModificar.appendChild(iconoModifi);

        var botonBaja = document.createElement("button");
        var iconoBaja = document.createElement("i");
        botonBaja.className = "btn btn-danger";
        botonBaja.setAttribute("id",nombreBtnModalDarBaja);
        botonBaja.setAttribute("data-toggle","modal");
        botonBaja.setAttribute("data-target","#modalBaja");
        botonBaja.setAttribute("title","Dar de baja la lista");
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
        celda6.appendChild(botonVista);
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
