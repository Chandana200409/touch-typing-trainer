# Home Row Touch Typing Trainer

A focused ReactJS typing trainer for practicing the eight home-row keys:

**A S D F J K L ;**

## Features

- 5-minute practice window
- Live countdown timer
- Only the required eight keys + space accepted
- Current target character highlighted
- Keyboard visualization showing the next key
- Correct/wrong character feedback
- Accuracy percentage
- Keys pressed counter
- Approximate WPM
- Pause/resume and reset
- Responsive CSS3 layout
- No backend required
- Ready for GitHub + Vercel/Netlify deployment

## Run locally

```bash
npm install
npm run dev
```

Open the localhost URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Deployment

### Vercel
1. Push this project to GitHub.
2. Import the repository into Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`
5. Output directory: `dist`

### Netlify
1. Push to GitHub.
2. Import the repository.
3. Build command: `npm run build`
4. Publish directory: `dist`

## Design / product approach

1. **Reduce the learning scope:** the exercise is intentionally restricted to the eight home-row keys.
2. **Immediate feedback:** every typed character is marked correct or wrong.
3. **Next-action guidance:** the next required character and corresponding keyboard key are highlighted.
4. **Progress measurement:** keys pressed, accuracy, elapsed time and approximate WPM are visible without leaving the practice screen.
5. **Customer use cases:** a beginner can start immediately, pause during practice, reset for a new session, and use the same experience on a desktop or smaller screen.
6. **Deployment-first:** the app is stateless on the server side, so it can be deployed as a static React site.

## Suggested future enhancements

- Difficulty levels with generated patterns
- Finger-placement illustrations
- Personal best history using localStorage
- Sound feedback with an accessibility toggle
- Detailed error analysis by key
- Daily practice streaks
- Redux Toolkit if the app grows to include persistent sessions and analytics
