document.addEventListener('DOMContentLoaded', function () {
	// Initialize course filtering
	initializeCourseFiltering();

	// Initialize progress bar animations
	initializeProgressAnimations();

	// Initialize course card effects (without problematic CSS injection)
	initializeCourseCardEffects();
});

function initializeCourseFiltering() {
	const filterButtons = document.querySelectorAll('.filter-btn');
	const courseCards = document.querySelectorAll('.course-card');

	filterButtons.forEach(button => {
		button.addEventListener('click', function () {
			const filter = this.dataset.filter;

			// Update active button
			filterButtons.forEach(btn => btn.classList.remove('active'));
			this.classList.add('active');

			// Filter courses
			courseCards.forEach(card => {
				const courseLevel = card.dataset.level;
				const courseStatus = card.dataset.status;
				let shouldShow = false;

				switch (filter) {
					case 'all':
						shouldShow = true;
						break;
					case 'beginner':
					case 'intermediate':
					case 'advanced':
						shouldShow = courseLevel === filter;
						break;
					case 'not_started':
					case 'in_progress':
					case 'completed':
						shouldShow = courseStatus === filter;
						break;
					default:
						shouldShow = true;
				}

				if (shouldShow) {
					card.style.display = 'flex';
					card.classList.add('fade-in');
				} else {
					card.style.display = 'none';
					card.classList.remove('fade-in');
				}
			});
		});
	});
}

function initializeProgressAnimations() {
	const progressBars = document.querySelectorAll('.progress-fill');

	progressBars.forEach(bar => {
		const targetWidth = bar.style.width;
		bar.style.width = '0%';

		setTimeout(() => {
			bar.style.width = targetWidth;
		}, 500);
	});
}

function initializeCourseCardEffects() {
	const courseCards = document.querySelectorAll('.course-card');

	courseCards.forEach(card => {
		card.addEventListener('click', function () {
			const courseId = this.dataset.courseId;
			if (courseId) {
				console.log(`Navigate to course ${courseId}`);
			}
		});
	});
}
