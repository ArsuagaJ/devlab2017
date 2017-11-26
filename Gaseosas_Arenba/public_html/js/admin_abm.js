$(document).ready(function(){
    
    /* en este caso, llamamos al elemento 'tbody' de nombre 'myTable' para ocultar los registros y mostrarlos de acuerdo al selector de paginacion en que estamos, en principio es 1...
    Luego llamamos al selector de nombre 'myPager' y mostramos los controles necesarios para ejecutarlo */
    /*$('#myTable').pageMe({pagerSelector:'#myPager',showPrevNext:true,hidePageNumbers:false,perPage:10});*/
  
    $('#filtrar').keyup(function(e) {
        if(e.keyCode === 13) {
            vaciarTabla();
            /*ocultarMensaje();*/
            realizarBusqueda();
        }
    });
    
    $("#btnFiltroBuscar").click(function(){
      
        vaciarTabla();
        /*ocultarMensaje();*/
        realizarBusqueda();
    });

    var nombreUsuario = "";
    var rolUsuario = "";
    var nombre = "";
    var apellido = "";
    


    // tomamos los datos de la fila y los cargamos en la funcion que estamos trabajando
    $("#tblTablaOculta").find('tr').click(function(){
        fila = $(this);
        var celdas = this.getElementsByTagName("td");
        nombreUsuario = celdas[0].firstChild.nodeValue;
        rolUsuario = celdas[1].firstChild.nodeValue;
        nombre = celdas[2].firstChild.nodeValue;
        apellido = celdas[3].firstChild.nodeValue;
        cargarDatos(nombreUsuario,rolUsuario,nombre,apellido);
    });
     var usuario = "";
    var nombre = "";
    var apellido = "";
    var password1 = "";
    var password2 = "";
    var botonModif;
    var id;
    
        $("#modalModificar").on('show.bs.modal', function (e) {//funcion activa modal
        //console.log("hola");
        // lo siguiente funciona. lo tome de la web pero no lo entiendo mucho..
        //vaciarCacheDeDatos();
        
        var row = $(e.relatedTarget).parent().parent();
        var celdas= row.children();
        
        botonModif = celdas[4].firstChild;
        id = botonModif.getAttribute("id");//obtenemos el id referente a la fila mencionada
        var spli = id.split("-"); // lo separamos para obtener el numero de id del boton
        id = parseInt(spli[1]);
        //alert(boton.getAttribute("id"));
        // obtenemos cada uno de los valores referentes de la fila que tomamos..
        usuario = celdas[0].firstChild.nodeValue;
        nombre = celdas[2].firstChild.nodeValue;
        apellido = celdas[3].firstChild.nodeValue;
        //imagen = celdas[3].firstChild.nodeValue;  // lo dividimos para obtener el nombre
        //imagen = spli[2]; // reasignamos la variable nombre
        $("#inpUsuario").attr("value",usuario);
        $("#inpNombre").attr("value",nombre);
        $("#inpApellido").attr("value",apellido);
        
        
        //cargarDatos(nombreProducto,descProducto,imagen,puntos); 
        $("#btnModalModificarConfirmar").click(function(){ //manda las m,odificaciones del modal
 
            
            usuario = $("#inpUsuario").val();
            nombre = $("#inpNombre").val();
            apellido = $("#inpApellido").val();
            password1 = $("#inpPassword").val();
            password2 = $("#inpRepetirPassword").val();

            if(!(password1 === password2)){
                mostrarMensajeModal("Los password no son iguales");
                event.preventDefault();
            }else{
                var parametros = {
                    "nombreUsuario" : usuario,
                    "nombre" : nombre,
                    "apellido" : apellido,
                    "password" : password1,
                    "id" : id

                };
                $.ajax({
                    data:  parametros, // los datos que van a ser recuperados desde el php
                    url:   '../php/updateUsuario.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
                    type:  'post',
                    beforeSend: function procesandoArchivo() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                        imprimirMensaje("Actualizando el producto, aguarde unos instantes...");
                    },
                    success: function resultado(respuestaPHP){
                        imprimirMensaje("Se ha actualizado correctamente el usuario"+ usuario);
                    }
                }).done(function(result){
                    if(result === 0){
                        alert("rrorr");
                    }
                    mostrarDivMensaje();
                    imprimirMensaje("Se ha actualizado correctamente los datos");
                    console.log("Actualizacion de producto Procesado Correctamente");
                    //console.log(result);
                });;
            }
        });
    });
    // tengo que agregarlo aca para que lo tome en todas las filas...

    /*$("#btnModalModificar").click(function(){
        cargarDatosDeFila();
    });*/
    
    // luego de dar boton "CONFIRMAR se da de baja el usuario y se quita de la lista
    var boton = $("#btnModalBajaConfirmar");
    boton.click(function(){
        mostrarDivMensaje();
        $("#pMensaje").text("El usuario: "+nombreUsuario+", se ha dado de baja Correctamente");
        fila.attr("class","hidden");//$(this).parent.attr("class","hidden");
    });
    
    $("#btnCerrarAlerta").click(function(){
        ocultarMensaje();
    });
});


function vaciarTabla(){
    $("#tblTablaOculta #tblResultado tr").remove();
}

function realizarBusqueda(){
    var rex = new RegExp($("#filtrar").val(), 'i');
    var valorABuscar = $("#filtrar").val();
    var rol; 
    if($("#idRol").val() === "Todos"){
        rol = "";
    }
    else{
      rol = $("#idRol").val();  
    }
   
         
    var parametros = {
        "nameDescrip" : valorABuscar,
        "rol" : rol
        
    };
    $.ajax({
        data:  parametros, // los datos que van a ser recuperados desde el php
        url:   '../php/getUsuarioPorNombre.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
        type:  'get'
         
        }).done(function(respuesta){
            if(respuesta[0].resultado === "nodata"){
                mostrarDivMensaje();
                $("#pMensaje").text("No hay registros con esos datos");
            }
            if (respuesta[0].resultado === "ok") {
               // console.log(JSON.stringify(respuesta));
                $("#tblTablaOculta").removeClass("hidden");
                $("#tblTablaOculta").addClass("visible-block");
                $('.buscar tr').show();
                generarTabla(respuesta);
            }
            else{
                console.log("Se ha producido un error con los datos enviados por el servidor");
            }
        });
}

function cargarDatosDeFila(){
    var usuario = "";
    var id_rol = "";
    var nombre = "";
    var apellido = "";
    var fila = "";
    // tomamos los datos de la fila y los cargamos en la funcion que estamos trabajando
    $("#tblTablaOculta").find('tr').click(function(){
        fila = $(this);
        var celdas = this.getElementsByTagName("td");
        usuario = celdas[0].firstChild.nodeValue;
        id_rol = celdas[1].firstChild.nodeValue;
        nombre = celdas[2].firstChild.nodeValue;
        apellido = celdas[3].firstChild.nodeValue;
        cargarDatos(usuario,id_rol,nombre,apellido);
    });
}

function generarTabla(objetoJSON){
    
    console.log(objetoJSON);
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
        
        var usuario = objetoJSON[i].usuario;
        var id_rol = objetoJSON[i].id_rol;
        var nombre = objetoJSON[i].nombre;
        var apellido = objetoJSON[i].apellido;
        
        var botonModificar = document.createElement("button");
        var iconoModifi = document.createElement("i");
        botonModificar.className = "btn btn-warning";
        botonModificar.setAttribute("id","btnModalModificar-"+objetoJSON[i].id_usuario);
        botonModificar.setAttribute("data-toggle","modal");
        botonModificar.setAttribute("data-target","#modalModificar");
        iconoModifi.className = "glyphicon glyphicon-pencil";

        botonModificar.appendChild(iconoModifi);

        var botonBaja = document.createElement("button");
        var iconoBaja = document.createElement("i");
        botonBaja.className = "btn btn-danger";
        botonBaja.setAttribute("id","btnModalDarBaja");
        botonBaja.setAttribute("data-toggle","modal");
        botonBaja.setAttribute("data-target","#myModal");
        iconoBaja.className = "glyphicon glyphicon-remove";

        botonBaja.appendChild(iconoBaja);
        
        var textoCelda1 = document.createTextNode(usuario);
        var textoCelda2 = document.createTextNode(id_rol);
        var textoCelda3 = document.createTextNode(nombre);
        var textoCelda4 = document.createTextNode(apellido);
        
        celda1.appendChild(textoCelda1);
        celda2.appendChild(textoCelda2);
        celda3.appendChild(textoCelda3);
        celda4.appendChild(textoCelda4);
        celda5.appendChild(botonModificar);
        celda5.appendChild(botonBaja);
            
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

function mostrarMensajeModal(strMensaje){
    $("#parMensajeModal").text(strMensaje);
}

function imprimirMensaje(strMensaje){
    $("#pMensaje").text(strMensaje);
}


   /*$('#modalModificar').on('hidden.bs.modal', function (e) {
        vaciarTabla();
        vaciarCacheDeDatos();
        realizarBusqueda(); // actualizamos la tabla para que apliquen los cambios
    });*/
    
   
    