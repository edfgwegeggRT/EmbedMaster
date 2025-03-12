
document.addEventListener('DOMContentLoaded', function() {
    const urlForm = document.getElementById('urlForm');
    const urlInput = document.getElementById('urlInput');
    const errorMessage = document.getElementById('errorMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const embedContainer = document.getElementById('embedContainer');
    const contentEmbed = document.getElementById('contentEmbed');

    urlForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous error
        errorMessage.classList.add('d-none');
        embedContainer.classList.add('d-none');

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

        // Set iframe source to the provided URL
        contentEmbed.src = url;
        
        // When iframe loads, hide spinner and show content
        contentEmbed.onload = function() {
            loadingSpinner.classList.add('d-none');
            embedContainer.classList.remove('d-none');
        };
        
        // If iframe fails to load, show error
        contentEmbed.onerror = function() {
            loadingSpinner.classList.add('d-none');
            showError('Failed to load the URL. It might not allow embedding.');
        };
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('d-none');
    }

    function isValidUrl(string) {
        try {
            const url = new URL(string);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }
});
