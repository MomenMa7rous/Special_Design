// imports
import Slider from './slider.js'

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

// Gallery Image Slider
const imgs = document.querySelectorAll("section.gallery .container .image-slider .img-container img")
const preBtn = document.getElementById("preBtn")
const nextBtn = document.getElementById("nextBtn")
const bulletsWrapper = document.querySelector("section.gallery .container .image-slider .controls .bullets")
const popup = document.querySelector("section.gallery .container .image-slider .popup")
const exitBtn = document.querySelector("section.gallery .container .image-slider .popup span.exit").cloneNode(true)

new Slider(imgs, preBtn, nextBtn, bulletsWrapper)

popup.addEventListener("click", (e) => {
  if (e.target !== popup.lastElementChild) {
    popup.innerHTML = ''
    popup.style.display = 'none'
  }
})

imgs.forEach(img => {
  img.addEventListener("click", (e) => {
    popup.append(exitBtn)
    popup.append(e.currentTarget.cloneNode())
    popup.style.display = 'flex'
  })
})