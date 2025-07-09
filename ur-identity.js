document.addEventListener('DOMContentLoaded', () => {

    // ======================================================= //
    //  CONFIGURATION & SETUP
    // ======================================================= //

    // --- Define validation rules in a central, easy-to-manage object ---
    const validationRules = {
        'education':    { min: 0, max: 1 }, // Optional
        'zodiac':       { min: 0, max: 1 }, // Optional
        'comm-method':  { min: 1, max: 1, messageKey: 'errorCommMethod' },
        'comm-style':   { min: 1, max: 2, messageKey: 'errorCommStyle' }
    };

    // --- DOM Element Selection ---
    const form = document.querySelector('form'); // Assume all cards are within a form
    const nextButton = document.getElementById('next-button');


    // ======================================================= //
    //  HELPER FUNCTIONS
    // ======================================================= //

    /**
     * Retrieves a translated message from the global 'translations' object.
     * @param {string} key The translation key to look up.
     * @returns {string} The translated message or a fallback.
     */
    const getTranslatedMessage = (key) => {
        const lang = localStorage.getItem('gamicon_lang') || 'en';
        if (typeof translations !== 'undefined' && translations[key] && translations[key][lang]) {
            return translations[key][lang];
        }
        const fallbackMessages = {
            errorCommMethod: 'Please select a primary communication method.',
            errorCommStyle: 'Please select 1 or 2 communication styles.',
            errorMax2Styles: 'You can select a maximum of 2 styles.'
        };
        return fallbackMessages[key] || `[${key}]`;
    };

    /**
     * Updates the visual style of a card based on its input's checked state.
     * @param {HTMLElement} input The input element (radio or checkbox).
     */
    const updateCardStyle = (input) => {
        const card = input.closest('.option-card');
        if (card) {
            card.classList.toggle('selected', input.checked);
        }
    };


    // ======================================================= //
    //  INTERACTION LOGIC
    // ======================================================= //

    /**
     * Handles the special selection logic for the 'Communication Style' group.
     * - "Open to anything" is mutually exclusive.
     * - Other styles are limited to a max of 2 selections.
     * @param {HTMLElement} changedInput The input element that was just changed.
     */
    const handleCommStyleLogic = (changedInput) => {
        const stylesGroup = document.querySelectorAll('input[name="comm-style"]');
        const openAnythingInput = document.querySelector('#comm-style-open input');
        
        // Rule 1: If "Open to anything" was just checked, uncheck all others.
        if (changedInput === openAnythingInput && changedInput.checked) {
            stylesGroup.forEach(input => {
                if (input !== openAnythingInput) input.checked = false;
            });
        } 
        // Rule 2: If any other style was just checked, uncheck "Open to anything".
        else if (changedInput !== openAnythingInput && changedInput.checked) {
            if (openAnythingInput) openAnythingInput.checked = false;
        }

        // Rule 3: Enforce maximum selection of 2 for specific styles.
        const specificStylesChecked = Array.from(stylesGroup).filter(input => input !== openAnythingInput && input.checked);
        if (specificStylesChecked.length > validationRules['comm-style'].max) {
            changedInput.checked = false; // Revert the last change.
            // Optional: You can provide feedback to the user here.
            // alert(getTranslatedMessage('errorMax2Styles'));
        }
        
        // Finally, update the visual style for all cards in the group.
        stylesGroup.forEach(updateCardStyle);
    };

    /**
     * Handles clicks on any option card to manage input state.
     */
    const handleCardClick = (event) => {
        const card = event.currentTarget;
        const input = card.querySelector('input');
        if (!input) return;

        // If the input itself was clicked, browser handles it. Just let the 'change' event fire.
        if (event.target.tagName === 'INPUT') {
            return;
        }
        
        // Prevent default actions and manually control the input state.
        event.preventDefault();

        const inputType = input.type;
        const isCurrentlyChecked = input.checked;

        if (inputType === 'radio') {
            // Allow de-selection of radio buttons if clicked again
            if (isCurrentlyChecked) {
                input.checked = false;
            } else {
                // De-select all others in the same group first
                document.querySelectorAll(`input[name="${input.name}"]`).forEach(sibling => {
                    sibling.checked = false;
                });
                input.checked = true; // Select the new one
            }
        } else { // Checkbox
            input.checked = !isCurrentlyChecked;
        }
        
        // Dispatch a change event to trigger our specialized logic and validation.
        input.dispatchEvent(new Event('change', { bubbles: true }));
    };


    // ======================================================= //
    //  VALIDATION LOGIC
    // ======================================================= //

    const validateForm = (event) => {
        // Prevent form submission or link navigation to run validation.
        event.preventDefault();
        
        let isFormValid = true;

        // Clear all previous error messages.
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
            el.textContent = '';
        });

        // Loop through the rules to validate the form.
        for (const groupName in validationRules) {
            const rule = validationRules[groupName];
            if (!rule.messageKey) continue; // Skip rules not meant for display validation.
            
            const checkedCount = document.querySelectorAll(`input[name="${groupName}"]:checked`).length;
            const errorElement = document.querySelector(`[data-error-for="${groupName}"]`);

            if (checkedCount < rule.min) {
                isFormValid = false;
                if (errorElement) {
                    errorElement.textContent = getTranslatedMessage(rule.messageKey);
                    errorElement.style.display = 'block';
                }
            }
        }
        
        if (isFormValid) {
            // On success, you would typically navigate or submit.
            console.log("Validation successful! Proceeding...");
            // window.location.href = nextButton.href; 
        }
    };


    // ======================================================= //
    //  EVENT LISTENERS INITIALIZATION
    // ======================================================= //

    // Attach click handler to all cards.
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', handleCardClick);
    });
    
    // Attach change handler to inputs to manage complex logic.
    if (form) {
        form.addEventListener('change', (event) => {
            const input = event.target;

            // Handle special logic for communication styles.
            if (input.name === 'comm-style') {
                handleCommStyleLogic(input);
            }
            // For all other groups, just sync the visual styles.
            else {
                document.querySelectorAll(`input[name="${input.name}"]`).forEach(updateCardStyle);
            }
        });
    }

    // Attach validation logic to the 'Next' button.
    if (nextButton) {
        nextButton.addEventListener('click', validateForm);
    }
    
    // Initial style sync on page load in case of browser auto-fill.
    document.querySelectorAll('.option-card input').forEach(updateCardStyle);
});
