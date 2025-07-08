document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selections ---
    const options = document.querySelectorAll('.option-card');
    const nextButton = document.getElementById('nextButton');
    const warningMessage = document.getElementById('warning-message');
    const optionsGrid = document.getElementById('optionsGrid');
    
    let selectedOption = null;

    // --- Event Listener for Option Cards ---
    options.forEach(option => {
        option.addEventListener('click', () => {
            // Remove 'selected' from the previously chosen option, if any
            if (selectedOption) {
                selectedOption.classList.remove('selected');
            }
            
            // Add 'selected' to the newly clicked option
            option.classList.add('selected');
            
            // Update the tracking variable
            selectedOption = option;
            
            // Hide the warning message as soon as a selection is made
            if (warningMessage.textContent) {
                warningMessage.textContent = '';
                optionsGrid.classList.remove('shake');
            }
        });
    });

    // --- Event Listener for the Next Button ---
    nextButton.addEventListener('click', (event) => {
        // PREVENT the default link behavior
        event.preventDefault();

        if (selectedOption) {
            // If an option IS selected, proceed to the next page
            // The href is taken directly from the button's HTML attribute
            window.location.href = nextButton.href;
        } else {
            // If an option IS NOT selected, show a warning and do not proceed
            warningMessage.textContent = 'Please select one choice to continue.';
            
            // Add a shake animation to the grid for user feedback
            optionsGrid.classList.add('shake');
            
            // Optional: Remove the shake animation class after it completes
            // This allows it to be re-triggered if the user clicks again.
            setTimeout(() => {
                optionsGrid.classList.remove('shake');
            }, 820); // The duration matches the CSS animation
        }
    });
});
