<?php
	session_start(); 
?>
<!DOCTYPE html>
<html>
<head>
<head>
	<title>Validando...</title>
	<meta charset="utf-8">
</head>
</head>
<body>
<?php
include './conexion.php';
include './usuario.php';   
$usuario = filter_input(INPUT_POST,'usuario');
$psw = filter_input(INPUT_POST,'password');
$usur = new Usuario();
//echo('<script> console.log('.$log.') </script>');
if(isset($_POST['login'])){
    //$usuario = filter_input(INPUT_POST,'usuario');
    //$psw = filter_input(INPUT_POST,'password');
    
    $pw = md5((int)$psw);
    
    //echo('<script> console.log('+$psw+') </script>');
    //echo('<script> console.log('+$pw+') </script>');
    $log = $usur->getUsuarioAndPass($usuario,$pw);
    
    echo sizeof($log);
	if (sizeof($log)>0){
            foreach ($log as $row){
            //$row = $log[0];
            
                $_SESSION["usuario"] = $row['usuario']; 
                $_SESSION["nombre"] = $row['nombre'];
                $_SESSION["apellido"] = $row['apellido'];
                $_SESSION["rol"] = $row['id_rol']; 
                $rol = $row['id_rol'];
                $us = $row['usuario'];
                
                echo('<script> alert('.$_SESSION["usuario"].'); </script>');
                if($rol > 0 && $rol < 5){
                    echo 'Iniciando sesión para '.$_SESSION["usuario"].' <p>';
                }
                switch ($rol) {
                case 1:
                    echo '<script> window.location="../php/admin_abm.php"; </script>';
                    break;
                case 2:
                    echo '<script> window.location="../php/codigo_agregar.php"; </script>';
                    break;
                case 3:
                   echo '<script> window.location="../php/usuario_inicio.php"; </script>';
                    break;
                case 4:
                   echo '<script> window.location="../php/representante_codigos_informados.php"; </script>';
                    break;
                default:
                    echo '<script> alert("Usuario o contraseña incorrectos DEFAULT.");</script>';
                    echo '<script> window.location="../php/index.php"; </script>';
                    break;
                }
            }
	}
	else{
            echo '<script> alert("Usuario o contraseña incorrectos.");</script>';
            echo '<script> window.location="../php/index.php"; </script>';
	}
}
?>	
</body>
</html>