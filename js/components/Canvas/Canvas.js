export default class Canvas {
    constructor(id='canvas',
                width='200',
                height='200') {

        this._id = id;
        this._id_selector = '#' + this._id;
        this._element = '';
        this._width = width;
        this._height = height;
    }

    html() {
        return '<canvas id="' + this._id +
                     '" width="' + this._width +
                     '" height="' + this._height +
                     '"></canvas>';
    }

    ini(container) {
        container.html(this.html());
        this.element();
        return $(this._id_selector);
    }

    element() {
        this._element = $(this._id_selector)[0]
        return this._element;
    }

    mousePos(evt) {
        var rect = this._element.getBoundingClientRect();
        if (! isNaN(evt.clientX)) {
            return {
                    x: evt.clientX - rect.left,
                    y: evt.clientY - rect.top
                   };
        } else {
            return {
                x: evt.changedTouches[0].clientX - rect.left,
                y: evt.changedTouches[0].clientY - rect.top
               };
        }
    }

    resize(width, height) {
        if (Number.isInteger(width) && Number.isInteger(height)) {
            this._width = width;
            this._height = height;
    
            $(this._id_selector).attr('width', this._width);
            $(this._id_selector).attr('height', this._height);

            return [this._width, this._height];
        } else {
            throw 'Values must be numeric';
        }
    }
}