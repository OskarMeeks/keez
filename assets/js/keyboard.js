// Global variables to store current key styles
let currentKeyColor = '#FFD700'; // Default gold - This will be overridden
let currentKeyFont = 'Arial'; // Default font - This will be overridden if font is in JSON

// Track last clicked buttons for color and font to manage active state
let lastClickedColorButton = null;
let lastClickedFontButton = null;

// --- NEW GLOBAL BRUSH VARIABLES ---
let currentBrushProperty = ''; // Stores the CSS property to change (e.g., 'backgroundColor', 'fontFamily')
let currentBrushValue = '';    // Stores the value to apply (e.g., '#FF0000', 'Verdana')
let selectedKeyElement = null; // Stores the DOM element of the currently selected key


// JSON configuration for the keyboard layout
const keyboardConfig = {
    "keys": [
        {"text": "Q", "code": "KeyQ", "xposition": 0, "yposition": 0, "color": "#000", "font": "Arial"}, // Added font property for demonstration
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
        // Store the key's unique code to easily find and update its JSON later
        keyButton.dataset.keyCode = keyConfig.code;


        // Apply background color from the key's JSON property, or fall back to currentKeyColor if not defined
        keyButton.style.backgroundColor = keyConfig.color || currentKeyColor;
        // Apply font from the key's JSON property, or fall back to currentKeyFont if not defined
        keyButton.style.fontFamily = keyConfig.font || currentKeyFont;

        // Ensure text is readable based on the key's *actual* background color
        keyButton.style.color = getContrastColor(keyButton.style.backgroundColor);

        // Apply specific width for certain keys (e.g., Shift, Space)
        if (keyConfig.widthClass) {
            keyButton.classList.add(keyConfig.widthClass);
        }

        // Position the key using xposition and yposition
        keyButton.style.position = 'absolute';
        keyButton.style.left = `${keyConfig.xposition * (KEY_SIZE + KEY_GAP)}px`;
        keyButton.style.top = `${keyConfig.yposition * (KEY_SIZE + KEY_GAP)}px`;

        // --- NEW: Add event listener for clicking individual keys ---
        keyButton.addEventListener('click', () => {
            applyBrushToKey(keyButton.dataset.keyCode);
        });

        keyboardContainer.appendChild(keyButton);
    });
}

/**
 * Determines a contrasting color for text based on a background color.
 * @param {string} hexcolor The hex color string (e.g., "#RRGGBB").
 * @returns {string} "black" or "white" for optimal contrast.
 */
function getContrastColor(hexcolor) {
    if (!hexcolor) return 'black'; // Handle cases where color might be undefined

    // If a button is clicked, its border changes to black. If the button color is also black, it's not visible.
    // So if the background color is black, return white, otherwise use luminance.
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
    return
