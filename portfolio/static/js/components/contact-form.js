// Contact form management with AJAX submission
import { messageModal } from './modal.js';
import { TranslationService } from '../translations/i18n.js';

export class ContactForm {
    constructor() {
        this.form = null;
        this.submitBtn = null;
        this.submitBtnText = null;
        this.submitBtnLoading = null;
        this.isSubmitting = false;
    }

    /**
     * Initialize contact form
     */
    init() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.submitBtnText = document.getElementById('submitBtnText');
        this.submitBtnLoading = document.getElementById('submitBtnLoading');

        if (!this.form) {
            console.error('Contact form not found!');
            return;
        }

        this.bindEvents();
    }

    /**
     * Bind form events
     */
    bindEvents() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    /**
     * Handle form submission
     */
    async handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.isSubmitting) return;

        this.showLoading();

        try {
            const formData = new FormData(this.form);
            
            // Add CSRF token
            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
            if (csrfToken) {
                formData.append('csrfmiddlewaretoken', csrfToken.value);
            }

            const response = await fetch(this.form.action || '/contact/submit/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'same-origin'
            });

            const data = await this.handleResponse(response);
            this.handleSuccess(data);

        } catch (error) {
            console.error('Contact form error:', error);
            this.handleError(error);
        } finally {
            this.hideLoading();
        }
    }

    /**
     * Handle response from server
     */
    async handleResponse(response) {
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            throw new Error('Server returned non-JSON response');
        }
    }

    /**
     * Handle successful submission
     */
    handleSuccess(data) {
        if (data.success) {
            const successMessage = data.message || TranslationService.get('message_sent_success') || 
                'Message sent successfully! I will get back to you soon.';
            messageModal.show('success', successMessage);
            this.form.reset();
        } else {
            let errorMessage = data.message || 'Please correct the errors in the form.';
            if (data.errors) {
                const errorList = Object.values(data.errors).flat().join(', ');
                errorMessage += ' ' + errorList;
            }
            messageModal.show('error', errorMessage);
        }
    }

    /**
     * Handle submission error
     */
    handleError(error) {
        const errorMessage = TranslationService.get('message_error') || 
            'An error occurred. Please try again later.';
        messageModal.show('error', errorMessage);
    }

    /**
     * Show loading state
     */
    showLoading() {
        this.isSubmitting = true;
        
        if (this.submitBtn) {
            this.submitBtn.disabled = true;
        }
        
        if (this.submitBtnText) {
            this.submitBtnText.classList.add('hidden');
        }
        
        if (this.submitBtnLoading) {
            this.submitBtnLoading.classList.remove('hidden');
        }
    }

    /**
     * Hide loading state
     */
    hideLoading() {
        this.isSubmitting = false;
        
        if (this.submitBtn) {
            this.submitBtn.disabled = false;
        }
        
        if (this.submitBtnText) {
            this.submitBtnText.classList.remove('hidden');
        }
        
        if (this.submitBtnLoading) {
            this.submitBtnLoading.classList.add('hidden');
        }
    }

    /**
     * Validate form fields
     */
    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldError(field, 'This field is required');
                isValid = false;
            } else {
                this.clearFieldError(field);
            }
        });

        // Email validation
        const emailField = this.form.querySelector('[type="email"]');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                this.showFieldError(emailField, 'Please enter a valid email address');
                isValid = false;
            }
        }

        return isValid;
    }

    /**
     * Show field error
     */
    showFieldError(field, message) {
        field.classList.add('border-red-500');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-red-400 text-xs mt-1';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }

    /**
     * Clear field error
     */
    clearFieldError(field) {
        field.classList.remove('border-red-500');
        
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
}