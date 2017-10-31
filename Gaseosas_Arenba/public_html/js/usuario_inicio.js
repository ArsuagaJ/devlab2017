$(document).ready(function(){
	$('#botonCod').click(function() {
		$('#divCodigo').toggle();
	}); 
});
$(document).ready(function(){
	$('#cancelarCod').click(function() {
		$('#divCodigo').hide();
		document.getElementById("pCodigo").innerHTML="";
		document.getElementById("codigo").value="";
	}); 
});
$(document).ready(function(){
	$('#invitarAmi').click(function() {
		$('#divInvitar').toggle();
	}); 
});
$(document).ready(function(){
	$('#cancelarEmail').click(function() {
		$('#divInvitar').hide();
		document.getElementById("pEmail").innerHTML="";
		document.getElementById("email").value="";
	}); 
});

function validarCodigo(){
	var texto=$('#codigo').val(); 
		var reg =/^[a-zA-Z0-9]*$/;
		var aux= texto.split(" ");
		if (texto==""){
			$('#pCodigo').text('debe ingresar un codigo');
			event.preventDefault();
		}
		else if(aux.length != 1) { 
			$('#pCodigo').text('el codigo no debe tener espacios vacios ');
		}
		else if(reg.test(texto)) { 
			$('#pCodigo').text(' ');
		} else {
			$('#pCodigo').text('codigo invalido');
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
	$('#enviarCod').click(function() {
		validarCodigo();
	});
});

$(document).ready(function(){
	$('#enviarEmail').click(function() {
		validarEmail();
	});
});