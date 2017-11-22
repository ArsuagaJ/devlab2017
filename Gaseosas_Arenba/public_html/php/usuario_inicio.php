<?php
    session_start();
    include ("../php/verifica_cliente.php");
    if(!isset($_SESSION['puntos'])){
        include_once './cliente.php';
        $cliente = new Cliente();
        $_SESSION['puntos'] = $cliente->getPuntosDeUsuario($_SESSION['id_usuario']);
    }
    ingresarAPagina("../html/usuario_inicio.html");
?>