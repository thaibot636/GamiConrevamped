document.addEventListener('DOMContentLoaded', () => {

    // --- Define Validation Rules for all question groups ---
    const validationRules = {
        'games':       { min: 1, max: 5, message: "Please select 1 to 5 games." },
        'genre':       { min: 1, max: 3, message: "Please select 1 to 3 genres." },
        'moba-roles':  { min: 1, max: 2, message: "Please select 1 to 2 MOBA roles." },
        'fps-roles':   { min: 1, max: 2, message: "Please select 1 to 2 FPS roles." },
        'platform':    { min: 1, max: 5, message: "Please select at least 1 platform." },
        'active-time': { min: 1, max: 4, message: "Please select 1 to 4 time slots." }
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

    // --- Function to show/hide role sections based on genre selection ---
    const updateRoleSectionsVisibility = () => {
        // If the elements exist, toggle the 'hidden' class based on checkbox state
        if (mobaRolesSection && genreMobaCheckbox) {
             mobaRolesSection.classList.toggle('hidden', !genreMobaCheckbox.checked);
        }
        if (fpsRolesSection && genreFpsCheckbox) {
             fpsRolesSection.classList.toggle('hidden', !genreFpsCheckbox.checked);
        }
    };

    // --- Function to handle card selection style and check max limit ---
    const handleCheckboxChange = (e) => {
        const checkbox = e.target;
        const cardLabel = checkbox.closest('.option-card');
        const groupName = checkbox.name;

        // Exit if there are no validation rules for this group
        if (!validationRules[groupName]) return;

        const { max } = validationRules[groupName];
        const checkedCount = form.querySelectorAll(`input[name="${groupName}"]:checked`).length;

        // Enforce the MAXIMUM selection limit
        if (checkedCount > max) {
            checkbox.checked = false; // Prevent the user from checking more boxes
            console.warn(`Cannot select more than ${max} options for ${groupName}.`);
            return; // Stop further execution
        }

        // Toggle the .selected class for visual feedback
        cardLabel.classList.toggle('selected', checkbox.checked);

        // Hide any existing error message for this group as the user is fixing it
        const errorElement = document.querySelector(`[data-error-for="${groupName}"]`);
        if (errorElement) {
            errorElement.classList.remove('visible');
            errorElement.textContent = '';
        }

        // Special check: if the changed checkbox is for a genre, update role sections
        if (groupName === 'genre') {
            updateRoleSectionsVisibility();
        }
    };

    // --- Function to validate the entire form when "Next" is clicked ---
    const validateForm = (e) => {
        let isFormValid = true;

        // Hide all previous errors before re-validating
        errorMessages.forEach(msg => {
            msg.classList.remove('visible');
            msg.textContent = '';
        });

        for (const groupName in validationRules) {
            const rule = validationRules[groupName];
            const section = document.querySelector(`[data-group="${groupName}"]`);

            // --- CRITICAL: Skip validation for any section that is currently hidden ---
            if (section && section.classList.contains('hidden')) {
                continue; // Move to the next rule
            }

            const checkedCount = form.querySelectorAll(`input[name="${groupName}"]:checked`).length;
            const errorElement = document.querySelector(`[data-error-for="${groupName}"]`);

            // Check the MINIMUM selection limit
            if (checkedCount < rule.min) {
                isFormValid = false; // Mark the form as invalid
                if (errorElement) {
                    const defaultMessage = `Please select at least ${rule.min} option(s).`;
                    errorElement.textContent = checkedCount === 0 ? defaultMessage : rule.message;
                    errorElement.classList.add('visible'); // Show the error
                }
            }
        }

        // If the form is invalid, prevent the click from navigating to the next page
        if (!isFormValid) {
            e.preventDefault();
            console.error("Form validation failed. Please check the errors.");
        } else {
            console.log("Form is valid! Proceeding to the next page.");
            // Allow the link's default behavior to proceed
            window.location.href = nextButton.href;
        }
    };

    // --- Attach Event Listeners to all elements ---
    allCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
    });

    if (nextButton) {
        nextButton.addEventListener('click', validateForm);
    }
    
    // --- Initial Check on Page Load ---
    // Run this once to set the correct state in case of page refresh
    updateRoleSectionsVisibility();
});