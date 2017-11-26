$(document).ready(function(){
    
    var id;
    var idPhp = {"idProd":id};
    
    $.ajax({
       type : "get",
       url :"../php/getProductosActivos.php",
       cache: false
    }).done(function(productos){
        armarGrilla(productos);
    });
    
    var comprobacion = false;
    var parent;
    var contenedor;
    var botonCanje;
    var ajax1 = null;
    
    // tengo que poner el boton fuera del modal, porque de lo contrario, se encolan las peticiones
    // o sea, la primera la hace bien, y la segunda la hace 2 veces, la 3era 3 veces y así sucesivamente..
    $("#btnModalCanjeConfirmar").click(function(){
        idPhp = {"idProd":id};
        var algo = false;
        $.ajax({
            type: "POST",
            url: '../php/canjearProducto.php',
            data : idPhp,
            cache: false
        }).done(function(data){
            console.log(data);
            if(data[0].resultado === "ok"){
                imprimirMensaje("Se ha realizado correctamente el canje del producto");
                console.log("ok. canje realizado con exito");
            }else if(data[0].resultado === "no"){
                imprimirMensaje("No posee la cantidad de puntos suficientes para realizar el canje");
                //$('#modalMensaje').modal('show');
                console.log("no fue posible realizar el canje");
            }
            mostrarDivMensaje();
            $('#modalMensaje').modal('show');
        });
    });
    
    //comentario para DANIEL
    
    $("#modalCanjear").on('show.bs.modal', function (e) {
        
        vaciarCacheDeDatos(parent,contenedor,botonCanje);
        parent = null;
        contenedor = null;
        botonCanje=null;
        //var celdas;
        try{
            parent = $(e.relatedTarget).parent().parent();
            contenedor = parent.children();
            //console.log(contenedor);
            id = botonCanje.getAttribute("id");//obtenemos el id referente a la fila mencionada
            var spli = id.split("-"); // lo separamos para obtener el numero de id del boton
            id = parseInt(spli[1]);
        }catch(exept){
            parent = $(e.relatedTarget);
            botonCanje = parent[0];
            //botonCanje = contenedor;
            id = botonCanje.getAttribute("id");//obtenemos el id referente a la fila mencionada
            var spli = id.split("-"); // lo separamos para obtener el numero de id del boton
            id = parseInt(spli[1]);
        }
        var ide = {"id_producto":id};
        
        ajax1 = $.ajax({
            type: "get",
            url: '../php/getProductoPorID.php',
            data : ide
        }).done(function (respuesta){
            $("#imgSalida").attr("src",respuesta.foto);
            $("#inpNombreProducto").attr("value",respuesta.nombre);
            $("#inpPuntos").attr("value", parseInt(respuesta.puntos));
            $("#txtDescripcion").text(respuesta.descripcion);
        });
    });
    
});

// lo demas es codigo basura para generar CAROUSEL BOOTSTRAP de manera dinamica
        /*var largo = Object.keys(productos).length;
        //var largo = productos.length;
        var m = [];
        var ids = [];
        for(var y=1; y < largo; y++){
            m.push(productos[y].foto);
            ids.push(productos[y].id);
        }
        console.log(m);
        //var m = ["../imgs/botella_agua11.png","../imgs/botella_cola.png","../imgs/botella_lima.png","../imgs/botella_naranja1.png","../imgs/botellaww.png","../imgs/gaseosas.jpg","../imgs/img1.jpg","../imgs/img2.png"]
        for(var i=0 ; i< m.length ; i++) {
            $('<div class="item" id="item-'+ids[i]+'" name="'+productos[i+1].nombre+'"><img src="'+m[i]+'" class="img-responsive" alt="Responsive image"><div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
            $('<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators');
        }*/
        //tengo que setear aca el valor del NAME del boton (inicialmente)porque no logre hacer que lo tome el primero del carrousel, el resto sale joya.
        /*$("#btnCanjear").attr("name","canje-"+ids[0]);
        $('.item').first().addClass('active');
        $('.carousel-indicators > li').first().addClass('active');
        $('#carousel-example-generic').carousel(); */
    
    /*$('#carousel-example-generic').on('slide.bs.carousel', function (ev) {
        var id = ev.relatedTarget.id;
        var spli = id.split("-");
        $("#btnCanjear").attr("name","canje-"+spli[1]);
        /*switch (id) {
          case "1":
            // do something the id is 1
            alert("1");
            break;
          case "2":
            // do something the id is 2
            alert("2");
            break;
          case "3":
            // do something the id is 3
            break;
          default:
            //the id is none of the above
            alert(.attr("name"));
        }*/
    
    /*$('#carousel-example-generic').on('cycle.bs.carousel', function (ev) {
        var id = ev.relatedTarget.id;
        var spli = id.split("-");
        $("#btnCanjear").attr("name","canje-"+spli[1]);
    });*/
    
    /*$("#btnCanjear").click(function(){ //cuando seleccionamos el boton "CANJEAR" el carrousel se detiene en la foto en la que estaba en ese momento (el producto activo)
        $('#carousel-example-generic').carousel('pause');
        alert($(this).attr("name"));
    });
    
    $("#btnModalCanjeCancelar").click(function(){ // al darle click a Cancelar o Continuar, el carrousel vuelve a su CICLO
        $('#carousel-example-generic').carousel('cycle');
    });
    $("#btnModalCanjeConfimar").click(function(){ // al darle click a Cancelar o Continuar, el carrousel vuelve a su CICLO
        var btn = $("#btnCanjear");
        var idd = btn.attr("id");
        var divido = idd.split("-");
        var idProd = divido[1];
        alert("el id que toma el boton ahora es: "+idProd);
        
        
        $('#carousel-example-generic').carousel('cycle');
        // Hay que hacer que tome los datos del objeto para mostrarlos en el modal
    });
});*/

function imprimirMensaje(strMensaje){
    $("#pMensaje").text(strMensaje);
}

function ocultarMensaje(){
    $("#divMensaje").removeClass("visible-block");
    $("#divMensaje").addClass("hidden");
}

function mostrarDivMensaje(){
    $("#divMensaje").removeClass("hidden");
    $("#divMensaje").addClass("visible-block");
}

function vaciarCacheDeDatos(parent,contenedor,botonCanje){
    parent = null;
    contenedor = null;
    botonCanje = null;
}

function vaciarCampos(){
    $("#imgSalida").attr("src","");
    $("#inpNombreProducto").attr("value","");
    $("#inpPuntos").attr("value", "");
    $("#txtDescripcion").text("");
}

function armarGrilla(objetoJSON){
    console.log(objetoJSON);
    var grilla   = document.getElementById("grilla");
    //var tbody = tabla.tBodies[0];//Crea un elemento <table>

    var longitud = Object.keys(objetoJSON).length;
    // crea las hileras
    for (var i = 1; i < longitud; i++) {
        var fila = document.createElement("div");//Crea las hileras de la tabla
        var hr = document.createElement("hr");//Crea las hileras de la tabla
        if(i % 2 !== 0){
            fila.appendChild(hr);
            agregarDiv(objetoJSON,i,fila);
        }
        else{
            fila.setAttribute("class","row");
            agregarDiv(objetoJSON,i,fila);
        }
        grilla.appendChild(fila); //agrega la hilera al final de la tabla
    }
}

function agregarDiv(objetoJSON,i,fila){
    var colum1 = document.createElement("div");
    colum1.setAttribute("class","img col-sm-6");
    /*var colum2 = document.createElement("div");
    colum2.setAttribute("class","img col-sm-6");*/
    var nombreProducto1 = objetoJSON[i].nombre;
    var descripcProducto1 = objetoJSON[i].descripcion;
    var puntos1 = objetoJSON[i].puntos;
        
    /*var nombreProducto2 = objetoJSON[i+1].nombre;
    var descripcProducto2 = objetoJSON[i+1].descripcion;
    var puntos2 = objetoJSON[i+1].puntos;*/
        
    var foto1 = objetoJSON[i].foto;
    var imagen1 = document.createElement("img");
    imagen1.src = foto1;
    imagen1.className = "img-thumbnail";
    imagen1.setAttribute("alt",descripcProducto1);
    imagen1.setAttribute("width", "100%"); 
    imagen1.setAttribute("height","100%");
    
    var nombreBtnModalCanjear = "btnModalCanjear-"+objetoJSON[i].id;
        
    var botonCanjear = document.createElement("button");
    botonCanjear.className = "btn btn-info btn-sm col-sm-4";
    botonCanjear.setAttribute("id",nombreBtnModalCanjear);
    botonCanjear.setAttribute("data-toggle","modal");
    botonCanjear.setAttribute("data-target","#modalCanjear");
    botonCanjear.innerHTML="Canjear";
    
    /*var foto2 = objetoJSON[i+1].foto;
    var imagen2 = document.createElement("img");
    imagen2.src = foto2;
    imagen2.className = "img-thumbnail";
    imagen2.setAttribute("alt",descripcProducto2);
    imagen2.setAttribute("width", "100%"); 
    imagen2.setAttribute("height","100%");*/
        
    var span1 = document.createElement("span");
    span1.setAttribute("class","col-sm-12");
    /*var span2 = document.createElement("span");
    span2.setAttribute("class","col-sm-12");*/
    var tituloFoto1 = document.createElement("span");
    //var tituloFoto2 = document.createElement("span");
    var pieFoto1 = document.createElement("span");
    pieFoto1.setAttribute("class","col-sm-8 label label-info");
    /*var pieFoto2 = document.createElement("span");
    pieFoto2.setAttribute("class","col-sm-12");*/
        
    var textoFoto1 = document.createTextNode(nombreProducto1);
    //var textoFoto2 = document.createTextNode(nombreProducto2);
    var textPieFoto1 = document.createTextNode("Puntos Necesarios para Canjear: "+puntos1);
    //var textPieFoto2 = document.createTextNode("Puntos Necesarios para Canjear: "+puntos2);
        
    tituloFoto1.appendChild(textoFoto1);
    //tituloFoto2.appendChild(textoFoto2);
    pieFoto1.appendChild(textPieFoto1);
    //pieFoto2.appendChild(textPieFoto2);
        
    span1.appendChild(tituloFoto1);
    //span2.appendChild(tituloFoto2);
        
    colum1.appendChild(span1);
    colum1.appendChild(imagen1);
    colum1.appendChild(pieFoto1);
    colum1.appendChild(botonCanjear);
        
    /*colum2.appendChild(span2);
    colum2.appendChild(imagen2);
    colum2.appendChild(pieFoto2);*/
        
        
    fila.appendChild(colum1);
    //fila.appendChild(colum2);
}

//function par(objetoJSON,i,fila){
//    var colum2 = document.createElement("div");
//    colum2.setAttribute("class","img col-sm-6 form-group");
//    /*var colum2 = document.createElement("div");
//    colum2.setAttribute("class","img col-sm-6");*/
//    var nombreProducto1 = objetoJSON[i].nombre;
//    var descripcProducto1 = objetoJSON[i].descripcion;
//    var puntos1 = objetoJSON[i].puntos;
//        
//    /*var nombreProducto2 = objetoJSON[i+1].nombre;
//    var descripcProducto2 = objetoJSON[i+1].descripcion;
//    var puntos2 = objetoJSON[i+1].puntos;*/
//        
//    var foto1 = objetoJSON[i].foto;
//    var imagen1 = document.createElement("img");
//    imagen1.src = foto1;
//    imagen1.className = "img-thumbnail";
//    imagen1.setAttribute("alt",descripcProducto1);
//    imagen1.setAttribute("width", "100%"); 
//    imagen1.setAttribute("height","100%");
//    
//    /*var foto2 = objetoJSON[i+1].foto;
//    var imagen2 = document.createElement("img");
//    imagen2.src = foto2;
//    imagen2.className = "img-thumbnail";
//    imagen2.setAttribute("alt",descripcProducto2);
//    imagen2.setAttribute("width", "100%"); 
//    imagen2.setAttribute("height","100%");*/
//        
//    var span1 = document.createElement("span");
//    span1.setAttribute("class","col-sm-12");
//    /*var span2 = document.createElement("span");
//    span2.setAttribute("class","col-sm-12");*/
//    //var tituloFoto1 = document.createElement("span");
//    var tituloFoto2 = document.createElement("span");
//    var pieFoto1 = document.createElement("span");
//    pieFoto1.setAttribute("class","col-sm-12");
//    /*var pieFoto2 = document.createElement("span");
//    pieFoto2.setAttribute("class","col-sm-12");*/
//        
//    var textoFoto1 = document.createTextNode(nombreProducto1);
//    //var textoFoto2 = document.createTextNode(nombreProducto2);
//    var textPieFoto1 = document.createTextNode("Puntos Necesarios para Canjear: "+puntos1);
//    //var textPieFoto2 = document.createTextNode("Puntos Necesarios para Canjear: "+puntos2);
//        
//    tituloFoto2.appendChild(textoFoto1);
//    //tituloFoto2.appendChild(textoFoto2);
//    pieFoto1.appendChild(textPieFoto1);
//    //pieFoto2.appendChild(textPieFoto2);
//        
//    span1.appendChild(tituloFoto2);
//    //span2.appendChild(tituloFoto2);
//        
//    colum2.appendChild(span1);
//    colum2.appendChild(imagen1);
//    colum2.appendChild(pieFoto1);
//        
//    /*colum2.appendChild(span2);
//    colum2.appendChild(imagen2);
//    colum2.appendChild(pieFoto2);*/
//        
//        
//    fila.appendChild(colum2);
//    //fila.appendChild(colum2);
//        
//   //grilla.appendChild(fila); //agrega la hilera al final de la tabla
//}