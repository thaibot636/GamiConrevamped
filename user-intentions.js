\document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selections ---
    const options = document.querySelectorAll('.option-card');
    const nextButton = document.getElementById('nextButton');
    const warningMessage = document.getElementById('warning-message');
    const optionsGrid = document.getElementById('optionsGrid');
    
    let selectedOption = null;

    // --- Event Listener for Option Cards ---
    options.forEach(option => {
        option.addEventListener('click', () => {
            // Check if the clicked card is ALREADY selected
            if (selectedOption === option) {
                // If yes, DESELECT it and clear the variable
                option.classList.remove('selected');
                selectedOption = null;
            } else {
                // If it's a new selection, proceed as before
                // 1. Remove 'selected' from the previously chosen option, if any
                if (selectedOption) {
                    selectedOption.classList.remove('selected');
                }
                
                // 2. Add 'selected' to the newly clicked option
                option.classList.add('selected');
                
                // 3. Update the tracking variable
                selectedOption = option;
            }
            
            // Hide the warning message only if a selection has just been made
            if (selectedOption && warningMessage.textContent) {
                warningMessage.textContent = '';
                optionsGrid.classList.remove('shake');
            }
        });
    });

    // --- Event Listener for the Next Button ---
    // (This part remains unchanged and works correctly with the new logic)
    nextButton.addEventListener('click', (event) => {
        // PREVENT the default link behavior
        event.preventDefault();

        if (selectedOption) {
            // If an option IS selected, proceed to the next page
            window.location.href = nextButton.href;
        } else {
            // If an option IS NOT selected, show a warning and do not proceed
            warningMessage.textContent = 'Please select one choice to continue.';
            
            // Add a shake animation to the grid for user feedback
            optionsGrid.classList.add('shake');
            
            // Remove the shake animation class after it completes
            setTimeout(() => {
                optionsGrid.classList.remove('shake');
            }, 820); // The duration matches the CSS animation
        }
    });
});
