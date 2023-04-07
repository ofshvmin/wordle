
# Wordle: Easter edition

![screenshot](./assets/wordle-easter.png)

# Background

Wordle Easter edition is an Easter-themed re-creation of the popular web-based game Wordle. The original Wordle game was developed by Welsh software engineer Josh Wardle and was later purchased by the New York Times.  

Whereas the New York Times version of Wordle has only one correct solution each day, Wordle: Easter Edition allows players to replay the game multiple times.

# Getting Started

The goal of the game is to guess the correct 5-letter word starting with a random guess and refining subsequent guesses based on the hints the game provides.
The hints indicate whether any of the letters in the guessed word match those in the correct word.
* Players have 6 attempts to guess the correct word. 
* Gameboard tiles turn green if the guessed letter matches the letter in the same place within the correct word.  
* Gameboard tiles turn yellow if the guessed letter is contained in the correct word but located in a different place.
* Black tiles indicate the letter is not present within the correct word whatsoever. 

Planning materials can be found [here](./pseudo.txt).

# [Play the game here](https://easter-wordle.netlify.app/)

# Technologies used
* CSS
* JavaScript
* HTML
* Git


# Attributions
My sincere thanks to the creators who have made their content available to be freely used by developers.

Wordle: Easter Edition makes use of the font Schibsted Grotesk designed by Bakken & Bæck, Henrik Kongsvoll and made available through Google fonts.  It can be accessed at [google fonts](https://fonts.google.com/specimen/Schibsted+Grotesk?query=schibsted+grotesk).

Wordle: Easter Edition uses a favicon made available by Freepik in their [easter icons](https://www.flaticon.com/free-icons/easter) collection and can be found [here](https://www.flaticon.com/free-icon/easter_9870812?term=easter&page=1&position=49&origin=tag&related_id=9870812).

Confetti was made possible by General Assembly.

# Ice Box
- Optimize the on-screen keyboard for mobile devices
- Validate user guesses are actual words
- Eliminate repetition of the same correct word
- Animate tiles as the correct/incorrect letters are revealed
- Animate a wiggle of the row when a user selects invalid input
- Add themes for other holidays
- Dark mode