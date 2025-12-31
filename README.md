# 🐍 Advanced Snake Game

> A professional-grade Snake game built with **HTML5, CSS3, and JavaScript** featuring advanced gameplay mechanics, responsive design, and mobile support.

---

## 📋 Table of Contents
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [How to Run](#-how-to-run)
- [Gameplay](#-gameplay)
- [Controls](#-controls)
- [Customization](#-customization)
- [Technologies Used](#-technologies-used)
- [Deployment](#-deployment)

---

## ✨ Features

### Core Features
✅ **Real-time Score Tracking** - Live score display with visual feedback  
✅ **Progressive Difficulty** - Speed increases with every 5 points earned  
✅ **Level System** - Automatic level calculation based on score  
✅ **High Score Memory** - LocalStorage keeps track of your best score  
✅ **Collision Detection** - Wall and self-collision detection  

### Controls
✅ **Keyboard Controls** - Arrow keys for desktop gameplay  
✅ **Mobile Touch Controls** - Direction pad for touch devices  
✅ **Swipe Support** - Swipe gestures on the game board  
✅ **Pause/Resume** - Space bar or button to pause the game  

### UI/UX
✅ **Responsive Design** - Works perfectly on mobile, tablet, and desktop  
✅ **Beautiful Gradients** - Modern visual design with animations  
✅ **Game Over Overlay** - Professional game over screen with stats  
✅ **Real-time Stats** - Score, Level, Speed, High Score display  

---

## 📁 Project Structure

```
advanced-snake-game/
│
├── index.html          → Game UI, layout, and HTML structure
├── style.css           → Complete styling, animations, and responsive design
├── script.js           → Game logic, controls, and collision detection
└── README.md           → Documentation (this file)
```

### File Descriptions

| File | Purpose |
|------|---------|
| **index.html** | Game interface with buttons, score display, touch controls, and instructions |
| **style.css** | Professional styling with gradients, animations, mobile responsiveness, and themes |
| **script.js** | Complete game engine with movement, collision, controls, and state management |
| **README.md** | Project documentation and user guide |

---

## 🚀 Installation

### Method 1: Using Terminal

1. **Navigate to your desired directory:**
```bash
cd /Users/prakash
```

2. **The project folder already exists, so you're ready to go!**
```
/Users/prakash/Pythone program/advanced-snake-game
```

### Method 2: Using VS Code

1. Open VS Code
2. Click `File → Open Folder`
3. Navigate to `/Users/prakash/Pythone program/advanced-snake-game`
4. Click `Open`

---

## 🎮 How to Run

### ⭐ RECOMMENDED: Python HTTP Server (Localhost)

**Step 1: Open Terminal in VS Code**
```
Terminal → New Terminal
```

**Step 2: Navigate to project folder**
```bash
cd "/Users/prakash/Pythone program/advanced-snake-game"
```

**Step 3: Start Python HTTP Server**
```bash
python3 -m http.server 8000
```

**Step 4: Open in Browser**
```
http://localhost:8000
```

### Alternative: Using Live Server Extension

1. Install the **Live Server** extension (by Ritwick Dey)
2. Right-click on `index.html`
3. Select **"Open with Live Server"**
4. Browser opens automatically at `http://127.0.0.1:5500`

---

## 🎯 Gameplay

### Game Rules
- **Objective**: Eat food (red dots) to grow and increase score
- **Avoid**: Walls (board edges) and your own body
- **Speed**: Increases progressively as score increases
- **Level**: Increases every 5 points
- **Game Over**: Triggered by wall or self-collision

### Scoring System
- **+1 Point** per food eaten
- **Level Increase** every 5 points
- **Speed Boost** after each food (5ms faster)
- **Minimum Speed**: 40ms (game becomes very challenging!)

---

## 🕹️ Controls

### Desktop (Keyboard)
| Key | Action |
|-----|--------|
| **↑ Arrow Up** | Move snake up |
| **↓ Arrow Down** | Move snake down |
| **← Arrow Left** | Move snake left |
| **→ Arrow Right** | Move snake right |
| **Space** | Pause/Resume |

### Mobile (Touch Buttons)
- **Tap Direction Buttons** - Control snake direction
- **Swipe Gestures** - Swipe on game board to change direction
- **▲ ▼ ◄ ►** Buttons - Directional movement

### Game Buttons
- **▶ START** - Begin new game
- **⏸ PAUSE** - Pause active game
- **▶ RESUME** - Resume paused game
- **🔄 RESTART** - Restart and reset score

---

## 🎨 Customization

### Change Game Speed
**In script.js, find and modify:**
```javascript
const INITIAL_SPEED = 100;      // Starting speed in milliseconds
const MIN_SPEED = 40;           // Fastest speed (lower = faster)
const SPEED_INCREMENT = 5;      // Speed increase per food eaten
```

### Change Board Size
**In style.css, modify:**
```css
.game-board {
    width: 400px;      /* Change to desired width */
    height: 400px;     /* Change to desired height */
}
```

**Also update in script.js:**
```javascript
const BOARD_WIDTH = 400;        /* Match CSS width */
const BOARD_HEIGHT = 400;       /* Match CSS height */
const GRID_SIZE = 20;           /* Keep as 400 / 20 */
```

### Change Colors

**Snake Color (in style.css):**
```css
.snake {
    background: linear-gradient(135deg, #00ff00 0%, #00cc00 100%);
}
```

**Food Color:**
```css
.food {
    background: radial-gradient(circle, #ff0000 0%, #cc0000 100%);
}
```

**Board Background:**
```css
.game-board {
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
}
```

---

## 💻 Technologies Used

| Technology | Purpose |
|-----------|---------|
| **HTML5** | Semantic markup, game structure |
| **CSS3** | Styling, gradients, animations, responsive design |
| **JavaScript (ES6)** | Game logic, event handling, DOM manipulation |
| **LocalStorage API** | High score persistence |
| **Touch Events API** | Mobile touch and swipe controls |

---

## 📱 Mobile Access

### Access on Same WiFi Network

1. **Find your computer's IP address:**
```bash
ifconfig | grep "inet "
```

2. **Example IP:** `192.168.1.10`

3. **On mobile browser, open:**
```
http://192.168.1.10:8000
```

---

## 🌐 Deployment

### Deploy to GitHub Pages

**Step 1: Create GitHub Repository**
```bash
git init
git add .
git commit -m "Initial commit - Advanced Snake Game"
git remote add origin https://github.com/USERNAME/advanced-snake-game.git
git branch -M main
git push -u origin main
```

**Step 2: Enable GitHub Pages**
1. Go to Repository → Settings
2. Scroll to "Pages" section
3. Select `main` branch as source
4. Save
5. Access at: `https://USERNAME.github.io/advanced-snake-game/`

---

## 🔧 Browser Compatibility

✅ Chrome (Recommended)  
✅ Firefox  
✅ Safari  
✅ Edge  
✅ Mobile Browsers (iOS Safari, Chrome Mobile)

---

## 📊 Game Statistics Explained

- **Score**: Total food items eaten
- **Level**: Calculated as (Score ÷ 5) + 1
- **Speed**: Current game speed in milliseconds
- **High Score**: Best score ever achieved (stored in browser)

---

## 🎓 Learning Outcomes

This project demonstrates:
- **DOM Manipulation** - Dynamic element creation and styling
- **Event Handling** - Keyboard, mouse, and touch events
- **Game Loop** - Interval-based game mechanics
- **Collision Detection** - Geometric calculations
- **Responsive Design** - CSS media queries and flexbox
- **State Management** - Game state tracking
- **Browser APIs** - LocalStorage for data persistence

---

## 🐛 Troubleshooting

### Game not starting?
- Ensure server is running: `python3 -m http.server 8000`
- Check browser console for errors (F12)
- Refresh page (Ctrl+R or Cmd+R)

### Touch controls not working?
- Ensure viewport meta tag is present in HTML
- Test on actual mobile device (not desktop touch emulation)
- Check if JavaScript is enabled

### High score not saving?
- Ensure cookies/storage are enabled in browser
- Check browser's LocalStorage in DevTools
- Clear cache and try again

---

## 📝 Interview/Viva Questions & Answers

**Q: What is this project about?**  
A: This is an advanced Snake Game built using HTML5, CSS3, and JavaScript. It demonstrates frontend web development concepts including DOM manipulation, event handling, game loops, collision detection, and responsive UI design.

**Q: How did you run this project?**  
A: I used Python's built-in HTTP server with the command `python3 -m http.server 8000` and accessed it via `http://localhost:8000`.

**Q: What are the main features?**  
A: Real-time score tracking, progressive difficulty, level system, collision detection, keyboard controls, mobile touch support, pause/resume functionality, and high score memory using LocalStorage.

**Q: How does speed increase?**  
A: Speed decreases (game gets faster) by 5ms for each food eaten, starting from 100ms and reaching minimum 40ms.

**Q: Explain collision detection:**  
A: The game checks if the snake's head position matches wall coordinates or any body segment's position and ends the game if collision is detected.

---

## 🚀 Future Enhancements

Possible improvements:
- 🔊 Sound effects and background music
- 🏆 Leaderboard system
- 🎨 Multiple themes (dark, light, neon)
- 🧠 AI opponent snake
- 🎪 Special power-ups
- 🌍 Multiplayer support
- 📊 Statistics and analytics

---

## 📞 Support

For issues or questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Verify all files are in the correct directory
3. Ensure Python and a modern browser are installed
4. Check browser console for JavaScript errors (F12 → Console)

---

## 📄 License

This project is open-source and free to use for educational purposes.

---

## ✍️ Author

Created as an educational project demonstrating advanced web development concepts.

**Version:** 2.0  
**Last Updated:** December 2025  
**Status:** Production Ready ✅

---

## 🎉 Enjoy the Game!

Good luck, and try to beat your high score! 🏆

```
          ___
         /   \___
        / Game \  \
       /  Over! \__\
      /__________\
```

---

**Happy Coding! 💻🐍**
