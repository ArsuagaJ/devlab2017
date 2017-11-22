<?php
    //session_start();
    function ingresarAPagina($strPagina){
        if(!isset($_SESSION['usuario'])){
            echo '<script> window.location="./index.php"; </script>';
        }else{
            if($_SESSION['rol'] != 1){
                echo '<script> window.location="../html/top_secret.html"; </script>';
            }else{
                include $strPagina;
            }
        }
    }
    
?>