// Global variables to store current key styles
let currentKeyColor = '#FFD700'; // Default gold
let currentKeyFont = 'Arial'; // Default font

// Track last clicked buttons for color and font to manage active state
let lastClickedColorButton = null;
let lastClickedFontButton = null;

// JSON configuration for the keyboard layout
const keyboardConfig = {
  "keys": [
    {"text": "Q", "code": "KeyQ", "xposition": 0, "yposition": 0, "color": "#E0E0E0"},
    {"text": "W", "code": "KeyW", "xposition": 1, "yposition": 0, "color": "#E0E0E0"},
    {"text": "E", "code": "KeyE", "xposition": 2, "yposition": 0, "color": "#E0E0E0"},
    {"text": "R", "code": "KeyR", "xposition": 3, "yposition": 0, "color": "#E0E0E0"},
    {"text": "T", "code": "KeyT", "xposition": 4, "yposition": 0, "color": "#E0E0E0"},
    {"text": "Y", "code": "KeyY", "xposition": 5, "yposition": 0, "color": "#E0E0E0"},
    {"text": "U", "code": "KeyU", "xposition": 6, "yposition": 0, "color": "#E0E0E0"},
    {"text": "I", "code": "KeyI", "xposition": 7, "yposition": 0, "color": "#E0E0E0"},
    {"text": "O", "code": "KeyO", "xposition": 8, "yposition": 0, "color": "#E0E0E0"},
    {"text": "P", "code": "KeyP", "xposition": 9, "yposition": 0, "color": "#E0E0E0"},

    {"text": "A", "code": "KeyA", "xposition": 0.5, "yposition": 1, "color": "#E0E0E0"},
    {"text": "S", "code": "KeyS", "xposition": 1.5, "yposition": 1, "color": "#E0E0E0"},
    {"text": "D", "code": "KeyD", "xposition": 2.5, "yposition": 1, "color": "#E0E0E0"},
    {"text": "F", "code": "KeyF", "xposition": 3.5, "yposition": 1, "color": "#E0E0E0"},
    {"text": "G", "code": "KeyG", "xposition": 4.5, "yposition": 1, "color": "#E0E0E0"},
    {"text": "H", "code": "KeyH", "xposition": 5.5, "yposition": 1, "color": "#E0E0E0"},
    {"text": "J", "code": "KeyJ", "xposition": 6.5, "yposition": 1, "color": "#E0E0E0"},
    {"text": "K", "code": "KeyK", "xposition": 7.5, "yposition": 1, "color": "#E0E0E0"},
    {"text": "L", "code": "KeyL", "xposition": 8.5, "yposition": 1, "color": "#E0E0E0"},

    {"text": "Shift", "code": "ShiftLeft", "xposition": 0, "yposition": 2, "color": "#C0C0C0", "widthClass": "key-large"},
    {"text": "Z", "code": "KeyZ", "xposition": 1.5, "yposition": 2, "color": "#E0E0E0"},
    {"text": "X", "code": "KeyX", "xposition": 2.5, "yposition": 2, "color": "#E0E0E0"},
    {"text": "C", "code": "KeyC", "xposition": 3.5, "yposition": 2, "color": "#E0E0E0"},
    {"text": "V", "code": "KeyV", "xposition": 4.5, "yposition": 2, "color": "#E0E0E0"},
    {"text": "B", "code": "KeyB", "xposition": 5.5, "yposition": 2, "color": "#E0E0E0"},
    {"text": "N", "code": "KeyN", "xposition": 6.5, "yposition": 2, "color": "#E0E0E0"},
    {"text": "M", "code": "KeyM", "xposition": 7.5, "yposition": 2, "color": "#E0E0E0"},
    {"text": "Shift", "code": "ShiftRight", "xposition": 9, "yposition": 2, "color": "#C0C0C0", "widthClass": "key-large"},

    {"text": "Ctrl", "code": "ControlLeft", "xposition": 0, "yposition": 3, "color": "#C0C0C0", "widthClass": "key-medium"},
    {"text": "Alt", "code": "AltLeft", "xposition": 1.5, "yposition": 3, "color": "#C0C0C0", "widthClass": "key-medium"},
    {"text": "Space", "code": "Space", "xposition": 4, "yposition": 3, "color": "#E0E0E0", "widthClass": "key-extra-large"},
    {"text": "Alt", "code": "AltRight", "xposition": 6.5, "yposition": 3, "color": "#C0C0C0", "widthClass": "key-medium"},
    {"text": "Ctrl", "code": "ControlRight", "xposition": 8, "yposition": 3, "color": "#C0C0C0", "widthClass": "key-medium"}
  ]
};

const KEY_SIZE = 60; // Approximate size of a key (width and height) in pixels
const KEY_GAP = 8; // Gap between keys in pixels

/**
 * Generates and renders the keyboard preview based on the current configuration.
 */
function generateKeyboardPreview() {
    const keyboardContainer = document.getElementById('keyboardPreview');
    keyboardContainer.innerHTML = ''; // Clear existing keyboard

    // Set container to relative positioning to allow absolute positioning of keys
    keyboardContainer.style.position = 'relative';
    keyboardContainer.style.width = 'fit-content'; // Or a fixed width that accommodates all keys
    keyboardContainer.style.height = 'fit-content'; // Or a fixed height

    keyboardConfig.keys.forEach(keyConfig => {
        const keyButton = document.createElement('button');
        keyButton.textContent = keyConfig.text;
        keyButton.className = 'keyboard-key'; // Apply base key styling

        // Apply dynamic styles from current state
        keyButton.style.backgroundColor = currentKeyColor;
        keyButton.style.fontFamily = currentKeyFont;
        keyButton.style.color = getContrastColor(currentKeyColor); // Ensure text is readable

        // Apply specific width for certain keys (e.g., Shift, Space)
        if (keyConfig.widthClass) {
            keyButton.classList.add(keyConfig.widthClass);
        }

        // Position the key using xposition and yposition
        keyButton.style.position = 'absolute';
        keyButton.style.left = `${keyConfig.xposition * (KEY_SIZE + KEY_GAP)}px`;
        keyButton.style.top = `${keyConfig.yposition * (KEY_SIZE + KEY_GAP)}px`;

        keyboardContainer.appendChild(keyButton);
    });
}


function setbrush(brsh, aspct1, aspct2) {
brush = brsh;
aspect1 = aspct1;
aspect2 = aspct2;
}
function update(clickedkey){
    if(aspect2 == "none")
    {
    myJSON["myObject"][clickedkey][aspect1] = brush;
    }
    else{
    myJSON["myObject"][clickedkey][aspect1][aspect2] = brush;
    }
        selectedkey = clickedkey;
}

/**
 * Determines a contrasting color for text based on a background color.
 * @param {string} hexcolor The hex color string (e.g., "#RRGGBB").
 * @returns {string} "black" or "white" for optimal contrast.
 */
function getContrastColor(hexcolor) {
    // If a button is clicked, its border changes to black. If the button color is also black, it's not visible.
    // So if currentKeyColor is black, return white, otherwise black.
    if (hexcolor.toLowerCase() === "#000000" || hexcolor.toLowerCase() === "black") {
        return "white";
    }
    // Convert hex to RGB
    const r = parseInt(hexcolor.substr(1, 2), 16);
    const g = parseInt(hexcolor.substr(3, 2), 16);
    const b = parseInt(hexcolor.substr(5, 2), 16);

    // Calculate luminance (Y = 0.2126*R + 0.7152*G + 0.0722*B)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Use white for dark backgrounds, black for light backgrounds
    return luminance > 0.5 ? 'black' : 'white';
}

/**
 * Handles tab switching (Style, Feel, Profile).
 * @param {string} optionType The ID prefix of the section to show (e.g., 'keystyle', 'feel').
 * @param {HTMLElement} clickedButton The button element that was clicked.
 */
window.showOptions = function(optionType, clickedButton) {
    // Remove 'active' class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Add 'active' class to the clicked button
    clickedButton.classList.add('active');

    // Hide all option sections
    const sections = document.querySelectorAll('.option-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected option section
    document.getElementById(optionType + 'Options').style.display = 'block';
}

/**
 * Applies the selected color to the keyboard keys.
 * @param {string} color The hex color string (e.g., '#FF5733').
 * @param {HTMLElement} clickedColorButton The button element that was clicked.
 */
window.applyKeyColor = function(color, clickedColorButton) {
    // Reset style of the previously clicked color button, if any
    if (lastClickedColorButton) {
        lastClickedColorButton.style.border = 'none';
    }

    currentKeyColor = color; // Update global state
    generateKeyboardPreview(); // Re-render keyboard with new color

    // Apply a distinct style to the newly clicked color button
    clickedColorButton.style.border = '2px solid black';
    lastClickedColorButton = clickedColorButton;
}

/**
 * Applies the selected font to the keyboard keys.
 * @param {string} fontName The font family name (e.g., 'Arial').
 * @param {HTMLElement} clickedFontButton The button element that was clicked.
 */
window.applyKeyFont = function(fontName, clickedFontButton) {
    // Reset style of the previously clicked font button, if any
    if (lastClickedFontButton) {
        lastClickedFontButton.style.border = 'none';
    }

    currentKeyFont = fontName; // Update global state
    generateKeyboardPreview(); // Re-render keyboard with new font

    // Apply a distinct style to the newly clicked font button
    clickedFontButton.style.border = '2px solid black';
    lastClickedFontButton = clickedFontButton;
}


window.applyFeel = function() {
    const selectedFeel = document.getElementById('feelSelect').value;
    alert(`Applying "${selectedFeel}" feel!`);
    // Implement logic to change the page's "feel" (e.g., font, subtle animations, etc.)
}

window.loadProfile = function() {
    const selectedProfile = document.getElementById('profileSelect').value;
    alert(`Loading ${selectedProfile} settings!`);
    // Here you would implement logic to load specific settings based on the selected profile.
    // This could involve changing CSS classes, updating content, etc.
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Show 'keystyle' options by default and mark its button as active
    window.showOptions('keystyle', document.getElementById('keystyleButton'));

    // Set initial active state for default key color button
    const defaultColorButton = document.querySelector('.color-button[onclick*="#FFD700"]');
    if (defaultColorButton) {
        window.applyKeyColor('#FFD700', defaultColorButton); // Call the function to set state and style
    }

    // Set initial active state for default key font button
    const defaultFontButton = document.querySelector('.font-button[onclick*="Arial"]');
    if (defaultFontButton) {
        window.applyKeyFont('Arial', defaultFontButton); // Call the function to set state and style
    }

    // Generate initial keyboard preview
    generateKeyboardPreview();
});
