document.addEventListener('DOMContentLoaded', function() {
    const urlForm = document.getElementById('urlForm');
    const urlInput = document.getElementById('urlInput');
    const errorMessage = document.getElementById('errorMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const embedContainer = document.getElementById('embedContainer');
    const contentEmbed = document.getElementById('contentEmbed');

    // Handle form submission
    urlForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous error
        errorMessage.classList.add('d-none');

        const url = urlInput.value.trim();

        if (!url) {
            showError('Please enter a URL');
            return;
        }

        if (!isValidUrl(url)) {
            showError('Invalid URL format');
            return;
        }

        // Show loading spinner
        loadingSpinner.classList.remove('d-none');

        // Embed the URL (with a small delay to show the spinner)
        setTimeout(() => {
            embedUrl(url);
            loadingSpinner.classList.add('d-none');
        }, 500);
    });

    // Validate URL format
    function isValidUrl(url) {
        try {
            const parsedUrl = new URL(url);
            return ['http:', 'https:'].includes(parsedUrl.protocol);
        } catch (e) {
            return false;
        }
    }

    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('d-none');
    }

    // Embed URL in iframe
    function embedUrl(url) {
        contentEmbed.src = url;
        embedContainer.classList.remove('d-none');
    }

    // Add input validation listener
    urlInput.addEventListener('input', function() {
        errorMessage.classList.add('d-none');
    });
});