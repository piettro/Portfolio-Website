// Modal management system
export class ModalManager {
    constructor() {
        this.activeModal = null;
    }

    /**
     * Open a modal
     */
    open(modalId) {
        this.close(); // Close any existing modal
        
        const modal = document.getElementById(modalId);
        if (!modal) return;

        this.activeModal = modal;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Add animation classes
        setTimeout(() => {
            modal.style.opacity = '1';
            const content = modal.querySelector('.modal-content');
            if (content) {
                content.style.transform = 'scale(1)';
            }
        }, 10);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Bind close events
        this.bindCloseEvents(modal);
    }

    /**
     * Close active modal
     */
    close() {
        if (!this.activeModal) return;

        const modal = this.activeModal;
        
        // Add closing animation
        modal.style.opacity = '0';
        const content = modal.querySelector('.modal-content');
        if (content) {
            content.style.transform = 'scale(0.95)';
        }

        // Hide modal after animation
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';
            this.activeModal = null;
        }, 300);
    }

    /**
     * Bind close events to modal
     */
    bindCloseEvents(modal) {
        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.close();
            }
        });

        // Close on escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                this.close();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);

        // Close button
        const closeBtn = modal.querySelector('[data-modal-close], .modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }
    }
}

// Message Modal System
export class MessageModal {
    constructor() {
        this.modal = null;
        this.title = null;
        this.message = null;
        this.closeBtn = null;
        this.init();
    }

    init() {
        this.modal = document.getElementById('messageModal');
        this.title = document.getElementById('messageModalTitle');
        this.message = document.getElementById('messageModalMessage');
        this.closeBtn = document.getElementById('messageModalClose');

        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.hide());
        }

        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.hide();
                }
            });
        }
    }

    show(type, messageText) {
        if (!this.modal || !this.title || !this.message) return;

        // Set content
        this.message.textContent = messageText;

        // Set title and icon based on type
        if (type === 'success') {
            this.title.innerHTML = '<i class="fas fa-check-circle text-green-400 mr-2"></i>Success!';
        } else if (type === 'error') {
            this.title.innerHTML = '<i class="fas fa-exclamation-circle text-red-400 mr-2"></i>Error!';
        } else {
            this.title.innerHTML = '<i class="fas fa-info-circle text-blue-400 mr-2"></i>Info';
        }

        // Show modal
        this.modal.classList.remove('opacity-0', 'invisible');
        this.modal.classList.add('opacity-100', 'visible');

        // Scale animation
        const content = this.modal.querySelector('div > div');
        if (content) {
            content.style.transform = 'scale(1)';
        }
    }

    hide() {
        if (!this.modal) return;

        this.modal.classList.add('opacity-0', 'invisible');
        this.modal.classList.remove('opacity-100', 'visible');

        // Scale animation
        const content = this.modal.querySelector('div > div');
        if (content) {
            content.style.transform = 'scale(0.95)';
        }
    }
}

// Global instances
export const modalManager = new ModalManager();
export const messageModal = new MessageModal();

// Global functions for backward compatibility
window.closeProjectModal = () => modalManager.close();
window.showMessageModal = (type, message) => messageModal.show(type, message);