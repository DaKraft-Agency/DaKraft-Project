

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('multiStepForm');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    const optionsSection = document.querySelector('.options-container');
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
                if (currentStep === 4) {
                    // Fin du formulaire principal : cacher le formulaire et afficher la section options
                    form.style.display = 'none';
                    optionsSection.style.display = 'block';
                } else {
                    currentStep++;
                    showStep(currentStep);
                }
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

    // Juste après que le formulaire soit "terminé" (genre au clic sur envoyer)
const submitButton = document.querySelector('#submitButton'); // bouton envoyer
const confirmationCard = document.getElementById('confirmationCard');
const formSteps = document.querySelectorAll('.form-step');
const stepBox = document.querySelector('.step-box');

submitButton.addEventListener('click', () => {
  // Tu peux aussi mettre ici ton appel à emailjs si besoin

  // On masque toutes les étapes du form
  formSteps.forEach(step => step.style.display = 'none');
  stepBox.style.display = 'none'; // cache aussi les petits cercles du haut s’il faut

  // On affiche la carte
  confirmationCard.style.display = 'block';
});



});
