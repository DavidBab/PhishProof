// Course functionality
document.addEventListener('DOMContentLoaded', function () {
	const filterBtns = document.querySelectorAll('.filter-btn');
	const courseItems = document.querySelectorAll('.course-item');
	const viewAllBtn = document.getElementById('viewAllBtn');
	const hiddenCourses = document.querySelectorAll('.hidden-course');
	const viewAllText = document.querySelector('.view-all-text');
	const viewAllIcon = document.querySelector('.view-all-icon');

	let isExpanded = false;
	let currentFilter = 'all'; // Track current filter

	// View All button functionality
	viewAllBtn.addEventListener('click', function () {
		if (!isExpanded) {
			// Show hidden courses that match the current filter
			hiddenCourses.forEach((course, index) => {
				const courseLevel = course.getAttribute('data-level');

				// Only show if it matches current filter or if filter is 'all'
				if (currentFilter === 'all' || courseLevel === currentFilter) {
					setTimeout(() => {
						course.classList.add('show');
					}, index * 100); // Stagger the animation
				}
			});

			viewAllText.textContent = 'Show Less';
			viewAllBtn.classList.add('expanded');
			isExpanded = true;
		} else {
			// Hide all hidden courses
			hiddenCourses.forEach(course => {
				course.classList.remove('show');
				// Remove inline styles that might interfere
				course.style.display = '';
			});

			viewAllText.textContent = 'View All Courses';
			viewAllBtn.classList.remove('expanded');
			isExpanded = false;
		}
	});

	// Course filtering functionality
	filterBtns.forEach(btn => {
		btn.addEventListener('click', function () {
			// Remove active class from all buttons
			filterBtns.forEach(b => b.classList.remove('active'));
			// Add active class to clicked button
			this.classList.add('active');

			const filter = this.getAttribute('data-filter');
			currentFilter = filter; // Update current filter

			// Count total courses in this filter
			const totalCoursesInFilter = countCoursesInFilter(filter);

			courseItems.forEach(item => {
				// Reset inline styles first
				item.style.display = '';

				if (filter === 'all') {
					if (item.classList.contains('hidden-course')) {
						// For 'all' filter, respect the expanded state or auto-show if <= 5 total courses
						if (totalCoursesInFilter <= 5 || isExpanded) {
							item.classList.add('show');
						} else {
							item.classList.remove('show');
						}
					} else {
						// Always show non-hidden courses
						item.style.display = 'block';
					}
				} else {
					const itemLevel = item.getAttribute('data-level');
					if (itemLevel === filter) {
						if (item.classList.contains('hidden-course')) {
							// For specific filters, auto-show if <= 5 total courses in filter
							if (totalCoursesInFilter <= 5 || isExpanded) {
								item.classList.add('show');
							} else {
								item.classList.remove('show');
							}
						} else {
							// Show matching non-hidden courses
							item.style.display = 'block';
						}
					} else {
						// Hide non-matching courses
						item.style.display = 'none';
						item.classList.remove('show');
					}
				}
			});

			// Update the view all button visibility based on total courses in filter
			updateViewAllButton();
		});
	});

	// Function to count total courses in a filter
	function countCoursesInFilter(filter) {
		let count = 0;
		courseItems.forEach(item => {
			if (filter === 'all') {
				count++;
			} else {
				const itemLevel = item.getAttribute('data-level');
				if (itemLevel === filter) {
					count++;
				}
			}
		});
		return count;
	}

	// Function to update view all button visibility and text
	function updateViewAllButton() {
		const totalCoursesInFilter = countCoursesInFilter(currentFilter);

		// Only show the button if there are more than 5 courses in the current filter
		if (totalCoursesInFilter > 5) {
			viewAllBtn.parentElement.style.display = 'flex';

			// Update button text based on expansion state
			if (isExpanded) {
				viewAllText.textContent = 'Show Less';
				viewAllBtn.classList.add('expanded');
			} else {
				viewAllText.textContent = 'View All Courses';
				viewAllBtn.classList.remove('expanded');
			}
		} else {
			// Hide the button and auto-expand if needed
			viewAllBtn.parentElement.style.display = 'none';

			// Auto-show all courses for this filter since there are <= 5
			if (!isExpanded && totalCoursesInFilter > 0) {
				hiddenCourses.forEach(course => {
					const courseLevel = course.getAttribute('data-level');
					if (currentFilter === 'all' || courseLevel === currentFilter) {
						course.classList.add('show');
					}
				});
			}
		}
	}

	// Function to reset expansion state when changing filters
	function resetExpansionState() {
		const totalCoursesInFilter = countCoursesInFilter(currentFilter);

		if (totalCoursesInFilter <= 5) {
			// Auto-expand for filters with <= 5 courses
			isExpanded = false; // Don't mark as expanded since button won't show
		} else {
			// Keep current expansion state for filters with > 5 courses
			// isExpanded remains as is
		}
	}

	// Initialize view all button state
	updateViewAllButton();

	// Course item click handlers
	courseItems.forEach(item => {
		item.addEventListener('click', function () {
			const courseTitle = this.querySelector('.course-title').textContent;
			const courseStatus = this.classList.contains('completed')
				? 'completed'
				: this.classList.contains('in-progress')
				? 'in-progress'
				: 'not-started';

			if (courseStatus === 'completed') {
				alert(
					`You've already completed "${courseTitle}". Would you like to review it?`
				);
			} else if (courseStatus === 'in-progress') {
				alert(`Continue "${courseTitle}" from where you left off.`);
			} else {
				alert(`Start "${courseTitle}" course.`);
			}
		});
	});
});
