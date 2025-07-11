// review-profile.js - FULLY INTEGRATED WITH TRANSLATION KEYS
document.addEventListener('DOMContentLoaded', () => {
    // --- Centralized Data & Configuration ---
    const getProfile = () => JSON.parse(localStorage.getItem('userProfile')) || {};
    const saveProfile = (profile) => localStorage.setItem('userProfile', JSON.stringify(profile));
    
    // --- UI Elements ---
    const imageModal = document.getElementById('image-modal');
    const modalContent = document.getElementById('modal-content');
    const reviewContent = document.getElementById('review-content');

    // --- Data Choices & Styling ---
    const CHOICES = {
        intention: ['Long term Buddy', 'Play Now, Chill Later', 'Climb the Ranks', 'One Match Wonder', 'Form a Team', 'Still figuring it out'], 
        'comm-method': ['Text Chat', 'Voice Chat (External)', 'In-Game Voice', 'No Communication'], 
        'comm-style': ['Talkative & Strategic', 'Quiet & Responsive', 'Mostly Types', 'Solo Preferred', 'Open To Anything'], 
        education: ['High School', 'Bachelor', 'Trade School', 'Master', 'PhD'], 
        zodiac: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'], 
        languages: ['Thai', 'English', 'Burmese', 'Chinese', 'Khmer'],
        vibe: ['Talkative', 'Quiet', 'Funny', 'Supportive', 'Thinker', 'Planner', 'Calm', 'Spontaneous'], 
        mbti: ['Not Specified', 'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'], 
        games: ['PUBG', 'VALO', 'ROV', 'Other'], 
        genre: ['MOBA', 'FPS', 'Other'], 
        'moba-roles': ['Top', 'Mid', 'ADC', 'Support', 'Jungle', 'All-rounder', 'Not sure'], 
        'fps-roles': ['Entry Fragger', 'Support', 'Sniper', 'IGL', 'Lurker', 'All-rounder', 'Not sure'], 
        platform: ['PC', 'Mobile', 'PlayStation', 'Xbox', 'Others'], 
        'active-time': ['Morning', 'Afternoon', 'Evening', 'Late Night', 'After work', 'Weekdays', 'Weekends', 'No fixed time', '24/7 Gamer'], 
        hobbies: [ 'K-pop / J-pop / Thai Pop', 'Western Pop / Hip-hop / Indie', 'Making music / DJ-ing', 'Playing instruments', 'Concerts / Music festivals', 'Karaoke', 'Netflix / Streaming shows', 'Anime / Manga', 'Cartoons / Animated series', 'Horror / Sci-fi / Action', 'Romcoms / Slice of life', 'Film analysis / Editing', 'Fiction / Non-fiction', 'Light novels / Webtoons / Comics', 'Poetry / Journaling', 'Fanfiction writing', 'Philosophy / Psychology', 'Game development', 'Modding / Map creation', 'Speedrunning', 'Competitive eSports viewer', 'VR/AR gaming', 'Game lore & theory', 'Gym / Weight training', 'Running / Biking / Hiking', 'Team sports', 'Dance / Choreography', 'Martial arts / Boxing', 'Travel & Adventure', 'Urban exploring', 'Hanging with friends', 'Trying new cafes / Bars', 'Events / Conventions', 'Drawing / Illustration', 'Graphic design / UI/UX', 'Cosplay / Costume design', 'Digital art / NFTs', 'Painting / Crafts / DIY', 'Cooking / Baking', 'Foodie / Restaurant hunter', 'Coffee / Tea enthusiast', 'Interior design / Home setup', 'Pet care / Animal lover', 'Board games / Chess / DnD', 'Puzzles / Rubik’s cube', 'Collecting (cards, figures, etc.)', 'Memes / Internet culture', 'Astrology / MBTI / Typology' ]
    };

    const TAG_STYLES = {
        intention: 'bg-green-600', 'comm-method': 'bg-cyan-600', 'comm-style': 'bg-orange-600', education: 'bg-lime-600', zodiac: 'bg-fuchsia-600', languages: 'bg-pink-600', vibe: 'bg-yellow-600', mbti: 'bg-teal-600',  games: 'bg-blue-600', genre: 'bg-purple-600', roles: 'bg-gray-600', 'moba-roles': 'bg-gray-600', 'fps-roles': 'bg-gray-600', platform: 'bg-indigo-600', 'active-time': 'bg-red-600', hobbies: 'bg-rose-600', default: 'bg-gray-500'
    };

    // --- Reverse lookup map for translations ---
    const createReverseLookup = () => {
        if (typeof translations === 'undefined') {
            console.error("The 'translations' object is not available. Make sure translation.js is loaded before this script.");
            return {};
        }
        const lookup = {};
        for (const key in translations) {
            if (translations[key].en) {
                lookup[translations[key].en] = key;
            }
        }
        return lookup;
    };
    const reverseTranslationMap = createReverseLookup();
    
   // --- Section Definitions ---
    const SECTION_CONFIGS = {
        'photos-section': {
            profileKey: 'media', message: 'Photos updated!', fields: { photos: { type: 'photo-grid' } }
        },
        'user-info-section': { 
            profileKey: null, message: 'User info updated!', 
            fields: { 
                username: { type: 'simple' }, 
                email: { type: 'simple' }, 
                birthday: { type: 'simple' }, 
                gender: { type: 'simple' } 
            } 
        },
        'bio-section': {
                profileKey: null, message: 'Bio updated!', fields: { bio: { type: 'simple' } },
                onEdit: (sectionEl) => {
                    const textarea = sectionEl.querySelector('textarea[data-key="bio"]');
                    const charCounter = sectionEl.querySelector('.char-counter');
                    const updateCounter = () => { charCounter.textContent = `${textarea.value.length}/150`; };
                    textarea.addEventListener('input', updateCounter);
                    updateCounter();
                }
            },
            'intent-section': { 
                profileKey: null, message: 'Intent updated!', fields: { intention: { type: 'single-select', choices: CHOICES.intention } } 
            },
            'interests-section': {
                profileKey: 'interests', message: 'Interests & hobbies updated!',
                fields: { hobbies: { type: 'multi-tag', choices: CHOICES.hobbies, limit: 10 } } 
            },
            'identity-section': {
                profileKey: 'identity', message: 'Identity info updated!',
                fields: { 
                    'comm-method': { type: 'single-select', choices: CHOICES['comm-method'] }, 
                    'comm-style': { type: 'multi-tag', choices: CHOICES['comm-style'], limit: 2 }, 
                    education: { type: 'single-select', choices: CHOICES.education }, 
                    zodiac: { type: 'single-select', choices: CHOICES.zodiac } 
                }
            },
            'personality-section': { 
                profileKey: 'personality', message: 'Personality info updated!', 
                fields: { 
                    languages: { type: 'multi-tag', choices: CHOICES.languages }, 
                    vibe: { type: 'multi-tag', choices: CHOICES.vibe },
                    mbti: { type: 'single-select', choices: CHOICES.mbti } 
                } 
            },
            'game-dna-section': {
                profileKey: 'gameDna', message: 'Game DNA updated!',
                fields: { 
                    games: { type: 'multi-tag', choices: CHOICES.games, limit: 5 }, 
                    genre: { type: 'multi-tag', choices: CHOICES.genre, limit: 3 }, 
                    'moba-roles': { type: 'multi-tag', choices: CHOICES['moba-roles'], limit: 5 }, 
                    'fps-roles': { type: 'multi-tag', choices: CHOICES['fps-roles'], limit: 5 }, 
                    platform: { type: 'multi-tag', choices: CHOICES.platform, limit: 5 }, 
                    'active-time': { type: 'multi-tag', choices: CHOICES['active-time'], limit: 4 } 
                },
                onEdit: (sectionEl, data) => toggleRoleEditors(data.genre || []),
                onSave: (data) => { if (!data.genre?.includes('MOBA')) data['moba-roles'] = []; if (!data.genre?.includes('FPS')) data['fps-roles'] = []; return data; },
                onChange: { genre: (newData) => toggleRoleEditors(newData) }
            }
    };

    // --- Translation Helper ---
    const translate = (key) => {
        if (typeof translations === 'undefined' || !translations[key]) {
            console.warn(`Translation key not found: ${key}`);
            return key; // Fallback to the key itself if not found
        }
        const currentLang = localStorage.getItem('gamicon_lang') || 'en';
        return translations[key][currentLang] || translations[key]['en'];
    };
    
    // --- Generic Helper Functions ---
    const openModal = src => { modalContent.src = src; imageModal.style.display = "flex"; };
    const closeModal = () => { modalContent.src = ""; imageModal.style.display = "none"; };
    const statusEl = document.getElementById("save-status");
    const showSaveStatus = msg => { statusEl.textContent = msg; statusEl.classList.remove("opacity-0"); setTimeout(() => statusEl.classList.add("opacity-0"), 2500); };
    const toggleRoleEditors = genres => { document.getElementById("moba-roles-editor")?.classList.toggle("hidden", !genres?.includes("MOBA")); document.getElementById("fps-roles-editor")?.classList.toggle("hidden", !genres?.includes("FPS")); };

    // --- Rendering Functions ---
    const renderTags = (container, items, styleKey, isEditable = false) => {
        if (!container) return;
        const itemsArr = Array.isArray(items) ? items.filter(Boolean) : [items].filter(Boolean);
        const transformedItems = itemsArr.map(item => item === 'duo' ? 'Find a Duo Partner' : item);
        const isEmpty = transformedItems.length === 0 || (transformedItems.length === 1 && (!transformedItems[0] || transformedItems[0].toLowerCase() === "not specified"));

        if (isEmpty) {
            container.innerHTML = '<span class="text-gray-400" data-translate-key="notSpecified">Not specified</span>';
            return;
        }

        container.innerHTML = transformedItems.map(item => {
            const style = TAG_STYLES[styleKey] || TAG_STYLES.default;
            const removeBtn = isEditable ? `<button class="remove-btn" data-key="${styleKey}" data-item="${item}">x</button>` : "";
            const translationKey = reverseTranslationMap[item];

            if (translationKey) {
                return `<span class="tag ${style}" data-translate-key="${translationKey}">${item}${removeBtn}</span>`;
            } else {
                return `<span class="tag ${style}">${item}${removeBtn}</span>`;
            }
        }).join("");
    };
    
    const renderPhotoGrid = (container) => (photos = []) => {
        if (!container) return;
        const hasPhotos = photos && photos.filter(Boolean).length > 0;
        container.innerHTML = !hasPhotos
            ? '<span class="text-gray-400 col-span-full" data-translate-key="notSpecifiedPhotos">No photos uploaded.</span>'
            : photos.map(src => `<img src="${src}" class="w-full h-full object-cover rounded-md aspect-square bg-gray-700 cursor-pointer">`).join('');
    };
    
    const renderPhotoEditor = (container) => (photos = []) => {
        if (!container) return;
        container.innerHTML = "";
        for (let i = 0; i < 6; i++) {
            const isFilled = i < photos.length && photos[i];
            const src = isFilled ? photos[i] : "";
            const slot = document.createElement("label");
            slot.className = `relative aspect-square border-2 rounded-md cursor-pointer flex items-center justify-center ${isFilled ? "border-blue-500 bg-gray-900" : "border-dashed border-gray-600 hover:border-blue-400"}`;
            slot.innerHTML = `
                <img class="preview-img absolute w-full h-full object-cover rounded-md ${isFilled ? 'block' : 'hidden'}" src="${src}" alt="Photo slot ${i+1}">
                <span class="plus-icon text-gray-400 text-3xl ${isFilled ? 'hidden' : 'block'}">+</span>
                <input type="file" class="hidden" accept="image/*" data-slot-index="${i}">
                ${isFilled ? `<div class="delete-btn absolute top-1 right-1 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center text-sm font-bold border border-white hover:bg-red-600 transition-colors" data-slot-index="${i}">x</div>` : ""}
            `;
            container.appendChild(slot);
        }
    };
    
    // --- Main Data Loading Function ---
    const loadProfileData = () => {
        const profile = getProfile();
        if (!profile.username) {
            reviewContent.innerHTML = '<p class="text-center text-red-400 font-semibold" data-translate-key="errorProfileNotFound">Profile data not found. Please start over.</p>';
            if (typeof setLanguage === 'function') setLanguage(localStorage.getItem('gamicon_lang') || 'en');
            return;
        }

        for (const [id, config] of Object.entries(SECTION_CONFIGS)) {
            const dataSlice = config.profileKey ? (profile[config.profileKey] || {}) : profile;
            for (const key in config.fields) {
                if (config.fields[key].type === "photo-grid") {
                    const gridContainer = document.querySelector('[data-display-key="photos-view-grid"]');
                    renderPhotoGrid(gridContainer)(dataSlice.photos);
                    continue; 
                }

                const displayEl = document.querySelector(`[data-display-key="${key}"]`);
                if (!displayEl) continue;

                const finalValue = config.profileKey === null ? profile[key] : dataSlice[key];
                const isTagType = TAG_STYLES[key] || Array.isArray(finalValue);
                
                if (isTagType) {
                    renderTags(displayEl, finalValue, key);
                } else {
                    const valueIsMissing = !finalValue || String(finalValue).trim() === '' || String(finalValue).toLowerCase() === 'not specified';
                    if (valueIsMissing) {
                        displayEl.setAttribute('data-translate-key', 'notSpecified');
                        displayEl.textContent = 'Not specified';
                    } else if (key === 'gender') {
                        const genderKey = 'gender' + finalValue.charAt(0).toUpperCase() + finalValue.slice(1);
                        displayEl.setAttribute('data-translate-key', genderKey);
                        displayEl.textContent = finalValue;
                    } else {
                        displayEl.removeAttribute('data-translate-key');
                        displayEl.textContent = finalValue;
                    }
                }
            }
        }
        
        const roles = [...profile.gameDna?.['moba-roles'] || [], ...profile.gameDna?.['fps-roles'] || []];
        renderTags(document.querySelector('[data-display-key="roles"]'), roles, 'roles');
        
        if (typeof setLanguage === 'function') {
            const currentLang = localStorage.getItem('gamicon_lang') || 'en';
            setLanguage(currentLang);
        } else {
            console.error("setLanguage function not found. Ensure translation.js is loaded first.");
        }
    };
    
    // --- Section Editor Logic ---
    const createSectionEditor = (id) => {
        const config = SECTION_CONFIGS[id]; if (!config) return;
        const sectionEl = document.getElementById(id);
        const viewMode = sectionEl.querySelector('[data-mode="view"]');
        const editMode = sectionEl.querySelector('[data-mode="edit"]');
        const [editBtn, saveBtn, cancelBtn] = ['edit', 'save', 'cancel'].map(a => sectionEl.querySelector(`[data-action="${a}"]`));
        let tempData = {};

        const toggleMode = (isEditing) => {
            viewMode.classList.toggle('hidden', isEditing);
            editMode.classList.toggle('hidden', !isEditing);
            [saveBtn, cancelBtn].forEach(btn => btn.classList.toggle('hidden', !isEditing));
            editBtn.classList.toggle('hidden', isEditing);
        };
        
        editBtn.addEventListener('click', () => {
            const profile = getProfile();
            const dataSlice = config.profileKey ? (profile[config.profileKey] || {}) : profile;
            tempData = config.profileKey === null ? JSON.parse(JSON.stringify(profile)) : JSON.parse(JSON.stringify(dataSlice));
            
            for (const key in config.fields) {
                const field = config.fields[key];
                const input = editMode.querySelector(`[data-key="${key}"]`);
                const dataValue = tempData[key];

                if(input) {
                   if (field.type === 'simple' || field.type === 'single-select') {
                        input.value = dataValue || '';
                    } else if (field.type === 'multi-tag') {
                        renderTags(editMode.querySelector(`[data-tags="${key}"]`), dataValue || [], key, true);
                    }
                }
                if (field.type === 'photo-grid') {
                    renderPhotoEditor(editMode.querySelector('[data-edit-grid="photos"]'))(tempData.photos || []);
                }
            }
            config.onEdit?.(sectionEl, tempData);
            toggleMode(true);
        });

        saveBtn.addEventListener('click', () => {
            let profile = getProfile();
            editMode.querySelectorAll('input[data-key], textarea[data-key], select[data-key]').forEach(input => {
                if(config.fields[input.dataset.key]?.type !== 'multi-tag') {
                    tempData[input.dataset.key] = input.value;
                }
            });
            
            const finalData = config.onSave ? config.onSave(tempData) : tempData;
            config.profileKey ? (profile[config.profileKey] = { ...(profile[config.profileKey] || {}), ...finalData }) : (profile = { ...profile, ...finalData });
            
            saveProfile(profile);
            loadProfileData(); 
            showSaveStatus(config.message);
            toggleMode(false);
        });
        
        cancelBtn.addEventListener('click', () => toggleMode(false));
        
        editMode.querySelectorAll('select[data-key]').forEach(selectEl => {
            const key = selectEl.dataset.key; const field = config.fields[key]; if (!field || !field.choices) return;
            const placeholder = field.type === 'multi-tag'
  ? `${translate('placeholder_addChoice')} (${translate('limit')}: ${field.limit || translate('none')})`
  : translate('placeholder_selectOption');

            selectEl.innerHTML = `<option value="" disabled selected>${placeholder}</option>` +
    field.choices.map(opt => {
        const key = reverseTranslationMap[opt] || opt;
        const translated = translate(key);
        return `<option value="${opt}">${translated}</option>`;
    }).join('');
            if(field.type === 'multi-tag') selectEl.addEventListener('change', () => {
                const choice = selectEl.value;
                if (!choice) return;
                tempData[key] = tempData[key] || [];
                if (!tempData[key].includes(choice) && (!field.limit || tempData[key].length < field.limit)) {
                    tempData[key].push(choice);
                    renderTags(editMode.querySelector(`[data-tags="${key}"]`), tempData[key], key, true);
                    config.onChange?.[key]?.(tempData[key]);
                } else if (field.limit && tempData[key].length >= field.limit) {
                    alert(`You can only select up to ${field.limit} items for this category.`);
                }
                selectEl.value = "";
            });
        });

        editMode.addEventListener('click', e => {
            if (e.target.matches('.remove-btn')) {
                const { key, item } = e.target.dataset;
                if (!tempData[key]) return;
                tempData[key] = tempData[key].filter(i => i !== item);
                renderTags(e.target.closest('[data-tags]'), tempData[key], key, true);
                config.onChange?.[key]?.(tempData[key]);
            }
            const deleteBtn = e.target.closest('.delete-btn');
            if (deleteBtn && id === 'photos-section') {
                e.preventDefault();
                tempData.photos?.splice(parseInt(deleteBtn.dataset.slotIndex, 10), 1);
                renderPhotoEditor(editMode.querySelector('[data-edit-grid="photos"]'))(tempData.photos || []);
            }
        });

        if (id === 'photos-section') {
            editMode.addEventListener('change', e => {
                const file = e.target.files?.[0];
                if (e.target.type !== 'file' || !file) return;
                const index = parseInt(e.target.dataset.slotIndex, 10);
                tempData.photos = tempData.photos || Array(6).fill(null);
                if (tempData.photos.filter(p => p).length >= 6 && !tempData.photos[index]) {
                     alert("You can add up to 6 photos.");
                     e.target.value = '';
                     return;
                }
                const reader = new FileReader();
                reader.onload = event => {
                    tempData.photos[index] = event.target.result;
                    renderPhotoEditor(editMode.querySelector('[data-edit-grid="photos"]'))(tempData.photos);
                };
                reader.readAsDataURL(file);
            });
        }
    };
    
    // --- Validation, Confirmation, and Submission Logic ---
    const confirmButton = document.getElementById('confirm-button');
    const warningsContainer = document.getElementById('validation-warnings');

    const applyValidationStyles = (errors) => {
        const errorSectionIds = errors.map(e => e.sectionId);
        document.querySelectorAll('#review-content section').forEach(section => {
            section.classList.toggle('validation-error', errorSectionIds.includes(section.id));
        });
    };
    
    const checkAllRequirements = () => {
        const profile = getProfile();
        const errors = [];
        
        // REPLACED to use translation keys instead of hardcoded messages
        if (!profile.media?.photos?.filter(Boolean).length || profile.media.photos.filter(Boolean).length < 2) {
            errors.push({ sectionId: 'photos-section', messageKey: 'validation_min_2_photos' });
        }
        if (!profile.bio || profile.bio.trim().length < 20) {
            errors.push({ sectionId: 'bio-section', messageKey: 'validation_bio_min_20_chars' });
        }
        if (!profile.intention || profile.intention.toLowerCase() === 'not specified' || profile.intention === '') {
            errors.push({ sectionId: 'intent-section', messageKey: 'validation_select_intent' });
        }
        if (!profile.interests?.hobbies?.length || profile.interests.hobbies.length < 1) {
            errors.push({ sectionId: 'interests-section', messageKey: 'validation_min_1_hobby' });
        }
        if (!profile.identity?.['comm-method']?.length) {
            errors.push({ sectionId: 'identity-section', messageKey: 'validation_select_comm_method' });
        }
        if (!profile.identity?.['comm-style']?.length) {
            errors.push({ sectionId: 'identity-section', messageKey: 'validation_min_1_comm_style' });
        }
        if (!profile.personality?.languages?.length) {
            errors.push({ sectionId: 'personality-section', messageKey: 'validation_min_1_language' });
        }
        if (!profile.personality?.vibe?.length) {
            errors.push({ sectionId: 'personality-section', messageKey: 'validation_min_1_vibe' });
        }
        if (!profile.gameDna?.games?.length || profile.gameDna.games.length < 1) {
            errors.push({ sectionId: 'game-dna-section', messageKey: 'validation_min_1_game' });
        }
        if (!profile.gameDna?.genre?.length || profile.gameDna.genre.length < 1) {
            errors.push({ sectionId: 'game-dna-section', messageKey: 'validation_min_1_genre' });
        }
        
        return errors;
    };

    // REPLACED to look up translation keys before displaying messages
    confirmButton?.addEventListener('click', () => {
        const errors = checkAllRequirements();
        applyValidationStyles(errors);

        if (errors.length > 0) {
            const uniqueErrorMessageKeys = [...new Set(errors.map(e => e.messageKey))];
            warningsContainer.innerHTML = `
                <p class="mb-2" data-translate-key="validationWarningHeader">Please complete the highlighted sections:</p>
                <ul class="list-none text-left inline-block">
                    ${uniqueErrorMessageKeys.map(key => `<li>• ${translate(key)}</li>`).join('')}
                </ul>`;
            if (typeof setLanguage === 'function') setLanguage(localStorage.getItem('gamicon_lang') || 'en');
            document.querySelector('.validation-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            warningsContainer.innerHTML = '';
            alert(translate('alert_profileComplete'));
            window.location.href = 'home.html';
        }
    });

    // --- Initialization & Main Event Listeners ---
    if (!reviewContent) return;
    loadProfileData(); 
    Object.keys(SECTION_CONFIGS).forEach(createSectionEditor);
    reviewContent.addEventListener('click', e => {if (e.target.matches('[data-display-key="photos-view-grid"] img')) openModal(e.target.src)});
    imageModal?.addEventListener('click', closeModal);
});
