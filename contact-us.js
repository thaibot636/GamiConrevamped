// File: contact-us.js

document.addEventListener('DOMContentLoaded', () => {

    // --- ADDED FOR MOBILE MENU ---
    // This code makes the mobile "MENU" button work.
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    // --- END OF MOBILE MENU CODE ---


    // --- EXISTING FORM LOGIC ---
    // This code handles the form submission.
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitButton = form.querySelector('button[type="submit"]');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Form validation and submission logic...
            const formData = new FormData(form);
            const originalButtonText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.textContent = 'SENDING...';
            formStatus.textContent = '';

            try {
                // Remember to replace this with your real Formspree endpoint
                const response = await fetch('YOUR_FORMSPREE_ENDPOINT', {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.textContent = "Message sent successfully!";
                    formStatus.style.color = "#4ade80"; // Green
                    form.reset();
                } else {
                    throw new Error('Server error.');
                }
            } catch (error) {
                formStatus.textContent = "Error sending message.";
                formStatus.style.color = "#f87171"; // Red
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }
});