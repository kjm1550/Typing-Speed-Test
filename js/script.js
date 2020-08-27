const paragraph = document.querySelectorAll('.paragraph');
const textArea = document.querySelector('#textbox');
const result = document.querySelector('#results');
const timer = document.querySelector('#timer');
const testAgain = document.querySelector('#testAgain');
const newText = document.querySelector('#newText');
const timeButtons = document.querySelectorAll('.time-button');
const defaultTimeButton = document.querySelector('#default-time-button');

let testStarted = false;
let timeUp = false;
let wpm = 0;
let time = 60000;
let endGame;
let timerTimeOut;

import { options } from './textOptions.js';

function startTest() {
	if (testStarted) return;
	testStarted = true;

	//update the timer and set time
	timeUp = false;
	runTimer(time);

	disableAllTimeButton();

	// run for set amount of time
	endGame = setTimeout(() => {
		//disable the textarea after
		textArea.disabled = true;
		testStarted = false;
		//find out wpm and update results
		updateWPM();
		timeUp = true;
	}, time);
}

function runTimer(time) {
	timerTimeOut = setTimeout(() => {
		// update timer every second
		time -= 1000;
		const newTime = time / 1000;
		timer.textContent = newTime + ' Seconds';

		if (newTime < 0) {
		}
		// keeps the timer updated if the time is not up
		if (!timeUp) runTimer(time);
	}, 1000);
}

function updateWPM() {
	//remove empty strings in the array
	let typedContent = textArea.value.split(' ').filter((i) => i);
	console.log(typedContent);

	//create a sting of just the charactors
	const nowString = typedContent.join('');
	console.log(nowString);
	result.textContent = typedContent.length * (60000 / time) + ' WPM and ' + nowString.length * (60000 / time) + ' CPM';
}

function restartTest() {
	textArea.disabled = false;
	textArea.value = '';
	testStarted = false;
	clearTimeout(endGame);
	clearTimeout(timerTimeOut);
	result.textContent = '0 WPM and 0 CPM';
	resetTimeButtons();
}

function changeTime() {
	// Change the time left on the clock
	const seconds = parseInt(this.dataset.time);
	timer.textContent = seconds + ' Seconds';
	time = seconds * 1000;

	// Disabled the buttons
	enableAllTimeButton();
	this.disabled = true;
}

function disableAllTimeButton() {
	timeButtons.forEach((timeButton) => (timeButton.disabled = true));
}
function enableAllTimeButton() {
	timeButtons.forEach((timeButton) => (timeButton.disabled = false));
}
function resetTimeButtons() {
	time = 60000;
	timer.textContent = '60 Seconds';
	enableAllTimeButton();
	defaultTimeButton.disabled = true;
}

function changeParagraphs() {
	paragraph.forEach((para) => (para.textContent = options[Math.floor(Math.random() * 15)]));
}

changeParagraphs();

textArea.addEventListener('input', startTest);
testAgain.addEventListener('click', restartTest);
newText.addEventListener('click', changeParagraphs);
timeButtons.forEach((timeButton) => timeButton.addEventListener('click', changeTime));
