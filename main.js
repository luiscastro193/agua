"use strict";
const day = 24 * 60 * 60 * 1000;
const nMessages = 12;

function daysSince(date) {
	let time = Date.now() - Date.parse(`2025-${date.slice(-2)}-${date.slice(0, 2)}T00:00`);
	return Math.floor(time / day);
}

function index(difference) {
	return ((difference % nMessages) + nMessages) % nMessages;
}

let [, type, date] = location.hash.slice(1).match(/([^\d]+)(\d+)/);
document.querySelector('img').src = `images/${type}${index(daysSince(date))}.png`;
window.onhashchange = () => location.reload();
