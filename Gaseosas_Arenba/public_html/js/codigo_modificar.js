// con el codigo siguiente, se que funca el paginador, despues chusmeamos qué hace en si

$.fn.pageMe = function(opts){
    var $this = this,
        defaults = {
            perPage: 4,
            showPrevNext: false,
            hidePageNumbers: false
        },
        settings = $.extend(defaults, opts);
    
    var listElement = $this;
    var perPage = settings.perPage; 
    var children = listElement.children();
    var pager = $('.pager');
    
    if (typeof settings.childSelector!="undefined") {
        children = listElement.find(settings.childSelector);
    }
    
    if (typeof settings.pagerSelector!="undefined") {
        pager = $(settings.pagerSelector);
    }
    
    var numItems = children.size;
    var numPages = Math.ceil(numItems/perPage);

    pager.data("curr",0);
    
    if (settings.showPrevNext){
        $('<li><a href="#" class="prev_link">«</a></li>').appendTo(pager);
    }
    
    var curr = 0;
    while(numPages > curr && (settings.hidePageNumbers==false)){
        $('<li><a href="#" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
        curr++;
    }
    
    if (settings.showPrevNext){
        $('<li><a href="#" class="next_link">»</a></li>').appendTo(pager);
    }
    
    pager.find('.page_link:first').addClass('active');
    pager.find('.prev_link').hide();
    if (numPages<=1) {
        pager.find('.next_link').hide();
    }
  	pager.children().eq(1).addClass("active");
    
    children.hide();
    children.slice(0, perPage).show();
    
    pager.find('li .page_link').click(function(){
        var clickedPage = $(this).html().valueOf()-1;
        goTo(clickedPage,perPage);
        return false;
    });
    pager.find('li .prev_link').click(function(){
        previous();
        return false;
    });
    pager.find('li .next_link').click(function(){
        next();
        return false;
    });
    
    function previous(){
        var goToPage = parseInt(pager.data("curr")) - 1;
        goTo(goToPage);
    }
     
    function next(){
        goToPage = parseInt(pager.data("curr")) + 1;
        goTo(goToPage);
    }
    
    function goTo(page){
        var startAt = page * perPage,
            endOn = startAt + perPage;
        
        children.css('display','none').slice(startAt, endOn).show();
        
        if (page>=1) {
            pager.find('.prev_link').show();
        }
        else {
            pager.find('.prev_link').hide();
        }
        
        if (page<(numPages-1)) {
            pager.find('.next_link').show();
        }
        else {
            pager.find('.next_link').hide();
        }
        
        pager.data("curr",page);
      	pager.children().removeClass("active");
        pager.children().eq(page+1).addClass("active");
    
    }
};

$(document).ready(function(){
    
    /* en este caso, llamamos al elemento 'tbody' de nombre 'myTable' para ocultar los registros y mostrarlos de acuerdo al selector de paginacion en que estamos, en principio es 1...
    Luego llamamos al selector de nombre 'myPager' y mostramos los controles necesarios para ejecutarlo */
    $('#myTable').pageMe({pagerSelector:'#myPager',showPrevNext:true,hidePageNumbers:false,perPage:10});
  
    // funcion para realizar la comparacion de datos con los elementos de la tabla
    (function ($) {
        $('#filtrar').keyup(function () {
            //mostramos la tabla si existe coincidencia
            $("#tblTablaOculta").removeClass("hidden");
            $("#tblTablaOculta").addClass("visible-block");
            
            // generamos una expresion regular con nuestro valor del campo buscar
            var rex = new RegExp($(this).val(), 'i');
            // lo mostramos a la tabla
            $('.buscar tr').show();
            // realizamos un chequeo si existe el valor ingresado con las filas de la tabla
            $('.buscar tr').filter(function () {
                return !rex.test($(this).text());
            }).hide();
    });
    }(jQuery));
    
    $("#tblTablaOculta").find('tr').click(function(){
        // tomamos todos los elementos td de la fila tr
        var celdas = this.getElementsByTagName("td");
        
        // generamos las variables para almacenar los datos en los campos
        var codigo = "";
        var isActivo = "";
        var fechaInicio = "";
        var fechaFin = "";
        
        // almacenamos los valores para utilizar posteriormente
        codigo = celdas[0].firstChild.nodeValue;
        if(celdas[1].firstChild.nodeValue == "Activo"){
            isActivo = true;
        }else{
            isActivo = false;
        }
        fechaInicio = celdas[2].firstChild.nodeValue;
        fechaFin = celdas[3].firstChild.nodeValue;
        
        $("#divBtnModificar").removeClass("hidden");
        $("#divBtnModificar").addClass("visible-block");
        var btnModificar = $("#btnModificar");
        var btnGuardar = $("#btnGuardar");
        var btnCancelar = $("#btnCancelar");

        cargarDatos(isActivo,fechaInicio,fechaFin);

        // si hacemos doble click sobre una fila, se activa la funcion de modificaciones tal cual lo hubiesemos presionado del boton MODIFICAR
        $(this).dblclick(function(){
            $("#divModificaciones").removeClass("hidden");
            $("#divModificaciones").addClass("visible-block");
        });
        
        btnModificar.click(function(){
            $("#divModificaciones").removeClass("hidden");
            $("#divModificaciones").addClass("visible-block");
        });
        
        btnCancelar.click(function(){
            $("#divMensaje").removeClass("visible-block");
            $("#divMensaje").addClass("hidden");
            $("#divModificaciones").removeClass("visible-block");
            $("#divModificaciones").addClass("hidden");
        });
        
        btnGuardar.click(function(){
            var mensaje = $("#divMensaje");
            mensaje.removeClass("hidden");
            mensaje.addClass("visible-block");
            $("#pMensaje").text("El codigo: "+codigo+ " se ha modificado Correctamente");
        });
    });
    
    $("#btnCerrarAlerta").click(function(){
        $("#divMensaje").removeClass("visible-block");
        $("#divMensaje").addClass("hidden");
    });
});

function cargarDatos(isActivo,fechaInicio,fechaFin){
    $("#date").attr("value",fechaInicio);
    $("#hasta").attr("value",fechaFin);
    
    //por alguna extraña razón, el check funciona la primera vez y luego no se tilda.. ni idea por que
    if(isActivo===true){
        $("#chkActivo").attr('checked',true);
    }else if(isActivo === false){
        $("#chkActivo").removeAttr('checked');
    }
}

/*
function generarPromedio(){
    var valorTotal = [];
    var arrValores1 = [];
    var arrValores2 = [];
    var indice = 0;
    $("#tblTabla tbody tr").each(function(){
        $(this).each(function(){
            var celdas = this.getElementsByTagName("td");
            if(indice!=0){
                arrValores1.push(celdas[1]);
                arrValores2.push(celdas[2]);
            }
        });
        indice = indice +1;
    });
    var longArray1 = arrValores1.length;
    var longArray2 = arrValores2.length;
    for(var i = 0; i<longArray1; i++){
        var valorDeLaCelda1 = parseInt(arrValores1[i].firstChild.nodeValue);
        var valorDeLaCelda2 = parseInt(arrValores2[i].firstChild.nodeValue);
        valorTotal.push((valorDeLaCelda1 + valorDeLaCelda2)/2);
    }
    indice = 0;
    
    
    $("#tblTabla tbody tr").each(function(){
        $(this).each(function(){
            var celdas = this.getElementsByTagName("td");
            if(indice!=0){
                celdas[3].innerHTML = Math.round(valorTotal[indice-1]);
            }
        });
        indice = indice +1;
    });
}*/