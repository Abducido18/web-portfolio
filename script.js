document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.title, .card-container, .slider, .slider-nav, .contact-form, .certification-container');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  animatedElements.forEach(element => observer.observe(element));

  const sections = document.querySelectorAll('section');
  const menuItems = document.querySelectorAll('.nav-menu a');

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        menuItems.forEach(item => item.classList.remove('selected'));
        const id = entry.target.getAttribute('id');
        const navItem = document.querySelector(`.nav-menu a[href="#${id}"]`);
        console.log(id);
        if (navItem) {
          navItem.classList.add('selected');
        }
      }
    });
  }, { threshold: 0.2 });
  sections.forEach(section => sectionObserver.observe(section));

  const sliderNavLinks = document.querySelectorAll('.slider-nav a');
  const slider = document.querySelector('.slider');
  const cards = document.querySelectorAll('.project-card-container');

  sliderNavLinks.forEach((link, index) => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const slideId = this.getAttribute('href');
      const slide = document.querySelector(slideId);
      slider.scrollTo({
        left: slide.offsetLeft,
        behavior: 'smooth'
      });
      sliderNavLinks.forEach(link => link.classList.remove('active'));
      this.classList.add('active');
    });
  });

  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(cards).indexOf(entry.target);
        sliderNavLinks.forEach(link => link.classList.remove('active'));
        sliderNavLinks[index].classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  cards.forEach(card => cardObserver.observe(card));

  const navMenu = document.querySelector('.nav-menu');
  const hamSvg = document.querySelector('.ham');
  const hamButton = document.querySelector('.ham-button');

  hamButton.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamSvg.classList.toggle('active');
  });

  menuItems.forEach(item => {
    navMenu.style.pointerEvents = "none";
    setTimeout(() => {
      navMenu.style.pointerEvents = "auto";
    }, 100);
    item.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamSvg.classList.toggle('active');
    });
  });

  document.addEventListener('click', (event) => {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnHam = hamSvg.contains(event.target);
    if (!isClickInsideMenu && !isClickOnHam) {
      navMenu.classList.remove('active');
      hamSvg.classList.remove('active');
    }
  });

  document.querySelectorAll('.nav-item').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
      event.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        history.pushState(null, null, this.getAttribute('href'));
      }, 500);
    });
  });

  const contactForm = document.querySelector('.contact-form');

  function isTablet() {
    return navigator.userAgent.match(/iPad|Android/i) != null || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
  }

  if (isTablet()) {
    window.addEventListener('scroll', () => {
      let scrollPosition = window.scrollY;
      sections.forEach(section => {
        let offsetTop = section.offsetTop;
        let offsetHeight = section.offsetHeight;
        if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
          menuItems.forEach(item => item.classList.remove('selected'));
          const id = section.getAttribute('id');
          const navItem = document.querySelector(`.nav-menu a[href="#${id}"]`);
          if (navItem) {
            navItem.classList.add('selected');
          }
        }
      });
    });
  }
});
