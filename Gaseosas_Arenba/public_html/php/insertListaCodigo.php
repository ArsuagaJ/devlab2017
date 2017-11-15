<?php

    // recuperamos los valores de la variable post - array con valores -- con el mismo nombre descriptivo que el JS
    // ejemplo, en el archivo 'producto_agregar.js' nombramos el valor de la variable 'descripcion' de la forma 'descrip'
    $fechaDesde = filter_input(INPUT_POST,'fechaDesde');
    $fechaHasta = filter_input(INPUT_POST,'fechaHasta');
    $descripci = filter_input(INPUT_POST,'descrip');
    $ruta = filter_input(INPUT_POST,'path');
    $estate = filter_input(INPUT_POST,'estado');

    //include('./conexion.php');
    include('./lista_codigo.php');
    
    // instanciamos un objeto "ListaCodigo"
    $listaCodigo = new ListaCodigo();
    
    // llamamos al metodo INSERTAR del Objeto ListaCodigo
    $listaCodigo->insertarListaCodigos($fechaDesde,$fechaHasta,$ruta,$descripci,$estate);
    
?>