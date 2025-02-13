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



  const sliderNavLinks = document.querySelectorAll('.slider-nav a');
  const slider = document.querySelector('.slider');
  const cards = document.querySelectorAll('.project-card-container'); // Asegúrate de que el selector sea correcto

  sliderNavLinks.forEach((link) => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const slideId = this.getAttribute('href');
      const slide = document.querySelector(slideId);
      slider.scrollTo({
        left: slide.offsetLeft,
        behavior: 'smooth'
      });

      // Remover la clase 'active' de todos los enlaces
      sliderNavLinks.forEach(link => link.classList.remove('active'));
      // Agregar la clase 'active' al enlace clicado
      this.classList.add('active');
    });
  });

  // Observer para actualizar los enlaces de navegación cuando las tarjetas están visibles
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
  const menuItems = document.querySelectorAll('.nav-menu a');

  hamButton.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamSvg.classList.toggle('active');
  })
  
  menuItems.forEach(item => {
    navMenu.style.pointerEvents = "none"; 
  
    setTimeout(() => {
      navMenu.style.pointerEvents = "auto"; 
    }, 100);
    
    item.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamSvg.classList.toggle('active');
    })
  })
  
  document.addEventListener('click', (event) => {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnHam = hamSvg.contains(event.target);
  
    if (!isClickInsideMenu && !isClickOnHam) {
      navMenu.classList.remove('active'); // Cierra el menú
      hamSvg.classList.remove('active'); // Ajusta el ícono
    }
  });
  
  document.querySelectorAll('.nav-item').forEach(anchor => {
    anchor.addEventListener('click', function(event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth'});

    });
  });
  
  const contactForm = document.querySelector('.contact-form');

});


const menuItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');

let currentSection = 'home';
window.addEventListener('scroll', () => {
  sections.forEach(section => {
    if (window.scrollY >= (section.offsetTop - 600)) {
      currentSection = section.id;
    }
  });

  menuItems.forEach(menuItem => {
    menuItem.classList.remove('active');
    if (menuItem.href.includes(currentSection)) {
      menuItem.classList.add('active');
    }
  });
});




