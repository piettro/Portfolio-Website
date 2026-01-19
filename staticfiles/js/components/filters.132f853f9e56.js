// Project filtering and management system
export class ProjectFilter {
    constructor() {
        this.activeFilter = 'all';
        this.projects = [];
        this.filterButtons = [];
        this.projectGrid = null;
        this.isExpanded = false;
    }

    /**
     * Initialize project filter system
     */
    init() {
        this.projectGrid = document.getElementById('projects-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projects = document.querySelectorAll('.project-card');

        this.bindEvents();
        this.initializeView();
    }

    /**
     * Bind filter events
     */
    bindEvents() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.setFilter(filter);
            });
        });

        // View All button
        const viewAllBtn = document.getElementById('viewAllProjectsBtn');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => this.toggleAllProjects());
        }
    }

    /**
     * Set active filter
     */
    setFilter(filter) {
        this.activeFilter = filter;
        
        // Update button states
        this.filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });

        // Filter projects
        this.filterProjects();
    }

    /**
     * Filter projects based on active filter
     */
    filterProjects() {
        this.projects.forEach(project => {
            const projectType = project.dataset.type;
            const shouldShow = this.activeFilter === 'all' || projectType === this.activeFilter;
            
            if (shouldShow) {
                project.style.display = 'block';
                project.classList.add('fade-in');
            } else {
                project.style.display = 'none';
                project.classList.remove('fade-in');
            }
        });

        // Update view state based on filter
        this.updateViewAllButton();
    }

    /**
     * Initialize view - show only first 6 projects
     */
    initializeView() {
        const hiddenProjects = document.querySelectorAll('.project-card.hidden-by-default');
        const viewAllBtn = document.getElementById('viewAllProjectsBtn');
        
        if (hiddenProjects.length > 0) {
            if (viewAllBtn) {
                viewAllBtn.style.display = 'flex';
            }
            
            hiddenProjects.forEach(project => {
                project.style.display = 'none';
            });
        }
    }

    /**
     * Toggle all projects visibility
     */
    toggleAllProjects() {
        const hiddenProjects = document.querySelectorAll('.project-card.hidden-by-default');
        const viewAllBtn = document.getElementById('viewAllProjectsBtn');
        const btnText = document.getElementById('viewAllText');
        const btnIcon = document.getElementById('viewAllIcon');

        this.isExpanded = !this.isExpanded;

        hiddenProjects.forEach(project => {
            if (this.isExpanded) {
                // Only show if it matches current filter
                const projectType = project.dataset.type;
                const shouldShow = this.activeFilter === 'all' || projectType === this.activeFilter;
                
                if (shouldShow) {
                    project.style.display = 'block';
                    project.classList.add('fade-in');
                }
            } else {
                project.style.display = 'none';
                project.classList.remove('fade-in');
            }
        });

        // Update button text and icon
        if (btnText && btnIcon) {
            if (this.isExpanded) {
                btnText.textContent = 'Show Less';
                btnIcon.style.transform = 'rotate(180deg)';
            } else {
                btnText.textContent = 'View All Projects';
                btnIcon.style.transform = 'rotate(0deg)';
            }
        }
    }

    /**
     * Update view all button visibility
     */
    updateViewAllButton() {
        const viewAllBtn = document.getElementById('viewAllProjectsBtn');
        const hiddenProjects = document.querySelectorAll('.project-card.hidden-by-default');
        
        // Count how many hidden projects match current filter
        let matchingHiddenCount = 0;
        hiddenProjects.forEach(project => {
            const projectType = project.dataset.type;
            const matches = this.activeFilter === 'all' || projectType === this.activeFilter;
            if (matches) matchingHiddenCount++;
        });

        // Show/hide view all button based on matching hidden projects
        if (viewAllBtn) {
            viewAllBtn.style.display = matchingHiddenCount > 0 ? 'flex' : 'none';
        }
    }

    /**
     * Get projects count by filter
     */
    getProjectCount(filter = null) {
        const filterToUse = filter || this.activeFilter;
        
        if (filterToUse === 'all') {
            return this.projects.length;
        }

        return Array.from(this.projects).filter(project => 
            project.dataset.type === filterToUse
        ).length;
    }
}

// Experience toggle system
export class ExperienceToggle {
    constructor() {
        this.isExpanded = false;
    }

    init() {
        const viewAllBtn = document.getElementById('viewAllExperiencesBtn');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', () => this.toggleAllExperiences());
        }

        // Initialize view
        this.initializeView();
        this.bindDetailToggles();
    }

    initializeView() {
        const hiddenExperiences = document.querySelectorAll('.experience-card[style*="display: none"]');
        const viewAllBtn = document.getElementById('viewAllExperiencesBtn');
        
        if (hiddenExperiences.length > 0 && viewAllBtn) {
            viewAllBtn.style.display = 'block';
        }
    }

    toggleAllExperiences() {
        const hiddenExperiences = document.querySelectorAll('.experience-card[style*="display: none"]');
        const viewAllBtn = document.getElementById('viewAllExperiencesBtn');
        const btnText = viewAllBtn?.querySelector('span');

        this.isExpanded = !this.isExpanded;

        hiddenExperiences.forEach(exp => {
            if (this.isExpanded) {
                exp.style.display = 'block';
                exp.classList.add('fade-in');
            } else {
                exp.style.display = 'none';
                exp.classList.remove('fade-in');
            }
        });

        if (btnText) {
            btnText.textContent = this.isExpanded ? 'Show Less' : 'View All Experiences';
        }
    }

    bindDetailToggles() {
        const detailButtons = document.querySelectorAll('.toggle-details');
        
        detailButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetId = e.target.dataset.id;
                const details = document.getElementById(`${targetId}-details`);
                const icon = btn.querySelector('i');
                
                if (details) {
                    const isHidden = details.classList.contains('hidden');
                    
                    if (isHidden) {
                        details.classList.remove('hidden');
                        details.classList.add('fade-in');
                        btn.querySelector('span').textContent = 'Show Less';
                        if (icon) icon.style.transform = 'rotate(180deg)';
                    } else {
                        details.classList.add('hidden');
                        details.classList.remove('fade-in');
                        btn.querySelector('span').textContent = 'Show More';
                        if (icon) icon.style.transform = 'rotate(0deg)';
                    }
                }
            });
        });
    }
}

// Global functions for backward compatibility
window.toggleAllProjects = () => {
    if (window.projectFilter) {
        window.projectFilter.toggleAllProjects();
    }
};

window.toggleAllExperiences = () => {
    if (window.experienceToggle) {
        window.experienceToggle.toggleAllExperiences();
    }
};