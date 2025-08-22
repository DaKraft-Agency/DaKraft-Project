document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('multiStepForm');
    const steps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    let currentStep = 1;

    // Validation des champs requis
    function validateStep(step) {
        const currentStepElement = document.querySelector(`.form-step[data-step="${step}"]`);
        const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
        let isValid = true;

        // Réinitialiser les messages d'erreur
        currentStepElement.querySelectorAll('.error-message').forEach(error => {
            error.textContent = '';
        });
        currentStepElement.querySelectorAll('.error').forEach(input => {
            input.classList.remove('error');
        });

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                const errorDiv = input.nextElementSibling;
                if (errorDiv && errorDiv.classList.contains('error-message')) {
                    errorDiv.textContent = 'Ce champ est requis';
                }
            } else if (input.type === 'email' && !validateEmail(input.value)) {
                isValid = false;
                input.classList.add('error');
                const errorDiv = input.nextElementSibling;
                if (errorDiv && errorDiv.classList.contains('error-message')) {
                    errorDiv.textContent = 'Email invalide';
                }
            }
        });

        return isValid;
    }

    // Validation email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Afficher l'étape spécifiée
    function showStep(step) {
        steps.forEach((stepElement, index) => {
            stepElement.classList.remove('active');
            progressSteps[index].classList.remove('active');
        });

        steps[step - 1].classList.add('active');
        for (let i = 0; i < step; i++) {
            progressSteps[i].classList.add('active');
        }
    }

    // Gestionnaire pour le bouton suivant
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    // Gestionnaire pour le bouton précédent
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    // Gestionnaire de soumission du formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateStep(currentStep)) {
            // Récupérer toutes les données du formulaire
            const formData = new FormData(form);
            const data = {};
            for (let [key, value] of formData.entries()) {
                if (key === 'features') {
                    if (!data[key]) {
                        data[key] = [];
                    }
                    data[key].push(value);
                } else {
                    data[key] = value;
                }
            }

            // Ici vous pouvez ajouter la logique pour envoyer les données
            console.log('Données du formulaire:', data);
            
            // Exemple de message de succès
            alert('Formulaire soumis avec succès !');
        }
    });

    // Initialisation
    showStep(1);
});