<?php
    // recuperamos los valores de la variable post - array con valores -- con el mismo nombre descriptivo que el JS
    $idListaCodigo = filter_input(INPUT_POST,'id');

    //include('./conexion.php');
    include('./lista_codigo.php');
    
    // instanciamos un objeto "ListaCodigo"
    $listaCodigo = new ListaCodigo();
    
    // llamamos al metodo INSERTAR del Objeto ListaCodigo
    $listaCodigo->darBajaListaCodigos($idListaCodigo);
    //$id,$fechaInicio,$fechaFin,$nombreArchivo,$descripcion,$estado ... asi se pasan los parametros para actualizar
?>
