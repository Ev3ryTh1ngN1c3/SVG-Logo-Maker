//const filesystem = require('./node_modules/graceful-fs/graceful-fs')
const fs = require('fs');
const inquirer = require("inquirer");
const { Circle, Square, Triangle } = require("./lib/shapes");
// import the required modules & define the Svg class
const Svg = require('./lib/svg')
// const inquirer = require('inquirer');


// array of questions using the inquirer library

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
        type: 'list',
        name: 'shape',
        message: 'Select a shape:',
        choices: ['Circle', 'Triangle', 'Square']
    },
];

// inquirer.prompt(questions)
//     .then((answers) => {
//         console.log(answers);
//         // answers to save the SVG string or perform other operations
//     })
//     .catch((error) => {
//         console.log(error);
//     });


function writeToFile(filename, data) {
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
   // var svgString = "";
    var svg_file = "logo.svg";

    // prompt for answers
    const answers = await inquirer.prompt(questions);

    console.log(answers);

    //text
    var user_text = "";
    var user_font_color = "";
    var user_shape_color = "";
    var user_shape_type = "";

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
    user_font_color = answers.textColor;
    console.log("User font color: [" + user_font_color + "]");
    //shape color
    user_shape_color = answers.shapeColor;
    console.log("User shape color: [" + user_shape_color + "]");
    //shape type
    user_shape_type = answers.shape;
    console.log("User entered shape = [" + user_shape_type + "]");
    
    // create a new Svg adding shape & text elements based on the user's answers
    // var svg = new Svg();
    // svg.setText(user_text);
    // svg.setShape(user_shape_type);
    // svgString = svg.render();

    //shape
    let user_shape;
    if (user_shape_type === "Square") {
        user_shape = new Square();
        console.log("User selected Square shape");
    }
    else if (user_shape_type === "Circle") {
        user_shape = new Circle();
        console.log("User selected Circle shape");
    }
    else if (user_shape_type === "Triangle") {
        user_shape = new Triangle();
        console.log("User selected Triangle shape");
    }
    else {
        console.log("Invalid shape!");
    }

   user_shape.setText(user_text);
   user_shape.setTextColor(user_font_color);
   user_shape.setColor(user_shape_color);

//  let svgString = `<svg width="400" height="400">
//  ${user_shape.render()}
//  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill='${user_shape.textColor}'>${user_shape.text}</text>
// </svg>`

let svgString = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>`
 
    //display shape
    console.log("Displaying shape:\n\n" + svgString);


    console.log("Shape generation complete!");
    console.log("Writing shape to file...");
    writeToFile(svg_file, svgString);
}

init()