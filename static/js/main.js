document.addEventListener('DOMContentLoaded', function() {
    const urlForm = document.getElementById('urlForm');
    const urlInput = document.getElementById('urlInput');
    const errorMessage = document.getElementById('errorMessage');
    const embedContainer = document.getElementById('embedContainer');
    const contentEmbed = document.getElementById('contentEmbed');
    const loadingSpinner = document.getElementById('loadingSpinner');

    urlForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Reset states
        errorMessage.classList.add('d-none');
        embedContainer.classList.add('d-none');
        loadingSpinner.classList.remove('d-none');

        const formData = new FormData();
        formData.append('url', urlInput.value);

        try {
            const response = await fetch('/validate', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.valid) {
                contentEmbed.src = data.url;
                embedContainer.classList.remove('d-none');
            } else {
                errorMessage.textContent = data.error;
                errorMessage.classList.remove('d-none');
            }
        } catch (error) {
            errorMessage.textContent = 'An error occurred. Please try again.';
            errorMessage.classList.remove('d-none');
        } finally {
            loadingSpinner.classList.add('d-none');
        }
    });

    // Add input validation listener
    urlInput.addEventListener('input', function() {
        errorMessage.classList.add('d-none');
    });

    // Handle embed loading errors
    contentEmbed.addEventListener('error', function() {
        errorMessage.textContent = 'Failed to load embedded content. Please check the URL and try again.';
        errorMessage.classList.remove('d-none');
        embedContainer.classList.add('d-none');
    });
});
