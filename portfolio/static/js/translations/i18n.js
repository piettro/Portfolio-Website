// Internationalization service for translation management
import { translations } from './translations.js';

export class TranslationService {
    static currentLanguage = 'en';

    /**
     * Initialize the translation service
     */
    static init() {
        // Get language from session or default to 'en'
        this.currentLanguage = this.getCurrentLanguage();
        this.translate(this.currentLanguage);
    }

    /**
     * Get current language from various sources
     */
    static getCurrentLanguage() {
        // Check URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && this.isSupported(urlLang)) {
            return urlLang;
        }

        // Check localStorage
        const storedLang = localStorage.getItem('preferred_language');
        if (storedLang && this.isSupported(storedLang)) {
            return storedLang;
        }

        // Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (this.isSupported(browserLang)) {
            return browserLang;
        }

        return 'en'; // default
    }

    /**
     * Check if language is supported
     */
    static isSupported(lang) {
        return ['en', 'es', 'pt'].includes(lang);
    }

    /**
     * Translate all elements with data-i18n attribute
     */
    static translate(lang) {
        if (!this.isSupported(lang)) {
            lang = 'en';
        }

        this.currentLanguage = lang;
        const langTranslations = translations[lang] || translations['en'];
        
        // Translate text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (langTranslations[key]) {
                element.textContent = langTranslations[key];
            }
        });
        
        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (langTranslations[key]) {
                element.placeholder = langTranslations[key];
            }
        });

        // Store language preference
        localStorage.setItem('preferred_language', lang);
        
        // Trigger custom event for other components
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));
    }

    /**
     * Get translation for specific key
     */
    static get(key, lang = null) {
        const language = lang || this.currentLanguage;
        const langTranslations = translations[language] || translations['en'];
        return langTranslations[key] || key;
    }

    /**
     * Set language and translate
     */
    static setLanguage(lang) {
        this.translate(lang);
    }
}

// Make it available globally for backward compatibility
window.translateStaticTexts = (lang) => TranslationService.translate(lang);