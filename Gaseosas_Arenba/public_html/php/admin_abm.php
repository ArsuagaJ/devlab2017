 <?php
                 session_start();
                 //include 'serv.php';
                 if(!isset($_SESSION['user'])){
                 echo '<script> window.location="./index.php"; </script>';
                 }
                 include "../html/admin_abm.html"
      ?>
