<?php

    $identificador = $_GET['id'];
    $email = $_GET['email'];
    $invitador = $_GET['invitador'];

    /*function ingresarAPagina($strPagina){
            if(!isset($_SESSION['usuario'])){
                echo '<script> window.location="./index.php"; </script>';
            }else{
                include $strPagina;
            }
    }*/
    //session_start();
    //include ("../php/verifica_cliente.php");
    include("../html/usuario_registro_invitado.html");
    echo '<p class=hidden id='.$identificador.' name='.$email.' value='.$invitador.'></p>'
?>
