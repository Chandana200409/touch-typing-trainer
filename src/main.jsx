import React from "react";
import { createRoot } from "react-dom/client";
import { Keyboard, RotateCcw, Play, Pause, TimerReset } from "lucide-react";
import "./styles.css";

const KEYBOARD = ["a", "s", "d", "f", "j", "k", "l", ";"];
const WORD_BANK = [
  "asdf", "jkl;", "asdfjkl;", "fj", "dk", "sl", "ak", "jd",
  "lad", "sad", "ask", "fall", "all", "add", "dad", "jag",
  "flag", "glass", "flash", "salad", "skald", "alfalfa",
  "jacks", "flask", "asks", "falls", "lads", "dads", "jails"
];

function createPracticeText(words = 80) {
  const result = [];
  for (let i = 0; i < words; i++) {
    result.push(WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)]);
  }
  return result.join(" ");
}

function App() {
  const [text, setText] = React.useState(() => createPracticeText());
  const [typed, setTyped] = React.useState("");
  const [seconds, setSeconds] = React.useState(300);
  const [running, setRunning] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setRunning(false);
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [running]);

  React.useEffect(() => {
    if (running) inputRef.current?.focus();
  }, [running]);

  const correct = React.useMemo(() => {
    let count = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === text[i]) count++;
    }
    return count;
  }, [typed, text]);

  const mistakes = typed.length - correct;
  const accuracy = typed.length ? Math.round((correct / typed.length) * 100) : 100;
  const keysPressed = typed.length;
  const elapsed = 300 - seconds;
  const wpm = elapsed > 0 ? Math.round((correct / 5) / (elapsed / 60)) : 0;

  const reset = () => {
    setText(createPracticeText());
    setTyped("");
    setSeconds(300);
    setRunning(false);
    setFinished(false);
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const togglePractice = () => {
    if (finished) {
      reset();
      setTimeout(() => setRunning(true), 0);
      return;
    }
    setRunning((v) => !v);
  };

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    // The exercise is restricted to the eight required keys plus spaces.
    if (/^[asdfjkl; ]*$/.test(value)) {
      if (!running && value.length > 0) setRunning(true);
      setTyped(value);
    }
  };

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const currentChar = text[typed.length] || "";
  const targetIndex = typed.length;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-icon"><Keyboard size={22} /></div>
          <div>
            <h1>Home Row Trainer</h1>
            <p>Build muscle memory. One key at a time.</p>
          </div>
        </div>
        <button className="reset-btn" onClick={reset}>
          <RotateCcw size={17} /> Reset
        </button>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">TOUCH TYPING · 5 MINUTE PRACTICE</span>
          <h2>Train your <span>home row</span>.</h2>
          <p>Practice only <b>A S D F J K L ;</b> and learn each key without looking down.</p>
        </div>

        <div className="timer-card">
          <span>TIME REMAINING</span>
          <strong>{formatTime(seconds)}</strong>
          <button className="primary-btn" onClick={togglePractice}>
            {running ? <Pause size={17} /> : <Play size={17} />}
            {finished ? "Practice again" : running ? "Pause" : "Start practice"}
          </button>
        </div>
      </section>

      <section className="stats-grid">
        <div className="stat-card">
          <span>KEYS PRESSED</span>
          <strong>{keysPressed}</strong>
          <small>Total keystrokes</small>
        </div>
        <div className="stat-card">
          <span>ACCURACY</span>
          <strong>{accuracy}%</strong>
          <small>{mistakes} mistakes</small>
        </div>
        <div className="stat-card">
          <span>SPEED</span>
          <strong>{wpm}</strong>
          <small>Approx. WPM</small>
        </div>
        <div className="stat-card">
          <span>SESSION</span>
          <strong>{elapsed}s</strong>
          <small>Practice time</small>
        </div>
      </section>

      <section className="trainer-card">
        <div className="section-heading">
          <div>
            <span className="eyebrow">PRACTICE TEXT</span>
            <h3>Follow the highlighted character</h3>
          </div>
          <div className="live-badge"><span></span>{running ? "LIVE" : finished ? "COMPLETE" : "READY"}</div>
        </div>

        <div className="text-display" aria-label="Typing target">
          {text.split("").map((char, i) => {
            let cls = "";
            if (i < typed.length) cls = typed[i] === char ? "correct" : "wrong";
            if (i === targetIndex) cls += " current";
            return <span className={cls} key={i}>{char === " " ? "·" : char}</span>;
          })}
        </div>

        <div className="input-wrap">
          <input
            ref={inputRef}
            value={typed}
            onChange={handleChange}
            onFocus={() => !finished && typed.length > 0 && setRunning(true)}
            placeholder="Click here and start typing..."
            disabled={finished}
            spellCheck="false"
            autoCapitalize="none"
            aria-label="Typing input"
          />
          <span className="input-hint">
            {running ? `Next key: ${currentChar === " " ? "SPACE" : currentChar.toUpperCase()}` : "Only A S D F J K L ; and space"}
          </span>
        </div>

        <div className="keyboard">
          <div className="keyboard-label">HOME ROW</div>
          <div className="keys">
            {KEYBOARD.map((key) => (
              <div key={key} className={`key ${currentChar === key ? "active" : ""}`}>
                <span>{key === ";" ? ";" : key.toUpperCase()}</span>
                <small>{key === "a" || key === "l" ? "PINKY" : key === "s" || key === "k" ? "RING" : key === "d" || key === "j" ? "MIDDLE" : "INDEX"}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="tips">
        <div className="tip">
          <span className="tip-number">01</span>
          <div><b>Keep your fingers on the home row</b><p>Left: A S D F · Right: J K L ;</p></div>
        </div>
        <div className="tip">
          <span className="tip-number">02</span>
          <div><b>Watch the target, not the keyboard</b><p>The highlighted key tells you what comes next.</p></div>
        </div>
        <div className="tip">
          <span className="tip-number">03</span>
          <div><b>Accuracy before speed</b><p>Build reliable muscle memory first.</p></div>
        </div>
      </section>

      <footer>
        <TimerReset size={15} /> 5-minute focused practice · Built with React
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
