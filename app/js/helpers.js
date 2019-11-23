const mobileMenu = document.querySelector('.mobile');
const mobileIcon = document.querySelector('i');
const navigationContainer = document.querySelector('.navigation-container')

mobileMenu.addEventListener('click', () => {
  navigationContainer.classList.toggle('show')
  mobileIcon.classList.toggle("fa-times")
  mobileIcon.classList.toggle("fa-bars")
})
