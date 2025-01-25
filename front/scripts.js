const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const carousel = document.querySelector('.carousel');

prevBtn.addEventListener('click', () => {
  carousel.scrollLeft -= 300;
});

nextBtn.addEventListener('click', () => {
  carousel.scrollLeft += 300;
});