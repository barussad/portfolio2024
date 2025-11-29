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
function initCarouselGroup(containerSelector, trackSelector, prevSelector, nextSelector, visible) {
  const containers = document.querySelectorAll(containerSelector);

  containers.forEach((container) => {
    const track = container.querySelector(trackSelector);
    if (!track) return;

    const slides = Array.from(track.children); // každé dítě = jeden slide
    const prevBtn = container.querySelector(prevSelector);
    const nextBtn = container.querySelector(nextSelector);
    if (!slides.length || !prevBtn || !nextBtn) return;

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

      // posuneme track tak, aby "slide" s daným indexem byl vlevo
      const offset = slides[index].offsetLeft - slides[0].offsetLeft;
      track.style.transform = `translateX(-${offset}px)`;
    }

    prevBtn.addEventListener('click', () => {
      goTo(index - 1);
    });

    nextBtn.addEventListener('click', () => {
      goTo(index + 1);
    });

    window.addEventListener('resize', () => goTo(index));

    goTo(0);
  });
}

// 3-img carousel
initCarouselGroup('.carousel-3', '.carousel-3-track', '.carousel-3-btn.prev', '.carousel-3-btn.next', 3);

// velký single carousel
initCarouselGroup('.carousel-single', '.carousel-single-track', '.carousel-single-btn.prev', '.carousel-single-btn.next', 1);

// všechny small carousely
initCarouselGroup('.carousel-single-small', '.carousel-single-small-track', '.carousel-single-small-btn.prev', '.carousel-single-small-btn.next', 1);


document.addEventListener('DOMContentLoaded', () => {
  const flipbook = document.getElementById('flipbook');
  if (!flipbook) return;

  const spreads = Array.from(flipbook.querySelectorAll('.book-spread'));
  const prevBtn = document.querySelector('.book-prev');
  const nextBtn = document.querySelector('.book-next');

  if (!spreads.length || !prevBtn || !nextBtn) return;

  let current = 0;

  // inicializace – nastav první spread jako aktivní
  function setActiveSpread(index) {
    spreads.forEach((spread, i) => {
      spread.classList.toggle('active', i === index);
      // vyšší z-index pro aktuální spread, aby byl vždy nad ostatními
      spread.style.zIndex = spreads.length - i;
    });
  }

  function goNext() {
    if (current >= spreads.length - 1) return;
    current++;
    setActiveSpread(current);
  }

  function goPrev() {
    if (current <= 0) return;
    current--;
    setActiveSpread(current);
  }

  prevBtn.addEventListener('click', goPrev);
  nextBtn.addEventListener('click', goNext);

  // volitelné: klik na knížku = další spread
  flipbook.addEventListener('click', goNext);

  setActiveSpread(current);
});
