<?php
    $retorno = array();
    
    // SI EL INPUT DEL HTML DE TIPO ARCHIVO NO TIENE EL CAMPO NAME, NO FUNCIONA.....
    // NO OLVIDAR ESE DATO IMPORTANTE..
    
    if(isset($_FILES['file'])){
        
        $file = $_FILES['file'];
        $nombre = $file["name"];
        $tipo = $file["type"];
        $ruta_provisional = $file["tmp_name"];
        $size = $file["size"];
        $carpeta = "../archivos/";
        
        if ($tipo != 'text/plain'){
            array_push($retorno,array("resultado" => "fallo"));
            array_push($retorno, array("Error, el archivo solo puede ser TXT"));
        }else if ($size > 1024*1024){
            array_push($retorno,array("resultado" => "fallo"));
            array_push($retorno, array("Error, el tamaño máximo permitido es un 1MB"));
        }else{
            $src = $carpeta.$nombre;
            move_uploaded_file($ruta_provisional, $src);
            array_push($retorno,array("resultado" => "ok"));
            array_push($retorno,$src);
        }
    }else{
        array_push($retorno,array("resultado" => "fallo"));
        array_push($retorno, array("Error, se ha producido un error al subir el archivo, vuelva a intentarlo mas tarde"));
    }
    //array_push($retorno,$_FILES);
    header('Content-Type: application/json');
    echo json_encode($retorno, JSON_FORCE_OBJECT);
        
        
	/*$tamanio = $_FILES['archivo']['size'];
	$archivotmp = $_FILES['archivo']['tmp_name'];
	$respuesta = new stdClass();
	
	if( $tipo == 'application/vnd.ms-excel'){
		
		$archivo = "archivos/alumno.csv";
	
		if(move_uploaded_file($archivotmp, $archivo) ){
	 		$respuesta->estado = true;		
		} else {
    		$respuesta->estado = false;
			$respuesta->mensaje = "El archivo no se pudo subir al servidor, intentalo mas tarde";
		}
	
		if($respuesta->estado){
		
			$lineas = file('archivos/alumno.csv');

			$respuesta->mensaje = "";
			$respuesta->estado = true;
			$conexion = new mysqli('localhost','usuario','password','basedatos',3306);
			foreach ($lineas as $linea_num => $linea)
			{
				$datos = explode(",",$linea);
				$matricula = trim($datos[0]);
				$paterno = trim($datos[1]);
				$materno = trim($datos[2]);
				$nombre = trim($datos[3]);
			
	    		$consulta = "INSERT INTO tblalumno(matricula,paterno, materno, nombre) VALUES('$matricula','$paterno','$materno','$nombre');";			
				if(!$conexion->query($consulta)){			
					$respuesta->estado = false;
					$respuesta->mensaje .= "El alumno $paterno $materno $nombre no se guardo, verifica la información \n"; 				
				}
			}
		}
		if($respuesta->estado == true)
			$respuesta->mensaje = "Todos los registros se guardaron correctamente\n";
	}
	else {
		$respuesta->mensaje = "Solo se admiten archivos .csv, vuelvelo a intentar\n";
	}
	echo json_encode($respuesta);*/
?>