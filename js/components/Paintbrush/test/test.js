import Paintbrush from '../Paintbrush.js';

var assert = chai.assert;

describe('Paintbrush', function() {

  describe('changeColor()', function() {
    it('not change color if is not valid', function() {
        var paintbrush = new Paintbrush();
        var color = 'asdfljk';
        try {
            paintbrush.changeColor(color);
        } catch (error) {}

        assert.notEqual(paintbrush._color, color);
    });

    it('set a valid color rgb', function() {
        var paintbrush = new Paintbrush();
        var color = 'rgb(255, 200, 30)';
        paintbrush.changeColor(color);

        assert.equal(paintbrush._color, color);
    });

    it('set a valid rgba color', function() {
        var paintbrush = new Paintbrush();
        var color = 'rgba(255, 200, 30, 0.8)';
        paintbrush.changeColor(color);

        assert.equal(paintbrush._color, color);
    });

    it('set a valid hexadecimal color', function() {
        var paintbrush = new Paintbrush();
        var color = '#fff';
        paintbrush.changeColor(color);

        assert.equal(paintbrush._color, color);
    });
  });

  describe('changeWide()', function() {
    it('change the wide of line', function() {
        var paintbrush = new Paintbrush();
        var wide = 15;
        try {
            paintbrush.changeWide(wide);
        } catch (error) {}

        assert.equal(paintbrush._wide, wide);
    });
  });

});