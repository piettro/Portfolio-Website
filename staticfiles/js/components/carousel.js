// Project carousel component for image navigation
export class ProjectCarousel {
    constructor() {
        this.currentIndex = 0;
        this.images = [];
        this.carousel = null;
        this.indicators = null;
    }

    /**
     * Initialize carousel with images
     */
    init(images, carouselElement, indicatorsElement) {
        this.images = images || [];
        this.carousel = carouselElement;
        this.indicators = indicatorsElement;
        this.currentIndex = 0;
        
        this.render();
        this.bindEvents();
    }

    /**
     * Render carousel images and indicators
     */
    render() {
        if (!this.carousel || !this.indicators) return;

        // Clear existing content
        this.carousel.innerHTML = '';
        this.indicators.innerHTML = '';

        if (this.images.length === 0) {
            this.renderPlaceholder();
            return;
        }

        // Render images
        this.images.forEach((image, index) => {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'carousel-image-container min-w-full h-full relative';
            imgDiv.innerHTML = `
                <img src="${image}" alt="Project Image ${index + 1}" 
                     class="carousel-image w-full h-full object-cover">
            `;
            this.carousel.appendChild(imgDiv);

            // Create indicator
            const indicator = document.createElement('div');
            indicator.className = `carousel-indicator ${index === 0 ? 'active' : ''}`;
            indicator.addEventListener('click', () => this.goToSlide(index));
            this.indicators.appendChild(indicator);
        });

        // Update navigation visibility
        this.updateNavigation();
        this.updateCarouselPosition();
    }

    /**
     * Render placeholder when no images
     */
    renderPlaceholder() {
        this.carousel.innerHTML = `
            <div class="min-w-full h-full flex items-center justify-center bg-white/5">
                <i class="fas fa-image text-6xl text-text-secondary"></i>
            </div>
        `;
    }

    /**
     * Go to specific slide
     */
    goToSlide(index) {
        if (index < 0 || index >= this.images.length) return;
        
        this.currentIndex = index;
        this.updateCarouselPosition();
        this.updateIndicators();
    }

    /**
     * Navigate to next/previous slide
     */
    navigate(direction) {
        const newIndex = this.currentIndex + direction;
        
        if (newIndex < 0) {
            this.goToSlide(this.images.length - 1);
        } else if (newIndex >= this.images.length) {
            this.goToSlide(0);
        } else {
            this.goToSlide(newIndex);
        }
    }

    /**
     * Update carousel position
     */
    updateCarouselPosition() {
        if (!this.carousel) return;
        
        const translateX = -this.currentIndex * 100;
        this.carousel.style.transform = `translateX(${translateX}%)`;
    }

    /**
     * Update indicator states
     */
    updateIndicators() {
        if (!this.indicators) return;

        const indicators = this.indicators.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    /**
     * Update navigation button visibility
     */
    updateNavigation() {
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');
        
        if (this.images.length <= 1) {
            if (prevBtn) prevBtn.style.display = 'none';
            if (nextBtn) nextBtn.style.display = 'none';
            if (this.indicators) this.indicators.style.display = 'none';
        } else {
            if (prevBtn) prevBtn.style.display = 'flex';
            if (nextBtn) nextBtn.style.display = 'flex';
            if (this.indicators) this.indicators.style.display = 'flex';
        }
    }

    /**
     * Bind navigation events
     */
    bindEvents() {
        const prevBtn = document.getElementById('carouselPrev');
        const nextBtn = document.getElementById('carouselNext');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigate(-1));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigate(1));
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.images.length <= 1) return;

            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.navigate(-1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.navigate(1);
                    break;
            }
        });
    }
}

// Global functions for backward compatibility
let globalCarousel = new ProjectCarousel();

window.changeCarouselImage = (direction) => {
    globalCarousel.navigate(direction);
};

window.goToCarouselImage = (index) => {
    globalCarousel.goToSlide(index);
};

export { globalCarousel };