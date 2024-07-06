/**
* PHP Email Form Validation - v3.8
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/

document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('.php-email-form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const loadingElement = form.querySelector('.loading');
    const errorElement = form.querySelector('.error-message');
    const sentElement = form.querySelector('.sent-message');

    // Show loading
    loadingElement.style.display = 'block';
    errorElement.style.display = 'none';
    sentElement.style.display = 'none';

    // Validate form fields
    if (!validateForm(form)) {
      loadingElement.style.display = 'none';
      errorElement.textContent = 'Please fill out all required fields correctly.';
      errorElement.style.display = 'block';
      return;
    }

    // Prepare form data
    const formData = new FormData(form);

    // Submit form via Fetch API
    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      loadingElement.style.display = 'none';
      if (response.ok) {
        sentElement.style.display = 'block';
        form.reset();
      } else {
        return response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            errorElement.textContent = data["errors"].map(error => error["message"]).join(", ");
          } else {
            errorElement.textContent = 'Oops! There was a problem submitting your form';
          }
          errorElement.style.display = 'block';
        });
      }
    }).catch(error => {
      loadingElement.style.display = 'none';
      errorElement.textContent = 'Oops! There was a problem submitting your form';
      errorElement.style.display = 'block';
    });
  });

  function validateForm(form) {
    const name = form.querySelector('input[name="name"]');
    const email = form.querySelector('input[name="email"]');
    const subject = form.querySelector('input[name="subject"]');
    const message = form.querySelector('textarea[name="message"]');
    
    if (name.value.trim().length < 4) return false;
    if (!validateEmail(email.value)) return false;
    if (subject.value.trim() === '') return false;
    if (message.value.trim() === '') return false;
    return true;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }
});