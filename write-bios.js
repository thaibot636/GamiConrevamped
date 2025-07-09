document.addEventListener('DOMContentLoaded', () => {
    const statusContainer = document.getElementById('status-container');
    const statusDisplay = document.getElementById('status-display');
    const statusInput = document.getElementById('status-input');
    const saveButton = document.getElementById('save-button');
    const cancelButton = document.getElementById('cancel-button');
    const charCounter = document.getElementById('char-counter');
    const submitNav = document.getElementById('submit-navigation');

    const MAX_CHARS = 150;
    const PLACEHOLDER_TEXT = 'Click to edit';

    function loadStatus() {
        const savedStatus = localStorage.getItem('userBio');
        if (savedStatus) {
            statusDisplay.textContent = savedStatus;
            statusInput.value = savedStatus;
            statusDisplay.classList.remove('placeholder');
            statusDisplay.classList.add('is-filled');
        } else {
            statusDisplay.textContent = PLACEHOLDER_TEXT;
            statusDisplay.classList.add('placeholder');
            statusDisplay.classList.remove('is-filled');
            statusInput.value = '';
        }
        updateCharCounter();
    }
    
    function enterEditMode() {
        if (statusDisplay.textContent === PLACEHOLDER_TEXT) {
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
            statusDisplay.textContent = PLACEHOLDER_TEXT;
            statusDisplay.classList.add('placeholder');
            statusDisplay.classList.remove('is-filled');
        }
        
        exitEditMode();
    });

    cancelButton.addEventListener('click', () => {
        const lastSavedStatus = localStorage.getItem('userBio');
        statusInput.value = lastSavedStatus || '';
        loadStatus();
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
    loadStatus();
});