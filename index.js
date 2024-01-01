const filesystem = require('./node_modules/graceful-fs/graceful-fs')
const inquirer = require("inquirer");
const { Circle, Square, Triangle } = require("./lib/shapes");
// import the required modules & define the Svg class
const fs = require('graceful-fs');
const inquirer = require('inquirer');
const { Circle, Square, Triangle } = require('./lib/shapes');

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
            case 'circle':
                this.shape = new Circle();
                break;
            case 'square':
                this.shape = new Square();
                break;
            case 'triangle':
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

// array of questions using the inquirer library
const inquirer = require('inquirer');

const questions = [
    {
        type: 'input',
        name: 'text',
        message: 'Enter the text:',
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color:',
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color:',
    },
    {
        type: 'input',
        name: 'pixelImage',
        message: 'Enter the pixel image:',
    },
];

inquirer.prompt(questions)
    .then((answers) => {
        console.log(answers);
        // answers to save the SVG string or perform other operations
    })
    .catch((error) => {
        console.log(error);
    });


// write data to a file in Node.js
const fs = require('fs');

function writeDataToFile(filename, data) {
  fs.writeFile(filename, data, (error) => {
    if (error) {
      console.error('Error writing to file:', error);
    } else {
      console.log('Data written to file successfully!');
      console.log('Congratulations, you have generated a logo.svg!');
    }
  });
}

async function init() {
    console.log("Starting init");
    var svgString = "";
    var svg_file = "logo.svg";

    // prompt for answers
    const answers = await inquirer.prompt(questions);

    //text
    var user_text = "";
    if (answers.text.length > 0 && answers.text.length < 4) {
        // 1-3 chars, valid entry
        user_text = answers.text;
    } else {
        // 0 or 4+ chars, invalid entry
        console.log("Invalid entry. Enter 3 Characters");
        return;
    }
    console.log("User text: [" + user_text + "]");
    //font color
    user_font_color = answers["text-color"];
    console.log("User font color: [" + user_font_color + "]");
    //shape color
    user_shape_color = answers.shape;
    console.log("User shape color: [" + user_shape_color + "]");
    //shape type
    user_shape_type = answers["pixel-image"];
    console.log("User entered shape = [" + user_shape_type + "]");

    //shape
    let user_shape;
    if (user_shape_type === "Square" || user_shape_type === "square") {
        user_shape = new Square();
        console.log("User selected Square shape");
    }
    else if (user_shape_type === "Circle" || user_shape_type === "circle") {
        user_shape = new Circle();
        console.log("User selected Circle shape");
    }
    else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
        user_shape = new Triangle();
        console.log("User selected Triangle shape");
    }
    else {
        console.log("Invalid shape!");
    }
    user_shape.setColor(user_shape_color);

    // create a new Svg adding shape & text elements based on the user's answers
    var svg = new Svg();
    svg.setTextElement(user_text, user_font_color);
    svg.setShapeElement(user_shape);
    svgString = svg.render();

    //display shape
    console.log("Displaying shape:\n\n" + svgString);


    console.log("Shape generation complete!");
    console.log("Writing shape to file...");
    writeToFile(svg_file, svgString);
}
init()