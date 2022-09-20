const switchers = document.querySelectorAll<HTMLElement>(".label-switch-page");
const containerSwitcher = document.querySelector<HTMLElement>("body");
switchers.forEach((item) => {
	item.addEventListener("click", () => {
		item.hasAttribute("data-background") && (containerSwitcher.style.background = item.getAttribute("data-background"));
	});
});
