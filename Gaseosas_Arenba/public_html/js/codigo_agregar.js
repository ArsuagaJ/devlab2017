$(document).ready(function(){
    var date_input=$('input[name="date"]'); //our date input has the name "date"
    var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    var options={
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
    };
    date_input.datepicker(options);
      
    var hasta_input=$('input[name="hasta"]'); //our date input has the name "date"
    var container2=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
    var options2={
        format: 'mm/dd/yyyy',
        container: container2,
        todayHighlight: true,
        autoclose: true,
    };
    hasta_input.datepicker(options2);
    
    $("#btnAgregar").click(function(){
        $("#divMensaje").removeClass("hidden");
        $("#divMensaje").addClass("visible-block");
    });
    
    $("#btnCerrarAlerta").click(function(){
        $("#divMensaje").removeClass("visible-block");
        $("#divMensaje").addClass("hidden");
    });
    
});
