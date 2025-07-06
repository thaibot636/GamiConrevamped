document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Logic ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Translation Logic for this Page ---

    // 1. TRANSLATION DICTIONARY
    const translations = {
        en: {
            navHome: "Home",
            navProducts: "Products",
            navResources: "Resources", 
            navContactus: 'Contact Us',
            login: "Log In",
            signup: "Sign Up",
            menu: "MENU",
            productsTitle: "SUBSCRIPTION PLANS",
            productsSubtitle: "Unlock premium perks with our subscription: enjoy an ad-free experience, unlimited swipes and rewinds, and get prioritized likes—your profile will be shown first to others before non-subscribers!",
            planFortnight: "Fortnightly Plan",
            plan1Month: "1-Month Plan",
            plan3Months: "3-Month Plan",
            plan6Months: "6-Month Plan",
            plan12Months: "12-Month Plan",
            bestValue: "★BEST VALUE★",
            select: "Select",
            baht: "Baht",
            perMonth: "/Month",
            week: "/Week",
            footer: "© 2024 GamiCon. All Rights Reserved."
        },
        th: {
            navHome: "หน้าแรก",
            navProducts: "สินค้า",
            navResources: "คลังข้อมูล", 
            navContactus: 'ติดต่อเรา',
            login: "เข้าสู่ระบบ",
            signup: "สมัครสมาชิก",
            menu: "เมนู",
            productsTitle: "แพ็กเกจสมาชิก",
            productsSubtitle: "ปลดล็อกสิทธิพิเศษระดับพรีเมียมด้วยการสมัครสมาชิก: เพลิดเพลินกับประสบการณ์แบบไม่มีโฆษณา, ปัดและย้อนกลับได้ไม่จำกัด, และรับไลค์ก่อนใคร—โปรไฟล์ของคุณจะแสดงให้คนอื่นเห็นก่อนผู้ที่ไม่ได้เป็นสมาชิก!",
            planFortnight: "แผน 2 สัปดาห์",
            plan1Month: "แผน 1 เดือน",
            plan3Months: "แผน 3 เดือน",
            plan6Months: "แผน 6 เดือน",
            plan12Months: "แผน 12 เดือน",
            bestValue: "★คุ้มที่สุด★",
            select: "เลือก",
            baht: "บาท",
            perMonth: "/เดือน",
            week: "/สัปดาห์",
            footer: "© 2024 GamiCon. สงวนลิขสิทธิ์."
        }
    };

    // 2. LANGUAGE MANAGEMENT FUNCTIONS
    const getLanguage = () => {
        // Use the global 'gamicon_lang' for consistency with other pages
        return localStorage.getItem('gamicon_lang') || 'en';
    };

    const setLanguage = (lang) => {
        // Use the global 'gamicon_lang' for consistency
        localStorage.setItem('gamicon_lang', lang);
        document.documentElement.lang = lang;
        
        document.querySelectorAll('[data-translate-key]').forEach(element => {
            const key = element.dataset.translateKey;
            // The structure is different here: translations -> lang -> key
            const translation = translations[lang][key];
            if (translation !== undefined) {
                element.innerHTML = translation;
            }
        });

        // Update the language toggle buttons
        const langToggleButtons = document.querySelectorAll('.lang-toggle');
        const newToggleText = lang === 'en' ? 'ไทย' : 'EN';
        langToggleButtons.forEach(button => {
            button.textContent = newToggleText;
        });
    };

    // 3. EVENT LISTENERS
    const langToggleButtons = document.querySelectorAll('.lang-toggle');
    langToggleButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const currentLang = getLanguage();
            const newLang = currentLang === 'en' ? 'th' : 'en';
            setLanguage(newLang);
        });
    });

    // 4. INITIALIZATION
    setLanguage(getLanguage());
});
