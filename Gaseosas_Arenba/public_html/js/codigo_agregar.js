$(document).ready(function(){  
    
    var fechaAct = getFechaActual();
    
    $("#date").val(fechaAct);
    $("#date").attr("min",fechaAct);
    $("#hasta").val(fechaAct);
    $("#hasta").attr("min",fechaAct);
    
    $("#btnCerrarAlerta").click(function(){
        $("#divMensaje").removeClass("visible-block");
        $("#divMensaje").addClass("hidden");
    });
    
    $("#btnAgregar").click(function(){
        $("#divMensaje").removeClass("hidden");
        $("#divMensaje").addClass("visible-block");
        
        //Añadimos la imagen de carga en el contenedor
        $('#content').html('<div><img src="../imgs/loading.gif"/></div>');

        var page = $(this).attr('data');        
        var dataString = 'page='+page;
        
        var formData = new FormData($("#frmArchivo")[0]);
        
        // RECORDAR AGREGAR EL ATRIBUTO NAME EN EL INPUT DE TIPO
        // FILE PARA QUE FUNCIONE EL PHP
									
      	$.ajax({ // ajax para subir el archivo al server
                type:"post",
                data:formData,
                //dataType:"json",
                url:"../php/subirArchivo.php",      					
                contentType:false,                
                processData:false,
                beforeSend: function procesandoArchivo() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                    $("#pMensaje").text("Procesando, espere por favor...");
                },
                success: function(data){
                    //Cargamos finalmente el contenido deseado
                    $('#content').fadeIn(1000).html(data);// con esto deberiamos mostrar el icono de carga de datos de "imgs/loading.gif"
                }
            }).done(function(respuesta){ // una vez que se haya finalizado la operacion de ajax, guardamos el listado de codigo en la base de datos para recuperar el id que se genere      					
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
                    // generamos un ajax nuevo con los valores de los campos que se guardaran en la tabla "lista de codigos"
                    $.ajax({
                        data:  parametros, // los datos que van a ser recuperados desde el php
                        url:   '../php/insertListaCodigo.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
                        type:  'post',
                        beforeSend: function procesandoArchivo() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                            $("#pMensaje").text("Subiendo archivo de códigos, aguarde unos instantes...");
                        },
                        success:  function (response){ //al responder, primero se ejecuta el success y luego el .done
                            console.log(response);
                            var idUsuario = '1'; // hardcodeamos el id de usuario hasta tener las sesiones..
                            var arrDataAjax = []; //creamos una variable que pasaremos con los parametros a guardar
                            var textLeido = leerArchivo();//leemos el archivo para pasar los codigos
                            arrDataAjax.push(textLeido);
                            arrDataAjax.push(response); // aca agregamos el id del registro de la lista de codigos
                            arrDataAjax.push(idUsuario);
                            
                            $.ajax({ //y por ultimo generamos un ajax nuevo para guardar los codigos finales en la base de datos en la tabla referente a los codigos.
                                type: "POST",
                                data: {'arrayData':JSON.stringify(arrDataAjax)},//capturo array para tomar desde el php
                                url: "../php/insertCodigos.php",
                                beforeSend: function procesandoCodigos(){
                                    $("#pMensaje").text("Guardando Codigos..."); // mensaje mientras se van agregando los codigos..
                                }
                            }).done(function(result){
                                if(result === 0){
                                    alert("rrorr");
                                }
                                $("#pMensaje").text("Se han agregado correctamente los codigos");
                                console.log("Archivo Procesado Correctamente");
                                //console.log(result);
                            });
                        }
                    }).done(function(respuesta){
                        $("#pMensaje").text("OK, se agregado correctamente el archivo");
                        //console.log(respuesta);
                    });
                }
                else{
                    $("#pMensaje").text(respuesta[1][0]); // si nos dio algun error PHP, lo mostramos como un mensaje en la pagina
                }
            });
        });
});


function getFechaActual(){
    var f = new Date();
    var anio = f.getFullYear();
    var mes = f.getMonth();
    mes = mes+1;
    var dia = f.getDate();
    var fecha = anio+"-"+mes+"-"+dia;
    return fecha;
}

function leerArchivo(){
    var textLeido = $("#editor").val();
    var split = textLeido.split(", ");// separamos el contenido del archivo en un array eliminando las comas
    split.pop(); //esto es bien a lo mono, pero necesito eliminar el último registro, sino lo agrega como registro vacio en la BDD
    // A
    // T
    // R
    return split;
}

// a continuacion viene el codigo del event listener para mostrar el contenido del archivo en campo TEXTAREA para eso...
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
        //return stringDeCodigos;
    }