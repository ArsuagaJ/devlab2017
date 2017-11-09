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
        
        var nombre = $("#inpNombreProducto").val();
        var descrip = $("#txtDescripcion").val();
        var puntos = $("#inpPuntos").val();
        var imagen = "fotoPrueba.jpg";
        var estado = true;
        // los siguientes valores son los que le pasamos al php con ajax que luego los recuperara con el nombre descriptivo
        // que le hayamos puesto.. en este caso
        // "nombre", "descrip","punt","img","estado"
        var parametros = {
                "nombre" : nombre,
                "descrip" : descrip,
                "punt" : puntos,
                "img" : imagen,
                "estado" : estado
        };
 
        $.ajax({
                data:  parametros, // los datos que van a ser recuperados desde el php
                url:   '../php/insertProductos.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
                type:  'post',
                beforeSend: function insertar() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                        $("#pMensaje").text("Procesando, espere por favor...");
                },
 
                success:  function (response) {
                        console.log("success");
                        $("#pMensaje").text(response);
                }
 
        });
    });
    
});    
    
    
(function($){
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
);



