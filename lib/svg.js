const { Circle, Square, Triangle } = require('./shapes');

class Svg {
    constructor() {
        this.text = '';
        this.shape = null;
    }

    setText(text) {
        this.text = text;
    }

    setShape(shape) {
        switch (shape) {
            case 'Circle':
                this.shape = new Circle();
                break;
            case 'Square':
                this.shape = new Square();
                break;
            case 'Triangle':
                this.shape = new Triangle();
                break;
            default:
                console.log('Invalid shape');
                break;
        }
    }

    render() {
        if (!this.shape) {
            console.log('No shape selected');
            return;
        }

        const svgString = `<svg width="400" height="400">
      ${this.shape.render()}
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">${this.text}</text>
    </svg>`;

        console.log(svgString);
    }
}

module.exports = Svg;