// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    if (!form) {
        console.error('Contact form not found!');
        return;
    }

    console.log('Contact form found, adding submit listener...');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submitted');

        // Show loading state
        const submitButton = this.querySelector('.submit-btn-new');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Get form data
        const formData = {
            user_name: this.querySelector('[name="user_name"]').value,
            user_phone: this.querySelector('[name="user_phone"]').value,
            user_email: this.querySelector('[name="user_email"]').value,
            message: this.querySelector('[name="message"]').value
        };

        console.log('Form data:', formData);

        // Send email using EmailJS
        emailjs.send('service_ygltp5m', 'template_4mxp4gk', formData)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                // Show success message
                alert('Message sent successfully!');
                // Reset form
                form.reset();
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                // Show error message
                alert('Failed to send message. Please try again later.');
            })
            .finally(function() {
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
    });
}); 