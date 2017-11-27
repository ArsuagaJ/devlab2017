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
        
        function getCodigosPorIdLista($idLista){
            include('./conexion.php');
            $statmt = $conn->prepare("SELECT `codigo`, `estado_canje` FROM `codigo` WHERE id_lista_codigo =:idList");
            $statmt->bindParam(':idList', $idLista,PDO::PARAM_INT);
            $statmt->execute(); 
            
            $codigos = $statmt->fetchAll();
            return $codigos;
            //include('./desconexion.php');
        }
        
        function canjearClienteCodigo($idCliente,$idCode,$code){
            include('./conexion.php');
            $booll = 1;
            try{
                $sql = "UPDATE codigo SET estado_canje =1,id_usuario=$idCliente WHERE id_codigo=$idCode";
                $stmt = $conn->prepare($sql);                           
                $stmt->bindParam(':esta',$booll,PDO::PARAM_BOOL);
                $stmt->bindParam(':id_cliente',$idCliente, PDO::PARAM_INT);
                $stmt->bindParam(':id_codigo',$idCode, PDO::PARAM_INT);
                $stmt->execute();
                return $idCliente;
            }catch( PDOExecption $e ) { 
                print "Error!: " . $e->getMessage() . "</br>"; 
            }
            // realizamos la desconexion de la BD
            include('./desconexion.php');
        }
        
        function clienteIngresaCodigo($code){
            include('./conexion.php');
            $statmt = $conn->prepare("SELECT `id_codigo`, `codigo` FROM `codigo` WHERE id_usuario IS null AND codigo=:cod");
            $statmt->bindParam(':cod', $code);
            $statmt->execute(); 
            
            $resultado = $statmt->fetchAll();
            return $resultado;
            //include('./desconexion.php');
        }
        
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