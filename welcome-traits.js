document.addEventListener('DOMContentLoaded', () => {
    // 1. Check for the source parameter in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');

    // Only proceed if the user came from the 'connect' page
    if (source === 'connect') {
        // 2. Select all the links that need to be delayed
        const backLink = document.querySelector('a[data-translate-key="back"]');
        const skipLink = document.querySelector('a[data-translate-key="skip"]');
        const beginMissionLink = document.querySelector('a[data-translate-key="welcomeTraitsBegin"]');
        
        const delayedLinks = [backLink, skipLink, beginMissionLink];

        // 3. Apply the 'link-delayed' class to disable them visually
        delayedLinks.forEach(link => {
            if (link) { // Check if the link exists before adding a class
                link.classList.add('link-delayed');
            }
        });

        // 4. Set a timer for 5 seconds (5000 milliseconds)
        setTimeout(() => {
            // 5. After 5 seconds, remove the class to re-enable the links
            delayedLinks.forEach(link => {
                if (link) {
                    link.classList.remove('link-delayed');
                }
            });
        }, 5000);
    }
});