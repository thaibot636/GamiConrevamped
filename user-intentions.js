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
            // Check if the clicked card is ALREADY selected
            if (selectedOption === option) {
                // If yes, DESELECT it and clear the variable
                option.classList.remove('selected');
                selectedOption = null;
            } else {
                // If it's a new selection, proceed as before
                if (selectedOption) {
                    selectedOption.classList.remove('selected');
                }
                option.classList.add('selected');
                selectedOption = option;
            }
            
            // Hide the warning message if a selection is made
            if (selectedOption && warningMessage.textContent) {
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
            // --- FIX STARTS HERE ---
            // A. Get the value of the selected option from its 'data-value' attribute.
            const selectedValue = selectedOption.dataset.value;

            try {
                // B. Retrieve the existing user profile from localStorage.
                const userProfileJSON = localStorage.getItem('userProfile');
                
                // C. Ensure the profile exists before trying to modify it.
                if (userProfileJSON) {
                    const userProfile = JSON.parse(userProfileJSON);
                    
                    // D. Add the user's intention to the profile object.
                    userProfile.intention = selectedValue;
                    
                    // E. Save the UPDATED profile back to localStorage.
                    localStorage.setItem('userProfile', JSON.stringify(userProfile));
                    
                    console.log('User intention saved:', userProfile);
                } else {
                    console.error('User profile not found in localStorage. Cannot save intention.');
                    // You might want to redirect to the signup page here as a fallback.
                }

            } catch (error) {
                console.error('Failed to update user profile with intention:', error);
            }
            // --- FIX ENDS HERE ---

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
