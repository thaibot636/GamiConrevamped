document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURATION ---
    const loadingDuration = 5000; // Total fake loading time in milliseconds
    const redirectPage = 'welcome-traits.html'; // Default page to go to after loading

    // --- DOM ELEMENTS ---
    const percentageText = document.getElementById('percentage-text');
    const statusText = document.getElementById('status-text');
    const progressBarFill = document.getElementById('progress-bar-fill');

    // --- LOCALIZATION & REDIRECTION LOGIC (from your original script) ---
    const urlParams = new URLSearchParams(window.location.search);
    const lang = localStorage.getItem('gamicon_lang') || 'en';
    
    // Self-contained translation object
    const translations = {
        en: ["INITIALIZING...", "CALIBRATING SYSTEMS...", "LOADING ASSETS...", "FINALIZING..."],
        th: ["กำลังเริ่มต้น...", "ปรับเทียบระบบ...", "กำลังโหลดข้อมูล...", "ขั้นตอนสุดท้าย..."],
        complete: { en: "READY!", th: "พร้อมแล้ว!" }
    };

    // Staggered milestones for status messages [progress %, message_index]
    const milestones = [
        [15, 0], 
        [42, 1], 
        [78, 2],
        [95, 3]
    ];
    let currentMilestone = -1;

    let startTime = null;

    /**
     * Determines the correct URL to redirect to.
     */
    function getDestinationUrl() {
        if (urlParams.has('next')) return urlParams.get('next');
        if (urlParams.has('action')) return `login-signup.html?action=${urlParams.get('action')}`;
        return redirectPage;
    }

    /**
     * Main animation loop.
     */
    function updateProgress(timestamp) {
        if (!startTime) startTime = timestamp;

        // Calculate progress as a value from 0.0 to 1.0
        const elapsedTime = timestamp - startTime;
        let progress = Math.min(elapsedTime / loadingDuration, 1.0);
        
        // Update UI
        const displayPercent = Math.floor(progress * 100);
        percentageText.textContent = `${displayPercent}%`;
        progressBarFill.style.width = `${displayPercent}%`;

        // Check for status message update
        const nextMilestone = currentMilestone + 1;
        if (milestones[nextMilestone] && displayPercent >= milestones[nextMilestone][0]) {
            currentMilestone++;
            const messageIndex = milestones[currentMilestone][1];
            statusText.textContent = translations[lang][messageIndex];
        }

        // Loop until complete
        if (progress < 1.0) {
            requestAnimationFrame(updateProgress);
        } else {
            completeAndRedirect();
        }
    }

    /**
     * Handles the final sequence after loading hits 100%.
     */
    function completeAndRedirect() {
        // Final completion state
        statusText.textContent = translations.complete[lang];
        progressBarFill.classList.add('complete'); // Add class for final glow effect
        
        // Wait a moment for the user to see the "READY!" state
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease-out';
            document.body.style.opacity = '0';
            
            // Wait for the fade-out animation to finish before redirecting
            setTimeout(() => {
                window.location.href = getDestinationUrl();
            }, 500);
        }, 800);
    }
    
    // Start the loading animation
    requestAnimationFrame(updateProgress);
});