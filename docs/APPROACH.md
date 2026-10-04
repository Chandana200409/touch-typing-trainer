# Submission approach

## User journey
Start -> see target -> type -> receive per-key feedback -> monitor accuracy/speed -> finish at 5 minutes -> practice again.

## State model
- `text`: generated target
- `typed`: current input
- `seconds`: remaining time
- `running`: timer/session state
- `finished`: session completion state

Derived metrics:
- correct characters
- mistakes
- accuracy
- keys pressed
- elapsed seconds
- approximate WPM

## Why no Redux yet?
This application has one focused screen and all state is local to that screen. Adding Redux would increase complexity without a real benefit. If the product expands to user accounts, history, leaderboards, settings and multiple lessons, Redux Toolkit becomes a sensible next step.
