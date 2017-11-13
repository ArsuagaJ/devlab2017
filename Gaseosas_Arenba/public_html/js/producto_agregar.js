$(document).ready(function(){
    /*$("#input-dim-1").fileinput({
        uploadUrl: "/file-upload-batch/2",
        allowedFileExtensions: ["jpg", "png", "gif"],
        maxImageWidth: 500,
        maxImageHeight: 500
    });*/
    
    
    $("#btnAgregar").click(function(){
        
        $("#divMensaje").removeClass("hidden");
        $("#divMensaje").addClass("visible-block");

        //tomamos los datos del archivo
        var formData = new FormData($("#js-upload-form")[0]);
        var ruta = "../php/subida.php"; // lo enviamos al php para que lo suba a la carpeta "fotos"
        $.ajax({
            url: ruta,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            beforeSend: function insertar() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                $("#pMensaje").text("Procesando, espere por favor...");
            }/*,
            success: function(response){
                $("#pMensaje").text(response);
            }*/
        }).done(function(response){ //recuperamos el valor de la ruta de destino '../fotos/nombre_archivo
            console.log(response); //lo grabamos en la consola
            //$("#pMensaje").text(response[1]);
            
            // si se subio la imagen, tomamos los valores de los campos
            var nombre = $("#inpNombreProducto").val();
            var descrip = $("#txtDescripcion").val();
            var puntos = $("#inpPuntos").val();
            var rutaImagen = response[1]; // en el indice 1 esta la ruta recuperada del php
            var estado = true;
            
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
        });       
});   

$(window).load(function(){

 $(function() {
  $('#file').change(function(e) {
      addImage(e); 
     });

     function addImage(e){
      var file = e.target.files[0],
      imageType = /image.*/;
    
      if (!file.type.match(imageType))
       return;
  
      var reader = new FileReader();
      reader.onload = fileOnload;
      reader.readAsDataURL(file);
     }
  
     function fileOnload(e) {
      var result=e.target.result;
      $('#imgSalida').attr("src",result);
     }
    });
  });
    
/*(function($){
    'use strict';

        // UPLOAD CLASS DEFINITION
        // ======================

        var dropZone = document.getElementById('drop-zone');
        var uploadForm = document.getElementById('js-upload-form');

        var startUpload = function(files) {
            console.log(files)
        }

        uploadForm.addEventListener('submit', function(e) {
            var uploadFiles = document.getElementById('js-upload-files').files;
            e.preventDefault()

            startUpload(uploadFiles)
        })

        dropZone.ondrop = function(e) {
            e.preventDefault();
            this.className = 'upload-drop-zone';

            startUpload(e.dataTransfer.files)
        }

        dropZone.ondragover = function() {
            this.className = 'upload-drop-zone drop';
            return false;
        }

        dropZone.ondragleave = function() {
            this.className = 'upload-drop-zone';
            return false;
        }

    }//(jQuery);
);*/



