document.addEventListener('DOMContentLoaded', () => {

    // ======================================================= //
    //  CONFIGURATION & SETUP
    // ======================================================= //
    const MAX_SELECTIONS = 10;
    
    // --- Centralized DOM Element Selection ---
    const allCheckboxes = document.querySelectorAll('input[name="hobby"]');
    const finishBtn = document.getElementById('finish-btn'); // Renamed for consistency
    const counterElement = document.getElementById('selection-counter');
    const selectionInfoContainer = document.getElementById('selection-info');
    const instructionTextSpan = selectionInfoContainer?.querySelector('[data-translate-key="interestsInstruction"]');
    
    if (!finishBtn || !instructionTextSpan) {
        console.error("Required elements for the interests script are missing. Aborting.");
        return;
    }

    // ======================================================= //
    //  HELPER FUNCTIONS
    // ======================================================= //
    const getTranslatedMessage = (key) => {
        const lang = localStorage.getItem('gamicon_lang') || 'en';
        if (typeof translations !== 'undefined' && translations[key] && translations[key][lang]) {
            return translations[key][lang];
        }
        return 'Please pick at least one of the options.'; // Fallback
    };
    
    const showError = (messageKey) => {
        instructionTextSpan.textContent = getTranslatedMessage(messageKey);
        selectionInfoContainer.classList.add('error-state'); // Assumes you create an .error-state CSS class
    };

    const clearError = () => {
        if (selectionInfoContainer.classList.contains('error-state')) {
            const originalTextKey = instructionTextSpan.dataset.translateKey;
            instructionTextSpan.textContent = getTranslatedMessage(originalTextKey); // Reset to original message
            selectionInfoContainer.classList.remove('error-state');
        }
    };
    
    // ======================================================= //
    //  CORE UI & VALIDATION LOGIC
    // ======================================================= //
    
    const updateUI = () => {
        const selectedCount = document.querySelectorAll('input[name="hobby"]:checked').length;
        
        if (counterElement) {
            counterElement.textContent = `(${selectedCount}/${MAX_SELECTIONS})`;
        }
        
        if (selectedCount > 0) {
            clearError();
        }

        const limitReached = selectedCount >= MAX_SELECTIONS;

        allCheckboxes.forEach(checkbox => {
            // THE KEY CHANGE IS HERE: We now target '.hobby-tag' instead of '.hobby-card'
            const parentLabel = checkbox.closest('.hobby-tag');
            
            if (!checkbox.checked && limitReached) {
                checkbox.disabled = true;
                parentLabel?.classList.add('disabled');
            } else {
                checkbox.disabled = false;
                parentLabel?.classList.remove('disabled');
            }
        });
    };

    const validateAndProceed = (event) => {
        event.preventDefault(); 
        const selectedCount = document.querySelectorAll('input[name="hobby"]:checked').length;

        if (selectedCount === 0) {
            showError('interestsWarning_atLeastOne');
        } else {
            console.log(`Validation successful with ${selectedCount} selections.`);
            window.location.href = document.querySelector('.skip-button')?.href || '#';
        }
    };

    // ======================================================= //
    //  EVENT LISTENERS INITIALIZATION
    // ======================================================= //

    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const parentLabel = checkbox.closest('.hobby-tag');
            parentLabel?.classList.toggle('selected', checkbox.checked);
            updateUI();
        });
        
        // Initial styling on load
        checkbox.closest('.hobby-tag')?.classList.toggle('selected', checkbox.checked);
    });

    finishBtn.addEventListener('click', validateAndProceed);

    // Initial call to set up the UI on page load
    updateUI();
});
