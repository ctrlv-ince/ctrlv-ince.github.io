// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const searchInput = document.querySelector('#search-videos');
const clearSearchBtn = document.querySelector('#clear-search');
const videoContainer = document.querySelector('#video-container');
const modal = document.querySelector('#modal');
const modalVideo = document.querySelector('#modal-video');
const modalTitle = document.querySelector('#modal-title');
const modalDescription = document.querySelector('#modal-description');
const closeModal = document.querySelector('.close-modal');

// Age Calculator Elements
const ageInput = document.querySelector('#age-input');
const planetSelect = document.querySelector('#planet-select');
const calculateAgeBtn = document.querySelector('#calculate-age-btn');
const ageResults = document.querySelector('#age-results');

// Planetary year lengths in Earth days
const planetYears = {
    earth: 365.25,
    mercury: 88,
    venus: 224.7,
    mars: 687,
    jupiter: 4333,
    saturn: 10759,
    uranus: 30687,
    neptune: 60190
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
    neptune: { name: 'Neptune', emoji: '♆' }
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

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Age Calculator Functionality
function calculatePlanetaryAges() {
    const age = parseFloat(ageInput.value);
    const selectedPlanet = planetSelect.value;
    
    if (!age || age < 0 || age > 150) {
        showNotification('Please enter a valid age between 0 and 150 years!', 'error');
        return;
    }
    
    // Calculate ages for all planets
    const results = [];
    const earthDaysInSelectedAge = age * planetYears[selectedPlanet];
    
    Object.keys(planetYears).forEach(planet => {
        const planetAge = earthDaysInSelectedAge / planetYears[planet];
        results.push({
            planet: planet,
            age: planetAge.toFixed(2)
        });
    });
    
    // Display results
    displayAgeResults(results, selectedPlanet);
}

function displayAgeResults(results, selectedPlanet) {
    const selectedPlanetInfo = planetInfo[selectedPlanet];
    
    let html = `
        <h4>If you are ${ageInput.value} years old on ${selectedPlanetInfo.name} ${selectedPlanetInfo.emoji}:</h4>
    `;
    
    results.forEach(result => {
        const planetInfo = planetInfo[result.planet];
        const isSelected = result.planet === selectedPlanet;
        
        html += `
            <div class="age-result-item ${isSelected ? 'selected' : ''}">
                <span class="planet-name">
                    ${planetInfo.emoji} ${planetInfo.name}
                    ${isSelected ? ' (Your input)' : ''}
                </span>
                <span class="planet-age">${result.age} years</span>
            </div>
        `;
    });
    
    ageResults.innerHTML = html;
    ageResults.classList.add('show');
    
    // Scroll to results
    ageResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
    searchInput.value = '';
    renderVideos();
}

// Modal functionality
function openModal(video) {
    modalVideo.src = `https://www.youtube.com/embed/${video.videoId}`;
    modalTitle.textContent = video.week;
    modalDescription.textContent = `Added on ${new Date(video.addedAt).toLocaleDateString()}`;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
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
    
    .age-result-item.selected {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        padding: 0.8rem;
        margin: 0.2rem 0;
    }
`;
document.head.appendChild(style);

// Event Listeners
searchInput.addEventListener('input', searchVideos);
clearSearchBtn.addEventListener('click', clearSearch);

// Age calculator event listeners
calculateAgeBtn.addEventListener('click', calculatePlanetaryAges);

// Allow Enter key for age calculation
[ageInput, planetSelect].forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculatePlanetaryAges();
        }
    });
});

// Modal event listeners
closeModal.addEventListener('click', closeModalFunc);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModalFunc();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeModalFunc();
    }
});

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
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
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
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Show welcome message
    showNotification('Welcome to the Animation Portfolio! 🎬', 'success');
}); 