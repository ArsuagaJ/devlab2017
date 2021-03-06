<?php

    class Canje{
        private $id_producto;
        private $id_usuario;
        private $fecha;

               
        function __construct(){
            $this->id_producto = "";
            $this->id_usuario = "";
            $this->fecha = 0;

        }
     
        function getCanjeEntreDate($fecha1,$fecha2){
            include ('./conexion.php');
            try{
                $stmt = $conn->prepare("SELECT DISTINCT canje.*,producto.nombre AS nombre_producto, cliente.provincia, cliente.localidad, "
                        . "usuario.nombre, usuario.apellido FROM canje, producto,cliente,usuario WHERE canje.id_usuario = cliente.id_usuario "
                        . "AND canje.id_producto = producto.id_producto "
                        . "AND cliente.id_usuario=usuario.id_usuario AND canje.fecha BETWEEN :fecha1 AND :fecha2");
                $stmt->bindParam(':fecha1',$fecha1,PDO::PARAM_STR);
                $stmt->bindParam(':fecha2',$fecha2,PDO::PARAM_STR);
                $stmt->execute();

                $result = $stmt->fetchAll();
                //print('<script>alert("hola");</script>');
                return $result;
            }catch( PDOExecption $e ) { 
                print "Error!: " . $e->getMessage() . "</br>"; 
            }
            // realizamos la desconexion de la BD
            include ('./desconexion.php');
        }
        
        function realizarCanje($idUsuo,$idProduto,$fecha){
            $idUsuo = (int)$idUsuo;
            $idProduto = (int)$idProduto;
            include('./conexion.php');
            try{
                //preparamos la consulta insert
                $statmt = $conn->prepare("INSERT INTO `canje`(`id_usuario`, `id_producto`, `fecha`) VALUES ('$idUsuo','$idProduto','$fecha')");
                $statmt->bindParam(':fecha', $fecha, PDO::PARAM_STR);       
                $statmt->bindParam(':id_usuario', $$idUsuo, PDO::PARAM_INT);
                $statmt->bindParam(':id_producto', $idProduto, PDO::PARAM_INT);
                $conn->beginTransaction(); 
                $statmt->execute(); 
                $conn->commit();
                return true;
            }catch( PDOExecption $e ) { 
                print "Error!: " . $e->getMessage() . "</br>"; 
            }
        }
    
    }
?>