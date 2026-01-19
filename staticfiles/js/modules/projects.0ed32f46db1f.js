// Project management and modal system
import { modalManager } from '../components/modal.js';
import { ProjectCarousel, globalCarousel } from '../components/carousel.js';
import { TranslationService } from '../translations/i18n.js';

export class ProjectManager {
    constructor() {
        this.projectsData = {};
        this.carousel = new ProjectCarousel();
    }

    /**
     * Initialize project manager with data
     */
    init(projectsData) {
        this.projectsData = projectsData || {};
        this.bindEvents();
    }

    /**
     * Bind project events
     */
    bindEvents() {
        // Project card clicks
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const projectId = card.dataset.project;
                if (projectId) {
                    this.openProjectModal(projectId);
                }
            });
        });
    }

    /**
     * Open project modal with details
     */
    openProjectModal(projectId) {
        const project = this.projectsData[projectId];
        if (!project) {
            console.error('Project not found:', projectId);
            return;
        }

        // Get modal elements
        const modalTitle = document.getElementById('modalTitle');
        const modalType = document.getElementById('modalType');
        const modalDescription = document.getElementById('modalDescription');
        const modalChallenges = document.getElementById('modalChallenges');
        const modalSolutions = document.getElementById('modalSolutions');
        const modalTechStack = document.getElementById('modalTechStack');
        const modalCarousel = document.getElementById('modalCarousel');
        const carouselIndicators = document.getElementById('carouselIndicators');
        const modalLiveBtn = document.getElementById('modalLiveBtn');
        const modalCodeBtn = document.getElementById('modalCodeBtn');

        // Set basic project details
        if (modalTitle) modalTitle.textContent = project.title;
        if (modalType) modalType.textContent = project.type;
        if (modalDescription) modalDescription.textContent = project.description;

        // Handle challenges and solutions
        this.updateSection('modalChallengesSection', modalChallenges, project.challenges);
        this.updateSection('modalSolutionsSection', modalSolutions, project.solutions);

        // Setup carousel
        if (modalCarousel && carouselIndicators) {
            this.carousel.init(project.images, modalCarousel, carouselIndicators);
            // Update global carousel reference for backward compatibility
            globalCarousel.init(project.images, modalCarousel, carouselIndicators);
        }

        // Setup tech stack
        this.updateTechStack(modalTechStack, project.techStack);

        // Setup action buttons
        this.updateActionButtons(modalLiveBtn, modalCodeBtn, project);

        // Open the modal
        modalManager.open('projectModal');
    }

    /**
     * Update section visibility and content
     */
    updateSection(sectionId, contentElement, content) {
        const section = document.getElementById(sectionId);
        
        if (section && contentElement) {
            if (content && content.trim()) {
                contentElement.textContent = content;
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        }
    }

    /**
     * Update tech stack display
     */
    updateTechStack(techStackElement, techStack) {
        if (!techStackElement || !Array.isArray(techStack)) return;

        techStackElement.innerHTML = '';

        techStack.forEach(tech => {
            const techElement = document.createElement('div');
            techElement.className = 'flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10';
            
            let techContent = '';
            if (tech.icon) {
                const iconStyle = tech.iconColor ? `style="color: ${tech.iconColor};"` : '';
                techContent += `<i class="${tech.icon}" ${iconStyle}></i>`;
            }
            techContent += `<span class="text-sm">${tech.name}</span>`;
            
            techElement.innerHTML = techContent;
            techStackElement.appendChild(techElement);
        });
    }

    /**
     * Update action buttons
     */
    updateActionButtons(liveBtn, codeBtn, project) {
        // Live demo button
        if (liveBtn) {
            if (project.liveUrl && project.liveUrl !== '#') {
                liveBtn.style.display = 'flex';
                liveBtn.onclick = () => window.open(project.liveUrl, '_blank');
            } else {
                liveBtn.style.display = 'none';
            }
        }

        // Code button
        if (codeBtn) {
            if (project.codeUrl && project.codeUrl !== '#') {
                codeBtn.style.display = 'flex';
                codeBtn.onclick = () => window.open(project.codeUrl, '_blank');
            } else {
                codeBtn.style.display = 'none';
            }
        }
    }

    /**
     * Get project by ID
     */
    getProject(projectId) {
        return this.projectsData[projectId] || null;
    }

    /**
     * Get all projects
     */
    getAllProjects() {
        return Object.values(this.projectsData);
    }

    /**
     * Filter projects by type
     */
    getProjectsByType(type) {
        return Object.values(this.projectsData).filter(project => 
            project.type === type
        );
    }
}

// Global project manager instance
let globalProjectManager = new ProjectManager();

// Global function for backward compatibility
window.openProjectModal = (projectId) => {
    globalProjectManager.openProjectModal(projectId);
};

export { globalProjectManager };