const maxSelections = 10;
const allCheckboxes = document.querySelectorAll('input[name="hobby"]');
const counterElement = document.getElementById('selection-counter');
const finishBtn = document.getElementById('finish-btn');
const selectionInfo = document.getElementById('selection-info');
const instructionTextSpan = selectionInfo.querySelector('[data-translate-key="interestsInstruction"]');

// Storing original text and style properties to revert back to.
const originalInstructionText = instructionTextSpan.textContent;
const computedStyles = window.getComputedStyle(selectionInfo);
const originalStyles = {
    color: computedStyles.color,
    fontFamily: computedStyles.fontFamily,
    fontSize: computedStyles.fontSize
};

function updateSelectionState() {
    const selectedCount = document.querySelectorAll('input[name="hobby"]:checked').length;
    
    counterElement.textContent = `(${selectedCount}/${maxSelections})`;
    
    // If the user selects an item after seeing the warning, reset the message and styles.
    if (selectedCount > 0 && instructionTextSpan.textContent !== originalInstructionText) {
        instructionTextSpan.textContent = originalInstructionText;
        selectionInfo.style.color = originalStyles.color;
        selectionInfo.style.fontFamily = originalStyles.fontFamily;
        selectionInfo.style.fontSize = originalStyles.fontSize;
    }

    const limitReached = selectedCount >= maxSelections;

    allCheckboxes.forEach(checkbox => {
        const parentLabel = checkbox.parentElement;

        if (!checkbox.checked && limitReached) {
            checkbox.disabled = true;
            parentLabel.classList.add('disabled');
        } else {
            checkbox.disabled = false;
            parentLabel.classList.remove('disabled');
        }
    });
}

allCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        checkbox.parentElement.classList.toggle('selected', checkbox.checked);
        updateSelectionState();
    });
});

finishBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent any default form submission behavior.
    const selectedCount = document.querySelectorAll('input[name="hobby"]:checked').length;

    if (selectedCount === 0) {
        // This part for the warning remains unchanged.
        instructionTextSpan.textContent = 'Please pick at least one of the options.';
        selectionInfo.style.color = '#ef4444'; // Light red for visibility
        selectionInfo.style.fontFamily = "'Press Start 2P', cursive";
        selectionInfo.style.fontSize = '0.75rem';
    } else {
        // --- THIS IS THE UPDATED PART ---
        // On success, redirect to the loading screen.
        console.log('Validation successful! Proceeding to loading screen.');

        // 1. Get the final destination URL (e.g., "add-pictures.html").
        const finalDestination = document.querySelector('.skip-button').href;

        // 2. Redirect to the loading screen and pass the final destination as a parameter.
        window.location.href = `loading2.html?next=${encodeURIComponent(finalDestination)}`;
    }
});

// Initialize state on page load.
updateSelectionState();
allCheckboxes.forEach(checkbox => {
     checkbox.parentElement.classList.toggle('selected', checkbox.checked);
});

