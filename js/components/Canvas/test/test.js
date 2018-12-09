import Canvas from '../Canvas.js';

var assert = chai.assert;

describe('Canvas', function() {

  describe('resize()', function() {
    it('resize the canvas', function() {
        var $body = $('body');
        var canvas = new Canvas();
        var width = 500;
        var height = 600;
        var result = [width, height];

        $body.append('<div class="canvas-container"></div>');
        canvas.ini($('.canvas-container'));

        assert.equal(toString(canvas.resize(width, height)), toString(result));
    });
  });

});