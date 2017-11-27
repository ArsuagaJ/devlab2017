
function limpiarCampos(){
    document.getElementById("pNombre").innerHTML="";
    document.getElementById("pApellido").innerHTML="";
    document.getElementById("pDni").innerHTML="";
    document.getElementById("pTelefono").innerHTML="";
    document.getElementById("pEmail").innerHTML="";
    document.getElementById("pProvincia").innerHTML="";
    document.getElementById("pLocalidad").innerHTML="";
    document.getElementById("pDireccion").innerHTML="";
    
    document.getElementById("nombre").value="";
    document.getElementById("apellido").value="";
    document.getElementById("dni").value="";
    document.getElementById("telefono").value="";
    document.getElementById("email").value="";
    document.getElementById("provincia").value="";
    document.getElementById("localidad").value="";
    document.getElementById("direccion").value="";
}


$(document).ready(function(){
	$('#telefono').keyup(function(){
		this.value = (this.value + "").replace(/[^^0-9]/g,'');
	});
});

$(document).ready(function(){
	$('#dni').keyup(function(){
		this.value = (this.value + "").replace(/[^^0-9]/g,'');
	});
});

function validarTelefono(){
	var texto=$('#telefono').val();
	if (texto==""){
			$('#pTelefono').text('debe ingresar el telefono');
			event.preventDefault();
                        return false;
		}
		else if(texto.length==8 || texto.length==10) { 
			$('#pTelefono').text(' ');
                        return true;
		} else {
			$('#pTelefono').text('telefono invalido');
			event.preventDefa
                        return false;
		}
}

function validarNombre(){
	var texto=$('#nombre').val(); 
		var reg =/^[a-z A-z]{3,16}$/;
		var aux= texto.split(" ");
		if (texto==""){
			$('#pNombre').text('debe ingresar el nombre');
			event.preventDefault();
                        return false;
		}
		else if(aux.length != 1) { 
			$('#pNombre').text('el nombre debe tener una palabra ');
                        event.preventDefault();
                        return false;
		}
		else if(reg.test(texto)) { 
			$('#pNombre').text(' ');
			return true;
		} else {
			$('#pNombre').text('nombre invalido');
			event.preventDefault();
                        return false;
	}	
}

function validarContra(){
    //Utilizamos una expresion regular 
    var texto=$('#idPassword').val(); 
    var reg =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/; 
    if (texto===""){
            $('#pPassword').text('debe ingresar contraseña');
            event.preventDefault();
            return false;
    }
    else if(reg.test(texto)) { 
            $('#pPassword').text(' ');
            return true;
    } else {
            $('#pPassword').text('contraseña invalida');
            event.preventDefault();
            return false;
        }   
}

function validarContra1(){    
    var texto=$('#idPassword').val();
    var texto1=$('#idPassword1').val();
    if (texto1===""){
            $('#pPassword1').text('debe ingresar contraseña');
            event.preventDefault();
            return false;
    }
    else if(texto===texto1) { 
            $('#pPassword1').text(' ');
            return true;
    } else {
            $('#pPassword1').text('las contraseñas no coinciden, intente de nuevo');
            event.preventDefault();
            return false;
        }
}

function validarApellido(){
	var texto=$('#apellido').val(); 
		var reg =/^[a-z A-z]{3,30}$/;
		if (texto==""){
			$('#pApellido').text('debe ingresar el apellido');
			event.preventDefault();
                        return false;
		}
		else if(reg.test(texto)) { 
			$('#pApellido').text(' ');
                        return true;			
		} else {
			$('#pApellido').text('apellido invalido');
			event.preventDefault();
                        return false;
	}	
}

function validarLocalidad(){
	var texto=$('#localidad').val(); 
		var reg =/^[a-zA-Z\s0-9]*$/;
		if (texto==""){
			$('#pLocalidad').text('debe ingresar la localidad');
			event.preventDefault();
                        return false;
		}
		else if(reg.test(texto)) { 
			$('#pLocalidad').text(' ');
			return true;
		} else {
			$('#pLocalidad').text('localidad invalida');
			event.preventDefault();
                        return false;
	}	
}

function validarDirreccion(){
	var texto=$('#direccion').val(); 
		var reg =/^[a-zA-Z\s0-9]*$/;
		if (texto==""){
			$('#pDireccion').text('debe ingresar la direccion');
			event.preventDefault();
                        return false;
		}
		else if(reg.test(texto)) { 
			$('#pDireccion').text(' ');
			return true;
		} else {
			$('#pDireccion').text('direccion invalida');
			event.preventDefault();
                        return false;
	}	
}

function validarEmail(){
	var texto=$('#email').val(); 
		var reg =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
		if (texto==""){
			$('#pEmail').text('debe ingresar el e-mail');
			event.preventDefault();
                        return false;
		}
		else if(reg.test(texto)) { 
			$('#pEmail').text(' ');
                        return true;
		} else {
			$('#pEmail').text('e-mail invalido');
			event.preventDefault();
                        return false;
	}	
}

function validarDni(){
	var texto=$('#dni').val(); 
        if (texto==""){
                $('#pDni').text('debe ingresar el DNI');
                event.preventDefault();
                return false;
        }
        else if(texto.length == 8 || texto.length == 10) { 
                $('#pDni').text(' ');
                return true;
        }else {
                $('#pDni').text('DNI invalido');
                event.preventDefault();
                return false;
        }	
}

function validarProvincia(){
	var texto=$('#provincia').val(); 
		var reg =/^[a-z A-z]{3,30}$/;
		if (texto==""){
			$('#pProvincia').text('debe ingresar una provincia');
			event.preventDefault();
                        return false;
		}
		else if(reg.test(texto)) { 
			$('#pProvincia').text(' ');
			return true;
		} else {
			$('#pProvincia').text('provincia invalido');
			event.preventDefault();
                        return false;
	}	
}

function validarUsuario(){
     //Utilizamos una expresion regular 
    var texto=$('#idUsuario').val(); 
    var reg =/^[a-zA-Z\s0-9]*$/; 
    var aux = texto.split(" ");
    if (texto===""){
            $('#pUsuario').text('debe ingresar usuario');
            event.preventDefault();
            return false;
    }
    else if(reg.test(texto) & aux.length === 1 & (texto.length > 6 & texto.length < 16)) { 
            $('#pUsuario').text(' ');
            return true;
    } else {
            $('#pUsuario').text('usuario invalido');
            event.preventDefault();
            return false;
        }
}

$(document).ready(function(){
	$('#registro').click(function() {
		//Utilizamos una expresion regular 
		var var1 = validarEmail();
		var var2 = validarTelefono();
		var var3 = validarNombre();
		var var4 = validarApellido();
		var var5 = validarLocalidad();
		var var6 = validarDirreccion();
                var var7 = validarDni();
                var var8 = validarProvincia();
                var var9 = validarContra();
                var var10 = validarContra1();
                var var11 = validarUsuario();
                
                if (var1 === true & var2 === true & var3 === true & var4 === true & var5 === true & var6 === true & var7 === true & var8 === true & var9 === true & var10 === true & var11 === true){
                    
                    var nombre = $("#nombre").val();
                    var apellido = $("#apellido").val();
                    var usuario = $("#idUsuario").val();
                    var password = $("#idPassword").val();
                    var rol = 3;                   
                    
                    var parametros1 = {
                            "nombreUsuario" : usuario,
                            "apellido" : apellido,
                            "nombre" : nombre,
                            "password" : password,
                            "id_rol" : rol
                        };
                    var ruta = "../php/insertRegistroUsuario.php"; // lo enviamos al php para que lo suba a la carpeta "fotos"
                    $.ajax({
                        url: ruta,
                        type: "POST",
                        data: parametros1,
                        beforeSend: function insertar() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                            $("#pMensaje").text("Procesando, espere por favor...");

                        }
                    }).done(function(response){
                        console.log(response[0]); //lo grabamos en la consola
                        //$("#pMensaje").text(response[1]);

                        
                        var dni = $("#dni").val();
                        var telefono = $("#telefono").val();
                        var email = $("#email").val();
                        var provincia = $("#provincia").val();
                        var localidad = $("#localidad").val();
                        var direccion = $("#direccion").val();
                        var puntos = 0;
                        var intentos = 0;
                        var token = 0;
                        var validacion= 0;

                        // los siguientes valores son los que le pasamos al php con ajax que luego los recuperara con el nombre descriptivo
                        // que le hayamos puesto.. en este caso
                        // "nombre", "descrip","punt","img","estado"
                        var parra = document.getElementById("ParraDatos");
                        var idUsuarioInvitador = parseInt(parra.getAttribute("value"));
                        var mailInvitador = parra.getAttribute("name");
                        var idInvitacion = parra.getAttribute("text");
                        var parametros = {
                            "dni" : dni,
                            "telefono" : telefono,
                            "email" : email,
                            "provincia" : provincia,
                            "localidad" : localidad,
                            "direccion" : direccion,
                            "puntos" : puntos,
                            "intentos" : intentos,
                            "token" : token,
                            "validacion" : validacion,
                            "idUsuario" : response,
                            "identifica" : idUsuarioInvitador,
                            "emailInvitador" : mailInvitador,
                            "idInvitacion" : idInvitacion
                        };
                        // generamos un ajax nuevo con los valores de los campos
                        $.ajax({
                            data:  parametros, // los datos que van a ser recuperados desde el php
                            url:   '../php/cliente_registro_invitado.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
                            type:  'post',
                            success:  function (response) {
                                console.log(response);
                                $("#pMensaje").text(response);    
                            }
                        }).done(function(respuesta){
                            $("#pMensaje").text("OK, se agregado correctamente el usuario");//fijarme si esta
                            
                            /*var idusu = {
                                
                            };
                            $.ajax({
                                data:  idusu, // los datos que van a ser recuperados desde el php
                                url:   '../php/cliente_registro_invitado.php', // llamamos al php para insertar los datos en este caso con los parametros que le pasemos
                                type:  'post',
                                success:  function (response) {
                                    console.log(response);
                                    $("#pMensaje").text(response);    
                                }
                            });*/
                        });
                      });
                    
                    
                    
                    
                                        
                }else{
                    $("#pMensaje").text("Debe completar correctamente los campos");//fijarme si esta
                }

	}); 
});