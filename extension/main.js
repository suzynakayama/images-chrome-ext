const bodyEl = document.querySelector("body");
const questionDiv = document.getElementById("question");
const questionInput = document.getElementById("name");
const questionBtn = document.getElementById("name-btn");
const questionForm = document.getElementById("question-form");
const greetingDiv = document.getElementById("greeting");
const greetingTitle = document.querySelector(".greeting-title");
const greetingHour = document.querySelector(".hour");
const greetingForm = document.getElementById("greeting-form");
const greetingInput = document.getElementById("search");
const greetingBtn = document.getElementById("search-btn");
const changeName = document.querySelector(".change-name");

const imagesUrls = [
	"./assets/fofoDemais.jpg",
	"./assets/bald-eagle-flying-across-green-trees-2635393.jpg",
	"./assets/close-up-photo-of-lion-s-head-2220336.jpg",
	"./assets/group-of-penguins-53970.jpg",
	"./assets/photo-of-gray-cat-looking-up-against-black-background-730896.jpg",
	"./assets/tan-and-black-dogs-3361692.jpg",
	"./assets/three-brown-horses-in-pasture-2670807.jpg",
	"./assets/white-wolf-on-floor-1573134.jpg",
];

/* ***************** Set Background **************** */
let randomNum = Math.floor(Math.random() * 8);
let randomImg = imagesUrls[randomNum];
bodyEl.style.backgroundImage = `url(${randomImg})`;

/* ***************** Helper Function **************** */
const listenersCreator = (element, eventType, func) => {
	if (element) {
		return element.addEventListener(eventType, (evt) => {
			evt.preventDefault();
			func();
		});
	}
};

/* ***************** Question Div Functions **************** */
const question = () => {
	let name = questionInput.value;
	questionDiv.style.display = "none";
	greetingDiv.style.display = "block";
	if (name.length) {
		localStorage.setItem("ext-name", name);
	} else {
		name = "my friend";
		localStorage.setItem("ext-name", name);
	}
	greeting(name);
	questionInput.value = "";
};

listenersCreator(questionForm, "submit", question);
listenersCreator(questionBtn, "click", question);

/* ***************** Greeting Div Functions **************** */

const greeting = (name) => {
	greetingTitle.innerHTML = `Hello ${name}!`;
	let date = new Date();
	let hour = date.getHours();
	let minutes = date.getMinutes();
	minutes < 10 ? (minutes = `0${minutes}`) : minutes;
	greetingHour.innerHTML = `Right now is ${hour}:${minutes}.`;
};

const handleSearch = (query) => {
	window.location.href = `https://www.google.com/search?q=${query}`;
};

if (greetingForm) {
	greetingForm.addEventListener("submit", (evt) => {
		evt.preventDefault();
		handleSearch(greetingInput.value);
	});
}

if (greetingBtn) {
	greetingBtn.addEventListener("click", (evt) => {
		evt.preventDefault();
		console.log(greetingInput.value);
		handleSearch(greetingInput.value);
	});
}

if (changeName) {
	changeName.addEventListener("click", () => {
		questionDiv.style.display = "block";
		greetingDiv.style.display = "none";
	});
}

/* ***************** Recurring Usage **************** */

const init = () => {
	let nameSet = localStorage.getItem("ext-name");
	if (nameSet) {
		questionDiv.style.display = "none";
		greetingDiv.style.display = "block";
		return greeting(nameSet);
	}
};
init();
