// Translation dictionary for static HTML texts
const translations = {
    'en': {
        'featured_projects': 'Featured Projects',
        'projects_description': 'A collection of projects I\'ve worked on. Each project represents a unique challenge and showcases different aspects of my skills and expertise.',
        'all': 'All',
        'data_science': 'Data Science',
        'web_development': 'Web Development',
        'ai_ml': 'AI/ML',
        'live_demo': 'Live Demo',
        'code': 'Code',
        'view_all_projects': 'View All Projects',
        'show_less': 'Show Less',
        'get_in_touch': 'Get In Touch',
        'professional_journey': 'Professional Journey',
        'show_more': 'Show More',
        'key_achievements': 'Key Achievements',
        'technologies_used': 'Technologies Used',
        'view_all_experiences': 'View All Experiences',
        'core_competencies': 'Core Competencies',
        'technical_expertise': 'Technical Expertise',
        'about_me': 'About Me',
        'download_cv': 'Download CV',
        'contact_me': 'Contact Me',
        'certifications': 'Certifications',
        'hobbies_interests': 'Hobbies, Interests and Blog',
        'latest_posts': 'Latest Posts',
        'view_all_posts': 'View All Posts',
        'contact': 'Contact',
        'your_name': 'Your name',
        'your_email': 'your.email@example.com',
        'subject': 'What\'s this regarding?',
        'message': 'Tell me about your project or just say hello!',
        'send_message': 'Send Message',
        'no_projects': 'No projects available at the moment.',
        'challenges': 'Challenges & Problems',
        'solutions': 'Solutions'
    },
    'es': {
        'featured_projects': 'Proyectos Destacados',
        'projects_description': 'Una colección de proyectos en los que he trabajado. Cada proyecto representa un desafío único y muestra diferentes aspectos de mis habilidades y experiencia.',
        'all': 'Todos',
        'data_science': 'Ciencia de Datos',
        'web_development': 'Desarrollo Web',
        'ai_ml': 'IA/ML',
        'live_demo': 'Demo en Vivo',
        'code': 'Código',
        'view_all_projects': 'Ver Todos los Proyectos',
        'show_less': 'Mostrar Menos',
        'get_in_touch': 'Ponerse en Contacto',
        'professional_journey': 'Trayectoria Profesional',
        'show_more': 'Mostrar Más',
        'key_achievements': 'Logros Clave',
        'technologies_used': 'Tecnologías Utilizadas',
        'view_all_experiences': 'Ver Todas las Experiencias',
        'core_competencies': 'Competencias Principales',
        'technical_expertise': 'Experiencia Técnica',
        'about_me': 'Sobre Mí',
        'download_cv': 'Descargar CV',
        'contact_me': 'Contáctame',
        'certifications': 'Certificaciones',
        'hobbies_interests': 'Pasatiempos, Intereses y Blog',
        'latest_posts': 'Últimas Publicaciones',
        'view_all_posts': 'Ver Todas las Publicaciones',
        'contact': 'Contacto',
        'your_name': 'Tu nombre',
        'your_email': 'tu.email@ejemplo.com',
        'subject': '¿De qué se trata?',
        'message': 'Cuéntame sobre tu proyecto o simplemente saluda!',
        'send_message': 'Enviar Mensaje',
        'no_projects': 'No hay proyectos disponibles en este momento.',
        'challenges': 'Desafíos y Problemas',
        'solutions': 'Soluciones'
    },
    'pt': {
        'featured_projects': 'Projetos em Destaque',
        'projects_description': 'Uma coleção de projetos nos quais trabalhei. Cada projeto representa um desafio único e mostra diferentes aspectos das minhas habilidades e experiência.',
        'all': 'Todos',
        'data_science': 'Ciência de Dados',
        'web_development': 'Desenvolvimento Web',
        'ai_ml': 'IA/ML',
        'live_demo': 'Demo ao Vivo',
        'code': 'Código',
        'view_all_projects': 'Ver Todos os Projetos',
        'show_less': 'Mostrar Menos',
        'get_in_touch': 'Entre em Contato',
        'professional_journey': 'Jornada Profissional',
        'show_more': 'Mostrar Mais',
        'key_achievements': 'Conquistas Principais',
        'technologies_used': 'Tecnologias Utilizadas',
        'view_all_experiences': 'Ver Todas as Experiências',
        'core_competencies': 'Competências Principais',
        'technical_expertise': 'Expertise Técnica',
        'about_me': 'Sobre Mim',
        'download_cv': 'Baixar CV',
        'contact_me': 'Entre em Contato',
        'certifications': 'Certificações',
        'hobbies_interests': 'Hobbies, Interesses e Blog',
        'latest_posts': 'Últimas Publicações',
        'view_all_posts': 'Ver Todas as Publicações',
        'contact': 'Contato',
        'your_name': 'Seu nome',
        'your_email': 'seu.email@exemplo.com',
        'subject': 'Sobre o que é isso?',
        'message': 'Conte-me sobre seu projeto ou apenas diga olá!',
        'send_message': 'Enviar Mensagem',
        'no_projects': 'Nenhum projeto disponível no momento.',
        'challenges': 'Desafios e Problemas',
        'solutions': 'Soluções'
    }
};

// Function to translate static texts
function translateStaticTexts(lang) {
    const langTranslations = translations[lang] || translations['en'];
    
    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (langTranslations[key]) {
            element.textContent = langTranslations[key];
        }
    });
    
    // Translate placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (langTranslations[key]) {
            element.placeholder = langTranslations[key];
        }
    });
}

// Carousel state
let currentCarouselIndex = 0;
let currentProjectImages = [];

// Open Project Modal
function openProjectModal(projectId) {
    const project = projectsData[projectId];
    if (!project) return;

    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalType = document.getElementById('modalType');
    const modalDescription = document.getElementById('modalDescription');
    const modalTechStack = document.getElementById('modalTechStack');
    const modalCarousel = document.getElementById('modalCarousel');
    const carouselIndicators = document.getElementById('carouselIndicators');
    const modalLiveBtn = document.getElementById('modalLiveBtn');
    const modalCodeBtn = document.getElementById('modalCodeBtn');

    // Reset carousel
    currentCarouselIndex = 0;
    currentProjectImages = project.images || [];

    // Set project details
    modalTitle.textContent = project.title;
    modalType.textContent = project.type;
    modalDescription.textContent = project.description;

    // Create carousel images
    modalCarousel.innerHTML = '';
    carouselIndicators.innerHTML = '';

    if (currentProjectImages.length > 0) {
        currentProjectImages.forEach((image, index) => {
            // Create image element
            const imgDiv = document.createElement('div');
            imgDiv.className = 'carousel-image-container min-w-full h-full relative';
            imgDiv.innerHTML = `
                <img src="${image}" alt="${project.title} - Image ${index + 1}" 
                     class="carousel-image w-full h-full object-cover">
            `;
            modalCarousel.appendChild(imgDiv);

            // Create indicator
            const indicator = document.createElement('div');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.onclick = () => goToCarouselImage(index);
            carouselIndicators.appendChild(indicator);
        });

        // Show/hide navigation buttons based on number of images
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');
        if (currentProjectImages.length <= 1) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            carouselIndicators.style.display = 'none';
        } else {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
            carouselIndicators.style.display = 'flex';
        }
    } else {
        // If no images, show placeholder
        modalCarousel.innerHTML = `
            <div class="min-w-full h-full flex items-center justify-center bg-white/5">
                <i class="fas fa-image text-6xl text-text-secondary"></i>
            </div>
        `;
        document.getElementById('carouselPrev').style.display = 'none';
        document.getElementById('carouselNext').style.display = 'none';
        carouselIndicators.style.display = 'none';
    }

    // Set basic info (again to be safe)
    modalTitle.textContent = project.title;
    modalType.textContent = project.type;
    modalDescription.textContent = project.description;

    // Set tech stack
    modalTechStack.innerHTML = '';
    if (project.techStack && project.techStack.length > 0) {
        project.techStack.forEach(tech => {
            const techItem = document.createElement('div');
            techItem.className = 'px-3 py-1.5 rounded-full glass border border-white/10 text-xs flex items-center gap-2';
            if (tech.icon) {
                techItem.innerHTML = `<i class="${tech.icon}"></i>`;
            }
            techItem.innerHTML += ` <span>${tech.name}</span>`;
            if (tech.iconColor && tech.iconColor.includes('#')) {
                const iconEl = techItem.querySelector('i');
                if (iconEl) iconEl.style.color = tech.iconColor;
            }
            modalTechStack.appendChild(techItem);
        });
    }

    // Set challenges
    const modalChallenges = document.getElementById('modalChallenges');
    const modalChallengesSection = document.getElementById('modalChallengesSection');
    const modalChallengesTitle = modalChallengesSection ? modalChallengesSection.querySelector('h3[data-i18n="challenges"]') : null;
    if (modalChallenges && modalChallengesSection) {
        if (project.challenges && project.challenges.trim() !== '') {
            modalChallenges.textContent = project.challenges;
            modalChallengesSection.style.display = 'block';
            // Translate title
            if (modalChallengesTitle) {
                const langTranslations = translations[currentLanguage] || translations['en'];
                modalChallengesTitle.textContent = langTranslations['challenges'] || 'Challenges & Problems';
            }
        } else {
            modalChallengesSection.style.display = 'none';
        }
    }

    // Set solutions
    const modalSolutions = document.getElementById('modalSolutions');
    const modalSolutionsSection = document.getElementById('modalSolutionsSection');
    const modalSolutionsTitle = modalSolutionsSection ? modalSolutionsSection.querySelector('h3[data-i18n="solutions"]') : null;
    if (modalSolutions && modalSolutionsSection) {
        if (project.solutions && project.solutions.trim() !== '') {
            modalSolutions.textContent = project.solutions;
            modalSolutionsSection.style.display = 'block';
            // Translate title
            if (modalSolutionsTitle) {
                const langTranslations = translations[currentLanguage] || translations['en'];
                modalSolutionsTitle.textContent = langTranslations['solutions'] || 'Solutions';
            }
        } else {
            modalSolutionsSection.style.display = 'none';
        }
    }

    // Set button links
    if (modalLiveBtn) {
        if (project.liveUrl && project.liveUrl !== '#') {
            modalLiveBtn.style.display = 'flex';
            modalLiveBtn.onclick = () => window.open(project.liveUrl, '_blank');
        } else {
            modalLiveBtn.style.display = 'none';
        }
    }
    
    if (modalCodeBtn) {
        if (project.codeUrl && project.codeUrl !== '#') {
            modalCodeBtn.style.display = 'flex';
            modalCodeBtn.onclick = () => window.open(project.codeUrl, '_blank');
        } else {
            modalCodeBtn.style.display = 'none';
        }
    }

    // Initialize carousel
    if (currentProjectImages.length > 0) {
        updateCarousel();
    }

    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close Project Modal
function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
    currentCarouselIndex = 0;
}

// Change Carousel Image
function changeCarouselImage(direction) {
    if (currentProjectImages.length === 0) return;
    
    currentCarouselIndex += direction;
    
    if (currentCarouselIndex < 0) {
        currentCarouselIndex = currentProjectImages.length - 1;
    } else if (currentCarouselIndex >= currentProjectImages.length) {
        currentCarouselIndex = 0;
    }
    
    updateCarousel();
}

// Go to specific carousel image
function goToCarouselImage(index) {
    if (index >= 0 && index < currentProjectImages.length) {
        currentCarouselIndex = index;
        updateCarousel();
    }
}

// Update carousel display
function updateCarousel() {
    const modalCarousel = document.getElementById('modalCarousel');
    const indicators = document.querySelectorAll('.carousel-indicator');
    
    // Move carousel
    modalCarousel.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, index) => {
        if (index === currentCarouselIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// Toggle All Projects Visibility
let showingAllProjects = false;

function toggleAllProjects() {
    const projects = document.querySelectorAll('.project-card');
    const viewAllBtn = document.getElementById('viewAllProjectsBtn');
    const viewAllText = document.getElementById('viewAllText');
    const viewAllIcon = document.getElementById('viewAllIcon');
    const langTranslations = translations[currentLanguage] || translations['en'];
    
    // Get active filter
    const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'all';
    
    showingAllProjects = !showingAllProjects;
    
    // Show/hide projects after the first 6 that match the current filter
    projects.forEach((project, index) => {
        if (index >= 6) {
            const matchesFilter = activeFilter === 'all' || project.getAttribute('data-type') === activeFilter;
            
            if (showingAllProjects && matchesFilter) {
                project.classList.remove('hidden-by-default');
                project.style.display = '';
            } else if (!showingAllProjects) {
                project.classList.add('hidden-by-default');
                project.style.display = 'none';
            } else if (!matchesFilter) {
                project.style.display = 'none';
            }
        }
    });
    
    // Update button text and icon
    if (showingAllProjects) {
        viewAllText.textContent = langTranslations['show_less'] || 'Show Less';
        viewAllIcon.classList.remove('fa-chevron-down');
        viewAllIcon.classList.add('fa-chevron-up');
    } else {
        viewAllText.textContent = langTranslations['view_all_projects'] || 'View All Projects';
        viewAllIcon.classList.remove('fa-chevron-up');
        viewAllIcon.classList.add('fa-chevron-down');
    }
    
    // Smooth scroll to projects section when showing all
    if (showingAllProjects) {
        setTimeout(() => {
            document.getElementById('projects').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
    }
}

// Initialize visibility for projects and experiences & load saved prefs
document.addEventListener('DOMContentLoaded', function() {
    // Initialize projects visibility
    const projects = document.querySelectorAll('.project-card');
    const maxInitialProjects = 6;
    
    console.log('Total projects found:', projects.length);
    
    projects.forEach((project, index) => {
        if (index >= maxInitialProjects) {
            project.classList.add('hidden-by-default');
            project.style.display = 'none';
        }
    });
    
    // Show/hide "View All" button based on total number of projects
    // Only show if there are 7 or more projects (more than 6)
    const viewAllBtn = document.getElementById('viewAllProjectsBtn');
    if (viewAllBtn) {
        console.log('View All Projects button found. Projects count:', projects.length);
        if (projects.length >= 7) {
            viewAllBtn.style.display = 'flex';
            console.log('Showing View All Projects button');
        } else {
            viewAllBtn.style.display = 'none';
            console.log('Hiding View All Projects button (less than 7 projects)');
        }
    } else {
        console.error('View All Projects button not found!');
    }

    // Initialize experiences visibility
    const experiences = document.querySelectorAll('.experience-card');
    const maxInitialExperiences = 3;
    
    console.log('Total experiences found:', experiences.length);
    
    experiences.forEach((exp, index) => {
        if (index >= maxInitialExperiences) {
            exp.style.display = 'none';
        }
    });
    
    // Show/hide "View All Experiences" button based on total number of experiences
    // Only show if there are 4 or more experiences (more than 3)
    const viewAllExperiencesBtn = document.getElementById('viewAllExperiencesBtn');
    if (viewAllExperiencesBtn) {
        console.log('View All Experiences button found. Experiences count:', experiences.length);
        if (experiences.length >= 4) {
            viewAllExperiencesBtn.style.display = 'inline-block';
            console.log('Showing View All Experiences button');
        } else {
            viewAllExperiencesBtn.style.display = 'none';
            console.log('Hiding View All Experiences button (less than 4 experiences)');
        }
    } else {
        console.error('View All Experiences button not found!');
    }

    // Load saved theme & language preferences
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('preferredLanguage');
    const themeToggle = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    
    if (savedTheme === 'light') {
        isDarkMode = false;
        document.body.classList.add('light');
        document.body.classList.remove('dark');
        if (themeToggle) themeToggle.classList.remove('active');
        if (icon) icon.className = 'fas fa-sun control-icon';
    } else {
        // Ensure dark mode is active by default
        document.body.classList.add('dark');
        if (themeToggle) themeToggle.classList.add('active');
        if (icon) icon.className = 'fas fa-moon control-icon';
    }
    
    if (savedLanguage && ['en', 'es', 'pt'].includes(savedLanguage)) {
        currentLanguage = savedLanguage;
        const flagEl = document.getElementById('currentLanguageFlag');
        if (flagEl) {
            flagEl.textContent = languageFlags[savedLanguage];
        }
        
        // Update active language option
        document.querySelectorAll('.language-option').forEach(option => {
            option.classList.remove('active');
            const optionText = option.textContent.trim();
            if ((savedLanguage === 'en' && optionText.includes('English')) ||
                (savedLanguage === 'es' && optionText.includes('Español')) ||
                (savedLanguage === 'pt' && optionText.includes('Português'))) {
                option.classList.add('active');
            }
        });
        
        // Translate static texts on page load
        translateStaticTexts(savedLanguage);
    } else {
        // Default to English if no saved preference
        translateStaticTexts('en');
    }
        
        // Update CV download link
        const downloadBtn = document.getElementById('downloadCVBtn');
        if (downloadBtn && cvPaths[savedLanguage]) {
            downloadBtn.href = cvPaths[savedLanguage];
        }
});

// Project Filter
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        const projects = document.querySelectorAll('.project-card');
        const maxInitialProjects = 6;

        // Reset "View All" state when filter changes
        showingAllProjects = false;
        const viewAllText = document.getElementById('viewAllText');
        const viewAllIcon = document.getElementById('viewAllIcon');
        if (viewAllText && viewAllIcon) {
            const langTranslations = translations[currentLanguage] || translations['en'];
            viewAllText.textContent = langTranslations['view_all_projects'] || 'View All Projects';
            viewAllIcon.classList.remove('fa-chevron-up');
            viewAllIcon.classList.add('fa-chevron-down');
        }

        let visibleInFirstSix = 0;

        projects.forEach((project) => {
            const matchesFilter = filter === 'all' || project.getAttribute('data-type') === filter;
            
            if (matchesFilter) {
                // Show first 6 matching projects
                if (visibleInFirstSix < maxInitialProjects) {
                    project.style.display = 'block';
                    project.classList.remove('hidden-by-default');
                    visibleInFirstSix++;
                } else {
                    // Hide projects beyond first 6
                    project.style.display = 'none';
                    project.classList.add('hidden-by-default');
                }
            } else {
                project.style.display = 'none';
            }
        });

        // Update "View All" button visibility based on filtered results
        // Only show if there are 7 or more matching projects
        const totalMatchingProjects = Array.from(projects).filter(p => 
            filter === 'all' || p.getAttribute('data-type') === filter
        ).length;
        
        console.log('Filter applied:', filter, 'Matching projects:', totalMatchingProjects);
        
        const viewAllBtn = document.getElementById('viewAllProjectsBtn');
        if (viewAllBtn) {
            if (totalMatchingProjects >= 7) {
                viewAllBtn.style.display = 'flex';
                console.log('Showing View All Projects button (filtered)');
            } else {
                viewAllBtn.style.display = 'none';
                console.log('Hiding View All Projects button (filtered, less than 7)');
            }
        }
    });
});

// Experience visibility control
let showingAllExperiences = false;

function toggleAllExperiences() {
    const experiences = document.querySelectorAll('.experience-card');
    const viewAllBtn = document.getElementById('viewAllExperiencesBtn');
    
    showingAllExperiences = !showingAllExperiences;
    
    experiences.forEach((exp, index) => {
        if (index >= 3) {
            if (showingAllExperiences) {
                exp.style.display = '';
            } else {
                exp.style.display = 'none';
            }
        }
    });
    
    // Update button text and scroll
    if (viewAllBtn) {
        const langTranslations = translations[currentLanguage] || translations['en'];
        if (showingAllExperiences) {
            viewAllBtn.textContent = langTranslations['show_less'] || 'Show Less';
            // Smooth scroll to experiences section when showing all
            setTimeout(() => {
                document.getElementById('experience').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        } else {
            viewAllBtn.textContent = langTranslations['view_all_experiences'] || 'View All Experiences';
        }
    }
}

// Experience Toggle Details
document.querySelectorAll('.toggle-details').forEach(btn => {
    btn.addEventListener('click', function() {
        const id = this.getAttribute('data-id');
        const details = document.getElementById(id + '-details');
        if (!details) return;
        const isHidden = details.classList.contains('hidden');
        const span = this.querySelector('span');
        const icon = this.querySelector('i');

        if (isHidden) {
            details.classList.remove('hidden');
            if (span) {
                const langTranslations = translations[currentLanguage] || translations['en'];
                span.textContent = langTranslations['show_less'] || 'Show Less';
            }
            if (icon) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        } else {
            details.classList.add('hidden');
            if (span) {
                const langTranslations = translations[currentLanguage] || translations['en'];
                span.textContent = langTranslations['show_more'] || 'Show More';
            }
            if (icon) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        }
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Allow non-anchor links like "#" or external
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect - Add pill background when scrolling
const mainNav = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    if (!mainNav) return;
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        mainNav.classList.add('scrolled');
    } else {
        mainNav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Language Selector
let currentLanguage = 'en';
const languageFlags = {
    'en': '🇺🇸',
    'es': '🇪🇸',
    'pt': '🇧🇷'
};

// CV file paths by language
const cvPaths = {
    'en': '/static/downloads/CV Piettro Rodrigues EN.pdf',
    'es': '/static/downloads/CV Piettro Rodrigues ES.pdf',
    'pt': '/static/downloads/CV Piettro Rodrigues PT.pdf'
};

function toggleLanguageMenu(event) {
    if (event) {
        event.stopPropagation();
    }
    const menu = document.getElementById('languageMenu');
    if (menu) {
        menu.classList.toggle('show');
    }
}

function changeLanguage(lang, event) {
    if (event) {
        event.stopPropagation();
    }
    currentLanguage = lang;
    const menu = document.getElementById('languageMenu');
    const currentFlag = document.getElementById('currentLanguageFlag');
    const downloadBtn = document.getElementById('downloadCVBtn');
    
    // Update current flag
    if (currentFlag) {
        currentFlag.textContent = languageFlags[lang];
    }
    
    // Update active option
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.textContent.includes(lang === 'en' ? 'English' : lang === 'es' ? 'Español' : 'Português')) {
            option.classList.add('active');
        }
    });
    
    // Update CV download link
    if (downloadBtn && cvPaths[lang]) {
        downloadBtn.href = cvPaths[lang];
    }
    
    // Close menu
    if (menu) {
        menu.classList.remove('show');
    }
    
    // Store preference in localStorage
    localStorage.setItem('preferredLanguage', lang);
    
    // Translate static texts immediately (before page reload)
    translateStaticTexts(lang);
    
    // Send request to server to update session
    const formData = new FormData();
    formData.append('language', lang);
    formData.append('next', window.location.pathname);
    
    fetch('/set-language/', {
        method: 'POST',
        body: formData,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRFToken': getCookie('csrftoken')
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Reload page to get translated content from server
            window.location.reload();
        }
    })
    .catch(error => {
        console.error('Error changing language:', error);
        // Still reload even if there's an error
        window.location.reload();
    });
}

// Helper function to get CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// Close language menu when clicking outside
document.addEventListener('click', function(event) {
    const languageDropdown = document.querySelector('.language-dropdown');
    const languageBtn = document.getElementById('languageBtn');
    const menu = document.getElementById('languageMenu');
    
    // Check if click is outside the dropdown
    if (languageDropdown && menu && !languageDropdown.contains(event.target)) {
        menu.classList.remove('show');
    }
});

// Theme Toggle
let isDarkMode = true; // Default to dark mode

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = document.getElementById('themeIcon');
    
    if (isDarkMode) {
        body.classList.add('dark');
        body.classList.remove('light');
        if (themeToggle) themeToggle.classList.add('active');
        if (icon) icon.className = 'fas fa-moon control-icon';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.add('light');
        body.classList.remove('dark');
        if (themeToggle) themeToggle.classList.remove('active');
        if (icon) icon.className = 'fas fa-sun control-icon';
        localStorage.setItem('theme', 'light');
    }
}

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - Contact form handler');
    
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = document.getElementById('submitBtnText');
    const submitBtnLoading = document.getElementById('submitBtnLoading');
    const messageModal = document.getElementById('messageModal');
    const messageModalTitle = document.getElementById('messageModalTitle');
    const messageModalMessage = document.getElementById('messageModalMessage');
    const messageModalClose = document.getElementById('messageModalClose');
    
    console.log('Form elements found:', {
        contactForm: !!contactForm,
        submitBtn: !!submitBtn,
        submitBtnText: !!submitBtnText,
        submitBtnLoading: !!submitBtnLoading,
        messageModal: !!messageModal
    });

    // Function to show message modal
    function showMessageModal(type, message) {
        console.log('showMessageModal called:', type, message);
        console.log('Modal elements:', {
            messageModal: !!messageModal,
            messageModalTitle: !!messageModalTitle,
            messageModalMessage: !!messageModalMessage
        });
        
        if (!messageModal || !messageModalTitle || !messageModalMessage) {
            console.error('Modal elements not found');
            alert(message); // Fallback to alert
            return;
        }
        
        // Set icon and title based on type
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        const title = type === 'success' 
            ? (currentLanguage === 'es' ? '¡Éxito!' : currentLanguage === 'pt' ? 'Sucesso!' : 'Success!')
            : (currentLanguage === 'es' ? 'Error' : currentLanguage === 'pt' ? 'Erro' : 'Error');
        const titleColor = type === 'success' ? 'text-green-500' : 'text-red-500';
        
        messageModalTitle.innerHTML = `<i class="fas ${icon} ${titleColor} mr-2"></i>${title}`;
        messageModalMessage.textContent = message;
        
        // Show modal - force display
        messageModal.style.display = 'flex';
        messageModal.classList.add('show');
        messageModal.style.opacity = '1';
        messageModal.style.visibility = 'visible';
        document.body.style.overflow = 'hidden';
        
        // Force scale animation
        const modalContent = messageModal.querySelector('div > div');
        if (modalContent) {
            modalContent.style.transform = 'scale(1)';
        }
        
        console.log('Modal should be visible now');
    }

    // Close modal handlers
    function closeMessageModal() {
        if (!messageModal) return;
        
        messageModal.classList.remove('show');
        messageModal.style.display = 'none';
        messageModal.style.opacity = '0';
        messageModal.style.visibility = 'hidden';
        document.body.style.overflow = '';
        
        const modalContent = messageModal.querySelector('div > div');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.95)';
        }
    }

    if (messageModalClose) {
        messageModalClose.addEventListener('click', closeMessageModal);
    }

    if (messageModal) {
        messageModal.addEventListener('click', function(e) {
            if (e.target === messageModal) {
                closeMessageModal();
            }
        });
    }

    if (!contactForm) {
        console.error('Contact form not found!');
        return;
    }
    
    if (!submitBtn || !submitBtnText || !submitBtnLoading) {
        console.error('Submit button elements not found!', {
            submitBtn: !!submitBtn,
            submitBtnText: !!submitBtnText,
            submitBtnLoading: !!submitBtnLoading
        });
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Form submitted - preventDefault called');
            
            // Show loading state
            submitBtn.disabled = true;
            if (submitBtnText) submitBtnText.classList.add('hidden');
            if (submitBtnLoading) submitBtnLoading.classList.remove('hidden');
            
            // Get form data
            const formData = new FormData(contactForm);
            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
            if (csrfToken) {
                formData.append('csrfmiddlewaretoken', csrfToken.value);
            }
            
            console.log('Sending request to:', contactForm.action);
            
            // Send AJAX request
            const url = contactForm.action || '/contact/submit/';
            console.log('Sending request to:', url);
            
            fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'same-origin'
            })
            .then(response => {
                console.log('Response status:', response.status);
                console.log('Response headers:', response.headers);
                
                if (!response.ok) {
                    // Try to get error message from response
                    return response.text().then(text => {
                        console.error('Error response:', text);
                        throw new Error(`HTTP error! status: ${response.status}`);
                    });
                }
                
                // Check if response is JSON
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return response.json();
                } else {
                    // If not JSON, try to parse as text
                    return response.text().then(text => {
                        console.error('Non-JSON response:', text);
                        throw new Error('Server returned non-JSON response');
                    });
                }
            })
            .then(data => {
                console.log('Response data:', data);
                
                // Hide loading state
                submitBtn.disabled = false;
                if (submitBtnText) submitBtnText.classList.remove('hidden');
                if (submitBtnLoading) submitBtnLoading.classList.add('hidden');
                
                if (data.success) {
                    // Show success message
                    showMessageModal('success', data.message || 'Message sent successfully! I will get back to you soon.');
                    // Reset form
                    contactForm.reset();
                } else {
                    // Show error message
                    let errorMessage = data.message || 'Please correct the errors in the form.';
                    if (data.errors) {
                        const errorList = Object.values(data.errors).flat().join(', ');
                        errorMessage += ' ' + errorList;
                    }
                    showMessageModal('error', errorMessage);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                
                // Hide loading state
                submitBtn.disabled = false;
                if (submitBtnText) submitBtnText.classList.remove('hidden');
                if (submitBtnLoading) submitBtnLoading.classList.add('hidden');
                
                // Show error message
                showMessageModal('error', 'An error occurred. Please try again later.');
            });
    });
});


