const track = document.querySelector('.carousel-track');

track.addEventListener('mouseover', () => {
  track.style.animationPlayState = 'paused'; // Pausar la animación cuando el mouse está encima
});

track.addEventListener('mouseout', () => {
  track.style.animationPlayState = 'running'; // Reanudar la animación cuando el mouse se sale
});
