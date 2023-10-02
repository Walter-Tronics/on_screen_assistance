import { useState, useEffect } from "react";
import assistant from './assets/assistant.png'




// A function that returns a random number between min and max
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// A function that returns a random color in hex format
const getRandomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

// A function that returns a suitable text color for a given background color
const getTextColor = (bgColor) => {
  // Convert the hex color to RGB values
  let r = parseInt(bgColor.slice(1, 3), 16);
  let g = parseInt(bgColor.slice(3, 5), 16);
  let b = parseInt(bgColor.slice(5, 7), 16);

  // Calculate the luminance of the background color
  let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black or white depending on the luminance
  return luminance > 0.5 ? "#000000" : "#ffffff";
};

// A function that returns a random word related to the structure of a webpage
const getRandomWord = () => {
  // Define an array of possible words
  const words = [
    "Home",
    "About",
    "Contact",
    "Blog",
    "Portfolio",
    "Services",
    "Gallery",
    "FAQ",
    "Login",
    "Signup",
    "Search",
    "Menu",
    "Footer",
    "Header",
    "Logo",
    "Banner",
    "Sidebar",
    "Content",
    "Form",
    "Button",
    "Link",
    "Image",
    "Video",
    "Audio",
    "Text",
    "Title",
    "Subtitle",
    "List",
    "Table",
    "Chart",
    "Map",
    "Slider",
    "Modal",
    "Popup",
    "Alert",
    "Badge",
    "Card",
    "Carousel",
    "Dropdown",
    "Navbar",
    "Tab",
    "Tooltip"
  ];

  // Return a random word from the array
  return words[getRandomNumber(0, words.length - 1)];
};

// A function that returns a random text for a button with up to three words
const getRandomText = () => {
  // Define how many words to generate
  let numWords = getRandomNumber(1, 2);

  // Define an empty array to store the words
  let textArray = [];

  // Loop through the number of words
  for (let i = 0; i < numWords; i++) {
    // Generate a random word and push it to the array
    let word = getRandomWord();
    textArray.push(word);
  }

  // Return the array joined by spaces
  return textArray.join(" ");
};

// A function that checks if two buttons overlap
const isOverlapping = (b1, b2) => {
  return (
    b1.x < b2.x + b2.width &&
    b1.x + b1.width > b2.x &&
    b1.y < b2.y + b2.height &&
    b1.y + b1.height > b2.y
  );
};

// A functional component that generates an array of random buttons and renders them as absolute positioned elements
const App = () => {
  const [buttons, setButtons] = useState([]);
  
   // A state variable to store the position of the image element
   const [imgPos, setImgPos] = useState({ x: 0, y: window.innerHeight - 80});

   // A state variable to store the text of the clicked button
   const [imgText, setImgText] = useState("");

   // A function that handles the click event on a button and updates the image position and text
   const handleClick = (btn) => {
     setImgPos({ x: btn.x + btn.width / 2, y: btn.y + btn.height / 2 });
     setImgText(btn.text);
   };

   // A function that generates an array of random buttons
   const generateButtons = () => {
     // Get the viewport width and height
     const vw = window.innerWidth - 150;
     const vh = window.innerHeight;

     // Define an empty array to store the buttons
     const btnArray = [];

     // Define how many buttons to generate
     const numButtons = 6;

     // Define the button size
     const btnSize = 120;

     // Loop through the number of buttons
     for (let i = 0; i < numButtons; i++) {
       // Generate a random x and y value within the viewport
       let x = getRandomNumber(0, vw - btnSize);
       let y = getRandomNumber(0, vh - btnSize);

       // Generate a random color for the button background
       let bgColor = getRandomColor();

       // Generate a suitable color for the button text
       let textColor = getTextColor(bgColor);

       // Generate a random text for the button
       let text = getRandomText();

       // Create a button object with the position, size, color and text
       let btn = { x, y, width: btnSize, height: btnSize - (btnSize/2), bgColor, textColor, text };

       // Check if the button overlaps with any existing button in the array
       let overlapping = false;
       for (let j = 0; j < btnArray.length; j++) {
         if (isOverlapping(btn, btnArray[j])) {
           overlapping = true;
           break;
         }
       }

       // If the button does not overlap, push it to the array
       if (!overlapping) {
         btnArray.push(btn);
       } else {
         // If the button overlaps, decrement i to try again
         i--;
       }
     }

     // Set the state with the generated array
     setButtons(btnArray);
   };

   // Use an effect hook to call the generateButtons function once on mount
   useEffect(() => {
     generateButtons();
   }, []);

   return (
     <div>
       {buttons.map((btn, index) => (
         <button
           key={index}
           style={{
             position: "absolute",
             left: btn.x,
             top: btn.y,
             width: btn.width,
             height: btn.height,
             backgroundColor: btn.bgColor,
             color: btn.textColor,
           }}
           onClick={() => handleClick(btn)}
         >
           {btn.text}
         </button>
       ))}
        {/* An image element that looks like an assistant and moves to the position of the clicked button and displays with a badge having a background color the button text */}
        <div
          style={{
            position: "absolute",
            left: imgPos.x + 10,
            top: imgPos.y - 30,
            transition: "all 0.5s ease",
          }}
        >
          <img src={assistant} alt="assistant" width="100" height="100" />
          {/* A badge element that shows the button text with a background color */}
          <span
            style={{
              position: "absolute",
              right: "-90px",
              top: "-10px",
              backgroundColor: imgText ? buttons.find((btn) => btn.text === imgText).bgColor : "#ffffff",
              color: imgText ? buttons.find((btn) => btn.text === imgText).textColor : "#000000",
              padding: "5px",
              borderRadius: "5px",
              fontSize: "12px",
              fontWeight: "bold",
              
            }}
          >
            {(imgText ? `This button is a ${imgText}` : 'Hi, I am your assistant')}
          </span>
        </div>
     </div>
   );
 };

 export default App;
