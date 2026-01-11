// Customer data array to store all customers
let customers = [];
let customerId = 1;

// Get form element
const form = document.getElementById('enquiryForm');
const coverageSlider = document.getElementById('coverage');
const coverageValue = document.getElementById('coverageValue');
const estimatedPremium = document.getElementById('estimatedPremium');
const policyTypeSelect = document.getElementById('policyType');
const ageInput = document.getElementById('age');

// Update coverage value when slider moves
coverageSlider.addEventListener('input', function() {
    coverageValue.textContent = this.value;
    calculatePremium();
});

// Update premium when policy type or age changes
policyTypeSelect.addEventListener('change', calculatePremium);
ageInput.addEventListener('input', calculatePremium);

// Calculate premium dynamically
function calculatePremium() {
    const policyType = policyTypeSelect.value;
    const age = parseInt(ageInput.value) || 0;
    const coverage = parseInt(coverageSlider.value);
    
    if (!policyType) {
        estimatedPremium.textContent = '₹0';
        return;
    }
    
    // Base premium based on policy type
    let basePremium = 0;
    if (policyType === 'Health') {
        basePremium = 3000;
    } else if (policyType === 'Life') {
        basePremium = 5000;
    } else if (policyType === 'Vehicle') {
        basePremium = 2000;
    }
    
    // Add 20% if age > 45
    if (age > 45) {
        basePremium = basePremium * 1.20;
    }
    
    // Add ₹500 per additional 1L coverage (starting from 1L base)
    const additionalCoverage = coverage - 1;
    const coveragePremium = additionalCoverage * 500;
    
    const totalPremium = basePremium + coveragePremium;
    estimatedPremium.textContent = '₹' + totalPremium.toFixed(0);
    
    return totalPremium;
}

// Form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Clear old errors
    clearErrors();
    
    // Validate form
    if (validateForm()) {
        // Get form values
        const name = document.getElementById('customerName').value.trim();
        const age = parseInt(document.getElementById('age').value);
        const email = document.getElementById('email').value.trim();
        const policyType = document.getElementById('policyType').value;
        const coverage = parseInt(document.getElementById('coverage').value);
        const premium = calculatePremium();
        
        // Create customer object
        const customer = {
            id: customerId++,
            name: name,
            age: age,
            email: email,
            policyType: policyType,
            coverage: coverage,
            premium: premium
        };
        
        // Add to customers array
        customers.push(customer);
        
        // Update table
        displayCustomers(customers);
        
        // Update customer count
        document.getElementById('totalCustomers').textContent = customers.length;
        
        // Reset form
        form.reset();
        estimatedPremium.textContent = '₹0';
        coverageValue.textContent = '5';
        
        // Show success message (you can add an alert or notification)
        alert('Customer added successfully!');
    }
});

// Validate form function
function validateForm() {
    let isValid = true;
    
    const name = document.getElementById('customerName').value.trim();
    const age = document.getElementById('age').value.trim();
    const email = document.getElementById('email').value.trim();
    const policyType = document.getElementById('policyType').value;
    
    // Validate name
    if (name === '') {
        showError('nameError', 'Customer Name is required');
        addErrorBorder('customerName');
        isValid = false;
    }
    
    // Validate age
    if (age === '') {
        showError('ageError', 'Age is required');
        addErrorBorder('age');
        isValid = false;
    } else if (age < 18 || age > 100) {
        showError('ageError', 'Age must be between 18 and 100');
        addErrorBorder('age');
        isValid = false;
    }
    
    // Validate email
    if (email === '') {
        showError('emailError', 'Email is required');
        addErrorBorder('email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email');
        addErrorBorder('email');
        isValid = false;
    }
    
    // Validate policy type
    if (policyType === '') {
        showError('policyError', 'Policy Type is required');
        addErrorBorder('policyType');
        isValid = false;
    }
    
    return isValid;
}

// Show error message
function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Clear all errors
function clearErrors() {
    const allErrors = document.querySelectorAll('.error');
    allErrors.forEach(function(error) {
        error.textContent = '';
        error.classList.remove('show');
    });
    
    const allFields = document.querySelectorAll('input, select');
    allFields.forEach(function(field) {
        field.classList.remove('error-field');
    });
}

// Add error border
function addErrorBorder(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.add('error-field');
}

// Validate email
function isValidEmail(email) {
    return email.includes('@') && email.includes('.');
}

// Display customers in table
function displayCustomers(customersToShow) {
    const tableBody = document.getElementById('customerTableBody');
    
    if (customersToShow.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="px-4 py-8 text-center text-gray-500">No customers found.</td></tr>';
        return;
    }
    
    let html = '';
    customersToShow.forEach(function(customer) {
        // Get badge color based on policy type
        let badgeClass = '';
        if (customer.policyType === 'Health') {
            badgeClass = 'badge-health';
        } else if (customer.policyType === 'Life') {
            badgeClass = 'badge-life';
        } else if (customer.policyType === 'Vehicle') {
            badgeClass = 'badge-vehicle';
        }
        
        html += '<tr>';
        html += '<td class="px-4 py-3">' + customer.name + '</td>';
        html += '<td class="px-4 py-3">' + customer.age + '</td>';
        html += '<td class="px-4 py-3"><span class="badge ' + badgeClass + '">' + customer.policyType + '</span></td>';
        html += '<td class="px-4 py-3">₹' + customer.coverage + 'L</td>';
        html += '<td class="px-4 py-3 font-semibold">₹' + customer.premium.toFixed(0) + '</td>';
        html += '</tr>';
    });
    
    tableBody.innerHTML = html;
}

// Filter by policy type
document.getElementById('filterPolicy').addEventListener('change', function() {
    filterAndSearch();
});

// Search by name
document.getElementById('searchName').addEventListener('input', function() {
    filterAndSearch();
});

// Filter and search function
function filterAndSearch() {
    const filterValue = document.getElementById('filterPolicy').value;
    const searchValue = document.getElementById('searchName').value.toLowerCase();
    
    let filteredCustomers = customers;
    
    // Filter by policy type
    if (filterValue !== '') {
        filteredCustomers = filteredCustomers.filter(function(customer) {
            return customer.policyType === filterValue;
        });
    }
    
  
    if (searchValue !== '') {
        filteredCustomers = filteredCustomers.filter(function(customer) {
            return customer.name.toLowerCase().includes(searchValue);
        });
    }
    
    displayCustomers(filteredCustomers);
}


