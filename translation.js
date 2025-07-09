// --- THIS IS THE FINAL MASTER DICTIONARY FOR THE ENTIRE WEBSITE ---

// Make the dictionary and the main function globally accessible
let translations = {};
let setLanguage;

document.addEventListener('DOMContentLoaded', () => {
    // Fill the global object with the translations
    translations = {
        // --- Shared (Navbar / Footer / Common Buttons) ---
        navHome: { en: 'Home', th: 'หน้าหลัก' },
        navProducts: { en: 'Products', th: 'ผลิตภัณฑ์' },
        login: { en: 'Log In', th: 'เข้าสู่ระบบ' },
        signup: { en: 'Sign Up', th: 'สมัครสมาชิก' },
        menu: { en: 'MENU', th: 'เมนู' },
        footer: { en: '© 2025 GamiCon. All rights reserved.', th: '© 2025 GamiCon สงวนลิขสิทธิ์' },
        back: { en: 'BACK', th: 'กลับ' },
        skip: { en: 'SKIP >>', th: 'ข้าม >>' },
        backToHome: { en: '.. Back to Home', th: '.. กลับหน้าหลัก' },
        select: { en: 'SELECT', th: 'เลือก' },
        navResources: { en: 'Resources', th: 'คลังข้อมูล'},
        navContactus: { en: 'Contact us', th: 'ติดต่อเรา'},

        // --- index.html ---
        heroSubtitle: { en: 'Buddy Finder for Thai Gamers! Connect via traits, vibes, and games.', th: 'แอปหาเพื่อนเล่นเกมสำหรับคนไทย! เชื่อมต่อผ่านลักษณะนิสัย สไตล์ และเกมที่ใช่' },
        getStarted: { en: 'Get Started Now', th: 'เริ่มเลยตอนนี้' },
        howItWorks: { en: 'How It Works', th: 'วิธีการทำงาน' },
        step1Title: { en: '1. SELECT TRAITS', th: '1. เลือกลักษณะนิสัย' },
        step1Desc: { en: 'Choose your gaming style, vibe, and play times.', th: 'เลือกสไตล์การเล่นเกม สไตล์ส่วนตัว และเวลาที่เล่น' },
        step2Title: { en: '2. MATCH & SWIPE', th: '2. จับคู่และปัด' },
        step2Desc: { en: 'See a list of people who match your traits.', th: 'ดูรายชื่อคนที่ตรงกับลักษณะของคุณ' },
        step3Title: { en: '3. CHAT & GAME', th: '3. แชทและเล่น' },
        step3Desc: { en: 'Jump into games and build lasting squads.', th: 'เริ่มเล่นเกมและสร้างทีมที่ยั่งยืน' },
        ctaTitle: { en: 'Ready to find your buddy?', th: 'พร้อมหาเพื่อนเล่นเกมหรือยัง?' },
        ctaSubtitle: { en: 'Sign up for early access!', th: 'สมัครเพื่อเข้าใช้งานก่อนใคร!' },

        // --- ADDED FOR CONTACT-US.HTML ---
        contactH1: { en: 'Contact HQ', th: 'ติดต่อแอดมิน' },
        contactSubtitle: { en: 'Have a question, feedback, or a partnership idea? Open a comms channel.', th: 'มีคำถาม, ข้อเสนอแนะ, หรือไอเดียสำหรับความร่วมมือ? เปิดช่องทางการสื่อสารได้เลย' },
        contactFormTitle: { en: 'TRANSMISSION FORM', th: 'แบบฟอร์มส่งข้อความ' },
        formPlayerTag: { en: 'PLAYER_TAG:', th: 'ชื่อผู้เล่น:' },
        formEmail: { en: 'EMAIL_ADDRESS:', th: 'อีเมล:' },
        formSubject: { en: 'SUBJECT:', th: 'หัวข้อ:' },
        formMessage: { en: 'MESSAGE:', th: 'ข้อความ:' },
        formSubmit: { en: 'SEND MESSAGE', th: 'ส่งข้อความ' },
        contactDirectLinks: { en: 'DIRECT LINKS', th: 'ลิงก์โดยตรง' },
        contactSupportTitle: { en: 'SUPPORT', th: 'ฝ่ายสนับสนุน' },
        contactSupportDesc: { en: 'For technical issues & support.', th: 'สำหรับปัญหาทางเทคนิคและการสนับสนุน' },
        contactPartnershipsTitle: { en: 'PARTNERSHIPS', th: 'พันธมิตรทางธุรกิจ' },
        contactPartnershipsDesc: { en: 'For business & collaboration.', th: 'สำหรับธุรกิจและความร่วมมือ' },
        contactSocialsTitle: { en: 'SOCIALS', th: 'โซเชียลมีเดีย' },
        contactSocialsDesc: { en: 'Find us on the network.', th: 'พบกับเราบนโซเชียลเน็ตเวิร์ค' },

        // --- products.html ---
        productsTitle: { en: 'SUBSCRIPTION PLANS', th: 'แพ็กเกจสมาชิก' },
        productsSubtitle: { en: 'Unlock a premium experience with an ad-free environment, exclusive cosmetics, and special perks from our game partners.', th: 'ปลดล็อกประสบการณ์พรีเมียม ไร้โฆษณา รับของตกแต่งพิเศษ และสิทธิประโยชน์จากพาร์ทเนอร์เกมของเรา' },
        planFortnight: { en: 'FORTNIGHT', th: 'สองสัปดาห์' },
        plan1Month: { en: '1 MONTH', th: '1 เดือน' },
        plan3Months: { en: '3 MONTHS', th: '3 เดือน' },
        plan6Months: { en: '6 MONTHS', th: '6 เดือน' },
        plan12Months: { en: '12 MONTHS', th: '12 เดือน' },
        baht: { en: 'baht', th: 'บาท' },
        week: { en: '/week', th: '/สัปดาห์' },
        bestValue: { en: '★BEST VALUE★', th: '★คุ้มที่สุด★' },

        // --- index2.html (Sign Up / Log In) ---
        joinHeader: { en: 'Join GamiCon', th: 'Join GamiCon' },
        joinSubtitle: { en: 'Create your account to start', th: 'สร้างบัญชีเพื่อเริ่มต้น' },
        loginHeader: { en: 'Welcome Back', th: 'ยินดีต้อนรับกลับ' },
        loginSubtitle: { en: 'Log in to continue', th: 'เข้าสู่ระบบเพื่อไปต่อ' },
        emailLabel: { en: 'Email', th: 'อีเมล' },
        emailPlaceholder: { en: 'player@email.com', th: 'กรอกอีเมลของผู้ใช้' },
        loginEmailLabel: { en: 'Email / Username', th: 'อีเมล / ชื่อผู้ใช้' },
        loginEmailPlaceholder: { en: 'your_email / username', th: 'อีเมลของคุณ / ชื่อผู้ใช้' },
        usernameLabel: { en: 'Username', th: 'กรอกชื่อผู้ใช้' },
        usernamePlaceholder: { en: 'PlayerOne', th: 'กรอกusername' },
        birthdayLabel: { en: 'Birthday', th: 'วันเกิด (ว/ด/ป)' },
        genderLabel: { en: 'Gender', th: 'เพศ' },
        genderPlaceholder: { en: 'Select your gender...', th: 'เลือกเพศของคุณ...' },
        genderMale: { en: 'Male', th: 'ชาย' },
        genderFemale: { en: 'Female', th: 'หญิง' },
        genderOthers: { en: 'Others', th: 'อื่นๆ' },
        passwordLabel: { en: 'Password', th: 'รหัสผ่าน' },
        passwordPlaceholder: { en: '********', th: '********' },
        confirmPasswordLabel: { en: 'Confirm Password', th: 'ยืนยันรหัสผ่าน' },
        confirmPasswordNote: { en: '*must match password*', th: '*ต้องเหมือนกับรหัสผ่าน*' },
        showPasswordLabel: { en: 'Show Password', th: 'แสดงรหัสผ่าน' },
        errorRequired: { en: '* This field is required *', th: '* กรุณากรอกข้อมูล *' },
        errorEmailRequired: { en: '* Email is required *', th: '* กรุณากรอกอีเมล *' },
        errorUsernameRequired: { en: '* Username is required *', th: '* กรุณากรอกชื่อผู้ใช้ *' },
        errorPasswordMatch: { en: '* Passwords do not match *', th: '* รหัสผ่านไม่ตรงกัน *' },
        errorAge: { en: '* Must be 18 or older *', th: '* ต้องมีอายุ 18 ปีขึ้นไป *' },

        // --- loading.html ---
        loading: { en: 'LOADING...', th: 'กำลังโหลด...' },
        complete: { en: 'COMPLETE!', th: 'เสร็จสิ้น!' },

        // --- tos.html ---
        welcomeTo: { en: 'Welcome to GamiCon', th: 'ยินดีต้อนรับสู่ GamiCon' },
        welcomeUser: { en: 'Welcome,', th: 'ยินดีต้อนรับ,' },
        communityRules: { en: 'COMMUNITY RULES', th: 'กฎของชุมชน' },
        rule1Title: { en: 'BE YOURSELF.', th: 'แสดงตัวตนของคุณ' },
        rule1Desc: { en: 'Make sure your profile, games, and bio are true to who you are.', th: 'ตรวจสอบให้แน่ใจว่าโปรไฟล์ เกม และข้อมูลของคุณเป็นความจริง' },
        rule2Title: { en: 'STAY SAFE.', th: 'ปลอดภัยไว้ก่อน' },
        rule2Desc: { en: "Don't be too quick to give out personal information. Play smart.", th: 'อย่ารีบให้ข้อมูลส่วนตัว เล่นอย่างชาญฉลาด' },
        rule3Title: { en: 'PLAY IT COOL.', th: 'ใจเย็นๆ' },
        rule3Desc: { en: 'Respect other players. No toxicity, rage-quitting, or spamming.', th: 'ให้เกียรติผู้เล่นอื่น ไม่ใช้คำพูดรุนแรง ไม่หัวร้อนออกจากเกม หรือสแปม' },
        rule4Title: { en: 'BE PROACTIVE.', th: 'ช่วยกันสอดส่อง' },
        rule4Desc: { en: 'Always report bad behaviour to keep the community fun.', th: 'รายงานพฤติกรรมที่ไม่เหมาะสมเสมอเพื่อรักษาชุมชนให้น่าสนุกอยู่เสมอ' },
        iAgree: { en: 'I AGREE', th: 'ฉันยอมรับ' },

        // --- index3.html ---
        linkStart: { en: 'LINK START!', th: 'เริ่มการเชื่อมต่อ!' },
        linkSubtitle: { en: 'Link your profiles to find better matches.', th: 'เชื่อมต่อโปรไฟล์เพื่อการจับคู่ที่ดีกว่า' },
        connectSteam: { en: 'Continue with Steam', th: 'เชื่อมต่อด้วย Steam' },
        connectRiot: { en: 'Continue with Riot', th: 'เชื่อมต่อด้วย Riot' },
        connectDiscord: { en: 'Continue with Discord', th: 'เชื่อมต่อด้วย Discord' },

        // --- traits.html ---
        traitsTitle: { en: 'SELECT YOUR TRAITS', th: 'เลือกลักษณะของคุณ' },
        traitsSubtitle: { en: 'This helps us find your perfect squad.', th: 'สิ่งนี้จะช่วยให้เราหาทีมที่สมบูรณ์แบบให้คุณ' },
        gamesHeader: { en: 'GAMES', th: 'เกม' },
        gamesSubheader: { en: '(Select any)', th: '(เลือกกี่อย่างก็ได้)' },
        vibeHeader: { en: 'VIBE', th: 'ฟีลในการเล่น' },
        vibeSubheader: { en: '(Pick up to 2)', th: '(เลือกได้สูงสุด 2 อย่าง)' },
        hoursHeader: { en: 'PLAY HOURS', th: 'เวลาเล่น' },
        hoursSubheader: { en: '(Up to 2)', th: '(สูงสุด 2 อย่าง)' },
        commHeader: { en: 'COMMUNICATION', th: 'การสื่อสาร' },
        commSubheader: { en: '(Pick one)', th: '(เลือกวิธีสื่อสาร 1 อย่าง)' },
        traitTagMoba: { en: 'MOBA', th: 'MOBA' },
        traitTagFps: { en: 'FPS', th: 'FPS' },
        traitTagRpg: { en: 'RPG', th: 'RPG' },
        traitTagStrategy: { en: 'Strategy', th: 'วางแผน' },
        traitTagSandbox: { en: 'Sandbox', th: 'Sandbox' },
        traitTagHorror: { en: 'Horror', th: 'สยองขวัญ' },
        traitTagCasual: { en: 'Casual', th: 'สบายๆ' },
        traitTagCompetitive: { en: 'Competitive', th: 'แข่งขัน' },
        traitTagTryhard: { en: 'Try-hard', th: 'เอาจริง' },
        traitTagChill: { en: 'Chill', th: 'ชิลๆ' },
        traitTagFunny: { en: 'Funny', th: 'ตลก' },
        traitTagFocused: { en: 'Focused', th: 'มุ่งมั่น' },
        traitTagWeekdays: { en: 'Weekdays', th: 'วันธรรมดา' },
        traitTagWeekends: { en: 'Weekends', th: 'สุดสัปดาห์' },
        traitTagLateNight: { en: 'Late Night', th: 'ดึกๆ' },
        traitTagMornings: { en: 'Mornings', th: 'ตอนเช้า' },
        traitTagAnytime: { en: 'Anytime', th: 'ได้ตลอด' },
        traitTagVoice: { en: 'Voice Chat', th: 'คุยเสียง' },
        traitTagPings: { en: 'Pings Only', th: 'ใช้ Pings' },
        traitTagText: { en: 'Text Chat', th: 'พิมพ์แชท' },
        traitTagQuiet: { en: 'Quiet', th: 'เงียบๆ' },
        yourTraits: { en: 'YOUR TRAITS', th: 'ลักษณะของคุณ' },
        noTraits: { en: 'No traits selected', th: 'ยังไม่ได้เลือกลักษณะ' },
        finishSetup: { en: 'FINISH SETUP', th: 'ตั้งค่าเสร็จสิ้น' },
        errorMax2: { en: 'MAX 2!', th: 'เลือกได้ 2 อย่าง!' },
        errorPick1: { en: 'PICK 1', th: 'เลือก 1 อย่าง' },
        errorPickAtLeast1: { en: 'PICK AT LEAST 1', th: 'เลือกอย่างน้อย 1 อย่าง' },
        animProcessing: { en: "WE'RE PROCESSING . . .", th: "กำลังประมวลผล . . ." },
        animCompleting: { en: "COMPLETING YOUR PROFILE . . .", th: "กำลังสร้างโปรไฟล์ . . ." },
        animFusion: { en: 'FUSION!', th: 'รวมร่าง!' },

       // --- game-dna.html (Welcome Traits Part 2) ---
        gameDnaTitle: { en: 'Your Game DNA', th: 'Game DNA ของคุณ' },
        gameDnaSubtitle: { en: "Let’s get to know how, what, and when you play.", th: "มาทำความรู้จักกับสไตล์, เกม, และเวลาที่คุณเล่นกันเถอะ" },
        gameDnaQ_Games: { en: 'What games do you play?', th: 'คุณเล่นเกมอะไรบ้าง?' },
        gameDnaQ_Genres: { en: 'Genres/Categories?', th: 'แนวเกม/หมวดหมู่?' },
        gameDnaQ_MobaRoles: { en: 'MOBA Roles', th: 'ตำแหน่งในเกมส์ MOBA'},
        gameDnaQ_FpsRoles: {en: 'FPS Roles' , th: 'ตำแหน่งในเกมส์ FPS'},
        gameDnaQ_Platform: { en: 'What platform(s) do you play on?', th: 'คุณเล่นบนแพลตฟอร์มอะไร?' },
        platformTip: { en: "Tip: Pick more than one if you're cross-platform", th: 'เคล็ดลับ: เลือกได้มากกว่าหนึ่งถ้าคุณเล่นหลายแพลตฟอร์ม' },
        optionOther: { en: 'Others', th: 'อื่นๆ' },
        gameDnaQ_When: { en: 'When do you usually play?', th: 'คุณมักจะเล่นช่วงไหน?' },
        gameDnaTimeMorning: { en: 'Morning', th: 'ช่วงเช้า' },
        gameDnaTimeAfternoon: { en: 'Afternoon', th: 'ช่วงบ่าย' },
        gameDnaTimeEvening: { en: 'Evening', th: 'ช่วงเย็น' },
        gameDnaActivityAfterWork: { en: 'After work', th: 'หลังเลิกงาน' },
        gameDnaTimeNoFixed: { en: 'No fixed time', th: 'เวลาไม่แน่นอน' },
        gameDnaTime247: { en: '24/7 Gamer', th: 'เล่นตลอด 24/7' },

        // --- main.html / main1.html (Dashboard) ---
        dashHome: { en: 'Home', th: 'หน้าหลัก' },
        dashDashboard: { en: 'Dashboard', th: 'แดชบอร์ด' },
        dashPlayNow: { en: 'Play Now', th: 'เล่นทันที' },
        dashSwipeVipe: { en: 'Swipe & Vipe', th: 'ปัดและไวป์' },
        dashChat: { en: 'Chat', th: 'แชท' },
        dashFriends: { en: 'Friends', th: 'เพื่อน' },
        dashNotifications: { en: 'Notifications', th: 'การแจ้งเตือน' },
        dashWelcome: { en: 'CHOOSE YOUR MISSION,', th: 'เลือกภารกิจของคุณ,' },
        dashSubtitle: { en: 'What are you looking for today?', th: 'วันนี้คุณมองหาอะไรอยู่?' },
        dashLongTerm: { en: 'Find a Long-Term Buddy', th: 'หาเพื่อนเล่นระยะยาว' },
        dashLongTermDesc: { en: 'Swipe through profiles to find your perfect gaming partner.', th: 'ปัดโปรไฟล์เพื่อค้นหาคู่หูเล่นเกมที่สมบูรณ์แบบของคุณ' },
        dashStartSwiping: { en: 'START SWIPING', th: 'เริ่มปัดเลย' },
        dashPlayNowDesc: { en: 'Jump into the action immediately. Browse or create a room.', th: 'เข้าสู่การต่อสู้ทันที ค้นหาหรือสร้างห้อง' },
        dashJoinRoom: { en: 'JOIN A ROOM', th: 'เข้าร่วมห้อง' },

        // --- home1.html (Welcome Page Content) ---
        pageTitleHome: { en: 'Welcome to GamiCon', th: 'ยินดีต้อนรับสู่ GamiCon' },
        homeWelcomeTitle: { en: 'Welcome to GamiCon!', th: 'ยินดีต้อนรับสู่ GamiCon!' },
        homeWelcomeSub: { en: "We're thrilled to have you, {{username}}. Here's a quick guide to get you started.", th: "เราดีใจที่คุณมาเข้าร่วม, {{username}} นี่คือคู่มือฉบับย่อเพื่อช่วยคุณเริ่มต้น" },
        homeStep1Title: { en: 'Step 1: Set Up Your Profile', th: 'ขั้นตอนที่ 1: ตั้งค่าโปรไฟล์ของคุณ' },
        homeStep1Desc: { en: 'Your journey begins with you! Click on your avatar in the bottom-left corner to open the profile menu. From there you can Edit Profile or change your Settings.', th: 'การเดินทางของคุณเริ่มต้นที่นี่! คลิกที่อวตารของคุณที่มุมล่างซ้ายเพื่อเปิดเมนูโปรไฟล์ จากตรงนั้นคุณสามารถแก้ไขโปรไฟล์หรือเปลี่ยนการตั้งค่าของคุณได้' },
        homeStep2Title: { en: 'Step 2: Jump Into a Game', th: 'ขั้นตอนที่ 2: กระโดดเข้าสู่เกม' },
        homeStep2Desc: { en: 'Ready for action? The Dashboard menu on the left has a Play Now button. This is your gateway to finding and joining game rooms.', th: 'พร้อมลุยหรือยัง? เมนูแดชบอร์ดทางด้านซ้ายมีปุ่ม เล่นทันที ซึ่งเป็นประตูสู่การค้นหาและเข้าร่วมห้องเกม' },
        homeStep3Title: { en: 'Step 3: Connect With Friends', th: 'ขั้นตอนที่ 3: เชื่อมต่อกับเพื่อน' },
        homeStep3Desc: { en: 'Gaming is better together. Use the Friends and Chat links in the sidebar to add new friends, manage your friend list, and start conversations.', th: 'เล่นเกมกับเพื่อนสนุกกว่าเสมอ ใช้ลิงก์เพื่อนและแชทในแถบด้านข้างเพื่อเพิ่มเพื่อนใหม่ จัดการรายชื่อเพื่อน และเริ่มการสนทนา' },
        homeCtaButton: { en: 'Find Your Buddy Now!', th: 'ค้นหาเพื่อนซี้ของคุณเลย!' },

        // --- Status Popup (Shared) ---
        statusOnline: { en: 'Online', th: 'ออนไลน์' },
        statusIdle: { en: 'Idle', th: 'ไม่ว่าง' },
        statusDnd: { en: 'Do Not Disturb', th: 'ห้ามรบกวน' },
        statusInvisible: { en: 'Invisible', th: 'ซ่อนตัว' },
        popupEditProfile: { en: 'Edit Profile', th: 'แก้ไขโปรไฟล์' },
        popupSettings: { en: 'Settings', th: 'ตั้งค่า' },
        popupLogout: { en: 'Log Out', th: 'ออกจากระบบ' },

        // --- settings.html ---
        settingsTitle: { en: 'SETTINGS', th: 'การตั้งค่า' },
        settingsSubtitle: { en: 'Customize your experience.', th: 'ปรับแต่งประสบการณ์ของคุณ' },
        settingsAppearance: { en: 'Appearance', th: 'ลักษณะ' },
        settingsThemeLight: { en: 'Light', th: 'สว่าง' },
        settingsThemeDefault: { en: 'Default', th: 'ค่าเริ่มต้น' },
        settingsThemeDark: { en: 'Dark', th: 'มืด' },
        settingsAccount: { en: 'Account', th: 'บัญชี' },
        settingsPrivacy: { en: 'Privacy & Safety', th: 'ความเป็นส่วนตัวและความปลอดภัย' },
        settingsComingSoon: { en: 'Coming Soon...', th: 'เร็วๆ นี้...' },
        settingsLanguage: { en: 'Language', th: 'ภาษา' },
        settingsLangEn: { en: 'English', th: 'อังกฤษ' },
        settingsLangTh: { en: 'Thai', th: 'ไทย' },
        esc: { en: 'ESC', th: 'ESC' },

        // --- playnow.html & createroom.html ---
        playnowTitle: { en: 'Find a Match', th: 'ค้นหาแมตช์' },
        playnowSubtitle: { en: 'Jump into a game right away or create your own.', th: 'กระโดดเข้าสู่เกมทันทีหรือสร้างห้องของคุณเอง' },
        quickJoinTitle: { en: 'Quick Join', th: 'เข้าร่วมด่วน' },
        quickJoinBtn: { en: 'Find Instant Match', th: 'ค้นหาแมตช์ทันที' },
        playnowLobbies: { en: 'Game Lobbies', th: 'ล็อบบี้เกม' },
        filterAllGames: { en: 'All Games', th: 'ทุกเกม' },
        filterAllTypes: { en: 'All Types', th: 'ทุกประเภท' },
        playnowRefresh: { en: 'Refresh', th: 'รีเฟรช' },
        playnowJoin: { en: 'Join', th: 'เข้าร่วม' },
        playnowGenreFPS: { en: 'FPS', th: 'FPS' },
        playnowGenreMOBA: { en: 'MOBA', th: 'MOBA' },
        playnowTypeRanked: { en: 'Ranked', th: 'จัดอันดับ' },
        playnowTypeChill: { en: 'Chill & Chat', th: 'ชิลล์ & คุย' },
        playnowPlayers: { en: 'Players', th: 'ผู้เล่น' },
        playnowNeedSentinel: { en: 'Need Sentinel', th: 'ต้องการ Sentinel' },
        playnowUrgencyExpires: { en: 'Expires in', th: 'หมดอายุใน' },
        playnowUrgencyLooking: { en: 'Looking Now', th: 'กำลังหา' },
        playnowUrgencyStarting: { en: 'Starting Soon!', th: 'เริ่มเร็วๆ นี้!' },
        playnowCreateBtn: { en: 'Create a Room', th: 'สร้างห้อง' },
        backToLobbies: { en: 'Back to Lobbies', th: 'กลับไปที่ล็อบบี้'},
        playnowStep1: { en: 'Step 1: Select Your Game', th: 'ขั้นตอนที่ 1: เลือกเกมของคุณ' },
        playnowChooseGame: { en: '-- Choose a Game --', th: '-- เลือกเกม --' },
        gameLeagueOfLegends: { en: 'League of Legends', th: 'League of Legends'},
        gameDota2: { en: 'Dota 2', th: 'Dota 2' },
        gameValorant: { en: 'Valorant', th: 'Valorant' },
        gameCS2: { en: 'Counter-Strike 2', th: 'Counter-Strike 2' },
        gameFallGuys: { en: 'Fall Guys', th: 'Fall Guys' },
        gameAmongUs: { en: 'Among Us', th: 'Among Us' },
        playnowRolePref: { en: 'PREFERRED ROLE', th: 'บทบาทที่ต้องการ' },
        playnowRole: { en: 'ROLE', th: 'บทบาท' },
        playnowRoleEntry: { en: 'Entry', th: 'ตัวเข้า' },
        playnowRoleSniper: { en: 'Sniper', th: 'สไนเปอร์' },
        playnowRoleIGL: { en: 'IGL', th: 'IGL' },
        playnowRoleFlex: { en: 'Flex', th: 'ตัวยืดหยุ่น' },
        playnowRoleTop: { en: 'Top', th: 'บน' },
        playnowRoleMid: { en: 'Mid', th: 'กลาง' },
        playnowRoleJungle: { en: 'Jungle', th: 'ป่า' },
        playnowRoleADC: { en: 'ADC', th: 'ADC' },
        playnowRoleSupport: { en: 'Support', th: 'ซัพพอร์ต' },
        playnowVibe: { en: 'VIBE', th: 'สไตล์' },
        playnowVibeFunny: { en: 'Funny', th: 'ตลก' },
        playnowVibeCasual: { en: 'Casual', th: 'สบายๆ' },
        playnowVibeTalkative: { en: 'Talkative', th: 'ช่างคุย' },
        playnowVibeNoMic: { en: 'No Mic', th: 'ไม่ใช้ไมค์' },
        playnowRoomStatus: { en: 'Room Status', th: 'สถานะห้อง' },
        playnowCancel: { en: 'Cancel Creation', th: 'ยกเลิกการสร้าง' },

        // --- createroom.html specific ---
        playnowCreateTitle: { en: 'Create a Room', th: 'สร้างห้อง' },
        playnowCreateSubtitle: { en: "Can't find the perfect squad? Set the rules yourself.", th: 'หาทีมที่ใช่ไม่เจอ? ตั้งกฎของคุณเองเลย' },
        playnowStep2: { en: 'Step 2: Set Room Privacy', th: 'ขั้นตอนที่ 2: ตั้งค่าความเป็นส่วนตัวของห้อง' },
        privacyPublic: { en: 'Public', th: 'สาธารณะ' },
        privacyPrivate: { en: 'Private', th: 'ส่วนตัว' },
        privacyPublicDesc: { en: '<b>Public:</b> Anyone can see and join this room.', th: '<b>สาธารณะ:</b> ทุกคนสามารถเห็นและเข้าร่วมห้องนี้ได้' },
        privacyPrivateDesc: { en: '<b>Private:</b> Only users you invite can join.', th: '<b>ส่วนตัว:</b> เฉพาะผู้ใช้ที่คุณเชิญเท่านั้นที่สามารถเข้าร่วมได้' },
        playnowStep3FPS: { en: 'Step 3: FPS Settings', th: 'ขั้นตอนที่ 3: ตั้งค่า FPS' },
        playnowStep3Moba: { en: 'Step 3: MOBA Settings', th: 'ขั้นตอนที่ 3: ตั้งค่า MOBA' },
        playnowStep3Party: { en: 'Step 3: Party Game Settings', th: 'ขั้นตอนที่ 3: ตั้งค่าเกมปาร์ตี้' },
        enableTimer: { en: 'Expiry Timer', th: 'ตัวจับเวลาหมดอายุ' },
        playnowRoomExpiresIn: { en: 'Expires in:', th: 'หมดอายุใน:' },
        playnowMinutes: { en: 'minutes', th: 'นาที' },
        playnowFinalizeCreate: { en: 'Create Room', th: 'สร้างห้อง' },

        // --- swipevibe.html (Finding a Buddy) ---
        swipeTitle: { en: 'Find Your Buddy', th: 'ค้นหาเพื่อนซี้ของคุณ' },
        swipeSubtitle: { en: 'Swipe right if it’s a vibe, left if it’s not.', th: 'ปัดขวาถ้าใช่ ปัดซ้ายถ้าไม่' },
        swipeNoMoreProfiles: { en: 'No more profiles right now. Try expanding your filters!', th: 'ไม่มีโปรไฟล์ในขณะนี้ ลองขยายตัวกรองของคุณ!' },
        swipeViewProfile: { en: 'View Full Profile', th: 'ดูโปรไฟล์ทั้งหมด' },
        swipeReport: { en: 'Report', th: 'รายงาน' },
        swipeBlock: { en: 'Block', th: 'บล็อก' },
        swipeMatchTitle: { en: "It's a Vibe!", th: 'เคมีตรงกัน!' },
        swipeMatchDesc: { en: "You and {{username}} have matched. Start a conversation!", th: 'คุณกับ {{username}} จับคู่กันแล้ว เริ่มบทสนทนาได้เลย!' },
        swipeStartChat: { en: 'Start Chat', th: 'เริ่มแชท' },
        swipeKeepSwiping: { en: 'Keep Swiping', th: 'ปัดต่อ' },
        swipeBio: { en: 'Bio', th: 'เกี่ยวกับฉัน' },
        swipeSharedGames: { en: 'Shared Games', th: 'เกมที่เล่นเหมือนกัน' },
        swipeSharedTraits: { en: 'Shared Traits', th: 'ลักษณะที่เหมือนกัน' },
        swipeRank: { en: 'Rank', th: 'อันดับ' },

        // --- swipevibe.html (Premium Perks) ---
        premiumTitle: { en: 'Unlock Premium Perks', th: 'ปลดล็อกสิทธิพิเศษพรีเมียม' },
        premiumSubtitle: { en: 'Enjoy an ad-free experience, unlimited actions, and get seen first!', th: 'เพลิดเพลินกับประสบการณ์ไร้โฆษณา, การกระทำไม่จำกัด, และโปรไฟล์ถูกมองเห็นก่อน!' },
        premiumUnlimitedRewinds: { en: 'Unlimited Rewinds', th: 'ย้อนกลับไม่จำกัด' },
        premiumUnlimitedSwipes: { en: 'Unlimited Swipes', th: 'ปัดได้ไม่จำกัด' },
        premiumPriorityLikes: { en: 'Priority Likes', th: 'ไลค์ระดับพรีเมียม' },
        premiumAdFree: { en: 'Ad-Free', th: 'ไม่มีโฆษณา' },
        premiumUpgradeBtn: { en: 'Upgrade Now', th: 'อัปเกรดทันที' },

        // --- profiles.html (Edit Profile Page) ---
        profilesTitle: { en: 'Edit Your Profile', th: 'แก้ไขโปรไฟล์ของคุณ' },
        profilesSubtitle: { en: 'This is how other players will see you.', th: 'ผู้เล่นคนอื่นจะเห็นคุณแบบนี้' },
        profilesAvatarSection: { en: 'Profile Picture', th: 'รูปโปรไฟล์' },
        profilesChangeAvatar: { en: 'Change Avatar', th: 'เปลี่ยนรูปโปรไฟล์' },
        profilesBioSection: { en: 'Your Bio', th: 'ประวัติของคุณ' },
        profilesBioPlaceholder: { en: 'Tell others a little about yourself, your playstyle, and what you are looking for...', th: 'บอกเล่าเรื่องราวของคุณ สไตล์การเล่น และสิ่งที่คุณกำลังมองหาให้คนอื่นรู้...' },
        profilesGamesSection: { en: 'Your Games', th: 'เกมของคุณ' },
        profilesEditGames: { en: 'Edit Games', th: 'แก้ไขเกม' },
        profilesTraitsSection: { en: 'Your Traits', th: 'ลักษณะของคุณ' },
        profilesEditTraits: { en: 'Edit Traits', th: 'แก้ไขลักษณะ' },
        profilesSave: { en: 'Save Changes', th: 'บันทึกการเปลี่ยนแปลง' },
        profilesCancel: { en: 'Cancel', th: 'ยกเลิก' },
        profilesEdit: { en: 'Edit', th: 'แก้ไข' }, 

        // --- friends.html ---
        friendsTitle: { en: 'Manage Friends', th: 'จัดการเพื่อน' },
        friendsTabsMyFriends: { en: 'My Friends', th: 'เพื่อนของฉัน' },
        friendsTabsRequests: { en: 'Requests', th: 'คำขอ' },
        friendsTabsAdd: { en: 'Add Friend', th: 'เพิ่มเพื่อน' },
        friendsSearchPlaceholder: { en: 'Enter a username...', th: 'ใส่ชื่อผู้ใช้...' },
        friendsSearchBtn: { en: 'Search', th: 'ค้นหา' },
        friendsAccept: { en: 'Accept', th: 'ยอมรับ' },
        friendsDecline: { en: 'Decline', th: 'ปฏิเสธ' },

        // --- welcome-traits.html ---
        welcomeTraitsTitle: { en: 'YOUR MISSION BRIEFING', th: 'สรุปภารกิจของคุณ' },
        welcomeTraitsDesc1: { en: 'Greetings, Player. To unlock better matches and find your perfect squad, we need to calibrate your core traits.', th: 'สวัสดีผู้เล่น เพื่อปลดล็อกการจับคู่ที่ดีขึ้นและค้นหาทีมที่สมบูรณ์แบบของคุณ เราต้องปรับเทียบลักษณะหลักของคุณ' },
        welcomeTraitsDesc2: { en: 'This is a quick mission—a speedrun that will take under 5 minutes!', th: 'นี่คือภารกิจด่วน—ที่จะใช้เวลาไม่ถึง 5 นาที!' },
        welcomeTraitsBegin: { en: 'BEGIN MISSION', th: 'เริ่มภารกิจ' },
        welcomeTraitsLearnMore: { en: 'Learn more about Personalities and more here', th: 'เรียนรู้เพิ่มเติมเกี่ยวกับบุคลิกภาพและอื่นๆ ที่นี่' },

        // --- user-intentions.html (NEWLY ADDED) ---
        userIntentionBack: { en: 'Back', th: 'กลับ' },
        userIntentionSkip: { en: 'Skip', th: 'ข้าม' },
        userIntentionTitle: { en: 'What are you looking for?', th: 'คุณกำลังมองหาอะไรอยู่?' },
        userIntentionSubtitle: { en: "All good if it changes. There's something for everyone.", th: 'ไม่เป็นไรถ้าเปลี่ยนใจ เรามีบางอย่างสำหรับทุกคน' },
        intentionLongTerm: { en: 'Long term Buddy', th: 'เพื่อนเล่นระยะยาว' },
        intentionPlayNow: { en: 'Play Now, Chill Later', th: 'เล่นตอนนี้ ชิลล์ทีหลัง' },
        intentionRanking: { en: 'Climb the Ranks', th: 'ไต่อันดับ' },
        intentionOneMatch: { en: 'One Match Wonder', th: 'หาเพื่อนเล่นแค่นัดเดียว' },
        intentionFormTeam: { en: 'Form a Team', th: 'สร้างทีม' },
        intentionFiguringOut: { en: 'Still figuring it out', th: 'ยังไม่แน่ใจ' },
        userIntentionNext: { en: 'Next', th: 'ต่อไป' },
    
        // --- game-dna-2.html (Language & Personality) ---
        langPersonalityTitle: { en: 'Language & Personality', th: 'ภาษาและบุคลิก' },
        langPersonalitySubtitle: { en: "Tell us how you vibe and communicate.", th: "บอกเราหน่อยว่าคุณมีสไตล์และสื่อสารอย่างไร" },
        q_language: { en: 'What language(s) do you use while gaming?', th: 'คุณใช้ภาษาอะไรบ้างตอนเล่นเกม?' },
        lang_th: { en: 'Thai', th: 'ภาษาไทย' },
        lang_en: { en: 'English', th: 'ภาษาอังกฤษ' },
        lang_bu: { en: 'Burmese', th: 'ภาษาพม่า' },
        lang_cn: { en: 'Chinese', th: 'ภาษาจีน' },
        lang_kh: { en: 'Khmer', th: 'ภาษาเขมร' },
        q_vibe: { en: 'What’s your in-game vibe like?', th: 'สไตล์การเล่นเกมของคุณเป็นอย่างไร?' },
        vibe_talkative: { en: 'Talkative', th: 'ช่างคุย' },
        vibe_quiet: { en: 'Quiet', th: 'เงียบๆ' },
        vibe_funny: { en: 'Funny', th: 'ตลก' },
        vibe_supportive: { en: 'Supportive', th: 'คอยสนับสนุน' },
        vibe_thinker: { en: 'Thinker', th: 'นักคิด' },
        vibe_planner: { en: 'Planner', th: 'นักวางแผน' },
        vibe_calm: { en: 'Calm', th: 'ใจเย็น' },
        vibe_spontaneous: { en: 'Spontaneous', th: 'ด้นสด' },
        q_mbti_select: { en: "Select your MBTI (Optional)", th: "เลือก MBTI ของคุณ (ไม่บังคับ)" },
        mbti_group_analysts: { en: '🟣 Analysts', th: '🟣 นักวิเคราะห์' },
        mbti_group_diplomats: { en: '🟢 Diplomats', th: '🟢 นักการทูต' },
        mbti_group_sentinels: { en: '🔵 Sentinels', th: '🔵 ผู้เฝ้ายาม' },
        mbti_group_explorers: { en: '🟡 Explorers', th: '🟡 นักสำรวจ' },
        mbti_intj: { en: 'INTJ', th: 'INTJ' },
        mbti_intp: { en: 'INTP', th: 'INTP' },
        mbti_entj: { en: 'ENTJ', th: 'ENTJ' },
        mbti_entp: { en: 'ENTP', th: 'ENTP' },
        mbti_infj: { en: 'INFJ', th: 'INFJ' },
        mbti_infp: { en: 'INFP', th: 'INFP' },
        mbti_enfj: { en: 'ENFJ', th: 'ENFJ' },
        mbti_enfp: { en: 'ENFP', th: 'ENFP' },
        mbti_istj: { en: 'ISTJ', th: 'ISTJ' },
        mbti_isfj: { en: 'ISFJ', th: 'ISFJ' },
        mbti_estj: { en: 'ESTJ', th: 'ESTJ' },
        mbti_esfj: { en: 'ESFJ', th: 'ESFJ' },
        mbti_istp: { en: 'ISTP', th: 'ISTP' },
        mbti_isfp: { en: 'ISFP', th: 'ISFP' },
        mbti_estp: { en: 'ESTP', th: 'ESTP' },
        mbti_esfp: { en: 'ESFP', th: 'ESFP' },
        
        // =============================================
        // UPDATED: Added keys for new tooltips and tips
        // =============================================
        vibe_tooltip: { en: 'Pick 1–3 traits that reflect how you behave or feel while playing. This helps others understand your communication style.', th: 'เลือก 1–3 อย่างที่สะท้อนพฤติกรรมหรือความรู้สึกของคุณตอนเล่นเกม สิ่งนี้จะช่วยให้คนอื่นเข้าใจสไตล์การสื่อสารของคุณ' },
        mbti_tip_text: { en: 'You can skip this or choose one that fits you best. It helps us match based on vibe compatibility!', th: 'คุณสามารถข้ามส่วนนี้หรือเลือกข้อที่ตรงกับคุณที่สุดได้ การเลือกจะช่วยให้เราจับคู่ตามความเข้ากันได้ของสไตล์!' },
        mbti_tooltip_intro: { en: 'Not sure? ', th: 'ไม่แน่ใจ? ' },
        mbti_tooltip_link: { en: 'Take this quick quiz', th: 'ทำแบบทดสอบสั้นๆ นี้' },
        mbti_tooltip_outro: { en: ' to find your type.', th: ' เพื่อค้นหาประเภทของคุณ' },

        // --- game-dna-3.html (Identity & Communication) ---
        identityTitle: { en: 'Your Identity', th: 'ตัวตนของคุณ' },
        identitySubtitle: { en: "Just a few things to match you better (optional, but helpful).", th: "ข้อมูลเล็กน้อยเพื่อการจับคู่ที่ดีขึ้น (ไม่บังคับ แต่มีประโยชน์)" },
        q_education: { en: 'What’s your education level? (Optional)', th: 'ระดับการศึกษาของคุณ? (ไม่บังคับ)' },
        edu_highschool: { en: 'High School', th: 'มัธยมปลาย' },
        edu_bachelor: { en: "Bachelor's", th: 'ปริญญาตรี' },
        edu_trade: { en: 'Trade School', th: 'สายอาชีพ' },
        edu_master: { en: "Master's", th: 'ปริญญาโท' },
        edu_phd: { en: 'PhD', th: 'ปริญญาเอก' },
        q_zodiac: { en: 'What’s your zodiac sign? (Optional)', th: 'ราศีของคุณคืออะไร? (ไม่บังคับ)' },
        zodiac_aries: { en: 'Aries', th: 'ราศีเมษ' },
        zodiac_taurus: { en: 'Taurus', th: 'ราศีพฤษภ' },
        zodiac_gemini: { en: 'Gemini', th: 'ราศีเมถุน' },
        zodiac_cancer: { en: 'Cancer', th: 'ราศีกรกฎ' },
        zodiac_leo: { en: 'Leo', th: 'ราศีสิงห์' },
        zodiac_virgo: { en: 'Virgo', th: 'ราศีกันย์' },
        zodiac_libra: { en: 'Libra', th: 'ราศีตุลย์' },
        zodiac_scorpio: { en: 'Scorpio', th: 'ราศีพิจิก' },
        zodiac_sagittarius: { en: 'Sagittarius', th: 'ราศีธนู' },
        zodiac_capricorn: { en: 'Capricorn', th: 'ราศีมังกร' },
        zodiac_aquarius: { en: 'Aquarius', th: 'ราศีกุมภ์' },
        zodiac_pisces: { en: 'Pisces', th: 'ราศีมีน' },
        commTitle: { en: 'In-Game Communication', th: 'การสื่อสารในเกม' },
        q_ingame_comm: { en: 'How do you usually communicate in-game?', th: 'คุณสื่อสารในเกมอย่างไร?' },
        comm_method_title: { en: 'Primary communication method', th: 'ช่องทางการสื่อสารหลัก' },
        commMethod_text: { en: 'Text chat (in-game or external)', th: 'แชทข้อความ (ในเกมหรือนอกเกม)' },
        commMethod_voice_external: { en: 'Voice chat (Discord, party voice, etc.)', th: 'วอยซ์แชท (Discord, ปาร์ตี้วอยซ์ ฯลฯ)' },
        commMethod_voice_internal: { en: 'In-game voice (built-in)', th: 'วอยซ์ในเกม (ที่มากับเกม)' },
        commMethod_none: { en: "I don't communicate at all", th: 'ฉันไม่สื่อสารเลย' },
        comm_style_title: { en: 'Communication style', th: 'สไตล์การสื่อสาร' },
        commStyle_strategic: { en: 'Talkative & strategic (loves shot-calling, planning)', th: 'ช่างคุย & วางแผน (ชอบนำทีม, วางแผน)' },
        commStyle_quiet: { en: 'Quiet but responsive (only talks when needed)', th: 'เงียบแต่ตอบสนอง (พูดเมื่อจำเป็น)' },
        commStyle_types: { en: 'Mostly types, avoids voice', th: 'พิมพ์เป็นหลัก, เลี่ยงการใช้เสียง' },
        commStyle_mute: { en: 'Mute all / solo experience preferred', th: 'ปิดไมค์ทุกคน / ชอบเล่นคนเดียว' },
        commStyle_open: { en: 'Open to anything / depends on team', th: 'แล้วแต่สถานการณ์ / ขึ้นอยู่กับทีม' },

        // --- game-dna-4.html (Interests & Hobbies) ---
        interestsTitle: { en: 'Interests & Hobbies', th: 'ความสนใจและงานอดิเรก' },
        interestsSubtitle: { en: 'Let others know what you’re into — it’s fun to connect beyond the game.', th: 'ให้คนอื่นรู้ว่าคุณสนใจอะไร — การเชื่อมต่อนอกเหนือจากเกมก็สนุกนะ' },
        interestCat_music: { en: '🎵 Music & Pop Culture', th: '🎵 ดนตรีและวัฒนธรรมป๊อป' },
        hobby_asianPop: { en: 'K-pop / J-pop / Thai Pop', th: 'เคป๊อป / เจป๊อป / ไทยป๊อป' },
        hobby_westernPop: { en: 'Western Pop / Hip-hop / Indie', th: 'เพลงสากล / ฮิปฮอป / อินดี้' },
        hobby_dj: { en: 'Making music / DJ-ing', th: 'ทำเพลง / เป็นดีเจ' },
        hobby_instruments: { en: 'Playing instruments', th: 'เล่นดนตรี' },
        hobby_concerts: { en: 'Concerts / Music festivals', th: 'คอนเสิร์ต / เทศกาลดนตรี' },
        hobby_karaoke: { en: 'Karaoke', th: 'คาราโอเกะ' },
        interestCat_movies: { en: '🎬 Movies, TV & Animation', th: '🎬 ภาพยนตร์, ทีวี และแอนิเมชัน' },
        hobby_streaming: { en: 'Netflix / Streaming shows', th: 'ดู Netflix / รายการสตรีมมิ่ง' },
        hobby_anime: { en: 'Anime / Manga', th: 'อนิเมะ / มังงะ' },
        hobby_cartoons: { en: 'Cartoons / Animated series', th: 'การ์ตูน / ซีรีส์แอนิเมชัน' },
        hobby_genreMovies: { en: 'Horror / Sci-fi / Action', th: 'หนังสยองขวัญ / Sci-fi / แอ็คชั่น' },
        hobby_romcom: { en: 'Romcoms / Slice of life', th: 'รอมคอม / Slice of Life' },
        hobby_filmAnalysis: { en: 'Film analysis / Editing', th: 'วิเคราะห์หนัง / ตัดต่อ' },
        interestCat_reading: { en: '📚 Reading & Writing', th: '📚 การอ่านและการเขียน' },
        hobby_books: { en: 'Fiction / Non-fiction', th: 'นิยาย / สารคดี' },
        hobby_webtoons: { en: 'Light novels / Webtoons / Comics', th: 'ไลท์โนเวล / เว็บตูน / การ์ตูน' },
        hobby_poetry: { en: 'Poetry / Journaling', th: 'บทกวี / การเขียนบันทึก' },
        hobby_fanfic: { en: 'Fanfiction writing', th: 'เขียนแฟนฟิค' },
        hobby_philosophy: { en: 'Philosophy / Psychology', th: 'ปรัชญา / จิตวิทยา' },
        interestCat_gaming: { en: '🎮 Tech & Gaming Culture', th: '🎮 เทคโนโลยีและวัฒนธรรมเกม' },
        hobby_gamedev: { en: 'Game development', th: 'พัฒนาเกม' },
        hobby_modding: { en: 'Modding / Map creation', th: 'ม็อดเกม / สร้างแผนที่' },
        hobby_speedrun: { en: 'Speedrunning', th: 'Speedrunning' },
        hobby_esports: { en: 'Competitive eSports viewer', th: 'ดูการแข่งขันอีสปอร์ต' },
        hobby_vr: { en: 'VR/AR gaming', th: 'เกม VR/AR' },
        hobby_gamelore: { en: 'Game lore & theory', th: 'เนื้อเรื่องและทฤษฎีเกม' },
        interestCat_phys_activities: { en: '💪 Physical Activities', th: '💪 กิจกรรมทางกาย' },
        hobby_gym: { en: 'Gym / Weight training', th: 'ยิม / เวทเทรนนิ่ง' },
        hobby_cardio: { en: 'Running / Biking / Hiking', th: 'วิ่ง / ปั่นจักรยาน / เดินป่า' },
        hobby_teamSports: { en: 'Team sports', th: 'กีฬาประเภททีม' },
        hobby_dance: { en: 'Dance / Choreography', th: 'เต้น / ออกแบบท่าเต้น' },
        hobby_martialArts: { en: 'Martial arts / Boxing', th: 'ศิลปะการต่อสู้ / ชกมวย' },
        interestCat_social: { en: '✈️ Exploration & Social Life', th: '✈️ การสำรวจและชีวิตสังคม' },
        hobby_travel: { en: 'Travel & Adventure', th: 'ท่องเที่ยวและผจญภัย' },
        hobby_urbanex: { en: 'Urban exploring', th: 'สำรวจเมือง' },
        hobby_friends: { en: 'Hanging with friends', th: 'สังสรรค์กับเพื่อน' },
        hobby_cafe: { en: 'Trying new cafes / Bars', th: 'ลองคาเฟ่ / บาร์ใหม่ๆ' },
        hobby_events: { en: 'Events / Conventions', th: 'ไปอีเวนต์ / งานประชุม' },
        interestCat_creative: { en: '🎨 Creative Arts', th: '🎨 ศิลปะสร้างสรรค์' },
        hobby_drawing: { en: 'Drawing / Illustration', th: 'วาดภาพ / ภาพประกอบ' },
        hobby_design: { en: 'Graphic design / UI/UX', th: 'กราฟิกดีไซน์ / UI/UX' },
        hobby_cosplay: { en: 'Cosplay / Costume design', th: 'คอสเพลย์ / ออกแบบชุด' },
        hobby_digitalArt: { en: 'Digital art / NFTs', th: 'ศิลปะดิจิทัล / NFTs' },
        hobby_crafts: { en: 'Painting / Crafts / DIY', th: 'ระบายสี / งานฝีมือ / DIY' },
        interestCat_home: { en: '🍳 Food & Home Life', th: '🍳 อาหารและชีวิตที่บ้าน' },
        hobby_cooking: { en: 'Cooking / Baking', th: 'ทำอาหาร / ทำขนม' },
        hobby_foodie: { en: 'Foodie / Restaurant hunter', th: 'นักชิม / ตามล่าร้านอาหาร' },
        hobby_beverages: { en: 'Coffee / Tea enthusiast', th: 'หลงใหลกาแฟ / ชา' },
        hobby_interior: { en: 'Interior design / Home setup', th: 'ออกแบบภายใน / จัดบ้าน' },
        hobby_pets: { en: 'Pet care / Animal lover', th: 'ดูแลสัตว์เลี้ยง / รักสัตว์' },
        interestCat_niche: { en: '🧩 Niche & Nerdy', th: '🧩 ความสนใจเฉพาะกลุ่ม' },
        hobby_boardGames: { en: 'Board games / Chess / DnD', th: 'บอร์ดเกม / หมากรุก / DnD' },
        hobby_puzzles: { en: 'Puzzles / Rubik’s cube', th: 'พัซเซิล / รูบิค' },
        hobby_collecting: { en: 'Collecting (cards, figures, etc.)', th: 'สะสมของ (การ์ด, ฟิกเกอร์, ฯลฯ)' },
        hobby_memes: { en: 'Memes / Internet culture', th: 'มีม / วัฒนธรรมอินเทอร์เน็ต' },
        hobby_astrology: { en: 'Astrology / MBTI / Typology', th: 'โหราศาสตร์ / MBTI / Typology' },
        userIntentionFinish: { en: 'Finish', th: 'เสร็จสิ้น' },
        interestsInstruction: { en: 'Please select up to 10 interests that best define you!' , th: 'เลือก 10 ความชอบ หรือ ความสนใจที่บงบอกตัวตนมากที่สุด '},
           // --- ADD THIS NEW KEY ---
        interestsWarning_atLeastOne: {
            en: 'Please pick at least one of the options.',
            th: 'กรุณาเลือกอย่างน้อยหนึ่งตัวเลือก'
        },
    };

    // Define the main function in the global scope
    setLanguage = (lang) => {
        if (!lang || (lang !== 'en' && lang !== 'th')) {
            lang = 'en'; // Default to English
        }

        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            const target = el.dataset.translateTarget;
            let translation = translations[key]?.[lang];

            if (translation) {
                if (translation.includes('{{username}}')) {
                    const username = localStorage.getItem('gamicon_username') || 'PlayerOne';
                    translation = translation.replace(/\{\{username\}\}/g, username);
                }
            } else {
                translation = translations[key]?.['en'] || `[${key}]`; // Fallback to key name for easy debugging
                console.warn(`Translation key not found for lang '${lang}': ${key}`);
            }

            if (target && el.hasAttribute(target)) {
                 el.setAttribute(target, translation);
            } else {
                el.innerHTML = translation;
            }
        });
        document.documentElement.lang = lang;
        localStorage.setItem('gamicon_lang', lang);

        document.querySelectorAll('.lang-toggle').forEach(button => {
            button.textContent = lang === 'en' ? 'ไทย' : 'EN';
        });
    };

    const langToggleHandler = () => {
        const currentLang = localStorage.getItem('gamicon_lang') || 'en';
        const newLang = currentLang === 'en' ? 'th' : 'en';
        setLanguage(newLang);
    };

    document.querySelectorAll('.lang-toggle').forEach(button => {
        button.addEventListener('click', langToggleHandler);
    });

    const initialLang = localStorage.getItem('gamicon_lang') || 'en';
    setLanguage(initialLang);
});
