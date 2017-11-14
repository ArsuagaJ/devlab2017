$(document).ready(function(){  
    $("#btnAgregar").click(function(){
        $("#divMensaje").removeClass("hidden");
        $("#divMensaje").addClass("visible-block");
    });
    
    $("#btnCerrarAlerta").click(function(){
        $("#divMensaje").removeClass("visible-block");
        $("#divMensaje").addClass("hidden");
    });
    
    $("#btnAgregar").click(function(){
        $("#divMensaje").removeClass("hidden");
        $("#divMensaje").addClass("visible-block");
        
        var formData = new FormData($("#frmArchivo")[0]);
        
        // RECORDAR AGREGAR EL ATRIBUTO NAME EN EL INPUT DE TIPO
        // FILE PARA QUE FUNCIONE EL PHP
									
      	$.ajax({
                type:"post",
                data:formData,
                //dataType:"json",
                url:"../php/subirArchivo.php",      					
                contentType:false,                
                processData:false,
                beforeSend: function procesandoArchivo() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                    $("#pMensaje").text("Procesando, espere por favor...");
                }
            }).done(function(respuesta){      					
                console.log(respuesta);
                if(respuesta[0].resultado === "ok"){ // si el resultado es OK, o sea, si se agregó el archivo al server.... lo guardamos en la base
                    $("#pMensaje").text("Se ha agregado correctamente el archivo de codigos..");
                    var fechaDesde = $("#date").val();
                    var fechaHasta = $("#hasta").val();
                    var descrip = $("#txtDescript").val();
                    var rutaArchivo = respuesta[1]; // en el indice 1 esta la ruta recuperada del php
                    var estado = true;
                    
                    var parametros = {
                        "fechaDesde" : fechaDesde,
                        "fechaHasta" : fechaHasta,
                        "descrip" : descrip,
                        "path" : rutaArchivo,
                        "estado" : estado
                    };
                    // generamos un ajax nuevo con los valores de los campos
                    $.ajax({
                        data:  parametros, // los datos que van a ser recuperados desde el php
                        url:   '../php/insertListaCodigo.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
                        type:  'post',
                        success:  function (response) {
                            console.log(response);
                            $("#pMensaje").text(response);    
                        }
                    }).done(function(respuesta){
                        $("#pMensaje").text("OK, se agregado correctamente el archivo");
                    });
                }
                else{
                    $("#pMensaje").text(respuesta[1][0]); // si nos dio algun error PHP, lo mostramos como un mensaje en la pagina
                }
            });
        });
        //tomamos los datos del archivo
        //var formData = new FormData($("#js-upload-form")[0]);
        //var ruta = "../php/subida.php"; // lo enviamos al php para que lo suba a la carpeta "fotos"
        
        /*var nombre = $("#inpNombreProducto").val();
        var descrip = $("#txtDescripcion").val();
        var puntos = $("#inpPuntos").val();
        var rutaImagen = response[1]; // en el indice 1 esta la ruta recuperada del php
        var estado = true;
        
        $.ajax({
            /*url: ruta,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            beforeSend: function insertar() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                $("#pMensaje").text("Procesando, espere por favor...");
            }
        }).done(function(response){ //recuperamos el valor de la ruta de destino '../fotos/nombre_archivo
            console.log(response); //lo grabamos en la consola
                       
            // si se subio la imagen, tomamos los valores de los campos
            
            
            // los siguientes valores son los que le pasamos al php con ajax que luego los recuperara con el nombre descriptivo
            // que le hayamos puesto.. en este caso
            // "nombre", "descrip","punt","img","estado"
            var parametros = {
                "nombre" : nombre,
                "descrip" : descrip,
                "punt" : puntos,
                "img" : rutaImagen,
                "estado" : estado
            };
            // generamos un ajax nuevo con los valores de los campos
            $.ajax({
                data:  parametros, // los datos que van a ser recuperados desde el php
                url:   '../php/insertProductos.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
                type:  'post',
                success:  function (response) {
                    console.log(response);
                    $("#pMensaje").text(response);    
                }
            }).done(function(respuesta){
                $("#pMensaje").text("OK, se agregado correctamente el archivo");
            });
        });
    });*/
});

// lo siguiente tengo que dejarlo sin JQUERY porque no me funciona si lo tiene.
window.addEventListener('load', inicio, false);

    /*
     en la función inicio registramos el evento change del control de tipo file que se disparará cuando
     el usuario seleccione un archivo del disco duro:
     */
    function inicio() {
        document.getElementById('file').addEventListener('change', cargar, false);               
    }

    /*
    Cuando el usuario selecciona un archivo se ejecuta la función cargar (que registramos en la función inicio),
    la función recibe un objeto de la clase File que lo accedemos: ev.target.files[0],
    este objeto tiene tres atributos name (nombre del archivo que acabamos de seleccionar),
    size (tamaño en bytes del archivo) y type (tipo de archivo).
    Luego de mostrar las tres propiedades fundamentales del archivo procedemos a crear un objeto de la clase FileReader
    para poder acceder al contenido del archivo. Mediante la llamada al método readAsText procedemos a leer el contenido
    del archivo y registramos el evento load para indicar la función que se disparará cuando tengamos todo el archivo en memoria:
     */
    function cargar(ev) {
        document.getElementById('datos').innerHTML='Nombre del archivo:'+ev.target.files[0].name+'<br>'+
                                                   'Tamaño del archivo en bytes:'+ev.target.files[0].size+'<br>'+  
                                                   'Tipo MIME:'+ev.target.files[0].type;
        var arch=new FileReader();
        arch.addEventListener('load',leer,false);
        arch.readAsText(ev.target.files[0]);
    }
    
    /*
     Por último la función leer recibe un objeto que almacena todos los datos contenidos en del archivo:
     */
    function leer(ev) {
        // id=editor es el TEXTAREA
        var contenidoDelArchivo = ev.target.result; //almacenamos el contenido en la variable "contenidoDelArchivo"
        var split = contenidoDelArchivo.split(",");// separamos el contenido del archivo en un array eliminando las comas
        var stringDeCodigos = ""; // creamos un string que será el que muestre los codigos a importar
        var longit = split.length;
        for(var i = 0; i < longit ; i++){
            var temp = split[i].trim()+", ";
            stringDeCodigos = stringDeCodigos+temp;
        }
        
        document.getElementById('editor').value=stringDeCodigos; // la mostramos en el textarea de previsualizacion
    }