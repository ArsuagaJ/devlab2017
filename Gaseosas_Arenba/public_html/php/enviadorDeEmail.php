<?php
    function enviarMailADestino($email,$remitente,$idInvit,$emailInvitador){
        //$id = base64_encode($remitente);
        //$destinatario = "arsuaga00@gmail.com";
        $invitador = $emailInvitador;
        //$stringID = md5($remitente);
        //$asunto = "INVITACION a Registro de GASEOSAS ARENBA"; 
        $cuerpo = ' 
        <html> 
        <head> 
           <title>Gaseosas Arenba</title> 
        </head> 
        <body> 
        <h1>Hola!'.$email.'</h1><h3><b>Bienvenid@.</b></h3> 
        <p><br>Ud. recibió este mensaje porque ha sido invitado por: '.$invitador.' para registrarse a la pagina de Gaseosas Arenba<br>
        Presione en el siguiente link:<a href="http://localhost/Gaseosas_Arenba/Gaseosas_Arenba/public_html/php/usuario_registro_invitado.php?id='.$idInvit.'&email='.$email.'&invitador='.$remitente.'">Gaseosas Arenba Invitacion a Registrarse)</a></p> 
        </body> 
        </html> 
        '; 

        //para el envío en formato HTML 
        $headers = "MIME-Version: 1.0\r\n"; 
        $headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 

        //dirección del remitente 
        $headers .= "From: Arsuaga Julian <arsuagajulian@gmail.com>\r\n"; 

        /*//dirección de respuesta, si queremos que sea distinta que la del remitente 
        $headers .= "Reply-To: mariano@desarrolloweb.com\r\n"; 

        //ruta del mensaje desde origen a destino 
        $headers .= "Return-path: holahola@desarrolloweb.com\r\n"; 

        //direcciones que recibián copia 
        $headers .= "Cc: maria@desarrolloweb.com\r\n"; 

        //direcciones que recibirán copia oculta 
        $headers .= "Bcc: pepe@pepe.com,juan@juan.com\r\n"; */

        mail($email,"INVITACION a Registro de GASEOSAS ARENBA",$cuerpo,$headers);
    }
?>
