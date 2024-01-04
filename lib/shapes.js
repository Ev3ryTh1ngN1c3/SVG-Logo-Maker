class Shape {
    // class Shape & 'color'
    constructor() {
        this.text = ''
        this.textColor = ''
        this.color = ''
    }
    setText(text) {
        this.text = text;
    }
    setTextColor(textColor) {
        this.textColor = textColor;
    }
    setColor(color) {
        this.color = color;
    }
}
// class Circle positioning size, & color 
class Circle extends Shape {
    render() {
        return `<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${this.color}">`
    }
}
// class Square positioning size, & color 
class Square extends Shape {
    render() {
        return `<rect x="50" height="200" width="200" fill="${this.color}">`
    }
}
// class Triangle positioning size, & color 
class Triangle extends Shape {
    render() {
        return `<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${this.color}">`
    }
};

module.exports = { Circle, Square, Triangle }


//     const shape = new Triangle();
// shape.setColor("blue");
// expect(shape.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="blue" />');