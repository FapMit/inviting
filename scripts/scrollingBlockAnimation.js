function scrollingBlockAnimation() {
  const container = document.querySelector('.scroll-container');
  const sections = document.querySelectorAll('.scroll-item');

  let isScrolling = false;
  let currentSection = localStorage.getItem('section') || 0;
  let scrollTimeout = null;
  let isUserDraggingScrollbar = false;
  scrollToSection(currentSection);

  container.addEventListener('scroll', () => {
    if (isUserDraggingScrollbar) {
      // При перетаскивании ползунка определяем ближайшую секцию
      const scrollPosition = container.scrollTop;
      const newSection = Math.round(scrollPosition / window.innerHeight);

      if (newSection !== currentSection) {
        scrollToSection(newSection, true);
      }
      return;
    }
    
    if (isScrolling) return;
    
    const scrollPosition = container.scrollTop;
    const newSection = Math.round(scrollPosition / window.innerHeight);
    
    if (newSection !== currentSection) {
      scrollToSection(newSection);
    }
  }, { passive: true });
  
  container.addEventListener('mousedown', (e) => {
    console.log('mousedown')
    if (e.target === container && e.offsetX > container.offsetWidth - 50) {
      isUserDraggingScrollbar = true;
    }
  });
  
  document.addEventListener('mouseup', () => {
    isUserDraggingScrollbar = false;
  });
  
  let wheelTimeout = null;
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    if (isScrolling) return;
    
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
      if (e.deltaY > 0) {
          scrollToSection(+currentSection + 1);
      } else {
          scrollToSection(+currentSection - 1);
      }
    }, 50);
  }, { passive: false });

  let touchStartY = 0;
  let touchMoved = false;
  
  container.addEventListener('touchstart', (e) => {
    e.stopPropagation();
    touchStartY = e.touches[0].clientY;
    touchMoved = false;
  }, { passive: false });
  
  container.addEventListener('touchmove', (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isScrolling) {
      return;
    }
    
    const touchY = e.touches[0].clientY;
    const diff = touchStartY - touchY;
    
    if (Math.abs(diff) > 30) {
      touchMoved = true;
      if (diff > 0) {
          scrollToSection(+currentSection + 1);
      } else {
          scrollToSection(+currentSection - 1);
      }
      e.preventDefault();
    }
  }, { passive: false });  

  function scrollToSection(index, force = false) {
    if ((isScrolling && !force) || index < 0 || index >= sections.length) return;
    
    isScrolling = true;
    currentSection = index;
    
    sections[index].scrollIntoView({
      behavior: force ? 'auto' : 'smooth'
    });

    localStorage.setItem('section', index)
    
    if (scrollTimeout !== null) clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      isScrolling = false;
      isUserDraggingScrollbar = false;
    }, 1000);
  }
}

export default scrollingBlockAnimation;
