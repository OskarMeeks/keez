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
const keyboardConfig80 = {
    "keys": [
        // Row 1 (Top Row - Function Keys, now at yposition: 0)
        {"text": "Esc", "code": "Escape", "xposition": 0, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "F1", "code": "F1", "xposition": 1.5, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "F2", "code": "F2", "xposition": 2.5, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "F3", "code": "F3", "xposition": 3.5, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "F4", "code": "F4", "xposition": 4.5, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "F5", "code": "F5", "xposition": 5.5, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "F6", "code": "F6", "xposition": 6.5, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "F7", "code": "F7", "xposition": 7.5, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "F8", "code": "F8", "xposition": 8.5, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "F9", "code": "F9", "xposition": 9.5, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "F10", "code": "F10", "xposition": 10.5, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "F11", "code": "F11", "xposition": 11.5, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "F12", "code": "F12", "xposition": 12.5, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "PrtSc", "code": "PrintScreen", "xposition": 13.75, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "ScrLk", "code": "ScrollLock", "xposition": 14.75, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "Pause", "code": "Pause", "xposition": 15.75, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},

        // Row 2 (Number Row, now at yposition: 1)
        {"text": "`", "code": "Backquote", "xposition": 0, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "1", "code": "Digit1", "xposition": 1, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "2", "code": "Digit2", "xposition": 2, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "3", "code": "Digit3", "xposition": 3, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "4", "code": "Digit4", "xposition": 4, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "5", "code": "Digit5", "xposition": 5, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "6", "code": "Digit6", "xposition": 6, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "7", "code": "Digit7", "xposition": 7, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "8", "code": "Digit8", "xposition": 8, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "9", "code": "Digit9", "xposition": 9, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "0", "code": "Digit0", "xposition": 10, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "-", "code": "Minus", "xposition": 11, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "=", "code": "Equal", "xposition": 12, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "Backspace", "code": "Backspace", "xposition": 13, "yposition": 1, "color": "#C0C0C0", "font": "Arial", "widthRatio": 2},

        // Row 3 (QWERTY Row, now at yposition: 2)
        {"text": "Tab", "code": "Tab", "xposition": 0, "yposition": 2, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.5},
        {"text": "Q", "code": "KeyQ", "xposition": 1.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "W", "code": "KeyW", "xposition": 2.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "E", "code": "KeyE", "xposition": 3.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "R", "code": "KeyR", "xposition": 4.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "T", "code": "KeyT", "xposition": 5.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "Y", "code": "KeyY", "xposition": 6.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "U", "code": "KeyU", "xposition": 7.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "I", "code": "KeyI", "xposition": 8.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "O", "code": "KeyO", "xposition": 9.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "P", "code": "KeyP", "xposition": 10.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "[", "code": "BracketLeft", "xposition": 11.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "]", "code": "BracketRight", "xposition": 12.5, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "\\", "code": "Backslash", "xposition": 13.5, "yposition": 2, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.5},

        // Row 4 (ASDF Row, now at yposition: 3)
        {"text": "Caps", "code": "CapsLock", "xposition": 0, "yposition": 3, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.75},
        {"text": "A", "code": "KeyA", "xposition": 1.75, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "S", "code": "KeyS", "xposition": 2.75, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "D", "code": "KeyD", "xposition": 3.75, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "F", "code": "KeyF", "xposition": 4.75, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "G", "code": "KeyG", "xposition": 5.75, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "H", "code": "KeyH", "xposition": 6.75, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "J", "code": "KeyJ", "xposition": 7.75, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "K", "code": "KeyK", "xposition": 8.75, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "L", "code": "KeyL", "xposition": 9.75, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": ";", "code": "Semicolon", "xposition": 10.75, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "'", "code": "Quote", "xposition": 11.75, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "Enter", "code": "Enter", "xposition": 12.75, "yposition": 3, "color": "#C0C0C0", "font": "Arial", "widthRatio": 2.25},

        // Row 5 (ZXCV Row, now at yposition: 4)
        {"text": "Shift", "code": "ShiftLeft", "xposition": 0, "yposition": 4, "color": "#C0C0C0", "font": "Arial", "widthRatio": 2.25},
        {"text": "Z", "code": "KeyZ", "xposition": 2.25, "yposition": 4, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "X", "code": "KeyX", "xposition": 3.25, "yposition": 4, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "C", "code": "KeyC", "xposition": 4.25, "yposition": 4, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "V", "code": "KeyV", "xposition": 5.25, "yposition": 4, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "B", "code": "KeyB", "xposition": 6.25, "yposition": 4, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "N", "code": "KeyN", "xposition": 7.25, "yposition": 4, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "M", "code": "KeyM", "xposition": 8.25, "yposition": 4, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": ",", "code": "Comma", "xposition": 9.25, "yposition": 4, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": ".", "code": "Period", "xposition": 10.25, "yposition": 4, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "/", "code": "Slash", "xposition": 11.25, "yposition": 4, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "Shift", "code": "ShiftRight", "xposition": 12.25, "yposition": 4, "color": "#C0C0C0", "font": "Arial", "widthRatio": 2.75},

        // Row 6 (Bottom Row, now at yposition: 5)
        {"text": "Ctrl", "code": "ControlLeft", "xposition": 0, "yposition": 5, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.25},
        {"text": "Win", "code": "MetaLeft", "xposition": 1.25, "yposition": 5, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.25},
        {"text": "Alt", "code": "AltLeft", "xposition": 2.5, "yposition": 5, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.25},
        {"text": "Space", "code": "Space", "xposition": 4, "yposition": 5, "color": "#E0E0E0", "font": "Arial", "widthRatio": 6.25},
        {"text": "Alt", "code": "AltRight", "xposition": 10.25, "yposition": 5, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.25},
        {"text": "Fn", "code": "Fn", "xposition": 11.5, "yposition": 5, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.25},
        {"text": "Ctrl", "code": "ControlRight", "xposition": 12.75, "yposition": 5, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.25},
        {"text": "◀", "code": "ArrowLeft", "xposition": 14, "yposition": 5, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "▶", "code": "ArrowRight", "xposition": 15, "yposition": 5, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},

        // Navigation Cluster (now at yposition: 1 and 2)
        {"text": "Ins", "code": "Insert", "xposition": 14, "yposition": 1, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "Home", "code": "Home", "xposition": 15, "yposition": 1, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "PgUp", "code": "PageUp", "xposition": 16, "yposition": 1, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "Del", "code": "Delete", "xposition": 14, "yposition": 2, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "End", "code": "End", "xposition": 15, "yposition": 2, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        {"text": "PgDn", "code": "PageDown", "xposition": 16, "yposition": 2, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},

        // Dedicated Up Arrow key for standard TKL layout (now at yposition: 4)
        {"text": "▲", "code": "ArrowUp", "xposition": 15, "yposition": 4, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1},
        // Dedicated Down Arrow key for standard TKL layout (now at yposition: 5)
        {"text": "▼", "code": "ArrowDown", "xposition": 15, "yposition": 5, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1}
    ]
};
const keyboardConfig = {
    "keys": [
        // Row 1 (Number Row - now the top physical row, so yposition: 0)
        {"text": "`", "code": "Backquote", "xposition": 0, "yposition": 0, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "1", "code": "Digit1", "xposition": 1, "yposition": 0, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "2", "code": "Digit2", "xposition": 2, "yposition": 0, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "3", "code": "Digit3", "xposition": 3, "yposition": 0, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "4", "code": "Digit4", "xposition": 4, "yposition": 0, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "5", "code": "Digit5", "xposition": 5, "yposition": 0, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "6", "code": "Digit6", "xposition": 6, "yposition": 0, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "7", "code": "Digit7", "xposition": 7, "yposition": 0, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "8", "code": "Digit8", "xposition": 8, "yposition": 0, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "9", "code": "Digit9", "xposition": 9, "yposition": 0, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "0", "code": "Digit0", "xposition": 10, "yposition": 0, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "-", "code": "Minus", "xposition": 11, "yposition": 0, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "=", "code": "Equal", "xposition": 12, "yposition": 0, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "Backspace", "code": "Backspace", "xposition": 13, "yposition": 0, "color": "#C0C0C0", "font": "Arial", "widthRatio": 2}, // Standard Backspace size

        // Row 2 (QWERTY Row - now yposition: 1)
        {"text": "Tab", "code": "Tab", "xposition": 0, "yposition": 1, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.5}, // Tab is 1.5u
        {"text": "Q", "code": "KeyQ", "xposition": 1.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "W", "code": "KeyW", "xposition": 2.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "E", "code": "KeyE", "xposition": 3.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "R", "code": "KeyR", "xposition": 4.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "T", "code": "KeyT", "xposition": 5.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "Y", "code": "KeyY", "xposition": 6.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "U", "code": "KeyU", "xposition": 7.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "I", "code": "KeyI", "xposition": 8.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "O", "code": "KeyO", "xposition": 9.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "P", "code": "KeyP", "xposition": 10.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "[", "code": "BracketLeft", "xposition": 11.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "]", "code": "BracketRight", "xposition": 12.5, "yposition": 1, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "\\", "code": "Backslash", "xposition": 13.5, "yposition": 1, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.5}, // Backslash 1.5u

        // Row 3 (ASDF Row - now yposition: 2)
        {"text": "Caps", "code": "CapsLock", "xposition": 0, "yposition": 2, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.75}, // Caps Lock is 1.75u
        {"text": "A", "code": "KeyA", "xposition": 1.75, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "S", "code": "KeyS", "xposition": 2.75, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "D", "code": "KeyD", "xposition": 3.75, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "F", "code": "KeyF", "xposition": 4.75, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "G", "code": "KeyG", "xposition": 5.75, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "H", "code": "KeyH", "xposition": 6.75, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "J", "code": "KeyJ", "xposition": 7.75, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "K", "code": "KeyK", "xposition": 8.75, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "L", "code": "KeyL", "xposition": 9.75, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": ";", "code": "Semicolon", "xposition": 10.75, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "'", "code": "Quote", "xposition": 11.75, "yposition": 2, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "Enter", "code": "Enter", "xposition": 12.75, "yposition": 2, "color": "#C0C0C0", "font": "Arial", "widthRatio": 2.25}, // Enter is 2.25u

        // Row 4 (ZXCV Row - now yposition: 3)
        {"text": "Shift", "code": "ShiftLeft", "xposition": 0, "yposition": 3, "color": "#C0C0C0", "font": "Arial", "widthRatio": 2.25}, // Left Shift is 2.25u
        {"text": "Z", "code": "KeyZ", "xposition": 2.25, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "X", "code": "KeyX", "xposition": 3.25, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "C", "code": "KeyC", "xposition": 4.25, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "V", "code": "KeyV", "xposition": 5.25, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "B", "code": "KeyB", "xposition": 6.25, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "N", "code": "KeyN", "xposition": 7.25, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "M", "code": "KeyM", "xposition": 8.25, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": ",", "code": "Comma", "xposition": 9.25, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": ".", "code": "Period", "xposition": 10.25, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "/", "code": "Slash", "xposition": 11.25, "yposition": 3, "color": "#E0E0E0", "font": "Arial", "widthRatio": 1},
        {"text": "Shift", "code": "ShiftRight", "xposition": 12.25, "yposition": 3, "color": "#C0C0C0", "font": "Arial", "widthRatio": 2.75}, // Right Shift is 2.75u

        // Row 5 (Bottom Row - now yposition: 4)
        {"text": "Ctrl", "code": "ControlLeft", "xposition": 0, "yposition": 4, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.25},
        {"text": "Win", "code": "MetaLeft", "xposition": 1.25, "yposition": 4, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.25},
        {"text": "Alt", "code": "AltLeft", "xposition": 2.5, "yposition": 4, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.25},
        {"text": "Space", "code": "Space", "xposition": 3.75, "yposition": 4, "color": "#E0E0E0", "font": "Arial", "widthRatio": 6.25}, // Spacebar is 6.25u
        {"text": "Alt", "code": "AltRight", "xposition": 10, "yposition": 4, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.25},
        {"text": "Win", "code": "MetaRight", "xposition": 11.25, "yposition": 4, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.25},
        {"text": "Fn", "code": "Fn", "xposition": 12.5, "yposition": 4, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.25}, // Function key
        {"text": "Ctrl", "code": "ControlRight", "xposition": 13.75, "yposition": 4, "color": "#C0C0C0", "font": "Arial", "widthRatio": 1.25}
        // Removed arrow keys and navigation cluster as they are not present on a standard 60%
    ]
};

const KEY_SIZE = 60; // Standard key width/height in pixels
const KEY_GAP = 8; // Gap between keys in pixels
const DEFAULT_KEY_IMAGE = 'images/keycap.png'; // Make sure this path is correct!

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

    keyboardConfig.keys.forEach(keyConfig => {
        const keyButton = document.createElement('button');
        keyButton.textContent = keyConfig.text;
        keyButton.className = 'keyboard-key'; // Apply base key styling
        keyButton.dataset.keyCode = keyConfig.code;
        keyButton.style.backgroundImage = `url(${DEFAULT_KEY_IMAGE})`

        
        keyButton.style.backgroundColor = keyConfig.color || currentKeyColor;
        keyButton.style.fontFamily = keyConfig.font || currentKeyFont;
        keyButton.style.color = getContrastColor(keyButton.style.backgroundColor);

        // --- NEW: Apply width and height based on KEY_SIZE and widthRatio ---
        const actualKeyWidth = (keyConfig.widthRatio * KEY_SIZE);
        keyButton.style.width = `${actualKeyWidth}px`;
        keyButton.style.height = `${KEY_SIZE}px`; // Height is always KEY_SIZE

        // Position the key using xposition and yposition
        keyButton.style.position = 'absolute';
        keyButton.style.left = `${keyConfig.xposition * KEY_SIZE}px`;
        keyButton.style.top = `${keyConfig.yposition * KEY_SIZE}px`;

        // Update max dimensions for container sizing
        maxX = Math.max(maxX, keyConfig.xposition * (KEY_SIZE + KEY_GAP) + actualKeyWidth);
        maxY = Math.max(maxY, keyConfig.yposition * (KEY_SIZE + KEY_GAP) + KEY_SIZE);

keyButton.style.paddingLeft = '0px';
keyButton.style.paddingRight = '0px';
keyButton.style.paddingBottom = '0px';
keyButton.style.paddingTop = '0px';
keyButton.style.borderTopWidth = '0px';
keyButton.style.borderTopStyle = 'solid'; // Still 'solid' even with 0 width, but often implies no border visually
keyButton.style.borderRightWidth = '0px';
keyButton.style.borderRightStyle = 'solid';
keyButton.style.borderBottomWidth = '0px';
keyButton.style.borderBottomStyle = 'solid';
keyButton.style.borderLeftWidth = '0px';
keyButton.style.borderLeftStyle = 'solid';
}

                                
        keyButton.addEventListener('click', () => {
            applyBrushToKey(keyButton.dataset.keyCode);
        });

        keyboardContainer.appendChild(keyButton);
    });

    // Set the container's dimensions to fit the laid-out keys precisely
    // Add padding to account for the border of the keyboardPreview div
   // const containerPadding = 25; // This should match the padding set in CSS
  //  keyboardContainer.style.width = `${maxX + 2 * containerPadding}px`;
    //keyboardContainer.style.height = `${maxY + 2 * containerPadding}px`;
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
    return luminance > 0.5 ? 'black' : 'white';
}

/**
 * Sets the global brush to be applied to keys.
 * @param {string} property The CSS property to change (e.g., 'backgroundColor', 'fontFamily').
 * @param {string} value The value to set the property to (e.g., '#FF0000', 'Verdana').
 */
window.setBrush = function(property, value) {
    currentBrushProperty = property;
    currentBrushValue = value;
    // You could add visual feedback here to show which brush is active
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
        // Update the key's property in the JSON configuration
        if (currentBrushProperty === 'backgroundColor') {
            keyToUpdate.color = currentBrushValue;
        } else if (currentBrushProperty === 'fontFamily') {
            keyToUpdate.font = currentBrushValue;
        }
        // Add more else if blocks here for other properties if needed (e.g., 'textColor', 'borderColor')

        console.log(`Applied ${currentBrushValue} to ${currentBrushProperty} of key: ${keyToUpdate.text}`);
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
    if (lastClickedColorButton) {
        lastClickedColorButton.style.border = 'none';
    }
    setBrush('backgroundColor', color); // Set the brush for background color
    if (clickedColorButton) {
        clickedColorButton.style.border = '2px solid black';
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
    if (lastClickedFontButton) {
        lastClickedFontButton.style.border = 'none';
    }
    setBrush('fontFamily', fontName); // Set the brush for font family
    if (clickedFontButton) {
        clickedFontButton.style.border = '2px solid black';
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
    window.showOptions('keystyle', document.getElementById('keystyleButton'));

    // --- Initial setup of the brush and keyboard ---
    if (keyboardConfig.keys.length > 0) {
        const firstKey = keyboardConfig.keys[0];

        // Set initial color brush based on the first key's color
        if (firstKey.color) {
            currentKeyColor = firstKey.color; // Keep for fallback/global state
            setBrush('backgroundColor', firstKey.color);
            const defaultColorButton = document.querySelector(`.color-button[onclick*="${firstKey.color.toUpperCase()}"]`);
            if (defaultColorButton) {
                defaultColorButton.style.border = '2px solid black';
                lastClickedColorButton = defaultColorButton;
            }
        }

        // Set initial font brush based on the first key's font
        if (firstKey.font) {
            currentKeyFont = firstKey.font; // Keep for fallback/global state
            // IMPORTANT: Calling setBrush here will overwrite the property set by color.
            // If you want to retain both active, you'd need a more complex brush system.
            // For now, the last set brush (font in this case) will be active.
            setBrush('fontFamily', firstKey.font);
            const defaultFontButton = document.querySelector(`.font-button[onclick*="${firstKey.font}"]`);
            if (defaultFontButton) {
                defaultFontButton.style.border = '2px solid black';
                lastClickedFontButton = defaultFontButton;
            }
        }
    }
    // Generate initial keyboard preview
    generateKeyboardPreview();
});
