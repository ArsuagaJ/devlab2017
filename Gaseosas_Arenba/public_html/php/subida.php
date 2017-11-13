<?php
    $retorno = array();
    if (isset($_FILES['file']))
    {
        $file = $_FILES['file'];
        $nombre = $file["name"];
        $tipo = $file["type"];
        $ruta_provisional = $file["tmp_name"];
        $size = $file["size"];
        $dimensiones = getimagesize($ruta_provisional);
        $width = $dimensiones[0];
        $height = $dimensiones[1];
        $carpeta = "../fotos/";
        
        

        if ($tipo != 'image/jpg' && $tipo != 'image/jpeg' && $tipo != 'image/png' && $tipo != 'image/gif'){
            array_push($retorno,array("resultado" => "fallo"));
            array_push($retorno, array("Error, el archivo no es una imagen"));
        }else if ($size > 1024*1024){
            array_push($retorno,array("resultado" => "fallo"));
            array_push($retorno, array("Error, el tamaño máximo permitido es un 1MB"));
        }else if ($width > 500 || $height > 500){
            array_push($retorno,array("resultado" => "fallo"));
            array_push($retorno, array("Error la anchura y la altura maxima permitida es 500px"));
        }else if($width < 60 || $height < 60){
            array_push($retorno,array("resultado" => "fallo"));
            array_push($retorno, array("Error la anchura y la altura mínima permitida es 60px"));
        }else{
            $src = $carpeta.$nombre;
            move_uploaded_file($ruta_provisional, $src);
            array_push($retorno,array("resultado" => "ok"));
            array_push($retorno,$src);
            //echo "<img src='$src'>";
        }
        
        
    }else{
        array_push($retorno,array("resultado" => "entro al else"));
    }
    //array_push($retorno,$_FILES);
    header('Content-Type: application/json');
    echo json_encode($retorno, JSON_FORCE_OBJECT);
?>