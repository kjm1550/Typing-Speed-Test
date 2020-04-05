const textArea = document.querySelector('#textbox');
const result = document.querySelector('#results');
const timer = document.querySelector('#timer');

let testStarted = false;
let timeUp = false;
let wpm = 0;
let time = 60000;

function startTest() {
	if (testStarted) return;
	// restart the test.
	testStarted = true;
	//result.textContent = wpm + 'wpm';
	//timer.textContent = '60 seconds';

	//update the timer and set time

	updateTimer(time);

	// run for set amount of time
	setTimeout(() => {
		//disable the textarea after
		textArea.disabled = true;
		//find out wpm and update results
		updateWPM();
		timeUp = true;
	}, time);
}

function updateTimer(time) {
	setTimeout(() => {
		// update timer every second
		time -= 1000;
		const newTime = time / 1000;
		timer.textContent = newTime + ' Seconds';

		// keeps the timer updated if the time is not up
		if (!timeUp) updateTimer(time);
	}, 1000);
}
function updateWPM() {
	let typedContent = textArea.value.split(' ');
	//remove empty strings in the array
	const index = typedContent.findIndex((content) => content === '');
	const newTypedContent = [...typedContent.slice(0, index), ...typedContent.slice(index + 1)];
	const nowString = newTypedContent.join();
	result.textContent = newTypedContent.length + ' WPM and ' + nowString.length + ' CPM';
}

textArea.addEventListener('input', startTest);
