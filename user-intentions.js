 document.addEventListener('DOMContentLoaded', () => {
            const options = document.querySelectorAll('.option-card');
            let selectedOption = null;

            options.forEach(option => {
                option.addEventListener('click', () => {
                    // Remove 'selected' class from previously selected option
                    if (selectedOption) {
                        selectedOption.classList.remove('selected');
                    }
                    
                    // Add 'selected' class to the clicked option
                    option.classList.add('selected');
                    
                    // Update the selected option
                    selectedOption = option;
                    
                    // Optional: You could also store the selected value
                    // console.log('Selected value:', option.dataset.value);
                });
            });
        });