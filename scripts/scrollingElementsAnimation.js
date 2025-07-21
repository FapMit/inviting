function scrollingElementsAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0.8) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: '0.8'
  });

  const elements = document.querySelectorAll('.scroll-item');
  elements.forEach(element => {
    observer.observe(element);
  });
}

export default scrollingElementsAnimation;