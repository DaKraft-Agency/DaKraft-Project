const options = [
    {
        id: 'hosting',
        name: 'Hébergement & Nom de domaine',
        description: 'Hébergement premium et nom de domaine personnalisé pour votre site',
        price: 120000,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`
    },
    {
        id: 'blog',
        name: 'Blog Intégré',
        description: 'Système de blog complet avec gestion des articles et commentaires',
        price: 250000,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2v6h6"/><path d="M4 2v20h16V8l-6-6H4z"/><path d="M10 10h4"/><path d="M10 14h8"/><path d="M10 18h8"/></svg>`
    },
    {
        id: 'custom',
        name: 'Personnalisation Avancée',
        description: 'Options de personnalisation étendues pour votre site',
        price: 350000,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`
    },
    {
        id: 'shop',
        name: 'Boutique en Ligne',
        description: 'Fonctionnalités e-commerce complètes avec gestion des produits',
        price: 450000,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`
    },
    {
        id: 'members',
        name: 'Espace Membre',
        description: 'Système de connexion et gestion des membres',
        price: 300000,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
    },
    {
        id: 'pages',
        name: 'Pages Supplémentaires',
        description: 'Ajoutez des pages supplémentaires à votre site (50 000 XOF par page)',
        price: 50000,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>`,
        hasQuantity: true,
        quantity: 1
    }
];

class OptionsManager {
    constructor() {
        this.selectedOptions = new Set();
        this.quantities = new Map();
        this.init();
    }

    init() {
        this.renderOptions();
        this.updateCart();
    }

    renderOptions() {
        const optionsGrid = document.getElementById('optionsGrid');
        
        options.forEach(option => {
            const card = this.createOptionCard(option);
            optionsGrid.appendChild(card);
        });
    }

    formatPrice(price) {
        return new Intl.NumberFormat('fr-FR').format(price);
    }

    createOptionCard(option) {
        const card = document.createElement('div');
        card.className = 'option-card';
        card.id = `card-${option.id}`;
        
        const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="status-icon"><polyline points="20 6 9 17 4 12"/></svg>`;
        const xIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="status-icon"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
        
        let quantityHtml = '';
        if (option.hasQuantity) {
            quantityHtml = `
                <div class="quantity-controls">
                    <button class="quantity-btn minus" disabled>-</button>
                    <span class="quantity">1</span>
                    <button class="quantity-btn plus">+</button>
                </div>
            `;
        }

        card.innerHTML = `
            <div class="option-content">
                <div class="option-header">
                    <div class="icon-wrapper">
                        ${option.icon}
                    </div>
                    <div class="status">
                        ${xIcon}
                    </div>
                </div>
                <h3 class="option-title">${option.name}</h3>
                <p class="option-description">${option.description}</p>
                <div class="option-footer">
                    <div class="price-container">
                        <span class="price">${this.formatPrice(option.price)} XOF</span>
                        ${quantityHtml}
                    </div>
                    <button class="toggle-btn">Ajouter</button>
                </div>
            </div>
        `;

        const button = card.querySelector('.toggle-btn');
        button.addEventListener('click', () => this.toggleOption(option.id));

        if (option.hasQuantity) {
            const minusBtn = card.querySelector('.minus');
            const plusBtn = card.querySelector('.plus');
            const quantitySpan = card.querySelector('.quantity');

            minusBtn.addEventListener('click', () => {
                const currentQty = this.quantities.get(option.id) || 1;
                if (currentQty > 1) {
                    this.updateQuantity(option.id, currentQty - 1);
                    quantitySpan.textContent = currentQty - 1;
                    minusBtn.disabled = currentQty - 1 === 1;
                }
            });

            plusBtn.addEventListener('click', () => {
                const currentQty = this.quantities.get(option.id) || 1;
                this.updateQuantity(option.id, currentQty + 1);
                quantitySpan.textContent = currentQty + 1;
                minusBtn.disabled = false;
            });
        }

        return card;
    }

    updateQuantity(optionId, quantity) {
        this.quantities.set(optionId, quantity);
        this.updateCart();
    }

    toggleOption(optionId) {
        if (this.selectedOptions.has(optionId)) {
            this.selectedOptions.delete(optionId);
            this.quantities.delete(optionId);
        } else {
            this.selectedOptions.add(optionId);
            if (options.find(opt => opt.id === optionId).hasQuantity) {
                this.quantities.set(optionId, 1);
            }
        }
        
        this.updateOptionCard(optionId);
        this.updateCart();
    }

    updateOptionCard(optionId) {
        const card = document.getElementById(`card-${optionId}`);
        const button = card.querySelector('.toggle-btn');
        const isSelected = this.selectedOptions.has(optionId);
        
        card.classList.toggle('selected', isSelected);
        button.classList.toggle('selected', isSelected);
        button.textContent = isSelected ? 'Retirer' : 'Ajouter';
        
        const statusIcon = card.querySelector('.status-icon');
        statusIcon.style.color = isSelected ? '#2563eb' : '#9ca3af';

        // Enable/disable quantity controls if present
        const quantityControls = card.querySelector('.quantity-controls');
        if (quantityControls) {
            const minusBtn = quantityControls.querySelector('.minus');
            const plusBtn = quantityControls.querySelector('.plus');
            const quantitySpan = quantityControls.querySelector('.quantity');

            if (isSelected) {
                minusBtn.disabled = this.quantities.get(optionId) === 1;
                plusBtn.disabled = false;
            } else {
                minusBtn.disabled = true;
                plusBtn.disabled = true;
                quantitySpan.textContent = '1';
            }
        }
    }

    updateCart() {
        const selectedCount = this.selectedOptions.size;
        const total = this.calculateTotal();
        
        document.getElementById('selectedCount').textContent = 
            `${selectedCount} option${selectedCount !== 1 ? 's' : ''} sélectionnée${selectedCount !== 1 ? 's' : ''}`;
        document.getElementById('totalPrice').textContent = `${this.formatPrice(total)} XOF`;
        document.getElementById('continueBtn').disabled = selectedCount === 0;
    }

    calculateTotal() {
        return Array.from(this.selectedOptions)
            .reduce((sum, optionId) => {
                const option = options.find(opt => opt.id === optionId);
                const quantity = this.quantities.get(optionId) || 1;
                return sum + (option.price * quantity);
            }, 0);
    }
}

// Initialize the options manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new OptionsManager();
});

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".toggle-btn");
    const hiddenDiv = document.getElementById("cartContent");

    function updateCartVisibility() {
        const anyChecked = Array.from(buttons).some(button => button.classList.contains("active"));
        hiddenDiv.style.display = anyChecked ? "flex" : "none";
    }

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            this.classList.toggle("active"); // Simule un état coché/décoché
            hiddenDiv.style.display = "flex"; // Affiche le div à la sélection
            updateCartVisibility(); // Vérifie s'il doit être caché ou non
        });
    });

    updateCartVisibility(); // Vérifie l'état initial
});