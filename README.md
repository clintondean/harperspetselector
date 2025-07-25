# Pet Selector - Dark & Moody 🌙

A standalone frontend web application featuring a dark and moody pet selection interface with unique interactive responses for each pet choice.

## Features

- **Dark Theme**: Beautiful dark and moody UI using Bootstrap dark mode
- **Interactive Pet Selection**: Choose from Dog, Cat, Bird, Fish, or Lizard
- **Unique Responses**: Each pet has a special behavior when selected:
  - 🐱 **Cat**: Celebration animation with confetti, wiggling cat ears, and "meow [name] that is the best pet"
  - 🐕 **Dog**: Simple "boof boof" response 
  - 🐦 **Bird**: Button displays "tweet tweet" and flies away from the mouse cursor
  - 🐠 **Fish**: "Very fooshy, very demure" message with underwater wave and shimmer effects
  - 🦎 **Lizard**: Full-screen flashing colors with "I AM THE LIZARD QUEEN"

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+) - **No Backend Required!**
- **Styling**: Bootstrap 5.3 with custom dark theme
- **Animations**: CSS animations and transitions

## Installation & Setup

**No installation required!** This is a standalone frontend application.

1. **Open the file**: Simply double-click `public/index.html` or open it in any modern web browser
2. **Or use a local file server**: 
   ```bash
   # Optional: serve with Python (if you have it installed)
   cd public
   python -m http.server 8000
   # Then open http://localhost:8000
   ```

## Usage

1. Enter your name in the input field
2. Select your favorite pet from the options
3. Click "Tell Me What You Think" button
4. Enjoy the unique response for your chosen pet!
5. Use the "Go Back" button or press Escape to try again

## Project Structure

```
├── public/                # Main application files
│   ├── index.html         # Main HTML page (standalone)
│   ├── styles.css         # Custom CSS with dark theme
│   └── script.js          # Frontend JavaScript (all logic)
├── .github/               # GitHub configuration
│   ├── workflows/         # GitHub Actions for deployment
│   └── copilot-instructions.md
├── LICENSE                # Project license
└── README.md              # This file
```

## Deployment

This project automatically deploys to GitHub Pages via GitHub Actions when changes are pushed to the main branch. The deployed site is available at: https://clintondean.github.io/harperspetselector/

**Legacy files (no longer needed):**
- `server.js` - Old Express.js server
- `package.json` - Node.js dependencies
- `public/` - Old static files directory

## Usage

1. Enter your name in the input field
2. Select your favorite pet from the options
3. Click "Tell Me What You Think" button
4. Enjoy the unique response for your chosen pet!
5. Use the "Go Back" button or press Escape to try again

## API Endpoints

**No API endpoints!** All functionality is now handled in the frontend JavaScript.

## Browser Compatibility

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)
- **Works offline** - no server connection required

## Development

To modify the project:

1. **Frontend appearance**: Edit `styles.css`
2. **Interactive behavior**: Edit `script.js`
3. **HTML structure**: Edit `index.html`
4. **Open directly in browser** to test changes

## License

ISC License
