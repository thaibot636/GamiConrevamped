// [File: write-bios.js] - CORRECTED VERSION

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Get all necessary DOM elements ---
    const statusContainer = document.getElementById('status-container');
    const statusDisplay = document.getElementById('status-display');
    const statusInput = document.getElementById('status-input');
    const saveButton = document.getElementById('save-button');
    const cancelButton = document.getElementById('cancel-button');
    const charCounter = document.getElementById('char-counter');
    const submitNav = document.getElementById('submit-navigation');
    
    const MAX_CHARS = 150;

    // --- 2. Centralized Profile Management (THE FIX) ---
    // These functions ensure we read/write from the same "userProfile" object as the review page.
    const getProfile = () => JSON.parse(localStorage.getItem('userProfile')) || {};
    const saveProfile = (profile) => localStorage.setItem('userProfile', JSON.stringify(profile));
    
    // --- 3. Translation Helper (Unchanged) ---
    function getPlaceholderText() {
        // (This function is unchanged, as it works perfectly)
        const currentLang = localStorage.getItem('gamicon_lang') || 'en';
        if (window.translations && window.translations.writeBioClickToEdit) {
            return window.translations.writeBioClickToEdit[currentLang] || window.translations.writeBioClickToEdit.en;
        }
        return 'Click to edit'; 
    }

    // --- 4. Core Functions (UPDATED) ---

    function loadBioIntoView() {
        // Reads from the correct central profile object
        const profile = getProfile();
        const savedBio = profile.bio; 
        
        const placeholderText = getPlaceholderText();
        
        if (savedBio) {
            statusDisplay.textContent = savedBio;
            statusDisplay.classList.remove('placeholder');
            statusDisplay.classList.add('is-filled');
        } else {
            statusDisplay.textContent = placeholderText;
            statusDisplay.classList.add('placeholder');
            statusDisplay.classList.remove('is-filled');
        }
    }
    
    function setMode(isEditing) {
        if (isEditing) {
            const profile = getProfile();
            // Pre-fill textarea with saved bio (or nothing if placeholder was showing)
            statusInput.value = (statusDisplay.textContent === getPlaceholderText()) ? '' : profile.bio || '';

            statusContainer.classList.add('is-editing');
            submitNav.style.display = 'none'; // Hide submit button while editing
            updateCharCounter();
            statusInput.focus();
        } else {
            statusContainer.classList.remove('is-editing');
            loadBioIntoView(); // Reload display to ensure it's correct
            // Only show submit button if there is a saved bio
            submitNav.style.display = (getProfile().bio) ? 'flex' : 'none';
        }
    }
    
    function updateCharCounter() {
        const currentLength = statusInput.value.length;
        charCounter.textContent = `${currentLength}/${MAX_CHARS}`;
        if (currentLength > MAX_CHARS) {
            charCounter.style.color = '#ef4444';
            statusInput.value = statusInput.value.substring(0, MAX_CHARS); // Enforce limit
        } else {
            charCounter.style.color = '#9ca3af';
        }
    }

    // --- 5. Event Listeners (UPDATED) ---

    statusDisplay.addEventListener('click', () => setMode(true));

    saveButton.addEventListener('click', () => {
        const profile = getProfile();
        profile.bio = statusInput.value.trim(); // Get text and add it to the profile object
        saveProfile(profile); // Save the entire updated profile object
        
        setMode(false); // Switch back to view mode
    });

    cancelButton.addEventListener('click', () => {
        setMode(false); // Discard changes and switch back to view mode
    });
   
    statusInput.addEventListener('input', updateCharCounter);

    // --- 6. Initialization & Language Listener ---
    
    // Initial load: Set the mode based on whether a bio exists.
    if (getProfile().bio) {
        setMode(false); // Has a bio, start in view mode.
    } else {
        setMode(true); // No bio, start in edit mode.
    }

    // Language Toggle Listener (Unchanged, but now calls our updated load function)
    document.querySelectorAll('.lang-toggle').forEach(button => {
        button.addEventListener('click', () => {
            setTimeout(() => {
                const profile = getProfile();
                if (!profile.bio) { // Only update text if placeholder is showing
                    loadBioIntoView();
                }
            }, 50); 
        });
    });
});
