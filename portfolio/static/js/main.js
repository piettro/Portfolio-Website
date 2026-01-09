// Main application initialization - Production ready version
console.log('🚀 Loading main.js as ES6 module...');

class PortfolioApp {
    constructor() {
        console.log('📦 PortfolioApp constructor called');
        this.modulesLoaded = false;
    }

    async init() {
        console.log('⚙️ Initializing Portfolio App...');
        
        try {
            // Test basic functionality first
            this.testBasicFeatures();
            
            // Setup certifications toggle (works without imports)
            this.setupCertificationsToggle();
            
            // Load advanced features with retry logic
            await this.loadAdvancedFeaturesWithRetry();
            
            console.log('✅ Portfolio app initialized successfully');
        } catch (error) {
            console.error('❌ Critical error during initialization:', error);
            this.fallbackToBasicMode();
        }
    }

    async loadAdvancedFeaturesWithRetry(maxRetries = 3) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`🔄 Loading advanced features (attempt ${attempt}/${maxRetries})...`);
                await this.loadAdvancedFeatures();
                this.modulesLoaded = true;
                return;
            } catch (error) {
                console.error(`❌ Attempt ${attempt} failed:`, error.message);
                if (attempt === maxRetries) {
                    console.error('❌ All attempts failed, using basic functionality only');
                    this.fallbackToBasicMode();
                } else {
                    console.log(`⏳ Waiting before retry...`);
                    await new Promise(resolve => setTimeout(resolve, 500 * attempt));
                }
            }
        }
    }

    fallbackToBasicMode() {
        console.log('🔄 Running in basic mode - some features may be limited');
        // Ensure critical features still work
        this.setupBasicInteractions();
    }

    setupBasicInteractions() {
        // Setup basic project cards click
        const projectCards = document.querySelectorAll('.project-card[onclick]');
        console.log(`🎯 Found ${projectCards.length} project cards with onclick`);
        
        // Setup basic navigation
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        console.log('✅ Basic interactions setup complete');
    }

    testBasicFeatures() {
        console.log('🧪 Testing basic features...');
        
        // Test DOM access
        const projectCards = document.querySelectorAll('.project-card');
        console.log(`📊 Found ${projectCards.length} project cards`);
        
        // Test global data
        if (window.projectsData) {
            const projectCount = Object.keys(window.projectsData).length;
            console.log(`📁 Found ${projectCount} projects in window.projectsData`);
        } else {
            console.warn('⚠️ window.projectsData not found');
        }
        
        console.log('✅ Basic features test completed');
    }

    async loadAdvancedFeatures() {
        const modulesToLoad = [
            { name: 'TranslationService', path: './translations/i18n.js', key: 'TranslationService' },
            { name: 'Modal', path: './components/modal.js', key: 'modalManager' },
            { name: 'ContactForm', path: './components/contact-form.js', key: 'ContactForm' },
            { name: 'Filters', path: './components/filters.js', key: 'ProjectFilter' }
        ];

        const loadedModules = {};

        for (const moduleInfo of modulesToLoad) {
            try {
                console.log(`📦 Loading ${moduleInfo.name}...`);
                const module = await import(moduleInfo.path);
                loadedModules[moduleInfo.name] = module;
                console.log(`✅ ${moduleInfo.name} loaded successfully`);
                
                // Small delay to prevent overwhelming the browser
                await new Promise(resolve => setTimeout(resolve, 50));
                
            } catch (error) {
                console.error(`❌ Failed to load ${moduleInfo.name}:`, error.message);
                throw new Error(`Module ${moduleInfo.name} failed to load: ${error.message}`);
            }
        }

        // Initialize modules after all are loaded
        try {
            // Initialize Translation Service
            if (loadedModules.TranslationService?.TranslationService) {
                loadedModules.TranslationService.TranslationService.init();
                console.log('🌐 Translation service initialized');
            }

            // Initialize Contact Form
            if (loadedModules.ContactForm?.ContactForm) {
                const contactForm = new loadedModules.ContactForm.ContactForm();
                contactForm.init();
                console.log('📧 Contact form initialized');
            }

            // Initialize Project Filter
            if (loadedModules.Filters?.ProjectFilter) {
                const projectFilter = new loadedModules.Filters.ProjectFilter();
                projectFilter.init();
                console.log('🔍 Project filter initialized');
            }

            // Initialize Experience Toggle
            if (loadedModules.Filters?.ExperienceToggle) {
                const experienceToggle = new loadedModules.Filters.ExperienceToggle();
                experienceToggle.init();
                console.log('💼 Experience toggle initialized');
            }

        } catch (error) {
            console.error('❌ Error initializing modules:', error.message);
            throw error;
        }

        console.log('✅ All advanced features loaded and initialized');
    }

    setupCertificationsToggle() {
        console.log('🎛️ Setting up certifications toggle...');
        
        const viewAllBtn = document.getElementById('viewAllCertificationsBtn');
        if (!viewAllBtn) {
            console.warn('⚠️ Certifications button not found');
            return;
        }

        let isExpanded = false;
        
        viewAllBtn.addEventListener('click', () => {
            const hiddenCertifications = document.querySelectorAll('.certification-card.hidden-by-default');
            const btnText = document.getElementById('viewAllCertificationsText');
            const btnIcon = document.getElementById('viewAllCertificationsIcon');

            isExpanded = !isExpanded;
            console.log(`🔄 Toggling certifications: ${isExpanded ? 'expand' : 'collapse'}`);

            hiddenCertifications.forEach(cert => {
                if (isExpanded) {
                    cert.style.display = 'block';
                    cert.classList.add('fade-in');
                } else {
                    cert.style.display = 'none';
                    cert.classList.remove('fade-in');
                }
            });

            if (btnText && btnIcon) {
                if (isExpanded) {
                    btnText.textContent = 'Show Less';
                    btnIcon.style.transform = 'rotate(180deg)';
                } else {
                    btnText.textContent = 'View All Certificates';
                    btnIcon.style.transform = 'rotate(0deg)';
                }
            }
        });

        // Initialize view
        const hiddenCertifications = document.querySelectorAll('.certification-card.hidden-by-default');
        if (hiddenCertifications.length > 0) {
            viewAllBtn.style.display = 'flex';
            hiddenCertifications.forEach(cert => {
                cert.style.display = 'none';
            });
            console.log(`📦 ${hiddenCertifications.length} certifications hidden by default`);
        }
    }
}

// Create app instance
const portfolioApp = new PortfolioApp();
console.log('📦 PortfolioApp instance created');

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    console.log('⏳ DOM still loading, waiting...');
    document.addEventListener('DOMContentLoaded', () => {
        console.log('✅ DOM loaded, initializing app...');
        portfolioApp.init();
    });
} else {
    console.log('✅ DOM already loaded, initializing app immediately...');
    portfolioApp.init();
}

// Global functions for backward compatibility
window.toggleAllCertifications = () => {
    console.log('🔄 Global toggleAllCertifications called');
    const btn = document.getElementById('viewAllCertificationsBtn');
    if (btn) btn.click();
};

// Make app available globally for debugging
window.portfolioApp = portfolioApp;

console.log('📝 main.js loaded successfully');

export default portfolioApp;