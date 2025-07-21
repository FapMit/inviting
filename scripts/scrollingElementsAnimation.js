function scrollingElementsAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0.9) {
        entry.target.classList.add('visible');
      } 
      // else {
      //   entry.target.classList.remove('visible');
      // }
    });
  }, {
    threshold: '0.9'
  });

  const elements = document.querySelectorAll('.scroll-item');
  elements.forEach(element => {
    observer.observe(element);
  });
}

export default scrollingElementsAnimation;