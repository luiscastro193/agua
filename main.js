"use strict";
import PRNG from 'https://luiscastro193.github.io/PRNG/PRNG.js';

const day = 24 * 60 * 60 * 1000;
const nMessages = 12;

function shuffle(array, random) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.trunc(random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	
	return array;
}

function daysSince(date) {
	let time = Date.now() - Date.parse(`2025-${date.slice(-2)}-${date.slice(0, 2)}T00:00`);
	return Math.floor(time / day);
}

function index(difference) {
	return ((difference % nMessages) + nMessages) % nMessages;
}

window.onhashchange = () => location.reload();
const order = shuffle([...Array(nMessages).keys()], await PRNG(location.hash.slice(1)));
const [, type, date] = location.hash.slice(1).match(/([^\d]+)(\d+)/);
const img = document.querySelector('img');

function updateImage() {
	let src = `images/${type}${order[index(daysSince(date))]}.png`;
	if (src != img.src) img.src = src;
	setTimeout(updateImage, 100);
}

updateImage();
