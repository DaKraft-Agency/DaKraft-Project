document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const steps = document.querySelectorAll('.form-step');
    const otherRadio = document.getElementById("other-radio");
    const otherText = document.getElementById("other-text");

    // Add message elements
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `
        <div class="success-message alert alert-success" style="display: none;">
            Votre formulaire a été soumis avec succès!
        </div>
        <div class="error-message alert alert-danger" style="display: none;">
            Une erreur s'est produite. Veuillez réessayer.
        </div>
    `;
    form.insertBefore(messageDiv, form.firstChild);

    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.querySelector('.error-message');

    // Initialize progress indicator
    const progressContainer = document.createElement('div');
    progressContainer.className = 'form-progress mb-4';
    progressContainer.innerHTML = `
        <div class="progress" style="height: 8px;">
            <div class="progress-bar bg-primary" role="progressbar" style="width: 33%;" 
                aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <div class="step-indicators d-flex justify-content-between mt-2">
            <div class="step-indicator active">Étape 1</div>
            <div class="step-indicator">Étape 2</div>
            <div class="step-indicator">Étape 3</div>
        </div>
    `;
    form.insertBefore(progressContainer, form.firstChild);

    const progressBar = document.querySelector('.progress-bar');
    const stepIndicators = document.querySelectorAll('.step-indicator');

    let currentStep = 1;

    // Validate specific step
    function validateStep(step) {
        let isValid = true;
        const currentStepElem = document.querySelector(`.form-step[data-step="${step}"]`);
        
        // Validate all required fields in the current step
        const requiredFields = currentStepElem.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
                
                // Additional validation for specific fields
                if (field.id === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value.trim())) {
                        field.classList.add('is-invalid');
                        isValid = false;
                    }
                } else if (field.id === 'telephone') {
                    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
                    if (!phoneRegex.test(field.value.trim())) {
                        field.classList.add('is-invalid');
                        isValid = false;
                    }
                }
            }
        });

        if (!isValid) {
            showMessage('error', 'Veuillez remplir tous les champs correctement.');
        }
        
        return isValid;
    }

    // Change to specific step
    function changeStep(step) {
        // Hide all steps
        steps.forEach(s => {
            s.style.display = 'none';
        });
        
        // Show the target step
        const targetStep = document.querySelector(`.form-step[data-step="${step}"]`);
        if (targetStep) {
            targetStep.style.display = 'block';
            currentStep = step;
            
            // Update progress bar
            const progress = ((step - 1) / (steps.length - 1)) * 100;
            progressBar.style.width = `${progress}%`;
            progressBar.setAttribute('aria-valuenow', progress);
            
            // Update step indicators
            stepIndicators.forEach((indicator, index) => {
                if (index + 1 <= step) {
                    indicator.classList.add('active');
                } else {
                    indicator.classList.remove('active');
                }
            });
            
            // If we're on the last step, populate the summary
            if (step === steps.length) {
                updateSummary();
            }
        }
    }
    
    // Update the summary on the final step
    function updateSummary() {
        const summary = document.getElementById('summary');
        if (!summary) return;
        
        const formData = {
            prenom: document.getElementById('prenom').value,
            nom: document.getElementById('nom').value,
            telephone: document.getElementById('telephone').value,
            email: document.getElementById('email').value,
            entreprise: document.getElementById('entreprise').value,
            projectType: document.getElementById('project-type')?.value || '',
            budget: document.getElementById('budget')?.value || '',
            description: document.getElementById('description')?.value || ''
        };
        
        // Create a formatted summary
        let summaryHTML = `
            <div class="summary-section">
                <h5>Informations Personnelles</h5>
                <p><strong>Nom complet:</strong> ${formData.prenom} ${formData.nom}</p>
                <p><strong>Téléphone:</strong> ${formData.telephone}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Entreprise:</strong> ${formData.entreprise}</p>
            </div>
            <div class="summary-section mt-3">
                <h5>Détails du Projet</h5>
                <p><strong>Type de Projet:</strong> ${getProjectTypeName(formData.projectType)}</p>
                <p><strong>Budget:</strong> ${getBudgetRange(formData.budget)}</p>
                <p><strong>Description:</strong> ${formData.description}</p>
            </div>
        `;
        
        summary.innerHTML = summaryHTML;
    }
    
    // Helper functions for readable display values
    function getProjectTypeName(value) {
        const types = {
            'website': 'Site Web',
            'ecommerce': 'E-commerce',
            'mobile': 'Application Mobile',
            'other': 'Autre'
        };
        return types[value] || value;
    }
    
    function getBudgetRange(value) {
        const budgets = {
            'small': '< 5000€',
            'medium': '5000€ - 10000€',
            'large': '10000€ - 20000€',
            'enterprise': '> 20000€'
        };
        return budgets[value] || value;
    }

    function showMessage(type, message) {
        const messageElement = type === 'success' ? successMessage : errorMessage;
        const otherMessage = type === 'success' ? errorMessage : successMessage;

        otherMessage.style.display = 'none';
        messageElement.textContent = message;
        messageElement.style.display = 'block';

        // Hide message after 5 seconds
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
    });

    function validateInput(input) {
        if (!input.hasAttribute('required')) return;
        
        const value = input.value.trim();
        
        switch(input.id) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                input.classList.toggle('is-invalid', !emailRegex.test(value));
                break;
            case 'telephone':
                const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
                input.classList.toggle('is-invalid', !phoneRegex.test(value));
                break;
            default:
                input.classList.toggle('is-invalid', value.length === 0);
        }
    }

    // Handle "Next" buttons
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                changeStep(currentStep + 1);
            }
        });
    });

    // Handle "Previous" buttons
    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', () => {
            changeStep(currentStep - 1);
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateStep(currentStep)) {
            // Here you would typically send the data to your server
            
            // For demo, simulate successful submission
            showMessage('success', 'Votre formulaire a été soumis avec succès!');
            
            // Reset form after 3 seconds and go back to step 1
            setTimeout(() => {
                form.reset();
                changeStep(1);
            }, 3000);
        }
    });

    document.querySelectorAll('input[name="option"]').forEach(radio => {
        radio.addEventListener("change", function () {
            if (otherRadio.checked) {
                otherText.style.display = "inline-block";
                otherText.disabled = false;
            } else {
                otherText.style.display = "inline-block";
                otherText.disabled = true;
                otherText.value = ""; // Réinitialiser le champ si décoché
            }
        });
    });
    
    // Initialize the form
    changeStep(1);
});