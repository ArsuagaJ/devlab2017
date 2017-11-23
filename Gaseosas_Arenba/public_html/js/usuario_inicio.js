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
                    mostrarDivMensaje();
                    imprimirMensaje("Procesando, espere por favor...");
                    //alert("procesando");funcion procesando
                },
                success: function (data){
                    console.log(data);
                    mostrarDivMensaje();
                    imprimirMensaje("Se ha validado correctamente el codigo...");
                    //funcion procesada
                    
                }
            }).done(function(data){
                console.log(data);
                if(data[0].resultado === "ok"){
                    mostrarDivMensaje();
                    imprimirMensaje("Codigo procesado correctamente. Se sumaron 10 puntos a su cuenta.");
                    //window.setInterval(location.href="../php/usuario_inicio.php",5000);
                    window.location.replace("../php/usuario_inicio.php");
                    $('#pCodigo').text('Codigo procesado correctamente. Se sumaron 10 puntos a su cuenta. Actualizando ...');
                    
                    //console.log(data[3]);
                    //console.log(data[4]);
                }else{
                    mostrarDivMensaje();
                    imprimirMensaje("Error, el codigo no existe o no es valido...");
                    $('#pCodigo').text('Error, el codigo no existe o no es valido...');
                }
                //document.location.reload();
            });
        }
        else{
            
        }
    });
    $('#enviarEmail').click(function() {
        var email = $("#email").val();
        if(validarEmail()){
            //var textoooo = $("#inpCodigo").val(); //lo tengo que llamar de nuevo, sino esta en UNDEFINED
            //var id = '<?php session_start(); echo $_SESSION['id_usuario'];?>';
            //alert(id);
            var param = {
                "email" : email
                //"id" :
            };
            $.ajax({
                type: 'post',
                data: param,
                url: '../php/getInvitaciones.php',
                beforeSend: function procesandoArchivo() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                    mostrarDivMensaje();
                    imprimirMensaje("Procesando, espere por favor...");
                    //alert("procesando");funcion procesando
                }
            }).done(function(respuesta){
                if(respuesta[0].resultado === "ok"){
                    $.ajax({ // ajax para subir el archivo al server
                        type: 'post',
                        data: param,
                        url: '../php/enviarSolicitudEmail.php',
                        beforeSend: function procesandoArchivo() { // todavia no entiendo por que llamamos a la funcion "insertar()" que creo que deberia ser la del php, pero bueno...
                            mostrarDivMensaje();
                            imprimirMensaje("Procesando, espere por favor...");
                            //alert("procesando");funcion procesando
                        },
                        success: function (){
                            console.log("Email de invitacion enviado");
                            mostrarDivMensaje();
                            imprimirMensaje("Se ha enviado el email de invitacion...");

                        }
                    }).done(function(){
                        console.log("Email de invitacion enviado");
                        $('#okEmail').text('Se ha enviado el email de invitacion...');
                    });
                }
                if(respuesta[0].resultado === "no"){
                    $('#pEmail').text('Ya se ha enviado la solicitud para este email');
                }
                else if(respuesta[0] === "fallo"){
                    $('#pEmail').text('Se ha producido un error. Intente de nuevo mas tarde..');
                }
            });
        }
    });
});

function imprimirMensaje(strMensaje){
    $("#pMensaje").text(strMensaje);
}

function ocultarDivMensaje(){
    $("#divMensaje").removeClass("visible-block");
    $("#divMensaje").addClass("hidden");
}

function mostrarDivMensaje(){
    $("#divMensaje").removeClass("hidden");
    $("#divMensaje").addClass("visible-block");
}

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
    if(texto==""){
        $('#pEmail').text('debe ingresar el e-mail');
        //event.preventDefault();
        return false;
    }else if(reg.test(texto)) { 
        $('#pEmail').text(' ');
        return true;
    }else {
        $('#pEmail').text('e-mail invalido');
        //event.preventDefault();
        return false;
    }
}