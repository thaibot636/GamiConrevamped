document.addEventListener('DOMContentLoaded', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const action = urlParams.get('action');
      const lang = localStorage.getItem('gamicon_lang') || 'en';
      
      const mainHeader = document.getElementById('main-header');
      const actionButton = document.getElementById('form-action-button');
      const subtitle = document.getElementById('subtitle-text');
      const emailLabel = document.getElementById('email-label');
      const emailInput = document.getElementById('email-input');
      const usernameField = document.getElementById('username-field');
      const usernameInput = document.getElementById('username-input');
      const birthdayField = document.getElementById('birthday-field');
      const birthdayInput = document.getElementById('birthday-input');
      const genderField = document.getElementById('gender-field');
      const genderSelect = document.getElementById('gender-select');
      const passwordInput = document.getElementById('password');
      const confirmPasswordField = document.getElementById('confirm-password-field');
      const confirmPasswordInput = document.getElementById('confirm-password');
      const showPasswordCheckbox = document.getElementById('show-password-checkbox');

      showPasswordCheckbox.addEventListener('change', () => {
          const isChecked = showPasswordCheckbox.checked;
          passwordInput.type = isChecked ? 'text' : 'password';
          if (confirmPasswordInput) { confirmPasswordInput.type = isChecked ? 'text' : 'password'; }
      });

      if (action === 'login') {
        mainHeader.dataset.translateKey = 'loginHeader';
        subtitle.dataset.translateKey = 'loginSubtitle';
        emailLabel.dataset.translateKey = 'loginEmailLabel';
        emailInput.dataset.translateKey = 'loginEmailPlaceholder';
        actionButton.dataset.translateKey = 'login';
        
        [usernameField, birthdayField, genderField, confirmPasswordField].forEach(field => field.style.display = 'none');

        actionButton.addEventListener('click', (event) => {
            event.preventDefault();
            let isLoginValid = true;
            emailInput.classList.remove('input-error');
            passwordInput.classList.remove('input-error');
            emailInput.placeholder = translations.loginEmailPlaceholder[lang];
            passwordInput.placeholder = translations.passwordPlaceholder[lang];

            if (emailInput.value.trim() === '') {
                isLoginValid = false;
                emailInput.classList.add('input-error');
                emailInput.placeholder = translations.errorRequired[lang];
            }
            if (passwordInput.value === '') {
                isLoginValid = false;
                passwordInput.classList.add('input-error');
                passwordInput.placeholder = translations.errorRequired[lang];
            }
            if (isLoginValid) {
                // *** MODIFIED: Redirect to home1.html on successful login ***
                window.location.href = 'home1.html';
            }
        });

      } else {
        mainHeader.dataset.translateKey = 'joinHeader';
        subtitle.dataset.translateKey = 'joinSubtitle';
        emailLabel.dataset.translateKey = 'emailLabel';
        emailInput.dataset.translateKey = 'emailPlaceholder';
        actionButton.dataset.translateKey = 'signup';

        actionButton.href = 'tos.html';
        localStorage.removeItem('gamicon_username');
        
        birthdayInput.addEventListener('focus', () => { birthdayInput.type = 'date'; });

        actionButton.addEventListener('click', (event) => {
          event.preventDefault(); 
          let isValid = true, isAgeValid = true;

          [emailInput, usernameInput, birthdayInput, genderSelect, passwordInput, confirmPasswordInput].forEach(input => input.classList.remove('input-error'));
          
          emailInput.placeholder = translations.emailPlaceholder[lang];
          usernameInput.placeholder = translations.usernamePlaceholder[lang];
          passwordInput.placeholder = translations.passwordPlaceholder[lang];
          confirmPasswordInput.placeholder = translations.passwordPlaceholder[lang];
          birthdayInput.type = 'date';

          if (emailInput.value.trim() === '') { isValid = false; emailInput.classList.add('input-error'); emailInput.placeholder = translations.errorEmailRequired[lang]; }
          if (usernameInput.value.trim() === '') { isValid = false; usernameInput.classList.add('input-error'); usernameInput.placeholder = translations.errorUsernameRequired[lang]; }
          if (genderSelect.value === '') { isValid = false; genderSelect.classList.add('input-error'); }
          if (passwordInput.value === '' || passwordInput.value !== confirmPasswordInput.value) {
            isValid = false;
            passwordInput.classList.add('input-error'); confirmPasswordInput.classList.add('input-error');
            passwordInput.value = ''; confirmPasswordInput.value = '';
            passwordInput.placeholder = translations.errorPasswordMatch[lang]; 
            confirmPasswordInput.placeholder = translations.errorPasswordMatch[lang];
          }
          
          if (birthdayInput.value === '') {
            isAgeValid = false;
          } else {
            const today = new Date();
            const birthDate = new Date(birthdayInput.value);
            today.setHours(0, 0, 0, 0);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) { age--; }
            if (birthDate.getTime() > today.getTime() || age < 18) { isAgeValid = false; }
          }
          
          if (!isAgeValid) {
            isValid = false;
            birthdayInput.classList.add('input-error');
            birthdayInput.type = 'text';
            birthdayInput.value = '';
            birthdayInput.placeholder = translations.errorAge[lang];
          }

          if (isValid) {
            const userProfile = {
                email: emailInput.value.trim(),
                username: usernameInput.value.trim(),
                birthday: birthdayInput.value,
                gender: genderSelect.value
            };
            localStorage.setItem('userProfile', JSON.stringify(userProfile));

            localStorage.setItem('gamicon_username', usernameInput.value);
            window.location.href = actionButton.href; 
          }
        });
      }
      
      const setLanguage = (lang) => {
          document.querySelectorAll('[data-translate-key]').forEach(el => {
              const key = el.dataset.translateKey;
              if (translations[key]?.[lang]) {
                  if (el.tagName === 'INPUT') el.placeholder = translations[key][lang];
                  else el.textContent = translations[key][lang];
              }
          });
      };
      setLanguage(lang);
});