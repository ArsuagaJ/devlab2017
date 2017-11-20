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
include 'conexion.php';
include 'usuario.php';   
    
if(isset($_POST['login'])){
    $usuario = $_POST['usuario'];
    $pw = $_POST['password'];
    $usuario = new Usuario();
    $pw = md5($pw);
    
    
    $log = $usuario->getUsuarioAndPass($usuario,$pw);
	if (sizeof($log)>0){
            $row = $log[0];
            $_SESSION["usuario"] = $row['usuario']; 
            $_SESSION["nombre"] = $row['nombre'];
            $_SESSION["apellido"] = $row['apellido'];
            $_SESSION["rol"] = $row['rol']; 
            $rol = $row['rol']; 
            echo 'Iniciando sesión para '.$_SESSION['usuario'].' <p>';
            switch ($rol) {
            case 1:
                echo '<script> window.location="../html/admin_abm.html"; </script>';
                break;
            case 2:
                echo '<script> window.location="../html/codigo_agregar.html"; </script>';
                break;
            case 3:
               echo '<script> window.location="../html/usuario_inicio.html"; </script>';
                break;
            case 4:
               echo '<script> window.location="../html/representante_codigos_informados.html"; </script>';
                break;
            }
            
            
	}
	else{
            echo '<script> alert("Usuario o contraseña incorrectos.");</script>';
            echo '<script> window.location="../html/index.html"; </script>';
	}
}
?>	
</body>
</html>