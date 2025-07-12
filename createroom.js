(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const gameSelect = document.getElementById('game-select');
        const dynamicOptionsWrapper = document.getElementById('dynamic-options-wrapper');
        const statusPanel = document.getElementById('status-panel');
        const enableTimerToggle = document.getElementById('enable-timer-toggle');
        const timerControlsWrapper = document.getElementById('timer-controls-wrapper');
        const createRoomBtn = document.getElementById('create-room-btn');
        const cancelCreationBtn = document.getElementById('cancel-creation-btn');
        const privacySection = document.getElementById('privacy-section');
        const timerSlider = document.getElementById('timer-slider');
        const timerValueDisplay = document.getElementById('timer-value-display');
        const templates = { 
            fps: document.getElementById('template-fps')?.innerHTML, 
            moba: document.getElementById('template-moba')?.innerHTML, 
            party: document.getElementById('template-party')?.innerHTML 
        };
        
        const resetForm = () => {
            gameSelect.value = '';
            dynamicOptionsWrapper.innerHTML = '';
            dynamicOptionsWrapper.classList.add('hidden');
            statusPanel.classList.add('hidden');
            privacySection.classList.add('hidden');
            const publicRadio = document.querySelector('input[name="room-privacy"][value="public"]');
            if (publicRadio) publicRadio.checked = true;
            if(enableTimerToggle) enableTimerToggle.checked = true;
            if(timerControlsWrapper) timerControlsWrapper.classList.remove('hidden');
            if(timerSlider) timerSlider.value = 15;
            if(timerValueDisplay) timerValueDisplay.textContent = '15';
        };

        if(createRoomBtn) createRoomBtn.addEventListener('click', () => {
            const settings = {
                game: gameSelect.value,
                privacy: document.querySelector('input[name="room-privacy"]:checked')?.value,
                genreSpecificOption: document.querySelector('.genre-options input:checked')?.value || 'N/A',
                timerEnabled: enableTimerToggle.checked,
                expiresInMinutes: enableTimerToggle.checked ? timerSlider.value : null
            };
            alert(`Room created with settings:\n${JSON.stringify(settings, null, 2)}`);
            window.location.href = 'playnow.html';
        });

        if(cancelCreationBtn) cancelCreationBtn.addEventListener('click', resetForm);
        if(enableTimerToggle) enableTimerToggle.addEventListener('change', () => { if(timerControlsWrapper) timerControlsWrapper.classList.toggle('hidden', !enableTimerToggle.checked); });
        if(timerSlider && timerValueDisplay) timerSlider.addEventListener('input', (e) => { timerValueDisplay.textContent = e.target.value; });

        if(gameSelect) gameSelect.addEventListener('change', (e) => {
            const selectedOption = e.target.selectedOptions[0];
            const value = e.target.value;
            const genre = selectedOption ? selectedOption.dataset.genre : null;
            dynamicOptionsWrapper.innerHTML = '';
            dynamicOptionsWrapper.classList.add('hidden');
            statusPanel.classList.add('hidden');
            privacySection.classList.add('hidden');
            if (value && genre && templates[genre]) {
                dynamicOptionsWrapper.innerHTML = templates[genre];
                dynamicOptionsWrapper.classList.remove('hidden');
                if (privacySection) privacySection.classList.remove('hidden'); 
                if (statusPanel) statusPanel.classList.remove('hidden');
                if (window.setLanguage) {
                    setLanguage(localStorage.getItem('gamicon_lang') || 'en'); 
                }
            } else {
                gameSelect.value = '';
            }
        });
    });
})();