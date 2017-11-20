 <?php
                 session_start();
                 //include 'serv.php';
                 if(!isset($_SESSION['usuario'])){
                    echo '<script> window.location="./index.php"; </script>';
                 }else{
                    if($_SESSION['rol'] != 2){
                        echo '<script> window.location="../html/top_secret.html"; </script>';
                    }else{
                        include include "../html/admin_abm.html";
                    }
                }
      ?>
