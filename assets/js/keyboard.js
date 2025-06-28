// Global variables to store current key styles
let currentKeyColor = '#FFD700'; // Default gold - This will be overridden
let currentKeyFont = 'Arial'; // Default font - This will be overridden if font is in JSON

// Track last clicked buttons for color and font to manage active state
let lastClickedColorButton = null;
let lastClickedFontButton = null;

// JSON configuration for the keyboard layout
const keyboardConfig = {
  "keys": [
    {"text": "Q", "code": "KeyQ", "xposition": 0, "yposition": 0, "color": "#E0E0E0", "font": "Arial"}, // Added font property for demonstration
    {"text": "W", "code": "KeyW", "xposition": 1, "yposition": 0, "color": "#E0E0E0", "font": "Arial"},
    {"text": "E", "code": "KeyE", "xposition": 2, "yposition": 0, "color": "#E0E0E0", "font": "Arial"},
    {"text": "R", "code": "KeyR", "xposition": 3, "yposition": 0, "color": "#E0E0E0", "font": "Arial"},
    {"text": "T", "code": "KeyT", "xposition": 4, "yposition": 0, "color": "#E0E0E0", "font": "Arial"},
    {"text": "Y", "code": "KeyY", "xposition": 5, "yposition": 0, "color": "#E0E0E0", "font": "Arial"},
    {"text": "U", "code": "KeyU", "xposition": 6, "yposition": 0, "color": "#E0E0E0", "font": "Arial"},
    {"text": "I", "code": "KeyI", "xposition": 7, "yposition": 0, "color": "#E0E0E0", "font": "Arial"},
    {"text": "O", "code": "KeyO", "xposition": 8, "yposition": 0, "color": "#E0E0E0", "font": "Arial"},
    {"text": "P", "code": "KeyP", "xposition": 9, "yposition": 0, "color": "#E0E0E0", "font": "Arial"},

    {"text": "A", "code": "KeyA", "xposition": 0.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial"},
    {"text": "S", "code": "KeyS", "xposition": 1.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial"},
    {"text": "D", "code": "KeyD", "xposition": 2.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial"},
    {"text": "F", "code": "KeyF", "xposition": 3.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial"},
    {"text": "G", "code": "KeyG", "xposition": 4.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial"},
    {"text": "H", "code": "KeyH", "xposition": 5.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial"},
    {"text": "J", "code": "KeyJ", "xposition": 6.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial"},
    {"text": "K", "code": "KeyK", "xposition": 7.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial"},
    {"text": "L", "code": "KeyL", "xposition": 8.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial"},

    {"text": "Shift", "code": "ShiftLeft", "xposition": 0, "yposition": 2, "color": "#C0C0C0", "widthClass": "key-large", "font": "Arial"},
    {"text": "Z", "code": "KeyZ", "xposition": 1.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial"},
    {"text": "X", "code": "KeyX", "xposition": 2.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial"},
    {"text": "C", "code": "KeyC", "xposition": 3.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial"},
    {"text": "V", "code": "KeyV", "xposition": 4.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial"},
    {"text": "B", "code": "KeyB", "xposition": 5.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial"},
    {"text": "N", "code": "KeyN", "xposition": 6.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial"},
    {"text": "M", "code": "KeyM", "xposition": 7.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial"},
    {"text": "Shift", "code": "ShiftRight", "xposition": 9, "yposition": 2, "color": "#C0C0C0", "widthClass": "key-large", "font": "Arial"},

    {"text": "Ctrl", "code": "ControlLeft", "xposition": 0, "yposition": 3, "color": "#C0C0C0", "widthClass": "key-medium", "font": "Arial"},
    {"text": "Alt", "code": "AltLeft", "xposition": 1.5, "yposition": 3, "color": "#C0C0C0", "widthClass": "key-medium", "font": "Arial"},
    {"text": "Space", "code": "Space", "xposition": 4, "yposition": 3, "color": "#E0E0E0", "widthClass": "key-extra-large", "font": "Arial"},
    {"text": "Alt", "code": "AltRight", "xposition": 6.5, "yposition": 3, "color": "#C0C0C0", "widthClass": "key-medium", "font": "Arial"},
    {"text": "Ctrl", "code": "ControlRight", "xposition": 8, "yposition": 3, "color": "#C0C0C0", "widthClass": "key-medium", "font": "Arial"}
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

// Placeholder for brush/update functions - ensure they are defined if used elsewhere
let brush;
let aspect1;
let aspect2;
let myJSON = {"myObject": {}}; // Define myJSON if it's used globally
let selectedkey;

function setbrush(brsh, aspct1, aspct2) {
    brush = brsh;
    aspect1 = aspct1;
    aspect2 = aspct2;
}

function update(clickedkey){
    if(aspect2 == "none") {
        if (myJSON["myObject"][clickedkey]) { // Check if key exists
            myJSON["myObject"][clickedkey][aspect1] = brush;
        } else {
            myJSON["myObject"][clickedkey] = {[aspect1]: brush}; // Create new key object if it doesn't exist
        }
    } else {
        if (myJSON["myObject"][clickedkey] && myJSON["myObject"][clickedkey][aspect1]) { // Check nested properties
            myJSON["myObject"][clickedkey][aspect1][aspect2] = brush;
        } else if (myJSON["myObject"][clickedkey]) { // Create nested property if it doesn't exist
            myJSON["myObject"][clickedkey][aspect1] = {[aspect2]: brush};
        } else { // Create both key and nested property
            myJSON["myObject"][clickedkey] = {[aspect1]: {[aspect2]: brush}};
        }
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
    if (clickedColorButton) { // Only apply border if a button was clicked (not null from initial setup)
        clickedColorButton.style.border = '2px solid black';
        lastClickedColorButton = clickedColorButton;
    }
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
    if (clickedFontButton) { // Only apply border if a button was clicked (not null from initial setup)
        clickedFontButton.style.border = '2px solid black';
        lastClickedFontButton = clickedFontButton;
    }
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

    // --- NEW: Set currentKeyColor and currentKeyFont from JSON ---
    if (keyboardConfig.keys.length > 0) {
        const firstKey = keyboardConfig.keys[0];

        // Set initial currentKeyColor from the first key in JSON
        if (firstKey.color) {
            currentKeyColor = firstKey.color;
            // Also try to find and "activate" the corresponding color button
            const defaultColorButton = document.querySelector(`.color-button[onclick*="${firstKey.color.toUpperCase()}"]`);
            if (defaultColorButton) {
                // We call applyKeyColor but pass null for clickedColorButton initially
                // because we just want to set the color, not mark a button as clicked yet.
                // The applyKeyColor itself will handle setting lastClickedColorButton.
                window.applyKeyColor(firstKey.color, defaultColorButton);
            } else {
                // If no matching button, just set the color globally
                generateKeyboardPreview(); // Re-render with the default color
            }
        }

        // Set initial currentKeyFont from the first key in JSON (if it exists)
        if (firstKey.font) {
            currentKeyFont = firstKey.font;
            // Also try to find and "activate" the corresponding font button
            const defaultFontButton = document.querySelector(`.font-button[onclick*="${firstKey.font}"]`);
            if (defaultFontButton) {
                // Similar to color, pass null for clickedFontButton initially
                window.applyKeyFont(firstKey.font, defaultFontButton);
            } else {
                // If no matching button, just set the font globally
                generateKeyboardPreview(); // Re-render with the default font
            }
        }
    }

    // Ensure generateKeyboardPreview is called after initial setup
    generateKeyboardPreview();
});
