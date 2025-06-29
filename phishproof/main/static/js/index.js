let currentSlideIndex = 0;
let cardsPerView = 3;
let totalCards = 9;
let maxSlideIndex = 0;

function updateCardsPerView() {
	if (window.innerWidth <= 480) {
		cardsPerView = 1;
	} else if (window.innerWidth <= 768) {
		cardsPerView = 2;
	} else {
		cardsPerView = 3; // Maximum 3 cards on desktop
	}
	maxSlideIndex = Math.ceil(totalCards / cardsPerView) - 1;
	updateDots();
}

function updateDots() {
	const dotsContainer = document.getElementById('carouselDots');
	if (!dotsContainer) return;

	// Clear existing dots
	dotsContainer.innerHTML = '';

	// Create new dots based on current slides needed
	const totalSlides = maxSlideIndex + 1;
	for (let i = 0; i < totalSlides; i++) {
		const dot = document.createElement('button');
		dot.className = 'dot';
		if (i === currentSlideIndex) {
			dot.classList.add('active');
		}
		dot.onclick = () => currentSlide(i + 1);
		dotsContainer.appendChild(dot);
	}
}

function updateCarousel() {
	const track = document.getElementById('carouselTrack');
	let cardWidth;

	// Match the CSS breakpoints - keeping max 3 cards
	if (window.innerWidth <= 480) {
		cardWidth = Math.min(window.innerWidth - 64, 280) + 16;
	} else if (window.innerWidth <= 600) {
		cardWidth = 220 + 16;
	} else if (window.innerWidth <= 768) {
		cardWidth = 250 + 16;
	} else if (window.innerWidth <= 920) {
		cardWidth = 240 + 16;
	} else if (window.innerWidth <= 1024) {
		cardWidth = 260 + 20;
	} else {
		cardWidth = 280 + 24; // Desktop: max 3 cards at 280px each
	}

	const offset = currentSlideIndex * (cardWidth * cardsPerView);

	if (track) {
		track.style.transform = `translateX(-${offset}px)`;
	}

	// Update dots
	const dots = document.querySelectorAll('.dot');
	dots.forEach((dot, index) => {
		dot.classList.toggle('active', index === currentSlideIndex);
	});
}

function currentSlide(n) {
	currentSlideIndex = n - 1;
	if (currentSlideIndex > maxSlideIndex) currentSlideIndex = 0;
	if (currentSlideIndex < 0) currentSlideIndex = maxSlideIndex;
	updateCarousel();
}

// Auto-slide functionality
function nextSlide() {
	currentSlideIndex++;
	if (currentSlideIndex > maxSlideIndex) {
		currentSlideIndex = 0;
	}
	updateCarousel();
}

// Initialize
document.addEventListener('DOMContentLoaded', function () {
	updateCardsPerView();
	updateCarousel();

	// Auto-slide every 5 seconds
	setInterval(nextSlide, 5000);
});

// Update on window resize
window.addEventListener('resize', function () {
	// Reset to first slide when resizing to avoid issues
	currentSlideIndex = 0;
	updateCardsPerView();
	updateCarousel();
});
