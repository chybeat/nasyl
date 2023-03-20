function encodeMail(dataObject, destinationNode) {
	destinationNode.innerHTML =
		'<a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;' +
		dataObject.box +
		"&#64" +
		dataObject.domain +
		'">' +
		dataObject.box +
		"&#64" +
		dataObject.domain +
		"</a>";
}

window.onload = (event) => {
	//window.addEventListener("DOMContentLoaded", (event) => {
	//toggle sidebar plugin initialization
	const sidebar = new ToggleSidebar({
		name: "mobile-menu",
		activationClass: "show-menu",
		autoClose: true,
		closeSidebarNode: document.querySelector("#main-menu .icon-close"),
		containerNode: document.querySelector("#main-menu"),
		openSidebarNode: document.querySelector("#main-header .icon-menu"),
	});

	// swper plugin initialization
	const slider = new Swiper("#slider", {
		// Optional parameters
		loop: true,
		grabCursor: true,
		roundLengths: true,

		autoplay: {
			delay: 3000,
			disableOnInteraction: false,
		},

		runCallbacksOnInit: true,

		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},

		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
	});

	//slider video playback
	slider.on("slideChangeTransitionStart", function () {
		let currentVideo = document.querySelector(
			'#slider [data-swiper-slide-index="' + this.realIndex + '"] video'
		);
		const lastSlideVideo = document.querySelector(
			"#slider .swiper-slide-prev video"
		);
		const nextSlideVideo = document.querySelector(
			"#slider .swiper-slide-next video"
		);
		const abortController = new AbortController();

		if (currentVideo !== null) {
			slider.autoplay.stop();
			currentVideo.currentTime = 0;
			currentVideo.play();
			currentVideo.addEventListener(
				"ended",
				function handler() {
					this.removeEventListener("ended", handler);
					slider.slideNext();
					slider.autoplay.start();
				},
				{ signal: abortController.signal }
			);
		} else {
			if (!this.autoplay.running) {
				slider.autoplay.start();
			}
		}
		if (lastSlideVideo !== null) {
			abortController.abort();
			lastSlideVideo.currentTime = 0;
			lastSlideVideo.pause();
		}
		if (nextSlideVideo !== null) {
			abortController.abort();
			nextSlideVideo.currentTime = 0;
			nextSlideVideo.pause();
		}
	});

	//Copyright Year
	document.getElementById("copyright-year").textContent =
		new Date().getFullYear();

	//contact info
	encodeMail(
		{
			box: "info",
			domain: "nasyl.co",
		},
		document.querySelector("#contact-info #direct-contact .email")
	);
};
//);
