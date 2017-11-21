<?php
    session_start();
    include ("../php/verifica_empleado.php");
    ingresarAPagina("../html/codigo_agregar.html");
    /*if(!isset($_SESSION['usuario'])){
        echo '<script> window.location="./index.php"; </script>';
    }else{
        if($_SESSION['rol'] != 2){
            echo '<script> window.location="../html/top_secret.html"; </script>';
        }else{
            
        }
    }*/
    
?>
