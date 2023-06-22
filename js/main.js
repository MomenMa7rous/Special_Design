// Header Scroll 
const header = document.querySelector("header")

window.addEventListener("scroll", () => {
  if (window.scrollY >= 20) {
    header.style.cssText = '--color: #000;'
    header.style.background = '#fff'
  } else {
    header.style.cssText = '--color: #fff;'
    header.style.background = 'none'
  }
})

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