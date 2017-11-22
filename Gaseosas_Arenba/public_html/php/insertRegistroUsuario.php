<?php

    // recuperamos los valores de la variable post - array con valores -- con el mismo nombre descriptivo que el JS
    // ejemplo, en el archivo 'producto_agregar.js' nombramos el valor de la variable 'descripcion' de la forma 'descrip'
    $nombreUsuario = filter_input(INPUT_POST,'nombreUsuario');
    $password = filter_input(INPUT_POST,'password');
    $nombre = filter_input(INPUT_POST,'nombre');
    $apellido = filter_input(INPUT_POST,'apellido');
    $id_rol = filter_input(INPUT_POST,'id_rol');

    //include('./conexion.php');
    include('./usuario.php');
    
    // instanciamos un objeto "Producto"
    $usuario = new Usuario();
    
    // llamamos al metodo INSERTAR
    // hay que tomar los datos del campo del html de producto_agregar y pasarlos como parametros aca.
    $ultId = $usuario->insertar($nombreUsuario,$password,$nombre,$apellido,$id_rol);
    echo $ultId;
    
?>
