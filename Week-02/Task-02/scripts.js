// ========================================
// SCROLL-TRIGGERED REVEAL ANIMATIONS
// Using Intersection Observer API
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  const revealCards = document.querySelectorAll('.feature-card');

  // Create an Intersection Observer instance
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add a staggered delay for each card with spring-like timing
        const delay = Array.from(revealCards).indexOf(entry.target) * 120;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        
        // Once revealed, stop observing to save resources
        observer.unobserve(entry.target);
      }
    });
  }, {
    // Trigger when 15% of the element is visible
    threshold: 0.15,
    // Start checking slightly before the element enters viewport
    rootMargin: '0px 0px -50px 0px'
  });

  // Start observing each feature card
  revealCards.forEach(card => {
    observer.observe(card);
  });

  // Also reveal cards that are already visible on load
  setTimeout(() => {
    revealCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight - 100) {
        card.classList.add('revealed');
        observer.unobserve(card);
      }
    });
  }, 500);
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


document.addEventListener('scroll', function() {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;
  if (hero) {
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
  }
});


console.log('🚀 NovaFlow landing page loaded with animations!');
console.log('✨ Features reveal with Intersection Observer');
console.log('🎯 CSS transitions & keyframe animations active');