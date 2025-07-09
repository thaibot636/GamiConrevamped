document.addEventListener('DOMContentLoaded', () => {

    // --- Define Validation Rules using Translation Keys ---
    const validationRules = {
        'games':       { min: 1, max: 5, messageKey: "errorGameDnaGames" },
        'genre':       { min: 1, max: 3, messageKey: "errorGameDnaGenres" },
        'moba-roles':  { min: 1, max: 5, messageKey: "errorGameDnaRoles" },
        'fps-roles':   { min: 1, max: 5, messageKey: "errorGameDnaRoles" },
        'platform':    { min: 1, max: 5, messageKey: "errorGameDnaPlatform" },
        'active-time': { min: 1, max: 4, messageKey: "errorGameDnaActiveTime" }
    };

    /**
     * Retrieves a translated message from the global 'translations' object.
     * @param {string} key The translation key to look up.
     * @returns {string} The translated message or the key as a fallback.
     */
    const getTranslatedMessage = (key) => {
        const lang = localStorage.getItem('gamicon_lang') || 'en';
        // Ensure the global translations object from translation.js is loaded
        if (typeof translations !== 'undefined' && translations[key] && translations[key][lang]) {
            return translations[key][lang];
        }
        // Fallback returns the English hardcoded message from the original file if needed
        const originalMessages = {
            errorGameDnaGames: "Please select 1 to 5 games.",
            errorGameDnaGenres: "Please select 1 to 3 genres.",
            errorGameDnaRoles: "Please select 1-5 roles, or choose 'All-rounder' / 'Not sure'.",
            errorGameDnaPlatform: "Please select at least 1 platform.",
            errorGameDnaActiveTime: "Please select 1 to 4 time slots."
        };
        return originalMessages[key] || `[${key}]`; // Fallback to original message or key name
    };
    
    // --- Select all relevant elements from the DOM ---
    const form = document.getElementById('game-dna-form');
    const nextButton = document.getElementById('next-button');
    const allCheckboxes = form.querySelectorAll('input[type="checkbox"]');
    const errorMessages = form.querySelectorAll('.error-message');

    // --- Role-switching elements ---
    const genreMobaCheckbox = document.getElementById('genre-moba');
    const genreFpsCheckbox = document.getElementById('genre-fps');
    const mobaRolesSection = document.getElementById('roles-moba');
    const fpsRolesSection = document.getElementById('roles-fps');

    // --- Helper function to update a card's visual style based on its checkbox state ---
    const updateCardStyle = (checkbox) => {
        const cardLabel = checkbox.closest('.option-card');
        if (cardLabel) {
            cardLabel.classList.toggle('selected', checkbox.checked);
        }
    };

    // --- Function to show/hide role sections based on genre selection ---
    const updateRoleSectionsVisibility = () => {
        if (mobaRolesSection && genreMobaCheckbox) {
             mobaRolesSection.classList.toggle('hidden', !genreMobaCheckbox.checked);
        }
        if (fpsRolesSection && genreFpsCheckbox) {
             fpsRolesSection.classList.toggle('hidden', !genreFpsCheckbox.checked);
        }
    };

    // --- NEW: Smart logic handler for role selection ---
    const smartRoleHandler = (groupName, changedCheckbox) => {
        const allCheckboxesInGroup = Array.from(form.querySelectorAll(`input[name="${groupName}"]`));
        const allRounder = allCheckboxesInGroup.find(cb => cb.id && cb.id.includes('all-rounder'));
        const notSure = allCheckboxesInGroup.find(cb => cb.id && cb.id.includes('not-sure'));
        const specificRoles = allCheckboxesInGroup.filter(cb => cb !== allRounder && cb !== notSure);

        const isAllRounder = changedCheckbox === allRounder;
        const isNotSure = changedCheckbox === notSure;
        const isSpecific = specificRoles.includes(changedCheckbox);

        if ((isAllRounder || isNotSure) && changedCheckbox.checked) {
            allCheckboxesInGroup.forEach(cb => {
                if (cb !== changedCheckbox) cb.checked = false;
            });
        }
        
        if (isSpecific && changedCheckbox.checked) {
            if (allRounder) allRounder.checked = false;
            if (notSure) notSure.checked = false;
        }

        const allSpecificAreChecked = specificRoles.length > 0 && specificRoles.every(cb => cb.checked);
        if (allSpecificAreChecked) {
            specificRoles.forEach(cb => cb.checked = false);
            if (allRounder) allRounder.checked = true;
        }

        allCheckboxesInGroup.forEach(updateCardStyle);
    };

    // --- REFACTORED: Main handler for any checkbox change ---
    const handleCheckboxChange = (e) => {
        const checkbox = e.target;
        const groupName = checkbox.name;

        if (groupName === 'moba-roles' || groupName === 'fps-roles') {
            smartRoleHandler(groupName, checkbox);
        } else {
            updateCardStyle(checkbox);
        }

        const rule = validationRules[groupName];
        if (rule) {
            const checkedCount = form.querySelectorAll(`input[name="${groupName}"]:checked`).length;
            if (checkedCount > rule.max) {
                checkbox.checked = false;
                updateCardStyle(checkbox);
                return;
            }
        }
        
        const errorElement = document.querySelector(`[data-error-for="${groupName}"]`);
        if (errorElement) {
            errorElement.classList.remove('visible');
            errorElement.textContent = '';
        }

        if (groupName === 'genre') {
            updateRoleSectionsVisibility();
        }
    };

    // --- Function to validate the entire form when "Next" is clicked ---
    const validateForm = (e) => {
        let isFormValid = true;

        errorMessages.forEach(msg => {
            msg.classList.remove('visible');
            msg.textContent = '';
        });

        for (const groupName in validationRules) {
            const rule = validationRules[groupName];
            const section = document.querySelector(`[data-group="${groupName}"]`);

            if (section && section.classList.contains('hidden')) {
                continue;
            }

            const checkedCount = form.querySelectorAll(`input[name="${groupName}"]:checked`).length;
            const errorElement = document.querySelector(`[data-error-for="${groupName}"]`);

            if (checkedCount < rule.min) {
                isFormValid = false;
                if (errorElement) {
                    // Use the helper function to get the translated message
                    errorElement.textContent = getTranslatedMessage(rule.messageKey);
                    errorElement.classList.add('visible');
                }
            }
        }

        if (!isFormValid) {
            e.preventDefault();
            console.error("Form validation failed. Please check the errors.");
        } else {
            console.log("Form is valid! Proceeding to the next page.");
            window.location.href = nextButton.href;
        }
    };

    // --- Attach Event Listeners ---
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });

    if (nextButton) {
        nextButton.addEventListener('click', validateForm);
    }
    
    // --- Initial Check on Page Load ---
    updateRoleSectionsVisibility();
});
