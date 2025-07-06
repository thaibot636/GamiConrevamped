document.addEventListener('DOMContentLoaded', () => {
    // Check if the dependency loaded. This is a good defensive practice.
    if (typeof translations === 'undefined') {
        console.error('TOS Page Error: The global "translations" object is not available.');
        return;
    }
    
    const username = localStorage.getItem('gamicon_username');
    const welcomeHeader = document.getElementById('welcome-header');

    // This part only runs IF a username was saved from the previous page
    if (username && welcomeHeader) {
        const lang = localStorage.getItem('gamicon_lang') || 'en';
        
        // Get the translated "Welcome," text from the global dictionary
        const welcomeText = translations.welcomeUser[lang] || 'Welcome,';

        // Sanitize username to prevent potential HTML injection, although modern browsers handle this well.
        const sanitizedUsername = username.replace(/</g, "<").replace(/>/g, ">");

        // Overwrite the header content with the personalized, translated message
        welcomeHeader.innerHTML = `<span style="font-size: 0.8em; font-family: 'Poppins', sans-serif; font-weight: 600;">${welcomeText}</span><br>${sanitizedUsername}`;
    }
    // If there is no username, the default 'welcomeTo' translation will be applied 
    // automatically by translation.js, so no 'else' block is needed.
});