// This is the new, corrected code (The Solution)
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');
    
    // THE FIX: Only run the delay if the source is 'connect' AND
    // a flag called 'hasShownWelcomeDelay' is NOT found in the browser's session memory.
    if (source === 'connect' && !sessionStorage.getItem('hasShownWelcomeDelay')) {

        // Set the flag immediately so it won't run again this session.
        sessionStorage.setItem('hasShownWelcomeDelay', 'true');

        // Select the links to disable
        const backLink = document.querySelector('a[data-translate-key="back"]');
        const skipLink = document.querySelector('a[data-translate-key="skip"]');
        const beginMissionLink = document.querySelector('a[data-translate-key="welcomeTraitsBegin"]');
        
        const delayedLinks = [backLink, skipLink, beginMissionLink];

        // Apply the 'link-delayed' class to disable them
        delayedLinks.forEach(link => {
            if (link) {
                link.classList.add('link-delayed');
            }
        });

        // Set a timer to re-enable the links after 5 seconds
        setTimeout(() => {
            delayedLinks.forEach(link => {
                if (link) {
                    link.classList.remove('link-delayed');
                }
            });
        }, 5000);
    }
});
