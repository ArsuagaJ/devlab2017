<?php
    class Invitacion{
        
        private $email;
        private $id_invitado;
        private $id_invitacion;
        private $id_usuario;
        
        function __construct(){}
        
        function enviarInvitacion($idUsua,$email){
            include('./conexion.php');
            try{
                $sql = "INSERT INTO `invitacion`(`email`, `id_usuario`) VALUES ('$email','$idUsua')";
                $stmt = $conn->prepare($sql);
                //$stmt->execute();*/
                //$stmt->bindParam(':codigo', $code, PDO::PARAM_STR);       
                //$stmt->bindParam(':estado_canje', $estado_canje, PDO::PARAM_BOOL);    
                //$stmt->bindParam(':id_lista_codigo', $id_lista_codigo, PDO::PARAM_INT);
                // use PARAM_STR although a number    
                $stmt->execute();
            }catch( PDOExecption $e ) { 
                print "Error!: " . $e->getMessage() . "</br>"; 
            }
            include('./desconexion.php');
        }
    }
?>
