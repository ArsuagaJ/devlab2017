/**
 * @author ilDavid.com
 * Source: www.ildavid.com/esempi/ClipGallery
 * Creative Commons License BY-SA http://creativecommons.org/licenses/by-sa/2.5/
 * ver 0.1
 */
jQuery.fn.ClipGallery = function(options){
    settings = jQuery.extend({
        col: 3,
        row: 2
    }, options);
    thg = this.height();
    twd = this.width();
    clipH = thg / settings.row;
    clipW = twd / settings.col;
    
    $('img', this).each(function(i){
        var percorso = $(this).attr('src');
        dvd = '#ph' + i;
        $(this).wrap('<div id="ph' + i + '"></div>').after('<a href="#" class="clipGal" id="a' + i + '"></a>').remove();
        $(dvd).css({
            backgroundImage: 'url(' + percorso + ')'
        });
    });
    n = 0;
    arei = new Array();
    areib = new Array();
    for (j = 0; j < settings.row; j++) {
        for (f = 0; f < settings.col; f++) {
            hre = '#a' + n;
            dvd = '#ph' + n;
            posx = f * clipW;
            posy = j * clipH;
            posw = posx + clipW;
            posh = posy + clipH;
            areib[n] = new Array();
            areib[n].push(posy, posw, posh, posx);
            arei.push(areib[n]);
            $(dvd).css({
                position: 'absolute',
                height: thg + 'px',
                width: twd + 'px',
                clip: 'rect(' + posy + 'px ' + posw + 'px ' + posh + 'px ' + posx + 'px)'
            });
            $(hre).css({
                width: clipW + 'px',
                height: clipH + 'px',
                display: 'block',
                position: 'absolute',
                left: posx,
                top: posy,
                zIndex: 60
            });
            n++;
        }
    };
    $('.clipGal').each(function(i){
        $(this).hover(function(){
            $(this).parent().animate({
                clip: 'rect(0px ' + twd + 'px ' + thg + 'px 0px)'
            }).css({
                zIndex: 70
            });
        }, function(){
            $(this).parent().animate({
                clip: 'rect(' + arei[i][0] + 'px ' + arei[i][1] + 'px ' + arei[i][2] + 'px ' + arei[i][3] + 'px)'
            }, function(){
                $(this).css({
                    zIndex: 0
                });
            });
        });
    });
};
