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
  
    $('#filtrar').keyup(function(e) {
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
    var totalPuntos = "";
    var fila = "";

    // tomamos los datos de la fila y los cargamos en la funcion que estamos trabajando
    $("#tblTablaOculta").find('tr').click(function(){
        fila = $(this);
        var celdas = this.getElementsByTagName("td");
        nombreProducto = celdas[0].firstChild.nodeValue;
        descProducto = celdas[1].firstChild.nodeValue;
        totalPuntos = celdas[2].firstChild.nodeValue;
        alert(descProducto);
        var nombreBtnModificar = celdas[3].firstChild;
        var nombreBtnBajaProducto = celdas[3].lastChild;
        cargarDatos(nombreProducto,descProducto,totalPuntos);
        $("#"+nombreBtnModificar).click(function(){
            alert("hola");
            cargarDatosDeFila();
        });       
    });
    // tengo que agregarlo aca para que lo tome en todas las filas...
    
    // luego de dar boton "CONFIRMAR se da de baja el producto y se quita de la lista
    var boton = $("#btnModalBajaConfirmar");
    boton.click(function(){
        mostrarDivMensaje();
        $("#pMensaje").text("El producto: '"+nombreProducto+ "' '"+descProducto+"' con un total de '"+totalPuntos+"' puntos necesarios para ser canjeados, se ha dado de baja Correctamente");
        fila.attr("class","hidden");//$(this).parent.attr("class","hidden");
    });
    
    $("#btnCerrarAlerta").click(function(){
        ocultarMensaje();
    });
});

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
        
        var nombreProducto = objetoJSON[i].nombre;
        var descripcProducto = objetoJSON[i].descripcion;
        var puntos = objetoJSON[i].puntos;
        
        var foto = objetoJSON[i].foto;
        var imagen = document.createElement("img");
        imagen.src = foto;
        imagen.className = "img-thumbnail";
        imagen.setAttribute("alt","Vista Previa");
        imagen.setAttribute("width", "75"); 
        imagen.setAttribute("height","50");
        
        var nombreBtnModalModificar = "btnModalModificar"+i;
        var nombreBtnModalDarBaja = "btnModalDarBaja"+i;
        
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
        
        var textoCelda1 = document.createTextNode(nombreProducto);
        var textoCelda2 = document.createTextNode(descripcProducto);
        var textoCelda3 = document.createTextNode(puntos);
        var textoCelda4 = document.createTextNode(foto);
        
        celda1.appendChild(textoCelda1);
        celda2.appendChild(textoCelda2);
        celda3.appendChild(textoCelda3);
        celda4.appendChild(imagen);
        celda5.appendChild(botonModificar);
        celda5.appendChild(botonBaja);
            
        hilera.appendChild(celda1);
        hilera.appendChild(celda2);
        hilera.appendChild(celda3);
        hilera.appendChild(celda4);
        hilera.appendChild(celda5);
 
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
