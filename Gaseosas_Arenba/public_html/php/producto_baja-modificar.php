<?php
    session_start();
    if(!isset($_SESSION['usuario'])){
        echo '<script> window.location="./index.php"; </script>';
    }else{
        if($_SESSION['rol'] != 2){
            echo '<script> window.location="../html/top_secret.html"; </script>';
        }else{
            include "../html/producto_baja-modificar.html";
        }
    }
    
?>
