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
    
    var nombreProducto = "";
    var descProducto = "";
    var totalPuntos = "";
    var fila = "";
    $("#tblTablaOculta").find('tr').click(function(){
        fila = $(this);
        var celdas = this.getElementsByTagName("td");
        nombreProducto = celdas[0].firstChild.nodeValue;
        descProducto = celdas[1].firstChild.nodeValue;
        totalPuntos = celdas[2].firstChild.nodeValue;
        $("#divBtnConfirmar").removeClass("hidden");
        $("#divBtnConfirmar").addClass("visible-block");
    });
    
    var boton = $("#btnConfirmar");
    boton.click(function(){
        var mensaje = $("#divMensaje");
        mensaje.removeClass("hidden");
        mensaje.addClass("visible-block");
        $("#pMensaje").text("El producto: '"+nombreProducto+ "' '"+descProducto+"' con un total de '"+totalPuntos+"' puntos necesarios para ser canjeados, se ha dado de baja Correctamente");
        fila.attr("class","hidden");//$(this).parent.attr("class","hidden");
    });
    
    $("#btnCerrarAlerta").click(function(){
        $("#divMensaje").removeClass("visible-block");
        $("#divMensaje").addClass("hidden");
    });
});