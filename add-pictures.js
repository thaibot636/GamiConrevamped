document.addEventListener('DOMContentLoaded', () => {
    const photoGrid = document.querySelector('.photo-grid');
    const photoCountEl = document.getElementById('photo-count');
    const submitButton = document.getElementById('submit-button');
    const errorEl = document.querySelector('[data-error-for="photos"]');

    // Get references to modal elements
    const imageModal = document.getElementById('image-modal');
    const modalContent = document.getElementById('modal-content');

    const NUM_SLOTS = 6;
    let photosAdded = 0;

    for (let i = 0; i < NUM_SLOTS; i++) {
        const slot = document.createElement('label');
        slot.classList.add('photo-slot');
        slot.setAttribute('for', `photo-input-${i}`);

        slot.innerHTML = `
            <img class="preview-img" id="preview-${i}" alt="Photo preview">
            <span class="plus-icon">+</span>
            <input type="file" name="photo" id="photo-input-${i}" accept="image/*">
            <div class="delete-btn" data-slot="${i}">×</div>
        `;
        photoGrid.appendChild(slot);
    }

    photoGrid.addEventListener('change', handleFileSelect);
    photoGrid.addEventListener('click', handleGridClick);

    function handleGridClick(event) {
        const clickedSlot = event.target.closest('.photo-slot');

        if (event.target.classList.contains('delete-btn')) {
            event.preventDefault();
            event.stopPropagation();
            handleFileDelete(event.target);
            return;
        }
       
        if (clickedSlot && clickedSlot.classList.contains('filled')) {
            event.preventDefault();
            const previewImg = clickedSlot.querySelector('.preview-img');
            openModal(previewImg.src);
        }
    }

    function handleFileSelect(event) {
        if (event.target.type !== 'file') return;

        const input = event.target;
        const slotIndex = input.id.split('-')[2];
        const slot = input.closest('.photo-slot');
        const preview = document.getElementById(`preview-${slotIndex}`);
        const file = input.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.src = e.target.result;
                slot.classList.add('filled');
                updatePhotoCount();
            }
            reader.readAsDataURL(file);
        }
    }

    function handleFileDelete(deleteBtn) {
        const slotIndex = deleteBtn.dataset.slot;
        const slot = deleteBtn.closest('.photo-slot');
        const input = document.getElementById(`photo-input-${slotIndex}`);
        const preview = document.getElementById(`preview-${slotIndex}`);

        slot.classList.remove('filled');
        preview.src = '';
        input.value = '';
        updatePhotoCount();
    }

    function updatePhotoCount() {
        photosAdded = document.querySelectorAll('.photo-slot.filled').length;
        photoCountEl.textContent = photosAdded;
    }
   
    function openModal(imageSrc) {
        modalContent.src = imageSrc;
        imageModal.style.display = 'flex';
    }

    function closeModal() {
        imageModal.style.display = 'none';
        modalContent.src = '';
    }

    // MODIFICATION: Simplified event listener for closing the modal.
    // Any click anywhere on the modal will now close it.
    imageModal.addEventListener('click', closeModal);

    submitButton.addEventListener('click', function(event) {
        event.preventDefault();

        const photosRequired = 2;

        if (photosAdded >= photosRequired) {
            errorEl.style.display = 'none';
            errorEl.textContent = '';
            window.location.href = submitButton.href;
        } else {
            errorEl.textContent = `Please add at least ${photosRequired} photos`;
            errorEl.style.display = 'block';
        }
    });
});