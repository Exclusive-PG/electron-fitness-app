import Swiper from "swiper";
import 'swiper/css';


//TABS SETTINGS
const tabControls = [...document.querySelectorAll(".tabs__controls > label")];
const tabsContent = document.querySelector<HTMLElement>(".tabs__content");
const switchers = document.querySelectorAll<HTMLElement>(".label-switch-page");
let tabsSwiper:any;

const initTabControls = (swiper: any) => {
	tabControls.forEach((tab:HTMLElement) => {
		tab.addEventListener("click", (event: Event) => {
	
			swiper.slideTo(tab.dataset.tab);
		});
	});
	swiper.slideTo(3)
};

const initTabs = () => {
	tabsSwiper = new Swiper(tabsContent, {
		speed: 800,
		autoHeight: true,
		allowTouchMove: true,

	
	});
	
	tabsSwiper.on('slideChange', function () {
		//console.log(tabsSwiper.activeIndex)
		let tab = switchers[tabsSwiper.activeIndex]
		tab.click();
	});
};

export const switcherPagesController = () => {
	initTabs();
	initTabControls(tabsSwiper);

};



