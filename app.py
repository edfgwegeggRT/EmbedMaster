import os
import logging
from urllib.parse import urlparse
from flask import Flask, render_template, request, jsonify

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)
app.secret_key = os.environ.get("SESSION_SECRET")

def is_valid_url(url):
    """Validate URL format"""
    try:
        result = urlparse(url)
        return all([result.scheme, result.netloc])
    except ValueError:
        return False

@app.route('/')
def index():
    """Render main page"""
    return render_template('index.html')

@app.route('/validate', methods=['POST'])
def validate_url():
    """Validate submitted URL"""
    url = request.form.get('url', '')
    
    if not url:
        return jsonify({'valid': False, 'error': 'Please enter a URL'})
    
    if not is_valid_url(url):
        return jsonify({'valid': False, 'error': 'Invalid URL format'})
    
    return jsonify({'valid': True, 'url': url})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
