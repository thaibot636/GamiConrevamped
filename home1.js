// === MODIFIED SCRIPT ===
(() => {
    document.addEventListener('DOMContentLoaded', () => {
        // --- THEME CONTROL LOGIC ---
        const applyTheme = (theme) => {
            const effectiveTheme = theme || 'theme-default';
            document.body.className = document.body.className.replace(/theme-\S+/g, '');
            document.body.classList.add(effectiveTheme);
        };
        applyTheme(localStorage.getItem('gamicon_theme'));

        // --- NEW: AVATAR AND PROFILE DATA LOGIC ---
        // Get the full profile, which includes media and username.
        const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
        const username = userProfile.username || localStorage.getItem('gamicon_username') || 'PlayerOne'; // Fallback logic

        // Set the avatar image source if available
        const sidebarAvatar = document.getElementById('sidebar-avatar');
        if (sidebarAvatar && userProfile.media && userProfile.media.photos && userProfile.media.photos.length > 0 && userProfile.media.photos[0]) {
            sidebarAvatar.src = userProfile.media.photos[0];
        }

        // --- Rest of the existing interactive script ---
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebar-overlay');
        const sidebarCloseButton = document.getElementById('sidebar-close-button');
        const dashboardMenu = document.getElementById('dashboard-menu');
        const profileTrigger = document.getElementById('profile-trigger');
        const statusPopup = document.getElementById('status-popup');

        if (typeof window.translations === 'undefined') {
            console.warn("translation.js not found or loaded. Using mock data.");
            window.translations = {
                statusOnline: { en: 'Online', th: 'ออนไลน์' },
                statusIdle: { en: 'Idle', th: 'ไม่ว่าง' },
                statusDnd: { en: 'Do Not Disturb', th: 'ห้ามรบกวน' },
                statusInvisible: { en: 'Invisible', th: 'ล่องหน' }
            };
        }

        const lang = localStorage.getItem('gamicon_lang') || 'en';
        const currentStatus = localStorage.getItem('gamicon_status') || 'online';
        const statusConfig = { online: { langKey: 'statusOnline' }, idle: { langKey: 'statusIdle' }, dnd: { langKey: 'statusDnd' }, invisible: { langKey: 'statusInvisible' } };

        const openSidebar = () => { if (sidebar && sidebarOverlay) { sidebar.classList.remove('-translate-x-full'); sidebarOverlay.classList.remove('hidden'); } };
        const closeSidebar = () => { if (sidebar && sidebarOverlay) { sidebar.classList.add('-translate-x-full'); sidebarOverlay.classList.add('hidden'); } };
        if (mobileMenuButton) mobileMenuButton.addEventListener('click', (e) => { e.stopPropagation(); openSidebar(); });
        if (sidebarCloseButton) sidebarCloseButton.addEventListener('click', (e) => { e.stopPropagation(); closeSidebar(); });
        if (sidebarOverlay) sidebarOverlay.addEventListener('click', (e) => { e.stopPropagation(); closeSidebar(); });

        if (dashboardMenu) {
            const dashboardTrigger = dashboardMenu.querySelector('.nav-menu-trigger');
            if (dashboardTrigger) dashboardTrigger.addEventListener('click', (e) => { e.preventDefault(); dashboardMenu.classList.toggle('is-open'); });
        }

        if (profileTrigger && statusPopup) {
            const statusDot = document.getElementById('status-dot');
            const popupStatusText = document.getElementById('popup-status-text');
            const sidebarUsername = document.getElementById('sidebar-username');
            const mainUsernameEl = document.getElementById('main-username');
            const popupUsername = document.getElementById('popup-username');

            const setStatus = (status) => {
                const config = statusConfig[status] || statusConfig.online;
                if (statusDot) statusDot.className = `status-dot status-${status}`;
                if (popupStatusText && window.translations[config.langKey]) {
                    popupStatusText.textContent = window.translations[config.langKey][lang] || config.langKey;
                }
                localStorage.setItem('gamicon_status', status);
                if(statusPopup) statusPopup.classList.add('hidden');
            };

            if (sidebarUsername) sidebarUsername.textContent = username;
            if (popupUsername) popupUsername.textContent = username;
            if (mainUsernameEl) mainUsernameEl.textContent = username;
            
            const currentPage = window.location.pathname.split('/').pop() || 'home1.html';
            const settingsLink = statusPopup.querySelector('a[href^="settings.html"]');
            if (settingsLink) settingsLink.href = `settings.html?from=${currentPage}`;
            
            profileTrigger.addEventListener('click', (event) => {
                event.stopPropagation();
                const rect = profileTrigger.getBoundingClientRect();
                statusPopup.style.left = `${rect.left}px`;
                statusPopup.style.bottom = `${window.innerHeight - rect.top}px`;
                statusPopup.classList.toggle('hidden');
            });
            document.querySelectorAll('.popup-option[data-status]').forEach(option => {
                option.addEventListener('click', (e) => { e.stopPropagation(); setStatus(e.currentTarget.dataset.status); });
            });
            window.addEventListener('click', () => { if (statusPopup && !statusPopup.classList.contains('hidden')) { statusPopup.classList.add('hidden'); } });
            setStatus(currentStatus);
        }

        // Apply language translations after setting up everything else
        if (window.setLanguage) window.setLanguage(lang);
    });
})();