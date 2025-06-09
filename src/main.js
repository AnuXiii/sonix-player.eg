import SonixPlayer from "sonix-player";
import "sonix-player/style.css";

// Initialize the player
const player = new SonixPlayer();

let currentIndex = 0;

const tabs = document.querySelector(".tabs");
const codeCategoreis = document.querySelectorAll(".code-block-inner");

tabs.addEventListener("click", (e) => {
	const validTarget = e.target.closest(".tab-btn");

	if (validTarget) {
		if (tabs.querySelector(".active")) {
			tabs.querySelector(".active").classList.remove("active");
		}

		validTarget.classList.add("active");
		const newIndex = parseInt(validTarget.dataset.index);
		showCodeBlock(newIndex);
	}
});

function showCodeBlock(newIndex) {
	codeCategoreis.forEach((item, index) => {
		item.classList.remove("active", "fade-in", "fade-out");

		if (index + 1 === newIndex) {
			if (newIndex > currentIndex) {
				item.classList.add("active", "fade-in");
			} else if (newIndex < currentIndex) {
				item.classList.add("active", "fade-out");
			} else {
				item.classList.add("active");
			}
		}
	});

	currentIndex = newIndex;
}

const copyButtons = document.querySelectorAll(".copy-btn");
copyButtons.forEach((item) => {
	item.addEventListener("click", async () => {
		item.classList.add("copied");
		setTimeout(() => {
			item.classList.remove("copied");
		}, 2000);
		handleCopy(item);
	});
});

// copy handler
function handleCopy(item) {
	const copyTarget = item.parentNode.querySelector(".code");
	const text = copyTarget.innerText;

	navigator.clipboard.writeText(text);
}

// fetch sonix-player stars i
const owner = "AnuXiii";
const repo = "sonix-player";

fetch(`https://api.github.com/repos/${owner}/${repo}`).then((res) => {
	res
		.json()
		.then((data) => {
			const stars = data.stargazers_count;
			document.getElementById("github-stars").innerHTML = `Stars : ${stars} <ion-icon name="star"></ion-icon>`;
		})
		.catch((err) => {
			document.getElementById("github-stars").innerHTML = "DATA NOT LOADED";
		});
});
