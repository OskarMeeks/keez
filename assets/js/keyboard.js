// Global variables to store current key styles
let currentKeyColor = '#FFD700'; // Default gold - This will be overridden
let currentKeyFont = 'Arial'; // Default font - This will be overridden if font is in JSON

// Track last clicked buttons for color and font to manage active state
let lastClickedColorButton = null;
let lastClickedFontButton = null;

// --- NEW GLOBAL BRUSH VARIABLES ---
let currentBrushProperty = ''; // Stores the CSS property to change (e.g., 'backgroundColor', 'fontFamily')
let currentBrushValue = '';    // Stores the value to apply (e.g., '#FF0000', 'Verdana')

// Declare keyboardConfig as a mutable variable, it will be populated by the fetch call
let keyboardConfig = {};

const KEY_SIZE = 60; // Standard key width/height in pixels
const KEY_GAP = 8; // Gap between keys in pixels (used for visual spacing in positions)
const IMAGE10 = 'images/keycap.png'; // Path to your 1u keycap image
const IMAGE15 = 'images/1.5.png'; // Path to your 1.5u keycap image

/**
 * Generates and renders the keyboard preview based on the current configuration.
 */
function generateKeyboardPreview() {
    const keyboardContainer = document.getElementById('keyboardPreview');
    keyboardContainer.innerHTML = ''; // Clear existing keyboard

    // Set container to relative positioning to allow absolute positioning of keys
    keyboardContainer.style.position = 'relative';

    // Calculate max X and Y to determine the container's required size
    let maxX = 0;
    let maxY = 0;

    // Check if keyboardConfig.keys is loaded
    if (!keyboardConfig.keys || keyboardConfig.keys.length === 0) {
        console.warn("Keyboard configuration not loaded yet or is empty.");
        return;
    }

    keyboardConfig.keys.forEach(keyConfig => {
        const keyButton = document.createElement('button');
        // Now, keyConfig.text is replaced by keyConfig.texts[0].value for the primary display
        keyButton.textContent = keyConfig.texts[0].value; // Display the primary text
        keyButton.className = 'keyboard-key'; // Apply base key styling
        keyButton.dataset.keyCode = keyConfig.code;

        // --- Set background image based on widthRatio ---
        let imageUrl;
        if (keyConfig.widthRatio === 1) {
            imageUrl = IMAGE10;
        } else if (keyConfig.widthRatio === 1.5) {
            imageUrl = IMAGE15;
        } else {
            // Default for other ratios like 2, 2.25, 2.75, 6.25
            imageUrl = IMAGE10;
        }
        keyButton.style.backgroundImage = `url(${imageUrl})`;
        keyButton.style.backgroundSize = 'cover'; // Ensure image covers the key
        keyButton.style.backgroundPosition = 'center'; // Center the image

        // --- Apply color filter to the image ---
        // We make the button background transparent so the filtered image is visible.
        keyButton.style.backgroundColor = 'transparent';
        // Use the color from the first text object for the keycap color
        if (keyConfig.texts[0].color) {
            keyButton.style.filter = `
                sepia(100%)
                saturate(200%)
                brightness(70%)
                hue-rotate(${getHueRotateDegree(keyConfig.texts[0].color)}deg)
            `;
        } else {
            keyButton.style.filter = 'none'; // No filter if no color is set
        }

        // Apply font and color from the primary text object
        keyButton.style.fontFamily = keyConfig.texts[0].font || currentKeyFont;
        keyButton.style.color = getContrastColor(keyConfig.texts[0].color || currentKeyColor);

        // --- Apply width and height based on KEY_SIZE and widthRatio ---
        const actualKeyWidth = (keyConfig.widthRatio * KEY_SIZE);
        keyButton.style.width = `${actualKeyWidth}px`;
        keyButton.style.height = `${KEY_SIZE}px`; // Height is always KEY_SIZE

        // Position the key using xposition and yposition
        keyButton.style.position = 'absolute';
        // Add KEY_GAP to positioning for visual spacing
        keyButton.style.left = `${keyConfig.xposition * (KEY_SIZE + KEY_GAP)}px`;
        keyButton.style.top = `${keyConfig.yposition * (KEY_SIZE + KEY_GAP)}px`;

        // Update max dimensions for container sizing
        maxX = Math.max(maxX, keyConfig.xposition * (KEY_SIZE + KEY_GAP) + actualKeyWidth);
        maxY = Math.max(maxY, keyConfig.yposition * (KEY_SIZE + KEY_GAP) + KEY_SIZE);

        // Styling for padding and border as previously fixed in CSS
        keyButton.style.padding = '0px';
        keyButton.style.border = '0px';

        keyButton.addEventListener('click', () => {
            applyBrushToKey(keyButton.dataset.keyCode);
        });

        keyboardContainer.appendChild(keyButton);
    });

    // Set container dimensions
    // keyboardContainer.style.width = `${maxX + KEY_GAP}px`; // Add gap for last column
    // keyboardContainer.style.height = `${maxY + KEY_GAP}px`; // Add gap for last row
}

/**
 * Calculates a contrasting color (black or white) for given hex background.
 * @param {string} hexcolor The hex color string (e.g., '#RRGGBB').
 * @returns {string} 'black' or 'white'.
 */
function getContrastColor(hexcolor) {
    if (!hexcolor) return 'black';

    // Handle cases where color might be a CSS color name or malformed
    if (!hexcolor.startsWith('#') || hexcolor.length !== 7) {
        // Try to convert well-known names or default
        if (hexcolor.toLowerCase() === "black") return "white";
        if (hexcolor.toLowerCase() === "white") return "black";
        // Fallback if not a hex or known name
        return 'black';
    }

    const r = parseInt(hexcolor.substr(1, 2), 16);
    const g = parseInt(hexcolor.substr(3, 2), 16);
    const b = parseInt(hexcolor.substr(5, 2), 16);

    // Calculate luminance (Y = 0.2126*R + 0.7152*G + 0.0722*B)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Use white for dark backgrounds, black for light backgrounds
    return luminance > 0.5 ? 'black' : 'white';
}

/**
 * Helper function to get a rough hue-rotate degree from a hex color.
 * This function converts hex to HSL (Hue, Saturation, Lightness) and returns the Hue.
 * It's an approximation for filter usage.
 * @param {string} hexcolor The hex color string (e.g., '#RRGGBB').
 * @returns {number} Hue degree (0-360).
 */
function getHueRotateDegree(hexcolor) {
    if (!hexcolor || hexcolor.length !== 7) return 0;

    const r = parseInt(hexcolor.substring(1, 3), 16) / 255;
    const g = parseInt(hexcolor.substring(3, 5), 16) / 255;
    const b = parseInt(hexcolor.substring(5, 7), 16) / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h = 0;
    let delta = max - min;

    if (delta === 0) h = 0; // achromatic
    else if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    if (h < 0) h += 360;

    return h;
}

/**
 * Sets the global brush to be applied to keys.
 * @param {string} property The CSS property to change (e.g., 'backgroundColor', 'fontFamily').
 * @param {string} value The value to set the property to (e.g., '#FF0000', 'Verdana').
 */
window.setBrush = function(property, value) {
    currentBrushProperty = property;
    currentBrushValue = value;
    console.log(`Brush set to: Property=${currentBrushProperty}, Value=${currentBrushValue}`);
};

/**
 * Applies the current brush to a specific key identified by its code.
 * Updates the JSON and regenerates the keyboard preview.
 * @param {string} keyCode The 'code' property of the key to update.
 */
function applyBrushToKey(keyCode) {
    if (!currentBrushProperty || !currentBrushValue) {
        console.warn("No brush property or value set. Select a color or font first!");
        return;
    }

    const keyToUpdate = keyboardConfig.keys.find(key => key.code === keyCode);

    if (keyToUpdate) {
        // Update the key's first text object's properties in the JSON configuration
        if (currentBrushProperty === 'backgroundColor') {
            keyToUpdate.texts[0].color = currentBrushValue;
        } else if (currentBrushProperty === 'fontFamily') {
            keyToUpdate.texts[0].font = currentBrushValue;
        }

        console.log(`Applied ${currentBrushValue} to ${currentBrushProperty} of key: ${keyToUpdate.texts[0].value}`);
        generateKeyboardPreview(); // Re-render the keyboard to show the change
    } else {
        console.error(`Key with code ${keyCode} not found in configuration.`);
    }
}

/**
 * Handles tab switching (Style, Feel, Profile).
 * @param {string} optionType The ID prefix of the section to show (e.g., 'keystyle', 'feel').
 * @param {HTMLElement} clickedButton The button element that was clicked.
 */
window.showOptions = function(optionType, clickedButton) {
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    clickedButton.classList.add('active');

    const sections = document.querySelectorAll('.option-section');
    sections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(optionType + 'Options').style.display = 'block';
}

/**
 * Applies the selected color to the keyboard keys. This now primarily sets the brush.
 * @param {string} color The hex color string (e.g., '#FF5733').
 * @param {HTMLElement} clickedColorButton The button element that was clicked.
 */
window.applyKeyColor = function(color, clickedColorButton) {
    // Remove 'active' class from previously clicked color button
    if (lastClickedColorButton) {
        lastClickedColorButton.classList.remove('active');
    }

    setBrush('backgroundColor', color); // Set the brush for background color

    // Add 'active' class to the newly clicked button
    if (clickedColorButton) {
        clickedColorButton.classList.add('active');
        lastClickedColorButton = clickedColorButton;
    }
    // No need to call generateKeyboardPreview here; it's called when a key is clicked
};

/**
 * Applies the selected font to the keyboard keys. This now primarily sets the brush.
 * @param {string} fontName The font family name (e.g., 'Arial').
 * @param {HTMLElement} clickedFontButton The button element that was clicked.
 */
window.applyKeyFont = function(fontName, clickedFontButton) {
    // Remove 'active' class from previously clicked font button
    if (lastClickedFontButton) {
        lastClickedFontButton.classList.remove('active');
    }

    setBrush('fontFamily', fontName); // Set the brush for font family

    // Add 'active' class to the newly clicked button
    if (clickedFontButton) {
        clickedFontButton.classList.add('active');
        lastClickedFontButton = clickedFontButton;
    }
    // No need to call generateKeyboardPreview here; it's called when a key is clicked
};

window.applyFeel = function() {
    const selectedFeel = document.getElementById('feelSelect').value;
    alert(`Applying "${selectedFeel}" feel!`);
}

window.loadProfile = function() {
    const selectedProfile = document.getElementById('profileSelect').value;
    alert(`Loading ${selectedProfile} settings!`);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Show the Key Style options by default
    window.showOptions('keystyle', document.getElementById('keystyleButton'));

    // --- Load keyboard configuration from JSON ---
    fetch('assets/keyboard_config.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            keyboardConfig = data; // Assign the loaded data to the global keyboardConfig variable

            // --- Initial setup of the brush and keyboard ---
            if (keyboardConfig.keys && keyboardConfig.keys.length > 0) {
                const firstKey = keyboardConfig.keys[0];

                // Set initial color brush based on the first key's primary text color
                if (firstKey.texts[0].color) {
                    currentKeyColor = firstKey.texts[0].color;
                    setBrush('backgroundColor', firstKey.texts[0].color);
                    const defaultColorButton = document.querySelector(`.color-button[onclick*="'${firstKey.texts[0].color.toUpperCase()}'"]`);
                    if (defaultColorButton) {
                        defaultColorButton.classList.add('active');
                        lastClickedColorButton = defaultColorButton;
                    }
                }

                // Set initial font brush based on the first key's primary text font
                if (firstKey.texts[0].font) {
                    currentKeyFont = firstKey.texts[0].font;
                    setBrush('fontFamily', firstKey.texts[0].font);
                    const defaultFontButton = document.querySelector(`.font-button[onclick*="'${firstKey.texts[0].font}'"]`);
                    if (defaultFontButton) {
                        defaultFontButton.classList.add('active');
                        lastClickedFontButton = defaultFontButton;
                    }
                }
            }
            // Generate initial keyboard preview once config is loaded
            generateKeyboardPreview();
        })
        .catch(error => {
            console.error('Error loading keyboard configuration:', error);
            // Optionally, display a fallback keyboard or error message to the user
        });
});
