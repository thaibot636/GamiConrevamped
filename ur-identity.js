document.addEventListener('DOMContentLoaded', () => {
    // This function handles the interactive selection logic for all cards
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.tagName === 'INPUT') { return; }

            const input = card.querySelector('input');
            const inputName = input.getAttribute('name');
            const isAlreadySelected = card.classList.contains('selected');

            if (inputName === 'comm-method') {
                document.querySelectorAll('input[name="comm-method"]').forEach(otherInput => {
                    otherInput.checked = false;
                    otherInput.closest('.option-card').classList.remove('selected');
                });
                if (!isAlreadySelected) {
                    card.classList.add('selected');
                    input.checked = true;
                }
            } else if (inputName === 'comm-style') {
                const openAnythingCard = document.getElementById('comm-style-open');
                const isClickingOpenAnything = card.id === 'comm-style-open';

                if (isClickingOpenAnything) {
                    document.querySelectorAll('input[name="comm-style"]').forEach(otherInput => {
                        otherInput.checked = false;
                        otherInput.closest('.option-card').classList.remove('selected');
                    });
                    if (!isAlreadySelected) {
                        openAnythingCard.classList.add('selected');
                        openAnythingCard.querySelector('input').checked = true;
                    }
                } else {
                    if (openAnythingCard.classList.contains('selected')) {
                        openAnythingCard.classList.remove('selected');
                        openAnythingCard.querySelector('input').checked = false;
                    }
                    const selectedStyles = document.querySelectorAll('.option-card.selected input[name="comm-style"]');
                    if (isAlreadySelected) {
                        card.classList.remove('selected');
                        input.checked = false;
                    } else if (selectedStyles.length < 2) {
                        card.classList.add('selected');
                        input.checked = true;
                    }
                }
            } else if (input.type === 'radio') {
                document.querySelectorAll(`input[name="${inputName}"]`).forEach(otherInput => {
                    otherInput.checked = false;
                    otherInput.closest('.option-card').classList.remove('selected');
                });
                if (!isAlreadySelected) {
                   card.classList.add('selected');
                   input.checked = true;
                }
            }
        });
    });
    
    // This function handles the validation when the "Next" button is clicked
    const nextButton = document.getElementById('next-button');
    nextButton.addEventListener('click', (event) => {
        let isValid = true;
        
        // --- Helper function to show an error ---
        const showError = (inputName, message) => {
            const errorElement = document.querySelector(`[data-error-for="${inputName}"]`);
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }
        };

        // --- Clear all previous errors first ---
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });

        // --- Validate Communication Method (Must select 1) ---
        if (document.querySelectorAll('input[name="comm-method"]:checked').length === 0) {
            isValid = false;
            showError('comm-method', 'Please select a communication method.');
        }

        // --- Validate Communication Style (Must select 1 or 2) ---
        if (document.querySelectorAll('input[name="comm-style"]:checked').length === 0) {
            isValid = false;
            showError('comm-style', 'Please select at least one style.');
        }
        
        // --- If all checks pass, proceed ---
        if (isValid) {
            alert("Validation successful! Proceeding to the next page.");
            // For a real website, you would use:
            // window.location.href = document.querySelector('.skip-button').href;
        }
    });
});