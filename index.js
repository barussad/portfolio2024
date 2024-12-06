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