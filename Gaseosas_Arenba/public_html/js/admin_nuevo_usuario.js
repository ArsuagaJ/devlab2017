function imprimirMensaje(strMensaje){
    $("#pMensaje").text(strMensaje);
}
function limpiarCampos(){
    document.getElementById("pUsuario").innerHTML="";
    document.getElementById("pNombre").innerHTML="";
    document.getElementById("pApellido").innerHTML="";
    document.getElementById("pPassword").innerHTML="";
    document.getElementById("pPassword1").innerHTML="";
    
    document.getElementById("inpNombreUsuario").value="";
    document.getElementById("txtNombre").value="";
    document.getElementById("txtApellido").value="";  
    document.getElementById("txtRol").value="";
    document.getElementById("txtPassword").value="";
    document.getElementById("txtPassword1").value="";
}

function validarUsuario(){
    var user;
    
	var texto=$('#inpNombreUsuario').val(); 
        var param = {
            "strUser" : texto
        };
        $.ajax({
            type: 'post',
            data: param,
            url: '../php/getExisteUsuario.php'
        }).done(function (data){
            if(data[0].resultado === "ok"){
                var reg =/^[a-zA-Z0-9]{3,16}$/;
		var aux= texto.split(" ");
		if (texto==""){
			$('#pUsuario').text('Debe ingresar el usuario');
                        return false;
		}
		else if(aux.length != 1) { 
			$('#pUsuario').text('El usuario debe tener una palabra');
                        return false;
		}
		else if(reg.test(texto)) { 
			$('#pUsuario').text(' ');
			return true;
		} else {
			$('#pUsuario').text('Usuario invalido');
                        return false;
                }	
            }else{
                $('#pUsuario').text('El usuario ya existe');
                return false;
            }
        });
		
}

function validarNombre(){
	var texto=$('#txtNombre').val(); 
		var reg =/^[a-zA-z]{3,16}$/;
		var aux= texto.split(" ");
		if (texto==""){
			$('#pNombre').text('Debe ingresar el nombre');
                        return false;
		}
		else if(aux.length != 1) { 
			$('#pNombre').text('El nombre debe tener una palabra ');
                        return false;
		}
		else if(reg.test(texto)) { 
			$('#pNombre').text(' ');
			return true;
		} else {
			$('#pNombre').text('Nombre invalido');
                        return false;
	}	
}
function validarApellido(){
	var texto=$('#txtApellido').val(); 
		var reg =/^[a-zA-z]{3,30}$/;
		if (texto == ""){
			$('#pApellido').text('Debe ingresar el apellido');
                        return false;
		}
		else if(reg.test(texto)) { 
			$('#pApellido').text(' ');
                        return true;			
		} else {
			$('#pApellido').text('Apellido invalido');
                        return false;
	}	
}

function validarContra(){
    //Utilizamos una expresion regular 
    var texto=$('#txtPassword').val(); 
    var reg =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/; 
    if (texto===""){
            $('#pPassword').text('Debe ingresar contraseña');
            return false;
    }
    else if(reg.test(texto)) { 
            $('#pPassword').text(' ');
            return true;
    } else {
            $('#pPassword').text('Contraseña invalida');
            return false;
        }   
}

function validarContra1(){    
    var texto=$('#txtPassword').val();
    var texto1=$('#txtPassword1').val();
    if (texto1===""){
            $('#pPassword1').text('Debe ingresar contraseña');
            return false;
    }
    else if(texto===texto1) { 
            $('#pPassword1').text(' ');
            return true;
    } else {
            $('#pPassword1').text('las contraseñas no coinciden, intente de nuevo');
            return false;
        }
}



$(document).ready(function(){
    
    $("#btnAgregarUsuario").click(function(){
        //Utilizamos una expresion regular 
                var var1 = validarUsuario();
		var var2 = validarNombre();
		var var3 = validarApellido();
                var var4 = validarContra();
                var var5 = validarContra1();
                 
      if (var1 && var2 && var3 && var4 && var5){
        
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
                   // $("#pMensaje").text(response);    
                }
                
            }).done(function(respuesta){
                imprimirMensaje("Se ha creado con exito el nuevo usuario");
                $('#modalVista').modal('show');
               // $("#pMensaje").text("OK, se agregado correctamente el archivo");
            });
            }
          });
        });       
   