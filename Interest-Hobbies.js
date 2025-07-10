document.addEventListener('DOMContentLoaded', () => {

    // ======================================================= //
    //  CONFIGURATION & SETUP
    // ======================================================= //
    const MAX_SELECTIONS = 10;
    
    // --- Centralized DOM Element Selection ---
    const allCheckboxes = document.querySelectorAll('input[name="hobby"]');
    const finishBtn = document.getElementById('finish-btn');
    const counterElement = document.getElementById('selection-counter');
    const selectionInfoContainer = document.getElementById('selection-info');
    const instructionTextSpan = selectionInfoContainer?.querySelector('[data-translate-key="interestsInstruction"]');
    
    if (!finishBtn || !instructionTextSpan) {
        console.error("Required elements for the interests script are missing. Aborting.");
        return;
    }

    // ======================================================= //
    //  DATA & UI LOGIC
    // ======================================================= //

    const validateAndProceed = (event) => {
        event.preventDefault(); 
        const selectedCheckboxes = document.querySelectorAll('input[name="hobby"]:checked');
        const selectedCount = selectedCheckboxes.length;

        if (selectedCount === 0) {
            showError('interestsWarning_atLeastOne');
        } else {
            const profile = JSON.parse(localStorage.getItem('userProfile')) || {};
            const selectedHobbies = Array.from(selectedCheckboxes).map(cb => cb.nextElementSibling.textContent.trim());
            
            if (!profile.interests) {
                profile.interests = {};
            }
            profile.interests.hobbies = selectedHobbies;
            localStorage.setItem('userProfile', JSON.stringify(profile));
            
            console.log(`Validation successful. Saved ${selectedCount} hobbies.`);
            window.location.href = document.querySelector('.skip-button')?.href || '#';
        }
    };

    const loadExistingSelections = () => {
        const profile = JSON.parse(localStorage.getItem('userProfile')) || {};
        const savedHobbies = profile.interests?.hobbies || [];

        // First, uncheck everything to ensure a clean state
        allCheckboxes.forEach(checkbox => { checkbox.checked = false; });

        // Then, check the boxes based on saved data
        if (savedHobbies.length > 0) {
            allCheckboxes.forEach(checkbox => {
                const labelText = checkbox.nextElementSibling.textContent.trim();
                if (savedHobbies.includes(labelText)) {
                    checkbox.checked = true;
                }
            });
        }
    };

    // This is now the single source of truth for all UI updates
    const updateUI = () => {
        const selectedCount = document.querySelectorAll('input[name="hobby"]:checked').length;
        const limitReached = selectedCount >= MAX_SELECTIONS;

        // Update counter and errors
        counterElement.textContent = `(${selectedCount}/${MAX_SELECTIONS})`;
        if (selectedCount > 0) {
            clearError();
        }

        // Update all checkboxes and labels
        allCheckboxes.forEach(checkbox => {
            const parentLabel = checkbox.closest('.hobby-tag');
            parentLabel?.classList.toggle('selected', checkbox.checked);

            if (!checkbox.checked && limitReached) {
                checkbox.disabled = true;
                parentLabel?.classList.add('disabled');
            } else {
                checkbox.disabled = false;
                parentLabel?.classList.remove('disabled');
            }
        });
    };
    
    // ======================================================= //
    //  HELPER FUNCTIONS (Unchanged)
    // ======================================================= //
    const getTranslatedMessage = (key) => { /* ... unchanged ... */ return 'Please pick at least one of the options.'; };
    const showError = (messageKey) => { instructionTextSpan.textContent = getTranslatedMessage(messageKey); selectionInfoContainer.classList.add('error-state'); };
    const clearError = () => { if (selectionInfoContainer.classList.contains('error-state')) { const originalTextKey = instructionTextSpan.dataset.translateKey; instructionTextSpan.textContent = getTranslatedMessage(originalTextKey); selectionInfoContainer.classList.remove('error-state'); } };
    
    // ======================================================= //
    //  INITIALIZATION
    // ======================================================= //

    // Combined initialization logic to be called on page load and page show
    function initializeUI() {
        loadExistingSelections();
        updateUI();
    }
    
    // Attach event listeners ONLY ONCE
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateUI);
    });
    finishBtn.addEventListener('click', validateAndProceed);
    
    // --- BUG FIX: Use 'pageshow' to handle back-navigation from bfcache ---
    window.addEventListener('pageshow', (event) => {
        // `event.persisted` is true if the page was restored from bfcache.
        if (event.persisted) {
            console.log("Page loaded from bfcache. Re-initializing UI.");
            initializeUI();
        }
    });

    // --- SCRIPT KICK-OFF ---
    // Run this on initial load
    initializeUI();
});
