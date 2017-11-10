<?php
//recuperamos el valor de la variable que viene por get
    $name = filter_input(INPUT_GET,'nameDescrip');

    require_once './conexion.php';
    require_once './producto.php';
    
    $producto = new Producto();
    
    $resultado = $producto->getProductoByNameOrDescript($name);
    
    $respuesta = array();

    // Recorremos con un foreach todas las respuestas que nos devolvio la BDD
    foreach ($resultado as $row) {
    //Guardamos los datos en un array
        $datos = array(
            'resultado' => 'ok', //este campo creo que esta de mas, pero por las dudas lo dejamos, creo que es de comprobacion
            'nombre' => $row['nombre'], 
            'descripcion' => $row['descripcion'], 
            'foto' => $row['foto'],
            'puntos' => $row['puntos'],
            'estado' => $row['estado']
        );
        // agregamos el array de la fila al array general '$respuesta' que se devolvera como objeto JSON
        array_push($respuesta,$datos);
    }
    
    //Seteamos el header de "content-type" como "JSON" para que jQuery lo reconozca como tal
    header('Content-Type: application/json');
    /*$datos = array(
        'resultado' => 'ok', //este campo creo que esta de mas, pero por las dudas lo dejamos
        'nombre' => $resultado['nombre'], 
        'descripcion' => $resultado['descripcion'], 
        'foto' => $resultado['foto'],
        'puntos' => $resultado['puntos'],
        'estado' => $resultado['estado']
    );*/

    //Devolvemos el array pasado a JSON como objeto
    echo json_encode($respuesta, JSON_FORCE_OBJECT);
    
    require_once './desconexion.php'; // cerramos la conexion a la base de datos
?>
