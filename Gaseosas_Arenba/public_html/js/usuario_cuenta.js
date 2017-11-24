$(document).ready(function(){
    
    var nombreUsuario = $("#inpBlockNombre").val();
    var apellidoUsuario = $("#inpBlockApellido").val();
    var telUsuario = $("#inpBlockTelefono").val();
    var localUsuario = $("#inpBlockLocalidad").val();
    var direccUsuario = $("#inpBlockDireccion").val();
    var provUsuario = $("#inpBlockProvincia").val();
    var dniUsuario = $("#inpBlockDNI").val();
    var emailUsuario = $("#inpBlockEmail").val();

    $("#editar").click(function() {
        $('#formulario').toggle();
	$('#datos').hide();
	$('#editar').hide();
	$('#botones').toggle();
        modificarDatos(nombreUsuario,apellidoUsuario,telUsuario,localUsuario,direccUsuario,provUsuario,dniUsuario,emailUsuario);
        alert(nombreUsuario);
    });
    
    $('#cancelar').click(function() {
        $('#formulario').hide();
	$('#datos').toggle();
	$('#editar').toggle();
	$('#botones').hide();
        modificarDatos(nombreUsuario,apellidoUsuario,telUsuario,localUsuario,direccUsuario,provUsuario,dniUsuario,emailUsuario);
        alert(apellidoUsuario);
        limpiarCampos();
    }); 
        
    $('#telefono').keyup(function(){
        this.value = (this.value + "").replace(/[^^0-9]/g,'');
    });
        
    $('#dni').keyup(function(){
        this.value = (this.value + "").replace(/[^^0-9]/g,'');
    });
        
    $('#guardar').click(function() {
	var bolEmail = validarEmail();
	var bolTel = validarTelefono();
	var bolName = validarNombre();
	var bolApe = validarApellido();
	var bolLocal = validarLocalidad();
	var bolDir = validarDirreccion();
        var bolDni = validarDni();
        var bolProv = validarProvincia();
        
        if(bolEmail && bolTel && bolName && bolApe && bolLocal && bolDir && bolDni && bolProv){
            var nombre = $("#inpBlockNombre").val();
            var apellido = $("#inpBlockApellido").val();
            var tel = $("#inpBlockTelefono").val();
            var local = $("#inpBlockLocalidad").val();
            var direcc = $("#inpBlockDireccion").val();
            var prov = $("#inpBlockProvincia").val();
            var dni = $("#inpBlockDNI").val();
            var email = $("#inpBlockEmail").val();
            
            var data = {
                "nombre" : nombre,
                "apellido" : apellido,
                "tel" : tel,
                "local" : local,
                "direcc" : direcc,
                "prov" : prov,
                "dni" : dni,
                "email" : email
            };
            $.ajax({
                url: "../php/updateCliente.php",
                type: "POST",
                data: data,
                beforeSend: function insertar() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                    $("#pMensaje").text("Procesando, espere por favor...");
                },
                success: function algo(data){
                    console.log(data);
                }
            }).done(function(repuesta){
                $("#pMensaje").text("Se han actualizado correctamente sus datos...");
                console.log(repuesta);
            });
        }
        else{
            alert("fallo");
        }
    }); 
});

function modificarDatos(nombreUsuario,apellidoUsuario,telUsuario,localUsuario,direccUsuario,provUsuario,dniUsuario,emailUsuario){
    alert("nombre");
    $("#nombre").attr("value",nombreUsuario);
    $("#apellido").attr("value",apellidoUsuario);
    $("#telefono").attr("value",telUsuario);
    $("#localidad").attr("value",localUsuario);
    $("#direccion").attr("value",direccUsuario);
    $("#provincia").attr("value",provUsuario);
    $("#dni").attr("value",dniUsuario);
    $("#email").attr("value",emailUsuario);
}

/*$(document).change(function(){
    var algo = $("#inpBlockNombre").val();
    $("#nombre").attr("value",algo);
});*/

function limpiarCampos(){
    
    document.getElementById("pNombre").innerHTML="";
    document.getElementById("pApellido").innerHTML="";
    document.getElementById("pDni").innerHTML="";
    document.getElementById("pTelefono").innerHTML="";
    document.getElementById("pEmail").innerHTML="";
    document.getElementById("pProvincia").innerHTML="";
    document.getElementById("pLocalidad").innerHTML="";
    document.getElementById("pDireccion").innerHTML="";
    
    
    /*var nombreUsuario = $("#inpBlockNombre").val();
    var apellidoUsuario = $("#inpBlockApellido").val();
    var telUsuario = $("#inpBlockTelefono").val();
    var localUsuario = $("#inpBlockLocalidad").val();
    var direccUsuario = $("#inpBlockDireccion").val();
    var provUsuario = $("#inpBlockProvincia").val();
    var dniUsuario = $("#inpBlockDNI").val();
    var emailUsuario = $("#inpBlockEmail").val();*/
    
    /*$("#nombre").attr("value","");
        $("#apellido").attr("value","");
        $("#telefono").attr("value","");
        $("#localidad").attr("value","");
        $("#direccion").attr("value","");
        $("#provincia").attr("value","");
        $("#dni").attr("value","");
        $("#email").attr("value","");*/
}

function validarTelefono(){
	var texto=$('#telefono').val();
	if (texto==""){
			$('#pTelefono').text('debe ingresar el telefono');
			return false;
		}
		else if(texto.length==8 || texto.length==10) { 
			$('#pTelefono').text(' ');
                        return true;
		} else {
			$('#pTelefono').text('telefono invalido');
                        return false;
		}
}

function validarNombre(){
	var texto=$('#nombre').val(); 
		var reg =/^[a-z A-z]{3,16}$/;
		var aux= texto.split(" ");
		if (texto==""){
			$('#pNombre').text('debe ingresar el nombre');
                        return false;
		}
		else if(aux.length != 1) { 
			$('#pNombre').text('el nombre debe tener una palabra ');
                        return false;
		}
		else if(reg.test(texto)) { 
			$('#pNombre').text(' ');
			return true;
		} else {
			$('#pNombre').text('nombre invalido');
                        return false;
	}	
}

function validarContra(){
    //Utilizamos una expresion regular 
    var texto=$('#idPassword').val(); 
    var reg =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/; 
    if (texto===""){
            $('#pPassword').text('debe ingresar contraseña');
            return false;
    }
    else if(reg.test(texto)) { 
            $('#pPassword').text(' ');
            return true;
    } else {
            $('#pPassword').text('contraseña invalida');
            return false;
        }   
}

function validarContra1(){    
    var texto=$('#idPassword').val();
    var texto1=$('#idPassword1').val();
    if (texto1===""){
            $('#pPassword1').text('debe ingresar contraseña');
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

function validarApellido(){
	var texto=$('#apellido').val(); 
		var reg =/^[a-z A-z]{3,30}$/;
		if (texto==""){
			$('#pApellido').text('debe ingresar el apellido');
                        return false;
		}
		else if(reg.test(texto)) { 
			$('#pApellido').text(' ');
                        return true;			
		} else {
			$('#pApellido').text('apellido invalido');
                        return false;
	}	
}

function validarLocalidad(){
	var texto=$('#localidad').val(); 
		var reg =/^[a-zA-Z\s0-9]*$/;
		if (texto==""){
			$('#pLocalidad').text('debe ingresar la localidad');
                        return false;
		}
		else if(reg.test(texto)) { 
			$('#pLocalidad').text(' ');
			return true;
		} else {
			$('#pLocalidad').text('localidad invalida');
                        return false;
	}	
}

function validarDirreccion(){
	var texto=$('#direccion').val(); 
		var reg =/^[a-zA-Z\s0-9]*$/;
		if (texto==""){
			$('#pDireccion').text('debe ingresar la direccion');
                        return false;
		}
		else if(reg.test(texto)) { 
			$('#pDireccion').text(' ');
			return true;
		} else {
			$('#pDireccion').text('direccion invalida');
                        return false;
	}	
}

function validarEmail(){
	var texto=$('#email').val(); 
		var reg =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
		if (texto==""){
			$('#pEmail').text('debe ingresar el e-mail');
                        return false;
		}
		else if(reg.test(texto)) { 
			$('#pEmail').text(' ');
                        return true;
		} else {
			$('#pEmail').text('e-mail invalido');
                        return false;
	}	
}

function validarDni(){
	var texto=$('#dni').val(); 
        if (texto==""){
                $('#pDni').text('debe ingresar el DNI');
                return false;
        }
        else if(texto.length == 8 || texto.length == 10) { 
                $('#pDni').text(' ');
                return true;
        }else {
                $('#pDni').text('DNI invalido');
                return false;
        }	
}

function validarProvincia(){
	var texto=$('#provincia').val(); 
		var reg =/^[a-z A-z]{3,30}$/;
		if (texto==""){
			$('#pProvincia').text('debe ingresar una provincia');
                        return false;
		}
		else if(reg.test(texto)) { 
			$('#pProvincia').text(' ');
			return true;
		} else {
			$('#pProvincia').text('provincia invalido');
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
            return false;
    }
    else if(reg.test(texto) & aux.length === 1 & (texto.length > 6 & texto.length < 16)) { 
            $('#pUsuario').text(' ');
            return true;
    } else {
            $('#pUsuario').text('usuario invalido');
            return false;
        }
}
