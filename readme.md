- **Screenshot:** A screenshot of your game.
- **Your game’s title**: A description of your game. Background info about why you chose the game is a nice touch.
- **Getting Started**: Include a link to your deployed game and any instructions you deem important.
- ************************Attributions************************: Include links to any external resources (such as libraries or assets) you used to develop your application.
- **Technologies Used**: List of the technologies used, for example: JavaScript, HTML, CSS, etc.
- **Next Steps**: Planned future enhancements (icebox items).
- Your **`README.md`** file must be grammatically correct and free of spelling errors.


# Wordle: Easter edition

![screenshot](./assets.wordle-easter.png)


## Play the game [here]("https://easter-wordle.netlify.app/")
https://easter-wordle.netlify.app/


Wordle Easter edition is a re-creation of the popular web based game Wordle in the theme of Easter, which was upcoming at the time of its initial release.  The original Wordle game was developed by Welsh sofware engineer Josh Wardle and was subsequently purchased by the New York Times.  

The goal of the game is to guess the correct 5-letter word by submitting a guess receiving hints that indicate whether any of the letters in the guessed word match those in the correct word.  
* Players have 6 attempts to guess the correct word. 
* Tile turn green if the guessed letter matches to the letter in the same place within the correct word.  
* Tiles turn yellow if the guessed letter in the tile is contained in the correct word but located in a different place within the word.  
* Black tiles indicate the letter is not present within the correct word whatsoever. 

Whereas the original Wordle has only one correct solution each day, Wordle: Easter Edition allows players to replay the game multiple times in a day.



## Technologies used
* CSS
* JavaScript
* HTML
* Git


# Credits

This game makes use of the font Schibsted Grotesk designed by Bakken & Bæck, Henrik Kongsvoll and made available through google fonts.  It can be accessed at [google fonts]("https://fonts.google.com/specimen/Schibsted+Grotesk?query=schibsted+grotesk").


Wordle: Easter Edition uses a favicon made available by Freepik in their [easeter icons]("https://www.flaticon.com/free-icons/easter"") collection and can be found [here]("https://www.flaticon.com/free-icon/easter_9870812?term=easter&page=1&position=49&origin=tag&related_id=9870812").

<!-- Wordle: Easter Edition makes use of Animate.css created by Daniel Eden, Elton Mesquita, and Waren Gonzaga. Animate.css can be found here. -->


## Ice Box
- Optimize onscreen keyboard for mobile devices
- Validate user guesses are actual words
- Eliminte repition of the same correct word
- Animate tiles as the reveal correct/incorrect letters
- Animate a wiggle of the row when a user selects invalid input
- Add themse for other holidays
- Dark mode