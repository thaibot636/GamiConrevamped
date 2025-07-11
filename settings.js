// --- TRANSLATION DATA & LOGIC ---
const translations = {
    en: {
        esc: "BACK",
        settingsTitle: "SETTINGS",
        settingsSubtitle: "Customize your GamiCon experience",
        settingsAppearance: "Appearance",
        settingsThemeDefault: "GamiCon",
        settingsThemeDark: "True Dark",
        settingsThemeLight: "Light Gray",
        settingsLanguage: "Language",
        settingsLangEn: "English",
        settingsLangTh: "Thai",
        settingsAccount: "Account",
        settingsComingSoon: "Account management options are coming soon.",
    },
    th: {
        esc: "กลับ",
        settingsTitle: "การตั้งค่า",
        settingsSubtitle: "ปรับแต่งประสบการณ์ GamiCon ของคุณ",
        settingsAppearance: "ธีม",
        settingsThemeDefault: "GamiCon",
        settingsThemeDark: "มืดสนิท",
        settingsThemeLight: "ขาวสว่าง",
        settingsLanguage: "ภาษา",
        settingsLangEn: "อังกฤษ",
        settingsLangTh: "ไทย",
        settingsAccount: "บัญชี",
        settingsComingSoon: "ตัวเลือกการจัดการบัญชีจะมาในเร็ว ๆ นี้",
    }
};

function setLanguage(lang) {
    const langData = translations[lang] || translations.en;
    document.querySelectorAll('[data-translate-key]').forEach(el => {
        const key = el.getAttribute('data-translate-key');
        if (langData[key]) {
            el.textContent = langData[key];
        }
    });
}


// --- MAIN SCRIPT LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    
    // --- THEME LOGIC ---
    const themeButtons = document.querySelectorAll('#theme-light-gray, #theme-default, #theme-true-dark');
    const applyTheme = (theme) => {
        body.className = body.className.replace(/theme-\S+/g, '').trim();
        body.classList.add(theme);
        themeButtons.forEach(btn => btn.classList.toggle('selected', btn.id === theme));
        localStorage.setItem('gamicon_theme', theme);
    };
    themeButtons.forEach(button => button.addEventListener('click', () => applyTheme(button.id)));
    
    // Load saved theme or set default
    applyTheme(localStorage.getItem('gamicon_theme') || 'theme-default');

    // --- LANGUAGE LOGIC ---
    const langButtons = document.querySelectorAll('#lang-en, #lang-th');
    const applyLanguageSelection = (lang) => {
        setLanguage(lang); 
        langButtons.forEach(btn => btn.classList.toggle('selected', btn.id === `lang-${lang}`));
        localStorage.setItem('gamicon_lang', lang);
    };
    langButtons.forEach(button => button.addEventListener('click', () => applyLanguageSelection(button.id.split('-')[1])));

    // Load saved language or set default
    applyLanguageSelection(localStorage.getItem('gamicon_lang') || 'en');

    // --- DYNAMIC "BACK" BUTTON LOGIC ---
    const closeButton = document.querySelector('.close-button-esc');
    const urlParams = new URLSearchParams(window.location.search);
    const returnPage = urlParams.get('from');

    if (returnPage) {
        closeButton.href = returnPage;
    } else {
        closeButton.href = 'home1.html'; 
    }
});