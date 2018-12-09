import Canvas from './components/Canvas/Canvas.js';
import Paintbrush from './components/Paintbrush/Paintbrush.js';

$(document).ready(function () {
    var wrap_cont_width = $('.wrap-canvas').width();
    var wrap_cont_height = wrap_cont_width * 0.8;
    var canvas = new Canvas('canvas', wrap_cont_width, wrap_cont_height);
    var paintbrush = new Paintbrush();
    var colors = [
                  ['black', '#000'],
                  ['green', '#33cc33'],
                  ['blue', '#0066ff'],
                  ['yellow', '#FFD700'],
                  ['orange', '#FF7429'],
                  ['red', '#ff0000']
                 ];
    var wides = [5, 10, 15];

    var $canvas = canvas.ini($('.canvas-container'));
    var $undo = $('#undo');
    var $redo = $('#redo');

    $('.canvas-container').css('width', canvas.width);
    $('.canvas-container').css('height', canvas.height);


    createWides(wides);
    createColors(colors);

    $canvas.mousedown(function (evt) { 
        paintbrush.startDraw();
    });
    $canvas.on('touchstart', function (evt) {
        paintbrush.startDraw();
    });

    $canvas.mousemove(function (evt) {
        var pos = canvas.mousePos(evt);
        paintbrush.draw(canvas.element(), pos);
    });
    $canvas.on('touchmove', function (evt) {
        var pos = canvas.mousePos(evt);
        paintbrush.draw(canvas.element(), pos);
    });

    $canvas.mouseup(function () { 
        paintbrush.stopDraw();
    });
    $canvas.mouseout(function () { 
        paintbrush.stopDraw();
    });
    $canvas.on('touchend', function () { 
        paintbrush.stopDraw();
    });

    $undo.click(function () { 
        paintbrush.undo(canvas.element());
    });

    $redo.click(function () { 
        paintbrush.redo(canvas.element());
    });

    $( window ).resize(function() {
        resizeCanvas(canvas);
        paintbrush.redraw(canvas.element());
    });

    $('.color').click(function () {
        var changed = paintbrush.changeColor($(this).attr('code'));
        if (changed) {
            $('.color .selected').removeClass('selected');
            $(this).children().first().addClass('selected');
        }
    });

    $('.wide').click(function () {
        var changed = paintbrush.changeWide($(this).attr('px'));
        if (changed) {
            $('.wide.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    });

});

function createColors(colors) {
    colors.forEach(color => {
        if (color[0] == 'black') {
            var div ='<div class="color ' + color[0] + '" code="' + color[1] + '"><div class="selected"></div></div>';
        } else {
            var div ='<div class="color ' + color[0] + '" code="' + color[1] + '"><div></div></div>';
        }
        $('#colors').append(div);
    });
}

function createWides(wides) {
    wides.forEach(wide => {
        if (wide == 5) {
            var svg = '<svg height="' + wide + '" class="wide selected" px="' + wide + '"><line x1="0" y1="0" x2="100" y2="0" style="stroke:rgb(0,0,0);stroke-width:' + wide + '"/></svg>';
        } else {
            var svg = '<svg height="' + wide + '" class="wide" px="' + wide + '"><line x1="0" y1="0" x2="100" y2="0" style="stroke:rgb(0,0,0);stroke-width:' + wide + '"/></svg>';
        }
        $('#wides').append(svg);
    });
}

function resizeCanvas(canvas) {
    var width = $('.canvas-container').width();
    var height = $('.canvas-container').height();
    canvas.resize(width, height);
}