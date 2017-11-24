<?php
    session_start();
    include ("../php/verifica_cliente.php");
    include("../php/cliente.php");
    $cliente = new Cliente();
    $respuesta = array();
    try{
        $resultado = $cliente->getClientePorId($_SESSION['id_usuario']);
        foreach ($resultado as $row) {
        //Guardamos los datos en un array
            $datos = array(
                //'resultado' => 'ok', //este campo creo que esta de mas, pero por las dudas lo dejamos, creo que es de comprobacion
                'email' => $row['email'], 
                'telefono' => $row['telefono'], 
                'localidad' => $row['localidad'],
                'direccion' => $row['direccion'],
                'provincia' => $row['provincia'],
                'dni' => $row['dni']
            );
            // agregamos el array de la fila al array general '$respuesta' que se devolvera como objeto JSON
            array_push($respuesta,$datos);
        }
        echo "entro";
    }catch(Exception $e){
        echo "se rompio";
    }
    
    $_SESSION["email"] = $respuesta['email'];
    $_SESSION["telefono"] = $respuesta['telefono'];
    $_SESSION["localidad"] = $respuesta['localidad'];
    $_SESSION["direccion"] = $respuesta['direccion'];
    $_SESSION["provincia"] = $respuesta['provincia'];
    $_SESSION["dni"] = $respuesta['dni'];
    
    echo $_SESSION['email'];
    echo "resultado: ".(string)gettype($resultado);
    echo "resultado: ".(string)$resultado;
    echo '<script>console.log('.$resultado.');</script>';
    
    ingresarAPagina("../html/usuario_cuenta.html");
?>