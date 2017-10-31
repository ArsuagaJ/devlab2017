$(document).ready(function(){
	$('#editar').click(function() {
		$('#formulario').toggle();
		$('#datos').hide();
		$('#editar').hide();
		$('#botones').toggle();
	}); 
});

$(document).ready(function(){
	$('#cancelar').click(function() {
		$('#formulario').hide();
		$('#datos').toggle();
		$('#editar').toggle();
		$('#botones').hide();
	}); 
});

$(document).ready(function(){
	$('#telefono').keyup(function(){
		this.value = (this.value + "").replace(/[^^0-9]/g,'');
	});
});

function validarTelefono(){
	var texto=$('#telefono').val();
	if (texto==""){
			$('#pTelefono').text('debe ingresar el telefono');
			event.preventDefault();
		}
		else if(texto.length==8 || texto.length==10) { 
			$('#pTelefono').text(' '); 	
		} else {
			$('#pTelefono').text('telefono invalido');
			event.preventDefa
		}
}

function validarNombre(){
	var texto=$('#nombre').val(); 
		var reg =/^[a-z A-z]{3,16}$/;
		var aux= texto.split(" ");
		if (texto==""){
			$('#pNombre').text('debe ingresar el nombre');
			event.preventDefault();
		}
		else if(aux.length != 1) { 
			$('#pNombre').text('el nombre debe tener una palabra ');
		}
		else if(reg.test(texto)) { 
			$('#pNombre').text(' ');
			
		} else {
			$('#pNombre').text('nombre invalido');
			event.preventDefault();
	}	
}

function validarApellido(){
	var texto=$('#apellido').val(); 
		var reg =/^[a-z A-z]{3,30}$/;
		if (texto==""){
			$('#pApellido').text('debe ingresar el apellido');
			event.preventDefault();
		}
		else if(reg.test(texto)) { 
			$('#pApellido').text(' ');
			
		} else {
			$('#pApellido').text('apellido invalido');
			event.preventDefault();
	}	
}

function validarLocalidad(){
	var texto=$('#localidad').val(); 
		var reg =/^[a-zA-Z\s0-9]*$/;
		if (texto==""){
			$('#pLocalidad').text('debe ingresar la localidad');
			event.preventDefault();
		}
		else if(reg.test(texto)) { 
			$('#pLocalidad').text(' ');
			
		} else {
			$('#pLocalidad').text('localidad invalida');
			event.preventDefault();
	}	
}

function validarDirreccion(){
	var texto=$('#direccion').val(); 
		var reg =/^[a-zA-Z\s0-9]*$/;
		if (texto==""){
			$('#pDireccion').text('debe ingresar la direccion');
			event.preventDefault();
		}
		else if(reg.test(texto)) { 
			$('#pDireccion').text(' ');
			
		} else {
			$('#pDireccion').text('direccion invalida');
			event.preventDefault();
	}	
}

function validarEmail(){
	var texto=$('#email').val(); 
		var reg =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
		if (texto==""){
			$('#pEmail').text('debe ingresar el e-mail');
			event.preventDefault();
		}
		else if(reg.test(texto)) { 
			$('#pEmail').text(' '); 	
		} else {
			$('#pEmail').text('e-mail invalido');
			event.preventDefault();
	}	
}

$(document).ready(function(){
	$('#guardar').click(function() {
		//Utilizamos una expresion regular 
		validarEmail();
		validarTelefono();
		validarNombre();
		validarApellido();
		validarLocalidad();
		validarDirreccion();
	}); 
});