document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('multiStepForm');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    let currentStep = 1;

    // Afficher uniquement l'étape actuelle
    function showStep(step) {
        const formSteps = document.querySelectorAll('.form-step');
        formSteps.forEach((formStep, index) => {
            formStep.style.display = index + 1 === step ? 'block' : 'none';
        });
    }

    // Validation des champs requis
    function validateStep(step) {
        const currentStepElem = document.querySelector(`.form-step[data-step="${step}"]`);
        const requiredFields = currentStepElem.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });

        return isValid;
    }

    // Gestion du bouton "Suivant"
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });

    // Gestion du bouton "Précédent"
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            currentStep--;
            showStep(currentStep);
        });
    });

    // Initialisation
    showStep(currentStep);
});
