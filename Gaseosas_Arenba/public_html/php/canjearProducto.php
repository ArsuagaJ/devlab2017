<?php 
    session_start();
    $misPuntos = $_SESSION['puntos'];
    $ide = $_SESSION['id_usuario'];
    $ide = (int)$ide;
    $misPuntos = (int)$misPuntos;
    $idPro = filter_input(INPUT_POST,'idProd');
    $idPro = (int)$idPro;
    
    $fechaActual = date('Y-m-d');
    
    include "./producto.php";
    include "./canje.php";
    include "./cliente.php";
    
    $producto = new Producto();
    $canje = new Canje();
    $cliente = new Cliente();
    $respuesta = array();// creamos un array que sera lo que devolveremos como JSON
    
    $pun = $producto->getPuntosDeProductoPorId($idPro);
    $puntos = (int)$pun['puntos'];
    
    $resta = 0;
    
    if($misPuntos >= $puntos){
        $canje->realizarCanje($ide,$idPro,$fechaActual);
        $resta = $misPuntos-$puntos;
        $cliente->actualizarPuntos($ide,$resta);
        $_SESSION['puntos'] = $cliente->getPuntosDeUsuario($ide);
        array_push($respuesta,array("resultado" => "ok"));
    }else{
        array_push($respuesta,array("resultado" => "no"));
        $_SESSION['puntos'] = $cliente->getPuntosDeUsuario($ide);
        array_push($respuesta,$puntos);
        array_push($respuesta,$pun);
        array_push($respuesta,$misPuntos);
    }
    header('Content-Type: application/json');
    //Devolvemos el array pasado a JSON como objeto
    echo json_encode($respuesta, JSON_FORCE_OBJECT);
?>
