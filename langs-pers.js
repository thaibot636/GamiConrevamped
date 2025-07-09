// ========================================================================= //
//  REFACTORED SCRIPT: INTERACTIVE SELECTION & TRANSLATABLE VALIDATION
//  Combines card logic and validation into a robust, extensible module.
// ========================================================================= //

document.addEventListener('DOMContentLoaded', () => {

    // --- Configuration: Define validation rules for each input group ---
    // This makes the form easy to manage and extend.
    // To add a new rule, just add an entry here.
    const validationRules = {
        'language': { min: 1, messageKey: 'errorSelectLanguage' },
        'vibe':     { min: 1, messageKey: 'errorSelectVibe' }
    };

    /**
     * Retrieves a translated message from the global 'translations' object.
     * @param {string} key The translation key to look up (e.g., 'errorSelectLanguage').
     * @returns {string} The translated message or the key as a fallback.
     */
    const getTranslatedMessage = (key) => {
        const lang = localStorage.getItem('gamicon_lang') || 'en'; // Default to English
        // Check if translations and the specific key/language exist
        if (typeof translations !== 'undefined' && translations[key] && translations[key][lang]) {
            return translations[key][lang];
        }
        // Fallback to English from the translations object, or the key itself if not found
        return (translations && translations[key] && translations[key]['en']) ? translations[key]['en'] : `[${key}]`;
    };

    // ========================================================= //
    //  Part 1: Interactive Card Selection & Deselection Logic
    // ========================================================= //
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const input = card.querySelector('input');
            if (!input) return;

            // If the input element itself was the click target, the browser handles
            // the 'checked' state automatically. We just sync the styles.
            if (e.target.tagName === 'INPUT') {
                if (input.type === 'radio') {
                    // For radios, ensure all cards in the group reflect the current state
                    document.querySelectorAll(`input[name="${input.name}"]`).forEach(siblingInput => {
                        siblingInput.closest('.option-card').classList.toggle('selected', siblingInput.checked);
                    });
                } else {
                    card.classList.toggle('selected', input.checked);
                }
                // We don't need to proceed to manual logic
                return;
            }

            // Prevent default action (like following a link) to control behavior
            e.preventDefault();

            // --- Manual Logic for Checkboxes ---
            if (input.type === 'checkbox') {
                input.checked = !input.checked;
                card.classList.toggle('selected', input.checked);
            }

            // --- Manual Logic for Radio Buttons (with deselection feature) ---
            if (input.type === 'radio') {
                if (input.checked) {
                    // Custom feature: allow deselecting a radio button
                    input.checked = false;
                    card.classList.remove('selected');
                } else {
                    // Standard feature: deselect all others in the group first
                    document.querySelectorAll(`input[name="${input.name}"]`).forEach(otherInput => {
                        otherInput.checked = false;
                        otherInput.closest('.option-card').classList.remove('selected');
                    });
                    // Then select the clicked one
                    input.checked = true;
                    card.classList.add('selected');
                }
            }

            // Manually trigger a 'change' event so other scripts (like validation) can react
            input.dispatchEvent(new Event('change', { bubbles: true }));
        });
    });

    // ================================================================ //
    //  Part 2: Dynamic Validation Logic for the 'Next' Button
    // ================================================================ //
    const nextButton = document.getElementById('next-button');
    if (nextButton) {
        nextButton.addEventListener('click', function(event) {
            // Stop the link from navigating to run validation first
            event.preventDefault();

            // Hide all previous error messages before re-validating
            document.querySelectorAll('.error-message').forEach(p => {
                p.style.display = 'none';
                p.textContent = '';
            });

            let isFormValid = true;

            // --- Loop through the validationRules object ---
            for (const groupName in validationRules) {
                const rule = validationRules[groupName];
                const checkedCount = document.querySelectorAll(`input[name="${groupName}"]:checked`).length;
                const errorElement = document.querySelector(`[data-error-for="${groupName}"]`);

                if (checkedCount < rule.min) {
                    isFormValid = false;
                    if (errorElement) {
                        // Use the helper to get the translated error message
                        errorElement.textContent = getTranslatedMessage(rule.messageKey);
                        errorElement.style.display = 'block';
                    }
                }
            }

            // --- If all checks pass, proceed to the next page ---
            if (isFormValid) {
                window.location.href = event.currentTarget.href;
            }
        });
    }
});
