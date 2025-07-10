document.addEventListener('DOMContentLoaded', () => {
    // ======================================================= //
    //  CONFIGURATION & SETUP
    // ======================================================= //
    const PROFILE_KEY = 'userProfile';
    const NEXT_PAGE_URL = 'Interest-Hobbies.html';

    // --- Validation rules remain the same, defining min and max selections ---
    const validationRules = {
        'comm-method': { min: 1, max: 1, isRequired: true, messageKey: 'errorCommMethod' },
        'comm-style': { min: 1, max: 2, isRequired: true, messageKey: 'errorCommStyle', maxMessageKey: 'errorMax2Styles' },
        'education': { min: 0, max: 1, isRequired: false },
        'zodiac': { min: 0, max: 1, isRequired: false }
    };

    const form = document.getElementById('identity-form');
    
    // ======================================================= //
    //  STATE MANAGEMENT (Loading and Saving Data)
    // ======================================================= //
    const getProfile = () => JSON.parse(localStorage.getItem(PROFILE_KEY)) || {};
    const saveProfile = (profile) => localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));

    const saveData = () => {
        const profile = getProfile();
        if (!profile.identity) profile.identity = {};
        
        for (const groupName in validationRules) {
            const checkedInputs = Array.from(document.querySelectorAll(`input[name="${groupName}"]:checked`));
            const values = checkedInputs.map(input => input.value);
            profile.identity[groupName] = (validationRules[groupName].max === 1) ? (values[0] || null) : values;
        }
        
        saveProfile(profile);
    };

    const loadData = () => {
        const profile = getProfile();
        if (!profile.identity) return;
        for (const groupName in validationRules) {
            const savedValues = profile.identity[groupName];
            if (!savedValues) continue;
            const valuesArray = Array.isArray(savedValues) ? savedValues : [savedValues];
            valuesArray.forEach(value => {
                const input = document.querySelector(`input[name="${groupName}"][value="${value}"]`);
                if (input) input.checked = true;
            });
        }
        document.querySelectorAll('.option-card input').forEach(updateCardStyle);
    };

    // ======================================================= //
    //  HELPER FUNCTIONS
    // ======================================================= //
    const getTranslatedMessage = (key) => {
        const lang = localStorage.getItem('gamicon_lang') || 'en';
        if (typeof translations !== 'undefined' && translations[key]?.[lang]) return translations[key][lang];
        const fallbacks = {
            errorCommMethod: 'Please select a primary communication method.',
            errorCommStyle: 'Please select 1 or 2 communication styles.',
            errorMax2Styles: 'You can only select a maximum of 2 styles.'
        };
        return fallbacks[key] || `[${key}]`;
    };

    const updateCardStyle = (input) => {
        input.closest('.option-card')?.classList.toggle('selected', input.checked);
    };

    // ======================================================= //
    //  EVENT HANDLERS & LOGIC
    // ======================================================= //

    /** Simplified handler for selections */
    const onFormChange = (event) => {
        const input = event.target;
        if (input.tagName !== 'INPUT') return;

        // Handle special logic for comm-style
        if (input.name === 'comm-style') {
            const group = document.querySelectorAll('input[name="comm-style"]');
            const openAnythingInput = document.querySelector('#comm-style-open input');
            
            // If "Open" is checked, uncheck others. If another is checked, uncheck "Open"
            if (input === openAnythingInput && input.checked) {
                group.forEach(i => { if (i !== openAnythingInput) i.checked = false; });
            } else if (input.checked) {
                if (openAnythingInput) openAnythingInput.checked = false;
            }
        }
        
        // Deselect other radio buttons in the same group
        if (input.type === 'radio' && input.checked) {
            document.querySelectorAll(`input[name="${input.name}"]`).forEach(sibling => {
                 if (sibling !== input) sibling.checked = false;
            });
        }
        
        // Update visual styles for all affected inputs
        document.querySelectorAll(`input[name="${input.name}"]`).forEach(updateCardStyle);
    };

    /** Validation logic that runs ONLY on form submission */
    const onFormSubmit = (event) => {
        event.preventDefault(); // Stop navigation to run checks

        let isFormValid = true;

        // Hide all previous errors
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
            el.textContent = '';
        });

        // Loop through all rules and validate each group
        for (const groupName in validationRules) {
            const rule = validationRules[groupName];
            if (!rule.isRequired) continue; // Skip optional groups like education

            const checkedCount = document.querySelectorAll(`input[name="${groupName}"]:checked`).length;
            const errorElement = document.querySelector(`[data-error-for="${groupName}"]`);
            
            let errorMessage = '';
            // *** This part is now fixed to check min AND max ***
            if (checkedCount < rule.min) {
                errorMessage = getTranslatedMessage(rule.messageKey);
            } else if (checkedCount > rule.max) {
                // Use the new maxMessageKey or fallback to the min one
                errorMessage = getTranslatedMessage(rule.maxMessageKey || rule.messageKey);
            }

            if (errorMessage) {
                isFormValid = false;
                if (errorElement) {
                    errorElement.textContent = errorMessage;
                    errorElement.style.display = 'block';
                }
            }
        }
        
        if (isFormValid) {
            console.log("Validation successful! Saving data and proceeding...");
            saveData(); // Save data on success
            window.location.href = NEXT_PAGE_URL; // Navigate to the next page
        } else {
            console.log("Validation failed. Please correct the errors.");
        }
    };

    // ======================================================= //
    //  INITIALIZATION
    // ======================================================= //
    form.addEventListener('change', onFormChange);
    form.addEventListener('submit', onFormSubmit); // Main logic now tied to the SUBMIT event

    loadData(); // Load saved data on page start
});
