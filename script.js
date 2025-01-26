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

