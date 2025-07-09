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
        // If no interests are selected, show a styled warning.
        instructionTextSpan.textContent = 'Please pick at least one of the options.';
        selectionInfo.style.color = '#ef4444'; // Light red for visibility
        selectionInfo.style.fontFamily = "'Press Start 2P', cursive";
        selectionInfo.style.fontSize = '0.75rem';
    } else {
        // If at least one interest is selected, proceed.
        console.log('Validation successful! Navigating to the next page.');
        const skipButton = document.querySelector('.skip-button');
        window.location.href = skipButton.href;
    }
});

// Initialize state on page load.
updateSelectionState();
allCheckboxes.forEach(checkbox => {
     checkbox.parentElement.classList.toggle('selected', checkbox.checked);
});