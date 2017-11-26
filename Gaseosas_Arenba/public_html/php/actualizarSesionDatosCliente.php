<?php

    //session_start();  en este caso comento la linea porque ya la llamo en otro PHP que llama a esta funcion.. revisar..
    //
    //
    // recuperamos los valores de la variable post - array con valores -- con el mismo nombre descriptivo que el JS
    // ejemplo, en el archivo 'producto_agregar.js' nombramos el valor de la variable 'descripcion' de la forma 'descrip'
    $id = $_SESSION['id_usuario'];
    $idU = (int)$id;

    //include('./conexion.php');
    include('./cliente.php');
    include('./usuario.php');
    
    // instanciamos un objeto "ListaCodigo"
    $cliente = new Cliente();
    $usuario = new Usuario();
    
    $algo = $usuario->getUsuarioByID($idU); //tomamos los nuevos valores que se guardaron recien
    $datos = $cliente->getDatosClienteById($idU); //de aca tambien
    
    $_SESSION['puntos'] = $datos['puntos'];
    $_SESSION['nombre'] = $algo['nombre'];
    $_SESSION['apellido'] = $algo['apellido'];
    $_SESSION['email'] = $datos['email'];
    $_SESSION['telefono'] = $datos['telefono'];
    $_SESSION['localidad'] = $datos['localidad'];
    $_SESSION['direccion'] = $datos['direccion'];
    $_SESSION['provincia'] = $datos['provincia'];
    $_SESSION['dni'] = $datos['dni'];
?>
