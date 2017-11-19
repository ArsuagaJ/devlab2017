<?php
    class ListaCodigo{
        
        private $idListaCodigo;
        private $dateFechaInicio;
        private $dateFechaFin;
        private $strDescripcion;
        private $boolEstado;
        private $conn;
        
        function __construct(){
            $this->idListaCodigo = "";
            $this->dateFechaInicio = "";
            $this->dateFechaFin = "";
            $this->strDescripcion = "";
            $this->boolEstado = false;
        }
        
        function getIdListaCodigo() {
            return $this->idListaCodigo;
        }

        function getDateFechaInicio() {
            return $this->dateFechaInicio;
        }

        function getDateFechaFin() {
            return $this->dateFechaFin;
        }

        function getStrDescripcion() {
            return $this->strDescripcion;
        }

        function getBoolEstado() {
            return $this->boolEstado;
        }

        function getConn() {
            return $this->conn;
        }

        function setIdListaCodigo($idListaCodigo) {
            $this->idListaCodigo = $idListaCodigo;
        }

        function setDateFechaInicio($dateFechaInicio) {
            $this->dateFechaInicio = $dateFechaInicio;
        }

        function setDateFechaFin($dateFechaFin) {
            $this->dateFechaFin = $dateFechaFin;
        }

        function setStrDescripcion($strDescripcion) {
            $this->strDescripcion = $strDescripcion;
        }

        function setBoolEstado($boolEstado) {
            $this->boolEstado = $boolEstado;
        }

        function setConn($conn) {
            $this->conn = $conn;
        }
        
        function darBajaListaCodigos($id){
            include('./conexion.php');
            //$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username,$password);
            try{
                $sql = "UPDATE lista_codigo SET estado = 1  
			WHERE id_lista_codigo = :id_lista_codigo";
                $stmt = $conn->prepare($sql);  
                $stmt->bindParam(':id_lista_codigo', $id, PDO::PARAM_INT);   
                $stmt->execute(); 

            }catch( PDOExecption $e ) { 
                print "Error!: " . $e->getMessage() . "</br>"; 
            }         
            
            // realizamos la desconexion de la BD
            include('desconexion.php');
        }
        
        function actualizarListaCodigos($id,$fechaInicio,$fechaFin,$nombreArchivo,$descripcion,$estado){
            include('./conexion.php');
            //$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username,$password);
            try{
                

                $sql = "UPDATE lista_codigo SET fecha_inicio = :fechaInicio, 
			fecha_fin = :fechaFin, 
			nombre_archivo = :nombreArchivo,  
			descripcion = :descripcion,  
			estado = :estado  
			WHERE id_lista_codigo = :id_lista_codigo";
                $stmt = $conn->prepare($sql);                                  
                $stmt->bindParam(':fechaInicio', $fechaInicio, PDO::PARAM_STR);       
                $stmt->bindParam(':fechaFin', $fechaFin, PDO::PARAM_STR);    
                $stmt->bindParam(':nombreArchivo', $nombreArchivo, PDO::PARAM_STR);
                // use PARAM_STR although a number  
                $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR); 
                $stmt->bindParam(':estado', $estado, PDO::PARAM_BOOL);   
                $stmt->bindParam(':id_lista_codigo', $id, PDO::PARAM_INT);   
                $stmt->execute(); 

                // echo a message to say the UPDATE succeeded
                //echo $stmt->rowCount() . " records UPDATED successfully";
                
                //preparamos la consulta UPDATE
                //$statmt = $conn->prepare();
                //$statmt->execute(); // ejecutamos el UPDATE
                /*$statmt = $conn->prepare("UPDATE `lista_codigo` SET `fecha_inicio`=:fechaInicio, `fecha_fin`=:fechaFin, `nombre_archivo`=:nombreArchivo, `descripcion`=:descripcion, `estado`=:estado WHERE `id_lista_codigo`=:idListaCodigo)");
                $statmt->bindParam(':fechaInicio', $fechaInicio);
                $statmt->bindParam(':fechaFin', $fechaFin);
                $statmt->bindParam(':nombreArchivo', $nombreArchivo);
                $statmt->bindParam(':descripcion', $descripcion);
                $statmt->bindParam(':estado', $estado);
                $statmt->bindParam(':idListaCodigo', $id);*/
                /*try { 
                    $conn->beginTransaction(); 
                    $statmt->execute(); // ejecutamos el UPDATE
                    $conn->commit();
                }catch(PDOExecption $e) { 
                    $conn->rollback(); 
                    //print "Error!: " . $e->getMessage() . "</br>"; 
                } */
            }catch( PDOExecption $e ) { 
                print "Error!: " . $e->getMessage() . "</br>"; 
            }         
            
            // realizamos la desconexion de la BD
            include('desconexion.php');
        }
        
        function insertarListaCodigos($fechaInicio,$fechaFin,$nombreArchivo,$descripcion,$estado){//ejecutamos el insert
            include('./conexion.php');
            $ultimoId; // declaramos una variable que sera el ID insertado
            try{
                //$sql = "INSERT INTO lista_codigo (fecha_inicio, fecha_fin, nombre_archivo,  descripcion,  estado)  VALUES (':fechaInicio',':fechaFin',':nombreArchivo',':descripcion',':estado')";
                $sql = "INSERT INTO `lista_codigo`(`fecha_inicio`, `fecha_fin`, `nombre_archivo`, `descripcion`, `estado`) VALUES ('$fechaInicio','$fechaFin','$nombreArchivo','$descripcion','$estado')";
                $stmt = $conn->prepare($sql);
                //$stmt->execute();*/
                $stmt->bindParam(':fechaInicio', $fechaInicio, PDO::PARAM_STR);       
                $stmt->bindParam(':fechaFin', $fechaFin, PDO::PARAM_STR);    
                $stmt->bindParam(':nombreArchivo', $nombreArchivo, PDO::PARAM_STR);
                // use PARAM_STR although a number  
                $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR); 
                $stmt->bindParam(':estado', $estado, PDO::PARAM_BOOL);   
                $stmt->execute();
                $stamt = $conn->query("SELECT LAST_INSERT_ID()"); // para poder retornar el ultimo id generado
                $lastId = $stamt->fetchColumn();
                $ultimoId = $lastId;
                //preparamos la consulta insert
                /*$statmt = $conn->prepare("INSERT INTO `lista_codigo`(`fecha_inicio`, `fecha_fin`, `nombre_archivo`, `descripcion`, `estado`) VALUES ('$fechaInicio','$fechaFin','$nombreArchivo','$descripcion','$estado')");
                try { 
                    $conn->beginTransaction(); 
                     //ejecutamos el insert
                    $statmt->execute(); 
                    $conn->commit();
                    $stmt = $conn->query("SELECT LAST_INSERT_ID()"); // para poder retornar el ultimo id generado
                    $lastId = $stmt->fetchColumn();
                    $ultimoId = $lastId;
                    //$ultimoId = $conn->lastInsertId(['id_producto']); // devolvemos el ultimo id insertado
                }catch(PDOExecption $e) { 
                    $conn->rollback(); 
                    //print "Error!: " . $e->getMessage() . "</br>"; 
                } */
            }catch( PDOExecption $e ) { 
                print "Error!: " . $e->getMessage() . "</br>"; 
            } 
            echo $ultimoId;           
            
            // realizamos la desconexion de la BD
            include('desconexion.php');
        }
        
        function getListadosActivosSinCanjes($ec){ // funcion que retorna toda la lista de codigos que ninguno de los codigos relacionados a esas listas esten canjeados
            include('./conexion.php');
            $statmt = $conn->prepare("SELECT lc.id_lista_codigo, lc.fecha_inicio,lc.fecha_fin,lc.nombre_archivo,lc.descripcion,lc.estado, max(c.estado_canje) as ec FROM codigo c INNER JOIN lista_codigo lc on c.id_lista_codigo = lc.id_lista_codigo group by lc.id_lista_codigo,lc.fecha_inicio,lc.fecha_fin,lc.nombre_archivo,lc.descripcion,lc.estado having ec=:ec");
            $statmt->bindParam(':ec', $ec);
            $statmt->execute(); 
            
            $listados_activos = $statmt->fetchAll();
            return $listados_activos;
            //include('./desconexion.php');
        }
    }
        
?>