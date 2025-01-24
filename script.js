const navMenu = document.querySelector('.nav-menu')
const hamSvg = document.querySelector('.ham');
const hamButton = document.querySelector('.ham-button');

hamButton.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  hamSvg.classList.toggle('active');
})
