<?php
    function enviarMailADestino($email,$remitente){
        //$destinatario = "arsuaga00@gmail.com"; 
        $destinatario = $email;
        $asunto = "INVITACION a Registro de GASEOSAS ARENBA"; 
        $cuerpo = ' 
        <html> 
        <head> 
           <title>Gaseosas Arenba</title> 
        </head> 
        <body> 
        <h1>Hola!</h1> 
        <p> 
        <b>Bienvenido</b>.
        <p>Ud. recibió este mensaje porque ha sido invitado para registrarse a la pagina de Gaseosas Arenba</p>
        <p>Presione en el siguiente link:<a href="www.google.com">Google(hay que cambiarlo por el del registro de GArenba)</a></p>
        </p> 
        </body> 
        </html> 
        '; 

        //para el envío en formato HTML 
        $headers = "MIME-Version: 1.0\r\n"; 
        $headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 

        //dirección del remitente 
        $headers .= "From: Arsuaga Jul <arsuagajulian@gmail.com>\r\n"; 

        /*//dirección de respuesta, si queremos que sea distinta que la del remitente 
        $headers .= "Reply-To: mariano@desarrolloweb.com\r\n"; 

        //ruta del mensaje desde origen a destino 
        $headers .= "Return-path: holahola@desarrolloweb.com\r\n"; 

        //direcciones que recibián copia 
        $headers .= "Cc: maria@desarrolloweb.com\r\n"; 

        //direcciones que recibirán copia oculta 
        $headers .= "Bcc: pepe@pepe.com,juan@juan.com\r\n"; */

        mail($destinatario,$asunto,$cuerpo,$headers);
    }
?>
