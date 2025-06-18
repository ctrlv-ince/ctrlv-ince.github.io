// DOM Elements
let hamburger, navMenu, navLinks, searchInput, clearSearchBtn, videoContainer;
let modal, modalVideo, modalTitle, modalDescription, closeModal;
let ageInput, calculateAgeBtn;

// Planetary year lengths in Earth days
const planetYears = {
    earth: 365.25,
    mercury: 88,
    venus: 224.7,
    mars: 687,
    jupiter: 4333,
    saturn: 10759,
    uranus: 30687,
    neptune: 60190,
    pluto: 90560
};

// Planet emojis and names
const planetInfo = {
    earth: { name: 'Earth', emoji: '🌍' },
    mercury: { name: 'Mercury', emoji: '☿' },
    venus: { name: 'Venus', emoji: '♀' },
    mars: { name: 'Mars', emoji: '♂' },
    jupiter: { name: 'Jupiter', emoji: '♃' },
    saturn: { name: 'Saturn', emoji: '♄' },
    uranus: { name: 'Uranus', emoji: '♅' },
    neptune: { name: 'Neptune', emoji: '♆' },
    pluto: { name: 'Pluto', emoji: '♇' }
};

// Sample videos for the portfolio
const sampleVideos = [
    {
        id: '1',
        week: 'Week 1 - Concept Design',
        videoId: 'dQw4w9WgXcQ',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        addedAt: new Date('2024-01-15').toISOString()
    },
    {
        id: '2',
        week: 'Week 2 - 3D Modeling',
        videoId: 'jNQXAC9IVRw',
        url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
        addedAt: new Date('2024-01-22').toISOString()
    },
    {
        id: '3',
        week: 'Week 3 - Texturing',
        videoId: 'kJQP7kiw5Fk',
        url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
        addedAt: new Date('2024-01-29').toISOString()
    },
    {
        id: '4',
        week: 'Week 4 - Animation',
        videoId: '9bZkp7q19f0',
        url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
        addedAt: new Date('2024-02-05').toISOString()
    },
    {
        id: '5',
        week: 'Week 5 - Lighting',
        videoId: 'ZZ5LpwO-An4',
        url: 'https://www.youtube.com/watch?v=ZZ5LpwO-An4',
        addedAt: new Date('2024-02-12').toISOString()
    },
    {
        id: '6',
        week: 'Final Render',
        videoId: 'y6120QOlsfU',
        url: 'https://www.youtube.com/watch?v=y6120QOlsfU',
        addedAt: new Date('2024-02-19').toISOString()
    }
];

// Video storage - initialize with sample videos
let videos = JSON.parse(localStorage.getItem('animationVideos')) || sampleVideos;

// Initialize DOM elements
function initializeElements() {
    hamburger = document.querySelector('.hamburger');
    navMenu = document.querySelector('.nav-menu');
    navLinks = document.querySelectorAll('.nav-link');
    searchInput = document.querySelector('#search-videos');
    clearSearchBtn = document.querySelector('#clear-search');
    videoContainer = document.querySelector('#video-container');
    modal = document.querySelector('#modal');
    modalVideo = document.querySelector('#modal-video');
    modalTitle = document.querySelector('#modal-title');
    modalDescription = document.querySelector('#modal-description');
    closeModal = document.querySelector('.close-modal');
    ageInput = document.querySelector('#age-input');
    calculateAgeBtn = document.querySelector('#calculate-age-btn');
}

// Age Calculator Functionality
function calculatePlanetaryAges() {
    if (!ageInput) {
        console.error('Age input element not found');
        return;
    }
    
    const age = parseFloat(ageInput.value);
    
    if (!age || age < 0 || age > 150) {
        showNotification('Please enter a valid age between 0 and 150 years!', 'error');
        return;
    }
    
    console.log('Calculating ages for:', age, 'years'); // Debug log
    
    // Calculate ages for all planets
    Object.keys(planetYears).forEach(planet => {
        const planetAge = (age * planetYears.earth) / planetYears[planet];
        updatePlanetAge(planet, planetAge.toFixed(2));
    });
    
    // Update planet descriptions based on age
    updatePlanetDescriptions(age);
    
    showNotification('Planetary ages calculated! Check each planet for your age.', 'success');
}

function updatePlanetAge(planet, age) {
    const ageElement = document.querySelector(`[data-planet="${planet}"]`);
    console.log('Looking for planet:', planet, 'Found element:', ageElement); // Debug log
    
    if (ageElement) {
        ageElement.textContent = `${age} years`;
        ageElement.style.color = '#ff6b6b';
        ageElement.style.fontWeight = '700';
        console.log('Updated age for', planet, 'to', age); // Debug log
    } else {
        console.log('Could not find age element for planet:', planet); // Debug log
    }
}

function updatePlanetDescriptions(earthAge) {
    const descriptions = {
        mercury: `At ${earthAge} Earth years old, you would be ${((earthAge * 365.25) / 88).toFixed(2)} years old on Mercury! The smallest planet experiences extreme temperature swings from -180°C to 430°C.`,
        venus: `Your ${earthAge} Earth years would be ${((earthAge * 365.25) / 224.7).toFixed(2)} Venus years! This scorching planet has a thick atmosphere of carbon dioxide and sulfuric acid clouds.`,
        earth: `You are ${earthAge} years old on Earth! Our home planet is the only known world with life, featuring diverse ecosystems and liquid water.`,
        mars: `On Mars, your ${earthAge} Earth years would be ${((earthAge * 365.25) / 687).toFixed(2)} Martian years! The Red Planet has the largest volcano and canyon in the solar system.`,
        jupiter: `Your age on Jupiter would be ${((earthAge * 365.25) / 4333).toFixed(2)} years! The largest planet has a Great Red Spot storm that has raged for over 300 years.`,
        saturn: `At ${((earthAge * 365.25) / 10759).toFixed(2)} Saturn years old, you'd experience its spectacular ring system made of ice, rock, and dust particles.`,
        uranus: `Your ${earthAge} Earth years equals ${((earthAge * 365.25) / 30687).toFixed(2)} Uranus years! This ice giant rotates on its side with rings and 27 known moons.`,
        neptune: `On Neptune, you'd be ${((earthAge * 365.25) / 60190).toFixed(2)} years old! The windiest planet has supersonic storms reaching 2,100 km/h.`,
        pluto: `Your age on Pluto would be ${((earthAge * 365.25) / 90560).toFixed(2)} years! This dwarf planet has a heart-shaped glacier and complex orbit around the Sun.`
    };
    
    Object.keys(descriptions).forEach(planet => {
        const ageElement = document.querySelector(`[data-planet="${planet}"]`);
        if (ageElement) {
            const planetItem = ageElement.closest('.planet-item');
            const descriptionElement = planetItem.querySelector('.planet-description');
            if (descriptionElement) {
                descriptionElement.textContent = descriptions[planet];
                console.log('Updated description for', planet); // Debug log
            }
        }
    });
}

// YouTube Video Management
function createVideoCard(video) {
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    videoCard.dataset.week = video.week.toLowerCase();
    
    videoCard.innerHTML = `
        <div class="video-label">${video.week}</div>
        <iframe 
            class="video-iframe" 
            src="https://www.youtube.com/embed/${video.videoId}" 
            frameborder="0" 
            allowfullscreen>
        </iframe>
        <div class="video-actions">
            <button class="delete-video" onclick="deleteVideo('${video.id}')">
                <i class="fas fa-trash"></i> Delete
            </button>
        </div>
    `;
    
    // Add click event to open in modal
    videoCard.addEventListener('click', (e) => {
        if (!e.target.closest('.delete-video')) {
            openModal(video);
        }
    });
    
    return videoCard;
}

function deleteVideo(videoId) {
    if (confirm('Are you sure you want to delete this video?')) {
        videos = videos.filter(video => video.id !== videoId);
        saveVideos();
        renderVideos();
        showNotification('Video deleted successfully!', 'success');
    }
}

function saveVideos() {
    localStorage.setItem('animationVideos', JSON.stringify(videos));
}

function renderVideos(filteredVideos = null) {
    if (!videoContainer) {
        console.error('Video container not found');
        return;
    }
    
    const videosToRender = filteredVideos || videos;
    
    if (videosToRender.length === 0) {
        videoContainer.innerHTML = `
            <div class="no-videos">
                <i class="fas fa-video-slash"></i>
                <p>No videos available at the moment.</p>
            </div>
        `;
        return;
    }
    
    videoContainer.innerHTML = '';
    videosToRender.forEach(video => {
        videoContainer.appendChild(createVideoCard(video));
    });
}

// Search functionality
function searchVideos() {
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm === '') {
        renderVideos();
        return;
    }
    
    const filteredVideos = videos.filter(video => 
        video.week.toLowerCase().includes(searchTerm)
    );
    
    renderVideos(filteredVideos);
}

// Clear search
function clearSearch() {
    if (searchInput) {
        searchInput.value = '';
        renderVideos();
    }
}

// Modal functionality
function openModal(video) {
    if (!modal || !modalVideo || !modalTitle || !modalDescription) {
        console.error('Modal elements not found');
        return;
    }
    
    modalVideo.src = `https://www.youtube.com/embed/${video.videoId}`;
    modalTitle.textContent = video.week;
    modalDescription.textContent = `Added on ${new Date(video.addedAt).toLocaleDateString()}`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    if (!modal || !modalVideo) return;
    
    modal.style.display = 'none';
    modalVideo.src = '';
    document.body.style.overflow = 'auto';
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Setup event listeners
function setupEventListeners() {
    // Mobile Navigation
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            if (navMenu) navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburger) hamburger.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for navigation links
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', searchVideos);
    }
    
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', clearSearch);
    }

    // Age calculator event listeners
    if (calculateAgeBtn) {
        calculateAgeBtn.addEventListener('click', calculatePlanetaryAges);
    }

    // Allow Enter key for age calculation
    if (ageInput) {
        ageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                calculatePlanetaryAges();
            }
        });
    }

    // Modal event listeners
    if (closeModal) {
        closeModal.addEventListener('click', closeModalFunc);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModalFunc();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.style.display === 'block') {
            closeModalFunc();
        }
    });
}

// Intersection Observer for smooth animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    
    // Initialize DOM elements
    initializeElements();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize videos
    renderVideos();
    
    // Set active navigation based on scroll position
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                if (navLinks) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            }
        });
    });
    
    // Observe all sections and planet items for animation
    document.querySelectorAll('section, .planet-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
    
    // Show welcome message
    showNotification('Welcome to the Animation Portfolio! 🎬', 'success');
    
    // Debug: Check if age elements exist
    console.log('Age elements found:', document.querySelectorAll('[data-planet]').length);
    document.querySelectorAll('[data-planet]').forEach(el => {
        console.log('Found planet element:', el.getAttribute('data-planet'));
    });
    
    console.log('Initialization complete!');
}); 