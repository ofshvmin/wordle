# Wordle → React (NYT-style) Plan

## Goal
Rebuild this Wordle clone as a React app that visually and behaviorally mirrors NYT Wordle:
- Landing page with logo + “Play” button
- Smooth tile/row animations on input
- Feedback animations (invalid word, win, lose, etc.)
- Confetti / celebration
- Cleaner, correct game logic

## Non-goals (for MVP)
- Accounts, stats sync, NYT login, subscriptions
- Daily puzzle backend
- Hard mode / streak persistence beyond localStorage (optional later)

## Current state
- Vanilla HTML/CSS/JS single page
- Files: index.html, css/style.css, js/app.js, data/words.js, data/library.js

## Target tech
- React + Vite (fast dev, cheap mental overhead)
- CSS: start with plain CSS modules or one global stylesheet (no Tailwind yet)
- State: React state + reducer for game logic

## Key UX behaviors to match
- Keyboard input (physical + on-screen)
- Tile flip reveal (stagger per tile)
- Row “shake” on invalid word
- Win/lose modal + reset
- Accessibility: focus, ARIA, keyboard nav

## Workstreams
1) Reference behavior list (exact animations + timings)
2) Game logic spec (rules + edge cases)
3) React architecture (components + state model)
4) Styling system + animation implementation
5) Bug fixing + tests

## Known Logic Issues
- Duplicate letter handling is incorrect.
  Example:
  - Answer: SMART
  - Guess: GLASS
  - Expected: Only the first “S” should turn yellow.
  - Current behavior: All “S” tiles turn yellow.
  - Requirement: Letters may only be marked present (yellow) as many times as they exist in the answer, accounting for greens first.

## Acceptance criteria
- Matches NYT Wordle interactions closely
- No known logic bugs in common cases
- Runs as React app with clean components