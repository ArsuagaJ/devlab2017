$(document).ready(function(){
    $('#botonCod').click(function() {
        $('#divCodigo').toggle();
    }); 
    $('#cancelarCod').click(function() {
        $('#divCodigo').hide();
	document.getElementById("pCodigo").innerHTML="";
	document.getElementById("codigo").value="";
    }); 
    $('#invitarAmi').click(function() {
        $('#divInvitar').toggle();
    });
    $('#cancelarEmail').click(function() {
        $('#divInvitar').hide();
	document.getElementById("pEmail").innerHTML="";
	document.getElementById("email").value="";
    });
    $('#enviarCod').click(function() {
        var tex = $("#inpCodigo").val();
        validarCodigo(tex);
    });
    $('#enviarEmail').click(function() {
        validarEmail();
    });
});

function validarCodigo(strCodigo){
    var texto=strCodigo;
    var reg =/^[a-zA-Z0-9]*$/;
    var aux= texto.split(" ");
    var longi = texto.length;
    if (texto==""){
        $('#pCodigo').text('debe ingresar un codigo');
            event.preventDefault();
    }
    else if(longi != 6 ){
        $('#pCodigo').text('el codigo debe ser unicamente de 6 caracteres alfanumericos ');
        event.preventDefault();
    }
    else if(aux.length != 1) { 
        $('#pCodigo').text('el codigo no debe tener espacios vacios ');
    }
    else if(reg.test(texto)) { 
        $('#pCodigo').text(' ');
    }
    else {
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