let isScrolling = false; // Prevent multiple scroll actions at once

// Function to scroll to the next section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
    });
}

// Listen for wheel scroll events
window.addEventListener('wheel', function (event) {
    if (isScrolling) return; // Prevent multiple scrolls at once

    const sections = document.querySelectorAll('.section');
    const currentSectionIndex = getCurrentSectionIndex();
    const lastSectionIndex = sections.length - 1;

    // Scrolling down to the next section
    if (event.deltaY > 0 && currentSectionIndex < lastSectionIndex) {
        isScrolling = true;
        scrollToSection(sections[currentSectionIndex + 1].id);
    }
    // Scrolling up to the previous section
    else if (event.deltaY < 0 && currentSectionIndex > 0) {
        isScrolling = true;
        scrollToSection(sections[currentSectionIndex - 1].id);
    }
});

// Reset scrolling flag after scrolling is complete
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('.section');
    const lastSectionIndex = sections.length - 1;

    if (window.scrollY >= document.body.scrollHeight - window.innerHeight) {
        // If we are at the bottom (last section), stop scrolling further
        isScrolling = false;
    }

    // Update navbar active class based on the current section
    updateNavbarActiveClass();
});

// Function to get the current section in view
function getCurrentSectionIndex() {
    const sections = document.querySelectorAll('.section');
    let currentIndex = 0;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Check if the section is in the viewport
        if (window.scrollY >= sectionTop - 50 && window.scrollY < sectionTop + sectionHeight - 50) {
            currentIndex = index;
        }
    });

    return currentIndex;
}

// Function to update navbar active class based on the current section
function updateNavbarActiveClass() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    let currentSectionIndex = getCurrentSectionIndex();

    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to the corresponding nav link
    if (navLinks[currentSectionIndex]) {
        navLinks[currentSectionIndex].classList.add('active');
    }
}

// Prevent default scroll behavior when at the last section
window.addEventListener('wheel', function (event) {
    const sections = document.querySelectorAll('.section');
    const lastSectionIndex = sections.length - 1;
    const currentSectionIndex = getCurrentSectionIndex();

    if (currentSectionIndex === lastSectionIndex && event.deltaY > 0) {
        event.preventDefault(); // Prevent scrolling beyond the last section
    }
});

// Listen for scrolling completion to reset isScrolling flag
window.addEventListener('scroll', function () {
    setTimeout(() => {
        isScrolling = false; // Reset flag after smooth scroll is complete
    }, 500); // Wait 500ms after scroll completes to reset
});
