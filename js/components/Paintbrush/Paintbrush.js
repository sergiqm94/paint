export default class Paintbrush {
    constructor() {

        this._drawing = false;
        this._color = '#000';
        this._wide = 5;
        this._stroke = [];
        this._history = [];
        this._history_pointer = 0;
    }

    changeColor(color) {
        var rgx_gba = /(^rgb\((\d+),\s*(\d+),\s*(\d+)\)$)|(^rgba\((\d+),\s*(\d+),\s*(\d+)(,\s*\d+\.\d+)*\)$)/i;
        var rgx_hexa = /^#[0-9a-f]{3}([0-9a-f]{3})?$/i;

        if (rgx_gba.test(color) || rgx_hexa.test(color)) {
            this._color = color;
        } else {
            throw 'This value ' + color + ' not is valid. Please insert a hexadecimal or rgba code.';
        }

        return true;
    }

    changeWide(wide) {
        this._wide = wide;
        return true;
    }

    isDrawing() {
        return this._drawing;
    }
    
    startDraw() {
        this._drawing = true;
    }
    stopDraw() {
        if (this.isDrawing()) {
            var action = {'stroke': this._stroke,
                          'color': this._color,
                          'wide': this._wide}
            this._history.push(action);
        }
        this._stroke = [];
        this._drawing = false;
    }

    draw(canvas, pos) {
        if (this.isDrawing()) {

            if (this._history_pointer < this._history.length - 1) {
                this._history = this._history.slice(0, this._history_pointer + 1);
            }
            this._stroke.push(pos);

            var context = canvas.getContext("2d");
            context.strokeStyle = this._color;
            context.lineWidth = this._wide;
                      
            for (var i=0; i < this._stroke.length; i++) {		
                context.beginPath();
                if (i && this._stroke[i]) {
                    context.moveTo(this._stroke[i-1].x, this._stroke[i-1].y);
                } else {
                    context.moveTo(this._stroke[i].x, this._stroke[i].y);
                }
                context.lineTo(this._stroke[i].x, this._stroke[i].y);
                context.closePath();
                context.stroke();
            }

            this._history_pointer = this._history.length;
        }
    }

    undo(canvas) {
        var context = canvas.getContext("2d");
        var history = this._history;
        var history_pointer = this._history_pointer;
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        if (history_pointer -1 >= -1) {
            history.forEach(function(action, indx) {
                if (indx <= history_pointer -1) {
                    for (var i=0; i < action.stroke.length - 1; i++) {
                        context.strokeStyle = action.color;
                        context.lineWidth = action.wide;
            
                        context.beginPath();
                        context.moveTo(action.stroke[i].x, action.stroke[i].y);
                        context.lineTo(action.stroke[i + 1].x, action.stroke[i + 1].y);
                        context.closePath();
                        context.stroke();
                    };
                } 
            });
    
            this._history_pointer--;
        } 
    }

    redo(canvas) {
        var context = canvas.getContext("2d");
        var action = this._history[this._history_pointer + 1];
        
        if (action) {
            for (var i=0; i < action.stroke.length - 1; i++) {
                context.strokeStyle = action.color;
                context.lineWidth = action.wide;

                context.beginPath();
                context.moveTo(action.stroke[i].x, action.stroke[i].y);
                context.lineTo(action.stroke[i + 1].x, action.stroke[i + 1].y);
                context.closePath();
                context.stroke();
            };
            
            this._history_pointer ++;
        } 
    }

    redraw(canvas) {
        var context = canvas.getContext("2d");
        var history = this._history;
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        history.forEach(function(action, indx) {
            for (var i=0; i < action.stroke.length - 1; i++) {
                context.strokeStyle = action.color;
                context.lineWidth = action.wide;
    
                context.beginPath();
                context.moveTo(action.stroke[i].x, action.stroke[i].y);
                context.lineTo(action.stroke[i + 1].x, action.stroke[i + 1].y);
                context.closePath();
                context.stroke();
            };
        });
    }

}

