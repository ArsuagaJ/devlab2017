$(document).ready(function(){
    /*var date_input=$('input[name="date"]'); //our date input has the name "date"
    var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    var options={
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
    };
    date_input.datepicker(options);
      
    var hasta_input=$('input[name="hasta"]'); //our date input has the name "date"
    var container2=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    var options2={
        format: 'mm/dd/yyyy',
        container: container2,
        todayHighlight: true,
        autoclose: true,
    };
    hasta_input.datepicker(options2);*/
    
    $("#btnAgregar").click(function(){
        $("#divMensaje").removeClass("hidden");
        $("#divMensaje").addClass("visible-block");
    });
    
    $("#btnCerrarAlerta").click(function(){
        $("#divMensaje").removeClass("visible-block");
        $("#divMensaje").addClass("hidden");
    });
    
});

// lo siguiente tengo que dejarlo sin JQUERY porque no me funciona si lo tiene.
window.addEventListener('load', inicio, false);

    /*
     en la función inicio registramos el evento change del control de tipo file que se disparará cuando
     el usuario seleccione un archivo del disco duro:
     */
    function inicio() {
        document.getElementById('archivo').addEventListener('change', cargar, false);               
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
                                                   'Tamaño del archivo:'+ev.target.files[0].size+'<br>'+  
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
        var split = contenidoDelArchivo.split(","); // separamos el contenido del archivo en un array eliminando las comas
        document.getElementById('editor').value=contenidoDelArchivo;
    }

/*document.getElementById('file-input').addEventListener('change', leerArchivoTxt(this), false);

function leerArchivoTxt(file){
    var archivo = file.target.files[0];
    if (!archivo) {
    return;
    }
    var lector = new FileReader();
    lector.onload = function(file) {
        var contenido = file.target.result;
        mostrarContenido(contenido);
    };
    lector.readAsText(file);
}

function mostrarContenido(contenido) {
  var elemento = document.getElementById('contenido-archivo');
  elemento.innerHTML = contenido;
}*/
