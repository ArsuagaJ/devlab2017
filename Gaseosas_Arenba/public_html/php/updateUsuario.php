<?php
    // recuperamos los valores de la variable post - array con valores -- con el mismo nombre descriptivo que el JS
    // ejemplo, en el archivo 'producto_agregar.js' nombramos el valor de la variable 'descripcion' de la forma 'descrip'
    $nombreUsuario = filter_input(INPUT_POST,'nombreUsuario');
    $nombre = filter_input(INPUT_POST,'nombre');
    $apellido = filter_input(INPUT_POST,'apellido');
    $password = filter_input(INPUT_POST,'password');
    $id = filter_input(INPUT_POST,'id');
    $id = (int)$id;

    //include('./conexion.php');
    include('./usuario.php');
    
    // instanciamos un objeto "ListaCodigo"
    $usuario = new Usuario();
    
    // llamamos al metodo INSERTAR del Objeto ListaCodigo
    $usuario->updateUsuario($id,$nombreUsuario,$nombre,$apellido,$password);
    //$id,$fechaInicio,$fechaFin,$nombreArchivo,$descripcion,$estado ... asi se pasan los parametros para actualizar
?>
