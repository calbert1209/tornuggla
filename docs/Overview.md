# Overview of this Project

This project is a game to help children memorize simple facts like

- addition, subraction or multiplication of two single-digit numbers
- the correct direction of alphabet characters

## Game Play

Each session of the game is a sequence of 10 questions that the competitors need to answer. In response to each student answer, the teacher can click "NG" if the answer was incorrect or correct but not fast enough, or "OK" if the answer was correct and provided in a timely manner. Each time a question is answered in a way that the teacher judges as "OK", a cartoon character is shown on the top of the screen. Once a set target number of questions are answered correctly, the characters dance on screen.

## POC Examples

This repo contains two proof of concept pages. `flip.html` and `flip.js` are a game to help students recognize which of two letters are incorrectly reversed. `index.html` and `index.js` are a similar game that practices addition or subtraction of single-digit numbers.

## Architecture

Game: Each session is a single game.
Questions: Each game has $n$ questions. In the examples above (`flip.html` and `index.html`) there are 10 questions per game.
Header: The UI region at the top of the screen that shows how many questions have been answered, and shows a cartoon character for each question answered correctly.
Stage: The main UI section at the center of the screen. This shows the question that the student player is asked to answer. In the two examples, the stage has two main numbers and characters, which are randomly picked by the game's logic. For the mathematics game, there is also a operator like "+" or "-" as well. Game creators should be able to declare how each element on the stage is picked f
Stage: The main UI section at the center of the screen. This shows the question that the student player is asked to answer. In the two examples, the stage has two main numbers and characters, which are randomly picked by the game's logic. For the mathematics game, there is also a operator like "+" or "-" as well. Game creators should be able to declare how each piece of information shown on stage is generated, and how that information is displayed on screen.
Footer: The UI region at the bottom of the screen that shows the feedback buttons used by the teacher or parent to run the game. Every game will have at least the first two buttons, "NG" and "OK".
NG Button: Clicked by the teacher or parent when the child's answer is not sufficient.
OK Button: Clicked by the teacher or parent when the child's answer is sufficient.

## Goal

The coding agent will help to create a new version of the `index.html` game. The new version will use the following technologies:

- TypeScript
- Preact
- all CSS declared in a single CSS file.
- Vite to bundle source files into a page that can be deployed to GitHub pages
- Vitest for unit testing
