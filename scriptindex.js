// Wait for the HTML document to be fully loaded before running the script.
document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Menu Toggle ---
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  // Check if the menu elements exist before adding an event listener
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // --- Parallax Effect for non-touch devices ---
  // This modern check ensures the parallax effect only runs on devices with a fine pointer (like a mouse),
  // preventing it from running unnecessarily on touch screens.
  if (window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', function(e) {
      const signupSection = document.getElementById('signup');
      if (!signupSection) return;

      const x = (e.clientX - window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2);
      const layers = signupSection.querySelectorAll('.parallax-layer');

      layers.forEach(layer => {
        const depth = layer.getAttribute('data-depth');
        const moveX = -(x * depth);
        const moveY = -(y * depth);
        // Using CSS Custom Properties for performance
        layer.style.setProperty('--mouse-x', `${moveX / 10}px`);
        layer.style.setProperty('--mouse-y', `${moveY / 10}px`);
      });
    });
  }
  
});