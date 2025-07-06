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
        navResources: { en: 'Resources', th: 'ข้อมูล'},

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
        profilesEdit: { en: 'Edit', th: 'แก้ไข' }, // Added for the Edit button

        // --- friends.html ---
        friendsTitle: { en: 'Manage Friends', th: 'จัดการเพื่อน' },
        friendsTabsMyFriends: { en: 'My Friends', th: 'เพื่อนของฉัน' },
        friendsTabsRequests: { en: 'Requests', th: 'คำขอ' },
        friendsTabsAdd: { en: 'Add Friend', th: 'เพิ่มเพื่อน' },
        friendsSearchPlaceholder: { en: 'Enter a username...', th: 'ใส่ชื่อผู้ใช้...' },
        friendsSearchBtn: { en: 'Search', th: 'ค้นหา' },
        friendsAccept: { en: 'Accept', th: 'ยอมรับ' },
        friendsDecline: { en: 'Decline', th: 'ปฏิเสธ' },
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
