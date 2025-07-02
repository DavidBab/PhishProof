document.addEventListener('DOMContentLoaded', function () {
	// Initialize course filtering
	initializeCourseFiltering();

	// Initialize progress bar animations
	initializeProgressAnimations();

	// Initialize course card hover effects
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
					card.style.animation = 'fadeIn 0.3s ease-in-out';
				} else {
					card.style.display = 'none';
				}
			});

			// Update course count (optional)
			updateCourseCount(filter);
		});
	});
}

function initializeProgressAnimations() {
	// Animate progress bars on page load
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
		// Add click handler for course selection
		card.addEventListener('click', function () {
			const courseId = this.dataset.courseId;
			if (courseId) {
				// You can add navigation logic here
				console.log(`Navigate to course ${courseId}`);
				// window.location.href = `/course/${courseId}/`;
			}
		});

		// Add keyboard support
		card.setAttribute('tabindex', '0');
		card.addEventListener('keydown', function (e) {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				this.click();
			}
		});
	});
}

function updateCourseCount(activeFilter) {
	const courseCards = document.querySelectorAll('.course-card');
	const visibleCourses = Array.from(courseCards).filter(
		card => card.style.display !== 'none'
	);

	// Update page header with count (optional)
	const pageHeader = document.querySelector('.page-header p');
	if (pageHeader) {
		let filterText = '';
		switch (activeFilter) {
			case 'all':
				filterText = 'all courses';
				break;
			case 'beginner':
			case 'intermediate':
			case 'advanced':
				filterText = `${activeFilter} courses`;
				break;
			case 'not_started':
				filterText = 'courses not started';
				break;
			case 'in_progress':
				filterText = 'courses in progress';
				break;
			case 'completed':
				filterText = 'completed courses';
				break;
			default:
				filterText = 'courses';
		}

		pageHeader.textContent = `Showing ${visibleCourses.length} ${filterText}`;
	}
}

// Utility function to reset filters
function resetFilters() {
	const allButton = document.querySelector('.filter-btn[data-filter="all"]');
	if (allButton) {
		allButton.click();
	}
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .course-card {
        cursor: pointer;
    }
    
    .course-card:focus {
        outline: 2px solid var(--accent);
        outline-offset: 2px;
    }
    
    .filter-btn {
        position: relative;
        overflow: hidden;
    }
    
    .filter-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
        transition: left 0.5s;
    }
    
    .filter-btn:hover::before {
        left: 100%;
    }
`;
document.head.appendChild(style);
