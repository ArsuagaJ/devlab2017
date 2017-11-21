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
        if(validarCodigo(tex)){ // si el codigo esta validado...
            //var textoooo = $("#inpCodigo").val(); //lo tengo que llamar de nuevo, sino esta en UNDEFINED
            //var id = '<?php session_start(); echo $_SESSION['id_usuario'];?>';
            //alert(id);
            var param = {
                "codigo" : tex,
                //"id" :
            };
            $.ajax({ // ajax para subir el archivo al server
                type: 'post',
                data: param,
                url: '../php/intentoCanje.php',
                beforeSend: function procesandoArchivo() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                    //imprimirMensaje("Procesando, espere por favor...");
                    //alert("procesando");funcion procesando
                },
                success: function (data){
                    //funcion procesada
                    
                }
            }).done(function(data){
                if(data[0].resultado === "ok"){
                    alert("hola");
                    alert(data[1]);
                    alert(data[2]);
                    //console.log(data[3]);
                    //console.log(data[4]);
                }
            });
        }
        else{
            alert("chota");
        }
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
            return false;
    }
    else if(longi != 6 ){
        $('#pCodigo').text('el codigo debe ser unicamente de 6 caracteres alfanumericos ');
        event.preventDefault();
        return false;
    }
    else if(aux.length != 1) { 
        $('#pCodigo').text('el codigo no debe tener espacios vacios ');
        return false;
    }
    else if(reg.test(texto)) { 
        $('#pCodigo').text(' ');
        return true;
    }
    else {
        $('#pCodigo').text('codigo invalido');
        event.preventDefault();
        return false;
    }
    //return true;
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