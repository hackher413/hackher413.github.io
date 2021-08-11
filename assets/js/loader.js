const csloader = document.querySelector('.csloader');

const fadeEffect = setInterval(() => {
    // if we don't set opacity 1 in CSS, then
    // it will be equaled to "" -- that's why
    // we check it, and if so, set opacity to 1
    if (!csloader.style.opacity) {
      preloader.style.opacity = 1;
    }
    if (csloader.style.opacity > 0) {
      csloader.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
    }
  }, 100);