// Get the form element
const form = document.getElementById('enquiryForm');

// When the form is submitted, run the validate function
form.addEventListener('submit', function(event) {
    event.preventDefault();  // Stop the form from sending data
    
    // Clear all old error messages
    clearErrors();
    
    // Check if all fields are correct
    if (validateForm()) {
        // Show success message
        document.getElementById('successMessage').style.display = 'block';
        
        // Reset the form (clear all fields)
        form.reset();
        
        // Hide success message after 5 seconds
        setTimeout(function() {
            document.getElementById('successMessage').style.display = 'none';
        }, 5000);
    }
});

// Function to validate all form fields
function validateForm() {
    let isValid = true;
    
    // Get all the values from the form
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const requestType = document.getElementById('requestType').value;
    const policyType = document.getElementById('policyType').value;
    const message = document.getElementById('message').value.trim();
    const rating = document.querySelector('input[name="rating"]:checked');
    
    // Check Full Name - should not be empty
    if (fullName === '') {
        showError('nameError', 'Full Name is required');
        addErrorBorder('fullName');
        isValid = false;
    }
    
    // Check Email - should not be empty and should be valid email
    if (email === '') {
        showError('emailError', 'Email is required');
        addErrorBorder('email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email');
        addErrorBorder('email');
        isValid = false;
    }
    
    // Check Mobile - should be exactly 10 digits
    if (mobile === '') {
        showError('mobileError', 'Mobile Number is required');
        addErrorBorder('mobile');
        isValid = false;
    } else if (mobile.length !== 10 || isNaN(mobile)) {
        showError('mobileError', 'Mobile Number must be 10 digits');
        addErrorBorder('mobile');
        isValid = false;
    }
    
    // Check Request Type - should be selected
    if (requestType === '') {
        showError('requestTypeError', 'Request Type is required');
        addErrorBorder('requestType');
        isValid = false;
    }
    
    // Check Policy Type - should be selected
    if (policyType === '') {
        showError('policyTypeError', 'Policy Type is required');
        addErrorBorder('policyType');
        isValid = false;
    }
    
    // Check Message - should have at least 10 characters
    if (message === '') {
        showError('messageError', 'Message is required');
        addErrorBorder('message');
        isValid = false;
    } else if (message.length < 10) {
        showError('messageError', 'Message must be at least 10 characters');
        addErrorBorder('message');
        isValid = false;
    }
    
    // Check Rating - at least one should be selected
    if (!rating) {
        showError('ratingError', 'Experience Rating is required');
        isValid = false;
    }
    
    return isValid;
}

// Function to show error message
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Function to clear all error messages
function clearErrors() {
    const allErrors = document.querySelectorAll('.error');
    allErrors.forEach(function(error) {
        error.textContent = '';
        error.classList.remove('show');
    });
    
    // Remove red borders from all fields
    const allFields = document.querySelectorAll('input, select, textarea');
    allFields.forEach(function(field) {
        field.classList.remove('error-field');
    });
}

// Function to add red border to field
function addErrorBorder(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.add('error-field');
}

// Function to check if email is valid
function isValidEmail(email) {
    return email.includes('@') && email.includes('.');
}
