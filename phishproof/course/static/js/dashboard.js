document.addEventListener('DOMContentLoaded', function () {
	// Initialize progress bars
	initializeProgressBars();

	// Initialize course filtering
	initializeCourseFiltering();

	// Initialize course visibility (show first 4, hide rest)
	initializeCourseVisibility();

	// Initialize view all button
	initializeViewAllButton();
});

function initializeProgressBars() {
	// Animate progress bars on page load
	const progressBars = document.querySelectorAll('.progress-fill-large');
	progressBars.forEach(bar => {
		const progress = bar.dataset.progress || 0;
		setTimeout(() => {
			bar.style.width = progress + '%';
		}, 500);
	});

	// Animate course progress bars
	const courseProgressBars = document.querySelectorAll('.progress-fill');
	courseProgressBars.forEach(bar => {
		const progress = bar.style.width || '0%';
		bar.style.width = '0%';
		setTimeout(() => {
			bar.style.width = progress;
		}, 800);
	});
}

function initializeCourseFiltering() {
	const filterButtons = document.querySelectorAll('.filter-btn');
	const courseItems = document.querySelectorAll('.course-item');

	filterButtons.forEach(button => {
		button.addEventListener('click', function () {
			const filter = this.dataset.filter;

			// Update active button
			filterButtons.forEach(btn => btn.classList.remove('active'));
			this.classList.add('active');

			// Filter courses
			courseItems.forEach(course => {
				const courseLevel = course.dataset.level;

				if (filter === 'all' || courseLevel === filter) {
					course.style.display = 'block';
				} else {
					course.style.display = 'none';
				}
			});

			// Update visibility after filtering
			updateCourseVisibility();
		});
	});
}

function initializeCourseVisibility() {
	const courseItems = document.querySelectorAll('.course-item');

	courseItems.forEach((course, index) => {
		if (index >= 4) {
			course.classList.add('hidden');
		}
	});
}

function initializeViewAllButton() {
	const viewAllBtn = document.getElementById('viewAllBtn');
	const viewAllText = document.querySelector('.view-all-text');
	const viewAllIcon = document.querySelector('.view-all-icon');

	if (viewAllBtn) {
		viewAllBtn.addEventListener('click', function () {
			const hiddenCourses = document.querySelectorAll('.course-item.hidden');
			const isExpanded = hiddenCourses.length === 0;

			if (isExpanded) {
				// Collapse - hide courses after first 4
				const courseItems = document.querySelectorAll('.course-item');
				courseItems.forEach((course, index) => {
					if (index >= 4 && course.style.display !== 'none') {
						course.classList.add('hidden');
					}
				});

				viewAllText.textContent = 'View All Courses';
				viewAllIcon.style.transform = 'rotate(0deg)';
			} else {
				// Expand - show all courses
				hiddenCourses.forEach(course => {
					course.classList.remove('hidden');
				});

				viewAllText.textContent = 'Show Less';
				viewAllIcon.style.transform = 'rotate(180deg)';
			}
		});
	}
}

function updateCourseVisibility() {
	const courseItems = document.querySelectorAll('.course-item');
	const visibleCourses = Array.from(courseItems).filter(
		course => course.style.display !== 'none'
	);

	// Reset hidden class
	courseItems.forEach(course => course.classList.remove('hidden'));

	// Hide courses after first 4 visible ones
	visibleCourses.forEach((course, index) => {
		if (index >= 4) {
			course.classList.add('hidden');
		}
	});

	// Reset view all button
	const viewAllText = document.querySelector('.view-all-text');
	const viewAllIcon = document.querySelector('.view-all-icon');

	if (viewAllText && viewAllIcon) {
		viewAllText.textContent = 'View All Courses';
		viewAllIcon.style.transform = 'rotate(0deg)';
	}
}
