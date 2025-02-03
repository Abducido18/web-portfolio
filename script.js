document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.title, .card-container, .project-card-container');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if ( entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  animatedElements.forEach(elements => observer.observe(elements));

  
});


const navMenu = document.querySelector('.nav-menu')
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
      target.scrollIntoView({ behavior: 'smooth' });
  });
});

