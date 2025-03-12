document.addEventListener('DOMContentLoaded', function() {
    const urlForm = document.getElementById('urlForm');
    const urlInput = document.getElementById('urlInput');
    const errorMessage = document.getElementById('errorMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');

    urlForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Reset states
        errorMessage.classList.add('d-none');
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
                // Create new window with about:blank
                const newWindow = window.open('about:blank', '_blank');
                if (newWindow) {
                    // Write embed content to the new window
                    newWindow.document.write(`
                        <html>
                            <head>
                                <title>embeddddr - Embedded Content</title>
                                <style>
                                    body, html {
                                        margin: 0;
                                        padding: 0;
                                        width: 100%;
                                        height: 100%;
                                        overflow: hidden;
                                    }
                                    embed {
                                        width: 100%;
                                        height: 100%;
                                        border: none;
                                    }
                                </style>
                            </head>
                            <body>
                                <embed src="${data.url}" type="text/html">
                                <script>
                                    document.documentElement.requestFullscreen().catch(err => console.log('Fullscreen request failed'));
                                </script>
                            </body>
                        </html>
                    `);
                    newWindow.document.close();
                } else {
                    errorMessage.textContent = 'Pop-up was blocked. Please allow pop-ups for this site.';
                    errorMessage.classList.remove('d-none');
                }
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
});