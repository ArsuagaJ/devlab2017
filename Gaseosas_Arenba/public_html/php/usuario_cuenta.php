<?php
    session_start();
    include ("../php/verifica_cliente.php");
    include("../php/cliente.php");
    $cliente = new Cliente();
    $respuesta = array();
    $longi;
    
    $respuesta = $cliente->getClientePorId($_SESSION['id_usuario']);
    
    $_SESSION["email"] = $respuesta['email'];
    $_SESSION["telefono"] = $respuesta['telefono'];
    $_SESSION["localidad"] = $respuesta['localidad'];
    $_SESSION["direccion"] = $respuesta['direccion'];
    $_SESSION["provincia"] = $respuesta['provincia'];
    $_SESSION["dni"] = $respuesta['dni'];
    
    ingresarAPagina("../html/usuario_cuenta.html");
?>