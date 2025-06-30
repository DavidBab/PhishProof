document.addEventListener('DOMContentLoaded', function () {
	const phishingBtn = document.getElementById('phishing-button');
	const legitimateBtn = document.getElementById('legitimate-button');
	const resultModal = document.getElementById('result-modal');
	const closeModal = document.querySelector('.close-modal');
	const nextEmailBtn = document.getElementById('next-email');

	// Stats tracking
	let correctAnswers = 0;
	let totalAnswers = 0;

	// Current email data (this would come from your backend/JSON file)
	const currentEmail = {
		isPhishing: true, // This email is actually phishing
		explanation: {
			correct:
				'Correct! This is indeed a phishing email. Here are the red flags:',
			incorrect: "Actually, this is a phishing email. Here's what you missed:",
			signs: [
				"Generic greeting ('Dear Valued Customer' instead of your name)",
				'Urgent language designed to create panic',
				"Suspicious sender domain (check if it's really from PayPal)",
				'Asks you to click a link to verify account information',
				"Creates artificial urgency with '24 hours' deadline",
				'Requests sensitive information via email',
			],
		},
	};

	// Handle phishing button click
	phishingBtn.addEventListener('click', function () {
		showResult(true);
	});

	// Handle legitimate button click
	legitimateBtn.addEventListener('click', function () {
		showResult(false);
	});

	// Close modal handlers
	closeModal.addEventListener('click', closeResultModal);
	window.addEventListener('click', function (e) {
		if (e.target === resultModal) {
			closeResultModal();
		}
	});

	// Next email button
	nextEmailBtn.addEventListener('click', function () {
		closeResultModal();
		loadNextEmail();
	});

	function showResult(userSaysPhishing) {
		const isCorrect = userSaysPhishing === currentEmail.isPhishing;
		totalAnswers++;

		if (isCorrect) {
			correctAnswers++;
		}

		updateStats();

		const resultTitle = document.getElementById('result-title');
		const resultIcon = document.getElementById('result-icon');
		const resultMessage = document.getElementById('result-message');
		const explanation = document.getElementById('explanation');

		// Update modal content
		if (isCorrect) {
			resultTitle.textContent = 'Correct!';
			resultIcon.className = 'result-icon correct';
			resultMessage.textContent = currentEmail.explanation.correct;
		} else {
			resultTitle.textContent = 'Not quite right';
			resultIcon.className = 'result-icon incorrect';
			resultMessage.textContent = currentEmail.explanation.incorrect;
		}

		// Show explanation
		explanation.innerHTML = `
            <h4>Key indicators:</h4>
            <ul>
                ${currentEmail.explanation.signs
									.map(sign => `<li>${sign}</li>`)
									.join('')}
            </ul>
        `;

		// Show modal
		resultModal.classList.remove('hidden');
	}

	function closeResultModal() {
		resultModal.classList.add('hidden');
	}

	function updateStats() {
		const correctStat = document.querySelector('.stat-number');
		const totalStat = document.querySelectorAll('.stat-number')[1];

		correctStat.textContent = correctAnswers;
		totalStat.textContent = totalAnswers;
	}

	function loadNextEmail() {
		// This would load the next email from your data source
		// For now, just show an alert
		alert(
			'Next email would load here. You can implement this to cycle through different emails from your backend.'
		);
	}
});
