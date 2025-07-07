document.addEventListener('DOMContentLoaded', () => {
    const steamBtn = document.getElementById('steam-btn');
    const riotBtn = document.getElementById('riot-btn');
    const discordBtn = document.getElementById('discord-btn');
    const skipLink = document.querySelector('a[data-translate-key="skip"]');

    const steamUrl = 'https://steamcommunity.com/login/home/';
    const riotUrl = 'https://authenticate.riotgames.com/';
    const discordUrl = 'https://discord.com/login';

    function handleLinkAndLoad(platformUrl, platformName) {
        let profile = JSON.parse(localStorage.getItem('userProfile')) || {};

        if (!profile.connectedAccounts) {
            profile.connectedAccounts = {};
        }

        if (platformName) {
            profile.connectedAccounts[platformName] = true;
        }

        localStorage.setItem('userProfile', JSON.stringify(profile));
        
        // The destination URL now includes our flag to trigger the delay
        const nextUrl = 'welcome-traits.html?source=connect';

        if (platformUrl) {
            window.open(platformUrl, '_blank');
            // We URL-encode the 'next' parameter so the '?' is handled correctly
            window.location.href = `loading.html?next=${encodeURIComponent(nextUrl)}`;
        } else {
            // This runs when the "skip" link is clicked, redirecting with the flag
            window.location.href = nextUrl;
        }
    }

    steamBtn.addEventListener('click', () => handleLinkAndLoad(steamUrl, 'steam'));
    riotBtn.addEventListener('click', () => handleLinkAndLoad(riotUrl, 'riot'));
    discordBtn.addEventListener('click', () => handleLinkAndL_oad(discordUrl, 'discord'));

    skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        handleLinkAndLoad(null, null);
    });
});
