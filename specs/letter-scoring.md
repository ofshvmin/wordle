# Letter Scoring Spec (Wordle-accurate)

## Rule summary
1) Mark GREENS first:
- For each position i:
  - If guess[i] === answer[i], tile i is GREEN
  - Decrement remainingCount[guess[i]]

2) Then mark YELLOWS / GRAYS:
- For each position i not green:
  - If remainingCount[guess[i]] > 0, tile i is YELLOW and decrement remainingCount
  - Else tile i is GRAY

## Verified examples (NYT Wordle)
Answer: SHRED

Guess: EERIE
Result: E(Y), E(G), R(Green), I(G), E(G)

(“E” appears once in answer; only one guessed E is credited.)