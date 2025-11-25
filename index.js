/* navbar */
const menuIcon = document.getElementById("menu-icon") /* nebo misto const let?*/
const navLinks = document.getElementById("nav-links")

const body = document.querySelector("body")

menuIcon.addEventListener("click", () => {
    menuIcon.classList.toggle("active") /* toggle - meni stav */
    navLinks.classList.toggle("active")
/* kdyz je otevreny burger menu, nejde scrollovat na kontent */
    if (menuIcon.classList.contains("active")) {
        body.style.overflowY = "hidden";
    } else {
        body.style.overflowY = "auto";
    }
})

/* progress bar */
const progressBar = document.getElementById('progress-bar');

  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = `${scrollPercentage}%`;
})

/* carousel */
const track = document.querySelector('.carousel-3-track');
  const slides = track ? Array.from(track.querySelectorAll('img')) : [];
  const prevBtn = document.querySelector('.carousel-3-btn.prev');
  const nextBtn = document.querySelector('.carousel-3-btn.next');

  if (track && slides.length && prevBtn && nextBtn) {
    const visible = 3;                 // kolik obrázků je vidět najednou
    let index = 0;                     // aktuální "levý" obrázek

    function maxIndex() {
      // poslední pozice, kde ještě uvidíš 3 plakáty vedle sebe
      return Math.max(0, slides.length - visible);
    }

    function goTo(newIndex) {
      // obtočení (loop) mezi prvním a posledním "oknem"
      const last = maxIndex();

      if (newIndex < 0) {
        index = last;                  // zleva skoč na konec
      } else if (newIndex > last) {
        index = 0;                     // zprava skoč na začátek
      } else {
        index = newIndex;
      }

      // posuneme track tak, aby obrázek s daným indexem byl úplně vlevo
      const offset = slides[index].offsetLeft;
      track.style.transform = `translateX(-${offset}px)`;
    }

    nextBtn.addEventListener('click', () => {
      goTo(index + 1);                 // další slide
    });

    prevBtn.addEventListener('click', () => {
      goTo(index - 1);                 // předchozí slide
    });

    window.addEventListener('resize', () => goTo(index));

    // inicializace
    goTo(0);
  }

  function initCarousel(trackSelector, prevSelector, nextSelector, visible) {
    const track = document.querySelector(trackSelector);
    const slides = track ? Array.from(track.querySelectorAll('img')) : [];
    const prevBtn = document.querySelector(prevSelector);
    const nextBtn = document.querySelector(nextSelector);

    if (!track || !slides.length || !prevBtn || !nextBtn) return;

    let index = 0;

    function maxIndex() {
      return Math.max(0, slides.length - visible);
    }

    function goTo(newIndex) {
      const last = maxIndex();

      if (newIndex < 0) {
        index = last;          // loop zleva na konec
      } else if (newIndex > last) {
        index = 0;             // loop zprava na začátek
      } else {
        index = newIndex;
      }

      const offset = slides[index].offsetLeft;
      track.style.transform = `translateX(-${offset}px)`;
    }

    nextBtn.addEventListener('click', () => {
      goTo(index + 1);
    });

    prevBtn.addEventListener('click', () => {
      goTo(index - 1);
    });

    window.addEventListener('resize', () => goTo(index));

    goTo(0);
  }

  // původní 3-poster carousel
  initCarousel('.carousel-3-track', '.carousel-3-btn.prev', '.carousel-3-btn.next', 3);

  // nový single-poster carousel
  initCarousel('.carousel-single-track', '.carousel-single-btn.prev', '.carousel-single-btn.next', 1);