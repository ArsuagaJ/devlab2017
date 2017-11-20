<?php
    // recuperamos los valores de la variable post - array con valores -- con el mismo nombre descriptivo que el JS
    // ejemplo, en el archivo 'producto_agregar.js' nombramos el valor de la variable 'descripcion' de la forma 'descrip'
    $puntos = filter_input(INPUT_POST,'puntos');
    $nombreProducto = filter_input(INPUT_POST,'nombre');
    $descripcion = filter_input(INPUT_POST,'descripcion');
    $id = filter_input(INPUT_POST,'id');

    //include('./conexion.php');
    include('./producto.php');
    
    // instanciamos un objeto "ListaCodigo"
    $producto = new Producto();
    
    // llamamos al metodo INSERTAR del Objeto ListaCodigo
    $producto->updateProducto($id,$nombreProducto,$puntos,$descripcion);
    //$id,$fechaInicio,$fechaFin,$nombreArchivo,$descripcion,$estado ... asi se pasan los parametros para actualizar
?>
