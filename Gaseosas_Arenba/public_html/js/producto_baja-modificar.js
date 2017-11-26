// con el codigo siguiente, se que funca el paginador, despues chusmeamos qué hace en si

$.fn.pageMe = function(opts){
    var $this = this,
        defaults = {
            perPage: 4,
            showPrevNext: false,
            hidePageNumbers: false
        },
        settings = $.extend(defaults, opts);
    
    var listElement = $this;
    var perPage = settings.perPage; 
    var children = listElement.children();
    var pager = $('.pager');
    
    if (typeof settings.childSelector!="undefined") {
        children = listElement.find(settings.childSelector);
    }
    
    if (typeof settings.pagerSelector!="undefined") {
        pager = $(settings.pagerSelector);
    }
    
    var numItems = children.size;
    var numPages = Math.ceil(numItems/perPage);

    pager.data("curr",0);
    
    if (settings.showPrevNext){
        $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
    }
    
    var curr = 0;
    while(numPages > curr && (settings.hidePageNumbers==false)){
        $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
        curr++;
    }
    
    if (settings.showPrevNext){
        $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
    }
    
    pager.find('.page_link:first').addClass('active');
    pager.find('.prev_link').hide();
    if (numPages<=1) {
        pager.find('.next_link').hide();
    }
  	pager.children().eq(1).addClass("active");
    
    children.hide();
    children.slice(0, perPage).show();
    
    pager.find('li .page_link').click(function(){
        var clickedPage = $(this).html().valueOf()-1;
        goTo(clickedPage,perPage);
        return false;
    });
    pager.find('li .prev_link').click(function(){
        previous();
        return false;
    });
    pager.find('li .next_link').click(function(){
        next();
        return false;
    });
    
    function previous(){
        var goToPage = parseInt(pager.data("curr")) - 1;
        goTo(goToPage);
    }
     
    function next(){
        goToPage = parseInt(pager.data("curr")) + 1;
        goTo(goToPage);
    }
    
    function goTo(page){
        var startAt = page * perPage,
            endOn = startAt + perPage;
        
        children.css('display','none').slice(startAt, endOn).show();
        
        if (page>=1) {
            pager.find('.prev_link').show();
        }
        else {
            pager.find('.prev_link').hide();
        }
        
        if (page<(numPages-1)) {
            pager.find('.next_link').show();
        }
        else {
            pager.find('.next_link').hide();
        }
        
        pager.data("curr",page);
      	pager.children().removeClass("active");
        pager.children().eq(page+1).addClass("active");
    
    }
};

$(document).ready(function(){
    
    /* en este caso, llamamos al elemento 'tbody' de nombre 'myTable' para ocultar los registros y mostrarlos de acuerdo al selector de paginacion en que estamos, en principio es 1...
    Luego llamamos al selector de nombre 'myPager' y mostramos los controles necesarios para ejecutarlo */
    $('#tblTablaOculta').pageMe({pagerSelector:'#myPager',showPrevNext:true,hidePageNumbers:false,perPage:10});
  
    $("#filtrar").keyup(function(e) {
        if(e.keyCode === 13) {
            vaciarTabla();
            ocultarMensaje();
            realizarBusqueda();
        }
    });
    
    $("#btnFiltroBuscar").click(function(){
        vaciarTabla();
        ocultarMensaje();
        realizarBusqueda();
    });
    
    var nombreProducto = "";
    var descProducto = "";
    var puntos = "";
    var imagen = "";
    var botonModif;
    var id;
    var row = null;
    var celdas= null;
    
    //cargarDatos(nombreProducto,descProducto,imagen,puntos); // no me funciona esta funcion
        $("#btnModalModificarConfirmar").click(function(){
            //*****************************************************************************************
            /* tengo que seguir modificando esto para que pueda actualizar correctamente el producto */
            //*****************************************************************************************
            
            puntos = $("#inpPuntos").val();
            nombreProducto = $("#inpNombreProducto").val();
            descProducto = $("#txtDescripcion").val();
            
            if(isNaN(puntos)){
                mostrarMensajeModal("No se ha ingresado un numero correcto en el campo de PUNTOS DE CANJE");
                //alert("no es un numero");
                event.preventDefault();
            }else{
                var parametros = {
                    "puntos" : puntos,
                    "nombre" : nombreProducto,
                    "descripcion" : descProducto,
                    "id" : id
                };
                $.ajax({
                    data:  parametros, // los datos que van a ser recuperados desde el php
                    url:   '../php/updateProducto.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
                    type:  'post',
                    cache: false,
                    beforeSend: function procesandoArchivo() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                        imprimirMensaje("Actualizando el producto, aguarde unos instantes...");
                    },
                    success: function resultado(respuestaPHP){
                        imprimirMensaje("Se ha actualizado correctamente el producto"+nombreProducto);
                    }
                }).done(function(result){
                    if(result === 0){
                        alert("rrorr");
                    }
                    mostrarDivMensaje();
                    imprimirMensaje("Se ha actualizado correctamente el producto"+nombreProducto);
                    console.log("Actualizacion de producto Procesado Correctamente");
                    //console.log(result);
                });;
            }
        });

    $("#modalModificar").on('show.bs.modal', function (e) {
        // lo siguiente funciona. lo tome de la web pero no lo entiendo mucho..
        vaciarCacheDeDatos();
        
        row = $(e.relatedTarget).parent().parent();
        celdas= row.children();
    
        botonModif = celdas[5].firstChild;
        id = botonModif.getAttribute("id");//obtenemos el id referente a la fila mencionada
        var spli = id.split("-"); // lo separamos para obtener el numero de id del boton
        id = parseInt(spli[1]);
        //alert(boton.getAttribute("id"));
        // obtenemos cada uno de los valores referentes de la fila que tomamos..
        nombreProducto = celdas[0].firstChild.nodeValue;
        descProducto = celdas[1].firstChild.nodeValue;
        puntos = celdas[2].firstChild.nodeValue;
        imagen = celdas[3].firstChild.getAttribute("src");// tomamos el valor de la ruta de la imagen
        //imagen = celdas[3].firstChild.nodeValue;  // lo dividimos para obtener el nombre
        //imagen = spli[2]; // reasignamos la variable nombre
        $("#imgSalida").attr("src",imagen);
        $("#inpNombreProducto").attr("value",nombreProducto);
        $("#inpPuntos").attr("value", parseInt(puntos));
        $("#txtDescripcion").text(descProducto);
        console.log(nombreProducto);
    });
    
    $('#modalModificar').on('hidden.bs.modal', function (e) {
        vaciarTabla();
        vaciarCacheDeDatos();
        realizarBusqueda(); // actualizamos la tabla para que apliquen los cambios
    });
    
    
    $("#modalBajaProducto").on('show.bs.modal', function (e) {
        vaciarCacheDeDatos();
        
        var row = $(e.relatedTarget).parent().parent();
        var celdas= row.children();
        
        botonModif = celdas[5].lastChild;
        id = botonModif.getAttribute("id");//obtenemos el id referente a la fila mencionada
        var spli = id.split("-"); // lo separamos para obtener el numero de id del boton
        id = parseInt(spli[1]);
        var idPhp = {"id":id};
        $("#btnModalBajaConfirmar").click(function(){
            $.ajax({
                data:  idPhp, // los datos que van a ser recuperados desde el php
                url:   '../php/deleteProducto.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
                type:  'post',
                cache: false,
                beforeSend: function procesandoArchivo() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                    imprimirMensaje("Dando de baja el producto, aguarde unos instantes...");
                },
            }).done(function(result){
                    mostrarDivMensaje();
                    imprimirMensaje("Se ha dado de baja correctamente el producto");
                    console.log("Baja de producto Procesado Correctamente");
                    //console.log(result);
                });
        });  
    });
    
    $('#modalBajaProducto').on('hidden.bs.modal', function (e) {
        vaciarTabla();
        vaciarCacheDeDatos();
        realizarBusqueda(); // actualizamos la tabla para que apliquen los cambios
    });
    
    $("#btnCerrarAlerta").click(function(){
        ocultarMensaje();
    });
});

function vaciarCacheDeDatos(){
    $("#inpPuntos").attr("value","");
    $("#txtDescripcion").text("");
    $("#inpNombreProducto").attr("value","");
    $("#imgSalida").attr("src","");
}

function imprimirMensaje(strMensaje){
    $("#pMensaje").text(strMensaje);
}

function mostrarMensajeModal(strMensaje){
    $("#parMensajeModal").text(strMensaje);
}

function cargarDatos(strNombreProducto,descProducto,imagen,strPuntos){
    $("#inpNombreProducto").attr("value",this.strNombreProducto);
    $("#inpPuntos").attr("value", parseInt(this.strPuntos));
    $("#txtDescripcion").text(this.descProducto);
    
}

function ocultarMensaje(){
    $("#divMensaje").removeClass("visible-block");
    $("#divMensaje").addClass("hidden");
}

function mostrarDivMensaje(){
    $("#divMensaje").removeClass("hidden");
    $("#divMensaje").addClass("visible-block");
}

function vaciarTabla(){
    $("#tblTablaOculta #tblResultado tr").remove();
}

function realizarBusqueda(){
    var rex = new RegExp($("#filtrar").val(), 'i');
    var valorABuscar = $("#filtrar").val();
    var parametros = {
        //"nameDescrip" : rex.test($(this).text())
        "nameDescrip" : valorABuscar
    };
    $.ajax({
        data:  parametros, // los datos que van a ser recuperados desde el php
        url:   '../php/getProductosPorNombreODescripcion.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
        type:  'get'
        }).done(function(respuesta){
            //alert(respuesta);
            if(respuesta[0].resultado === "nodata"){
                mostrarDivMensaje();
                $("#pMensaje").text("No hay registros con esos datos");
            }
            if (respuesta[0].resultado === "ok") {
                //console.log(JSON.stringify(respuesta));
                //mostramos la tabla si existe coincidencia
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

function cargarDatos(strNombre,strDescripcion,strCantidadPuntos){
    $("#inpNombreProducto").attr("value",strNombre);
    $("#txtDescripcion").text(strDescripcion);
    $("#inpPuntos").attr("value",parseInt(strCantidadPuntos));
}

function cargarDatosDeFila(){
    var nombreProducto = "";
    var descProducto = "";
    var totalPuntos = "";
    var fila = "";
    // tomamos los datos de la fila y los cargamos en la funcion que estamos trabajando
    $("#tblTablaOculta").find('tr').click(function(){
        fila = $(this);
        var celdas = this.getElementsByTagName("td");
        nombreProducto = celdas[0].firstChild.nodeValue;
        descProducto = celdas[1].firstChild.nodeValue;
        totalPuntos = celdas[2].firstChild.nodeValue;
        alert(nombreProducto);
        cargarDatos(nombreProducto,descProducto,totalPuntos);
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
        
        var nombreProducto = objetoJSON[i].nombre;
        var descripcProducto = objetoJSON[i].descripcion;
        var puntos = objetoJSON[i].puntos;
        var estado = objetoJSON[i].estado;
        if(estado === "0"){
            estado = "Activo";
        }else{
            estado = "Inactivo";
        }
        
        var foto = objetoJSON[i].foto;
        var imagen = document.createElement("img");
        imagen.src = foto;
        imagen.className = "img-thumbnail";
        imagen.setAttribute("alt","Vista Previa");
        imagen.setAttribute("width", "75"); 
        imagen.setAttribute("height","50");
        
        var nombreBtnModalModificar = "btnModalModificar-"+objetoJSON[i].id;
        var nombreBtnModalDarBaja = "btnModalDarBaja-"+objetoJSON[i].id;
        
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
        botonBaja.setAttribute("data-target","#modalBajaProducto");
        iconoBaja.className = "glyphicon glyphicon-remove";

        botonBaja.appendChild(iconoBaja);
        
        var textoCelda1 = document.createTextNode(nombreProducto);
        var textoCelda2 = document.createTextNode(descripcProducto);
        var textoCelda3 = document.createTextNode(puntos);
        var textoCelda4 = document.createTextNode(foto);
        var textoCelda5 = document.createTextNode(estado);
        
        celda1.appendChild(textoCelda1);
        celda2.appendChild(textoCelda2);
        celda3.appendChild(textoCelda3);
        celda4.appendChild(imagen);
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
    //body.appendChild(tabla); //appends <table> en el elemento <body>
    //tabla.setAttribute("border", "2"); //modifica el atributo "border" de la tabla y lo fija a "2";
    
    // estos 2 atributos no funcionan.
    /*tabla.title("Datos del Formulario WEB");
    tabla.style.background = "lightblue"; // este atributo no funciona.*/
    //actualizarTabla();
}

/*function actualizarTabla(){
    $("tblTablaOculta").addClass("table table-hover table-striped table-bordered hidden");
}*/
