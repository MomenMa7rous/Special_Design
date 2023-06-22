// Header Menu Button
const menuBtn = document.getElementById("menuBtn")
const menu = document.querySelector("header ul.mobile-nav")

menuBtn.addEventListener("click", () => {
  menu.classList.toggle("active")
})

Array.from(menu.children).forEach(el => {
  el.firstElementChild.addEventListener("click", () => {
    menu.classList.remove("active")
  })
})