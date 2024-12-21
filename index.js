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
