// Simple and robust presentation app
let currentSlide = 1;
const totalSlides = 9;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Kickbase presentation...');
    initializeApp();
});

function initializeApp() {
    // Initialize slide display
    showSlide(1);
    updateSlideCounter();
    updateNavigationButtons();
    
    // Set up event listeners
    setupNavigation();
    setupKeyboardNavigation();
    
    // Set up progress bar
    createProgressBar();
    updateProgressBar();
    
    console.log('Kickbase Rotation-Modus Präsentation geladen');
    console.log('Navigation: Pfeiltasten, Buttons oder Zahlen 1-9');
}

function setupNavigation() {
    // Previous button
    const prevBtn = document.getElementById('prev-btn');
    if (prevBtn) {
        prevBtn.onclick = function() {
            console.log('Previous button clicked');
            previousSlide();
            return false;
        };
    }
    
    // Next button  
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.onclick = function() {
            console.log('Next button clicked');
            nextSlide();
            return false;
        };
    }
    
    // Slide indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.onclick = function() {
            console.log('Indicator clicked for slide:', index + 1);
            goToSlide(index + 1);
            return false;
        };
    });
}

function setupKeyboardNavigation() {
    document.onkeydown = function(event) {
        switch(event.key) {
            case 'ArrowRight':
            case ' ':
                event.preventDefault();
                nextSlide();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                previousSlide();
                break;
            case '1': case '2': case '3': case '4': case '5':
            case '6': case '7': case '8': case '9':
                event.preventDefault();
                const slideNum = parseInt(event.key);
                if (slideNum <= totalSlides) {
                    goToSlide(slideNum);
                }
                break;
        }
    };
}

function nextSlide() {
    if (currentSlide < totalSlides) {
        goToSlide(currentSlide + 1);
    }
}

function previousSlide() {
    if (currentSlide > 1) {
        goToSlide(currentSlide - 1);
    }
}

function goToSlide(slideNumber) {
    if (slideNumber < 1 || slideNumber > totalSlides || slideNumber === currentSlide) {
        return;
    }
    
    console.log('Going to slide:', slideNumber);
    
    // Hide current slide
    const currentSlideElement = document.querySelector('.slide.active');
    if (currentSlideElement) {
        currentSlideElement.classList.remove('active');
    }
    
    // Update current slide number
    currentSlide = slideNumber;
    
    // Show new slide
    showSlide(slideNumber);
    
    // Update UI
    updateSlideCounter();
    updateNavigationButtons();
    updateSlideIndicators();
    updateProgressBar();
    
    // Trigger animations
    setTimeout(() => {
        triggerSlideAnimations(slideNumber);
    }, 100);
}

function showSlide(slideNumber) {
    // Hide all slides first
    const allSlides = document.querySelectorAll('.slide');
    allSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show the target slide
    const targetSlide = document.querySelector(`.slide[data-slide="${slideNumber}"]`);
    if (targetSlide) {
        targetSlide.classList.add('active');
        console.log('Showing slide:', slideNumber);
    } else {
        console.error('Slide not found:', slideNumber);
    }
}

function updateSlideCounter() {
    const currentSlideDisplay = document.getElementById('current-slide');
    if (currentSlideDisplay) {
        currentSlideDisplay.textContent = currentSlide;
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (prevBtn) {
        prevBtn.disabled = (currentSlide === 1);
        prevBtn.style.opacity = (currentSlide === 1) ? '0.4' : '1';
    }
    
    if (nextBtn) {
        nextBtn.disabled = (currentSlide === totalSlides);
        nextBtn.style.opacity = (currentSlide === totalSlides) ? '0.4' : '1';
    }
}

function updateSlideIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index + 1 === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    document.body.appendChild(progressBar);
}

function updateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        const progress = (currentSlide / totalSlides) * 100;
        progressFill.style.width = progress + '%';
    }
}

function triggerSlideAnimations(slideNumber) {
    switch (slideNumber) {
        case 1:
            animateTitleSlide();
            break;
        case 5:
            animateAdvantages();
            break;
        case 6:
            animateCharts();
            break;
        case 9:
            animateConclusion();
            break;
    }
}

function animateTitleSlide() {
    const statItems = document.querySelectorAll('.slide[data-slide="1"] .stat-item');
    statItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
}

function animateAdvantages() {
    const advantageCards = document.querySelectorAll('.slide[data-slide="5"] .advantage-card');
    advantageCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function animateCharts() {
    const chartContainers = document.querySelectorAll('.slide[data-slide="6"] .chart-container');
    chartContainers.forEach((container, index) => {
        container.style.opacity = '0';
        container.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            container.style.transition = 'all 0.6s ease';
            container.style.opacity = '1';
            container.style.transform = 'scale(1)';
        }, index * 200);
    });
}

function animateConclusion() {
    const benefitCards = document.querySelectorAll('.slide[data-slide="9"] .benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        }, index * 100);
    });
}

// Add hover effects for interactive elements
function setupHoverEffects() {
    const cards = document.querySelectorAll('.advantage-card, .mechanic-card, .benefit-card, .problem-item, .need-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.2s ease';
            this.style.transform = 'translateY(-3px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Initialize hover effects after a delay
setTimeout(setupHoverEffects, 500);

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/e2dfb5b61e590843e0e8b4e64c2481fb/151e8c3c-ad6e-43f0-9189-c28193236b81/27f0611c.png',
        'https://ppl-ai-code-interpreter-files.s3.amazonaws.com/web/direct-files/e2dfb5b61e590843e0e8b4e64c2481fb/f5304aeb-edc0-4589-a297-069a9372adcc/5037f9f5.png'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Preload images
setTimeout(preloadImages, 1000);