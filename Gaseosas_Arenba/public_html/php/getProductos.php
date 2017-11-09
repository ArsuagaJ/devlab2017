<?php
    require_once './conexion.php';
        
    require_once './producto.php';
        
    $producto = new Producto();
    $rows = $producto->getProductos();
    
    //Seteamos el header de "content-type" como "JSON" para que jQuery lo reconozca como tal
    header('Content-Type: application/json');

    $respuesta = array();

    // Recorremos con un foreach todas las respuestas que nos devolvio la BDD
    foreach ($rows as $row) {
    //Guardamos los datos en un array
        $datos = array(
            'resultado' => 'ok', //este campo creo que esta de mas, pero por las dudas lo dejamos
            'id_producto' => $row['id_producto'],
            'nombre' => $row['nombre'], 
            'descripcion' => $row['descripcion'], 
            'foto' => $row['foto'],
            'puntos' => $row['puntos'],
            'estado' => $row['estado']
        );
        // agregamos el array de la fila al array general '$respuesta' que se devolvera como objeto JSON
        array_push($respuesta,$datos);
    }

    //Devolvemos el array pasado a JSON como objeto
    echo json_encode($respuesta, JSON_FORCE_OBJECT);
    
    require_once './desconexion.php'; // cerramos la conexion a la base de datos
?>