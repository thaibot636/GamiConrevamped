document.addEventListener('DOMContentLoaded', () => {
    const statusContainer = document.getElementById('status-container');
    const statusDisplay = document.getElementById('status-display');
    const statusInput = document.getElementById('status-input');
    const saveButton = document.getElementById('save-button');
    const cancelButton = document.getElementById('cancel-button');
    const charCounter = document.getElementById('char-counter');
    const submitNav = document.getElementById('submit-navigation');

    const MAX_CHARS = 150;
    
    // Helper function to get the correct translation for the placeholder text
    // It depends on the global `translations` object from translation.js
    function getPlaceholderText() {
        const currentLang = localStorage.getItem('gamicon_lang') || 'en';
        if (window.translations && window.translations.writeBioClickToEdit) {
            return window.translations.writeBioClickToEdit[currentLang] || window.translations.writeBioClickToEdit.en;
        }
        return 'Click to edit'; // Fallback if translations haven't loaded
    }

    function loadStatus() {
        const savedStatus = localStorage.getItem('userBio');
        const placeholderText = getPlaceholderText();
        
        if (savedStatus) {
            statusDisplay.textContent = savedStatus;
            statusInput.value = savedStatus;
            statusDisplay.classList.remove('placeholder');
            statusDisplay.classList.add('is-filled');
        } else {
            statusDisplay.textContent = placeholderText;
            statusDisplay.classList.add('placeholder');
            statusDisplay.classList.remove('is-filled');
            statusInput.value = '';
        }
        updateCharCounter();
    }
    
    function enterEditMode() {
        // Use the helper to check against the currently translated placeholder
        if (statusDisplay.textContent === getPlaceholderText()) {
            statusInput.value = '';
        }
        statusContainer.classList.add('is-editing');
        submitNav.style.display = 'none';
        statusInput.focus();
        updateCharCounter();
    }

    function exitEditMode() {
        statusContainer.classList.remove('is-editing');
        submitNav.style.display = 'flex';
    }

    statusDisplay.addEventListener('click', enterEditMode);

    saveButton.addEventListener('click', () => {
        const newStatus = statusInput.value.trim();
        localStorage.setItem('userBio', newStatus);
       
        if (newStatus) {
            statusDisplay.textContent = newStatus;
            statusDisplay.classList.remove('placeholder');
            statusDisplay.classList.add('is-filled');
        } else {
            // Use the helper to set the correct translated placeholder
            statusDisplay.textContent = getPlaceholderText();
            statusDisplay.classList.add('placeholder');
            statusDisplay.classList.remove('is-filled');
        }
        
        exitEditMode();
    });

    cancelButton.addEventListener('click', () => {
        const lastSavedStatus = localStorage.getItem('userBio');
        statusInput.value = lastSavedStatus || '';
        loadStatus(); // Rerunning loadStatus ensures the placeholder text is correct
        exitEditMode();
    });

    function updateCharCounter() {
        const currentLength = statusInput.value.length;
        charCounter.textContent = `${currentLength}/${MAX_CHARS}`;
        if (currentLength > MAX_CHARS) {
            charCounter.style.color = '#ef4444';
        } else {
            charCounter.style.color = '#9ca3af';
        }
    }
   
    statusInput.addEventListener('input', updateCharCounter);

    // Initial load of the status text
    loadStatus();
    
    // Add an event listener to the language toggle to re-run loadStatus.
    // This updates the placeholder text if it's currently displayed.
    document.querySelectorAll('.lang-toggle').forEach(button => {
        button.addEventListener('click', () => {
             // We need a tiny delay for the main translation script to update the language in localStorage
            setTimeout(() => {
                const savedStatus = localStorage.getItem('userBio');
                // Only update the text if the placeholder is visible
                if (!savedStatus) {
                    loadStatus();
                }
            }, 50); 
        });
    });
});
