<?php 
    class Codigo{
        
        private $idCodigo;
        private $codigo;
        private $estadoCanje;
        private $idListaCodigo;
        private $idUsuario;
        
        function getIdCodigo() {
            return $this->idCodigo;
        }

        function getCodigo() {
            return $this->codigo;
        }

        function getEstadoCanje() {
            return $this->estadoCanje;
        }

        function getIdListaCodigo() {
            return $this->idListaCodigo;
        }

        function getIdUsuario() {
            return $this->idUsuario;
        }

        function setIdCodigo($idCodigo) {
            $this->idCodigo = $idCodigo;
        }

        function setCodigo($codigo) {
            $this->codigo = $codigo;
        }

        function setEstadoCanje($estadoCanje) {
            $this->estadoCanje = $estadoCanje;
        }

        function setIdListaCodigo($idListaCodigo) {
            $this->idListaCodigo = $idListaCodigo;
        }

        function setIdUsuario($idUsuario) {
            $this->idUsuario = $idUsuario;
        }

        /*function insertarCodigos($arrayCodigos,$estadoDeCanje,$idListaCodigo,$idUsuario){
            $largo = sizeOf($arrayCodigos);
            try{
                for($i = 0; $i < $largo; ++$i) {
                    $this->insertarCodigo($arrayCodigos[$i],$estadoDeCanje,$idListaCodigo,$idUsuario);
                }
            }catch (PDOExepction $e){
                print "Error!: " . $e->getMessage();
                echo("Se ha producido un error al agregar los registros");
            }
        }*/
        
        function insertarCodigo($code,$estado_canje,$id_lista_codigo){
            include('./conexion.php');
            //$ultimoId; // declaramos una variable que sera el ID insertado
            try{
                $sql = "INSERT INTO `codigo`(`codigo`, `estado_canje`, `id_lista_codigo`) VALUES ('$code','$estado_canje','$id_lista_codigo')";
                $stmt = $conn->prepare($sql);
                //$stmt->execute();*/
                $stmt->bindParam(':codigo', $code, PDO::PARAM_STR);       
                $stmt->bindParam(':estado_canje', $estado_canje, PDO::PARAM_BOOL);    
                $stmt->bindParam(':id_lista_codigo', $id_lista_codigo, PDO::PARAM_INT);
                // use PARAM_STR although a number    
                $stmt->execute();
                //preparamos la consulta insert
                /*$statmt = $conn->prepare("INSERT INTO `codigo`(`codigo`, `estado_canje`, `id_lista_codigo`) VALUES ('$code','$estado_canje','$id_lista_codigo')");
                try { 
                    $conn->beginTransaction(); 
                     //ejecutamos el insert
                    $statmt->execute(); 
                    $conn->commit();
                    /*$stmt = $conn->query("SELECT LAST_INSERT_ID()"); // para poder retornar el ultimo id generado
                    $lastId = $stmt->fetchColumn();
                    $ultimoId = $lastId;*/
                    //$ultimoId = $conn->lastInsertId(['id_producto']); // devolvemos el ultimo id insertado
            }catch( PDOExecption $e ) { 
                print "Error!: " . $e->getMessage() . "</br>"; 
            } 
            //echo $ultimoId;           
            
            // realizamos la desconexion de la BD
            include('desconexion.php');
        }
        
        
    }
    

?>