// ========================================================= //
//  SCRIPT 1: INTERACTIVE CARD SELECTION & DESELECTION LOGIC //
// ========================================================= //
document.querySelectorAll('.option-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const input = card.querySelector('input');
        if (!input) return;

        // If the tiny input circle/box itself was clicked, we just need to sync the styles.
        // This prevents the main logic from running twice and creating bugs.
        if (e.target.tagName === 'INPUT') {
            // For radio buttons, deselect all others in the group first.
            if (input.type === 'radio') {
                document.querySelectorAll(`input[name="${input.name}"]`).forEach(siblingInput => {
                    siblingInput.closest('.option-card').classList.toggle('selected', siblingInput.checked);
                });
            } else {
                // For checkboxes, just toggle the class based on its new state.
                card.classList.toggle('selected', input.checked);
            }
            return;
        }

        // Prevent the default browser action (like following a link) to control behavior manually.
        e.preventDefault();

        // --- Logic for Checkboxes (Languages, Vibe) ---
        if (input.type === 'checkbox') {
            // Manually flip the 'checked' state and sync the visual style.
            input.checked = !input.checked;
            card.classList.toggle('selected', input.checked);
        }

        // --- Logic for Radio Buttons (MBTI) ---
        if (input.type === 'radio') {
            // If the clicked radio is already selected, deselect it.
            if (input.checked) {
                input.checked = false;
                card.classList.remove('selected');
            } 
            // Otherwise, select it and deselect all others in its group.
            else {
                // First, remove 'selected' from all other options in this group.
                document.querySelectorAll(`input[name="${input.name}"]`).forEach(otherInput => {
                    otherInput.checked = false;
                    otherInput.closest('.option-card').classList.remove('selected');
                });
                // Then, add 'selected' to the one that was just clicked.
                input.checked = true;
                card.classList.add('selected');
            }
        }

        // Notify other scripts (like validation) that a change has occurred.
        input.dispatchEvent(new Event('change', { bubbles: true }));
    });
});


// ================================================= //
//  SCRIPT 2: VALIDATION LOGIC FOR THE 'NEXT' BUTTON //
// ================================================= //
document.getElementById('next-button').addEventListener('click', function(event) {
    // Stop the link from navigating immediately to run validation first.
    event.preventDefault();

    // Clear any previous error messages.
    document.querySelectorAll('.error-message').forEach(p => {
        p.style.display = 'none';
        p.textContent = '';
    });

    let isFormValid = true;

    // --- Validate "Languages" (Must select at least 1) ---
    const languagesChecked = document.querySelectorAll('input[name="language"]:checked').length;
    const languageErrorEl = document.querySelector('[data-error-for="language"]');
    
    if (languagesChecked < 1) {
        languageErrorEl.textContent = 'Please select at least one language';
        languageErrorEl.style.display = 'block';
        isFormValid = false;
    }

    // --- Validate "Vibe" (Must select at least 1) ---
    const vibesChecked = document.querySelectorAll('input[name="vibe"]:checked').length;
    const vibeErrorEl = document.querySelector('[data-error-for="vibe"]');

    if (vibesChecked < 1) {
        vibeErrorEl.textContent = 'Please select at least one vibe';
        vibeErrorEl.style.display = 'block';
        isFormValid = false;
    }

    // If all checks passed, proceed to the next page.
    if (isFormValid) {
        window.location.href = event.currentTarget.href;
    }
});