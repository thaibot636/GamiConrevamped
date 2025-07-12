(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const quickJoinSection = document.getElementById('quick-join-section'), 
              quickJoinControls = document.getElementById('quick-join-controls'), 
              quickJoinStatus = document.getElementById('quick-join-status'), 
              quickJoinBtn = document.getElementById('quick-join-btn'), 
              lobbiesWrapper = document.getElementById('lobbies-wrapper'), 
              lobbiesListContainer = document.getElementById('lobbies-list-container'), 
              noLobbiesMessage = document.getElementById('no-lobbies-message');

        if (quickJoinBtn) {
            quickJoinBtn.addEventListener('click', () => {
                if (quickJoinBtn.disabled) return;
                quickJoinBtn.disabled = true; 
                const isSuccess = Math.random() >= 0.3;
                quickJoinControls.classList.add('opacity-0'); 
                lobbiesWrapper.classList.add('opacity-0'); 
                quickJoinSection.classList.add('is-loading');

                setTimeout(() => { 
                    quickJoinControls.classList.add('hidden'); 
                    lobbiesWrapper.classList.add('hidden'); 
                    quickJoinStatus.classList.remove('hidden', 'opacity-0'); 
                    quickJoinStatus.innerHTML = `<svg class="animate-spin -ml-1 mr-3 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span data-translate-key="findingRoom">Finding room...</span>`; 
                    if(window.setLanguage) setLanguage(localStorage.getItem('gamicon_lang')||'en'); 
                }, 300);

                setTimeout(() => { 
                    const span = quickJoinStatus.querySelector('span'); 
                    if (span) { 
                        span.textContent = "Please wait..."; 
                        span.setAttribute('data-translate-key', 'pleaseWait'); 
                        if(window.setLanguage) setLanguage(localStorage.getItem('gamicon_lang')||'en'); 
                    }
                }, 2000);

                setTimeout(() => {
                    quickJoinSection.classList.remove('is-loading'); 
                    lobbiesWrapper.classList.remove('hidden');
                    if (isSuccess) { 
                        lobbiesListContainer.classList.remove('hidden'); 
                        noLobbiesMessage.classList.add('hidden'); 
                        quickJoinSection.classList.add('is-found'); 
                        quickJoinStatus.innerHTML = `<svg class="w-7 h-7 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg><span data-translate-key="foundIt">FOUND IT!!!</span>`; 
                    } else { 
                        lobbiesListContainer.classList.add('hidden'); 
                        noLobbiesMessage.classList.remove('hidden'); 
                        quickJoinSection.classList.add('is-failed'); 
                        quickJoinStatus.innerHTML = `<svg class="w-7 h-7 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg><span data-translate-key="noLobbiesFound">NO LOBBIES FOUND :(</span>`; 
                    }
                    if(window.setLanguage) setLanguage(localStorage.getItem('gamicon_lang')||'en');
                    setTimeout(() => lobbiesWrapper.classList.remove('opacity-0'), 50);
                }, 4000);

                setTimeout(() => {
                    quickJoinStatus.classList.add('opacity-0'); 
                    lobbiesWrapper.classList.add('opacity-0');
                    setTimeout(() => { 
                        quickJoinSection.classList.remove('is-found', 'is-failed'); 
                        quickJoinStatus.classList.add('hidden'); 
                        quickJoinStatus.innerHTML = ''; 
                        quickJoinControls.classList.remove('hidden', 'opacity-0'); 
                        lobbiesListContainer.classList.remove('hidden'); 
                        noLobbiesMessage.classList.add('hidden'); 
                        lobbiesWrapper.classList.remove('hidden', 'opacity-0'); 
                        quickJoinBtn.disabled = false; 
                    }, 300);
                }, 7000);
            });
        }
    });
})();

document.addEventListener('DOMContentLoaded', () => {
    const filterGameSelect = document.getElementById('filter-game');
    const filterTypeSelect = document.getElementById('filter-type');
    const lobbiesList = document.getElementById('lobbies-list');
    const noLobbiesMessage = document.getElementById('no-lobbies-message');
    const lobbiesListContainer = document.getElementById('lobbies-list-container');
    
    if (!filterGameSelect || !filterTypeSelect || !lobbiesList || !noLobbiesMessage || !lobbiesListContainer) {
        console.error("Filter elements not found. Filtering will not work.");
        return;
    }

    const roomCards = lobbiesList.querySelectorAll('.room-card');

    const applyFilters = () => {
        const selectedGame = filterGameSelect.value;
        const selectedType = filterTypeSelect.value;
        let visibleCount = 0;

        roomCards.forEach(card => {
            const cardGame = card.dataset.game;
            const cardType = card.dataset.type;

            const gameMatch = (selectedGame === 'all' || selectedGame === cardGame);
            const typeMatch = (selectedType === 'all' || selectedType === cardType);

            if (gameMatch && typeMatch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        if (visibleCount === 0) {
            lobbiesListContainer.style.display = 'none';
            noLobbiesMessage.style.display = 'block';
        } else {
            lobbiesListContainer.style.display = 'block';
            noLobbiesMessage.style.display = 'none';
        }
    };

    filterGameSelect.addEventListener('change', applyFilters);
    filterTypeSelect.addEventListener('change', applyFilters);
});