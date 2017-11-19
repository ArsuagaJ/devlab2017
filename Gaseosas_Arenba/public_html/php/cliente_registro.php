<?php

    // recuperamos los valores de la variable post - array con valores -- con el mismo nombre descriptivo que el JS
    // ejemplo, en el archivo 'producto_agregar.js' nombramos el valor de la variable 'descripcion' de la forma 'descrip'
    $nombre = filter_input(INPUT_POST,'nombre');
    $apellido = filter_input(INPUT_POST,'apellido');
    $dni = filter_input(INPUT_POST,'dni');
    $telefono = filter_input(INPUT_POST,'telefono');
    $email = filter_input(INPUT_POST,'email');
    $provincia = filter_input(INPUT_POST,'provincia');
    $localidad = filter_input(INPUT_POST,'localidad');
    $direccion = filter_input(INPUT_POST,'direccion');
    $idUsuario = filter_input(INPUT_POST,'idUsuario');
    $idPassword = filter_input(INPUT_POST,'idPassword');
    $estado = filter_input(INPUT_POST,'estado');
    $rol = filter_input(INPUT_POST,'rol');
    $puntos = filter_input(INPUT_POST,'puntos');
    $intentos = filter_input(INPUT_POST,'intentos');
    $token = filter_input(INPUT_POST,'token');
    $validacion = filter_input(INPUT_POST,'validacion');
    //include('./conexion.php');
    include('./cliente.php');
    
    // instanciamos un objeto "cliente"
    $cliente = new Cliente();
    
    // llamamos al metodo INSERTAR
    // hay que tomar los datos del campo del html de producto_agregar y pasarlos como parametros aca.
    $cliente->insertar($nombre,$apellido,$dni,$telefono,$email,$provincia,$localidad,$direccion,
                       $idUsuario,$idPassword,$estado,$rol,$puntos,$intentos,$token,$validacion);
    
?>

