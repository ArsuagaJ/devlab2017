$(document).ready(function(){
    /*$("#input-dim-1").fileinput({
        uploadUrl: "/file-upload-batch/2",
        allowedFileExtensions: ["jpg", "png", "gif"],
        maxImageWidth: 500,
        maxImageHeight: 500
    });*/
    
    $("#btnAgregarUsuario").click(function(){
   
        
        $("#divMensaje").removeClass("hidden");
        $("#divMensaje").addClass("visible-block");

        //tomamos los datos del archivo
        var formData = new FormData($("#js-upload-form")[0]);
        var ruta = "../php/insertUsuario.php"; 
            
       
            var nombreUsuario = $("#inpNombreUsuario").val();
            var password = $("#txtPassword").val();
            var nombre = $("#txtNombre").val();
            var apellido = $("#txtApellido").val(); // en el indice 1 esta la ruta recuperada del php
            var id_rol;
            var rol = $("#txtRol").val();
            
            switch (rol) {
                case "Administrador":
                id_rol = 1;
            break;
                case "Empleado":
                id_rol = 2;
            break;
                case "Representante":
                id_rol = 4;
            break;
            }
            alert(id_rol);
            // los siguientes valores son los que le pasamos al php con ajax que luego los recuperara con el nombre descriptivo
            // que le hayamos puesto.. en este caso

            var parametros = {
                "nombreUsuario" : nombreUsuario,
                "password" : password,
                "nombre" : nombre,
                "apellido" : apellido,
                "id_rol" : id_rol
            };
            // generamos un ajax nuevo con los valores de los campos
            $.ajax({
                data:  parametros, // los datos que van a ser recuperados desde el php
                url:  ruta,
                type:  'post',
                success:  function (response) {
                    console.log(response);
                   // $("#pMensaje").text(response);    
                }
            }).done(function(respuesta){
               // $("#pMensaje").text("OK, se agregado correctamente el archivo");
            });
          });
        });       
   
