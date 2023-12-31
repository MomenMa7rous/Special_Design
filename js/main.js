// imports
import Slider from './slider.js'

// Menu Overlay
const overlay = document.querySelector("header ul.mobile-nav + .overlay")

// Header Scroll 
const header = document.querySelector("header")

if (window.scrollY >= 20) {
  header.style.cssText = '--color: #000;'
  header.style.background = '#fff'
}

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
  overlay.classList.toggle("active")
})

document.addEventListener("click", (e) => {
  if (e.target !== menuBtn && e.target !== menuBtn.firstElementChild && e.target !== menu && Array.from(menu.children).includes(e.target) === false) {
    menu.classList.remove("active")
    overlay.classList.remove("active")
  }
})

Array.from(menu.children).forEach(el => {
  el.firstElementChild.addEventListener("click", () => {
    menu.classList.remove("active")
    overlay.classList.remove("active")
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

// Settings
const settings = document.querySelector("div.settings")
const settingsBtn = document.querySelector("div.settings span.btn")

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("active")
})

// Check The Local Storage
// For Color Option
const colors = document.querySelectorAll(".settings .box .content div.color")
const root = document.querySelector(":root")

const colorInStorage = window.localStorage.getItem("color")
if (colorInStorage) {
  root.style.setProperty("--main-color", colorInStorage)
  colors.forEach(color => {
    if (color.getAttribute("data-color") === colorInStorage) {
      color.classList.add("active")
    }
  })
} else {
  colorDefaultBehavior()
}

function colorDefaultBehavior() {
  colors.forEach(color => {
    color.classList.remove("active")
  })
  colors[0].classList.add("active")
  root.style.setProperty("--main-color", colors[0].getAttribute("data-color"))
}

// For Random Background Option
const choices = document.querySelectorAll(".settings .box.background .content div")
const targetElement = document.querySelector("section.hero")
let interval;

const backgroundInStorage = window.localStorage.getItem("randomBackground")
if (backgroundInStorage && backgroundInStorage === 'true') {
  interval = randomBackground()
  choices.forEach(choice => {
    if (choice.getAttribute("data-choice") === backgroundInStorage) {
      choice.classList.add("active")
    }
  })
} else if (backgroundInStorage === 'false') {
  choices.forEach(choice => {
    choice.classList.remove("active")
  })
  choices[1].classList.add("active")
  clearInterval(interval)
} else if (!backgroundInStorage) {
  backgroundDefaultBehavior()
}

function backgroundDefaultBehavior() {
  interval = randomBackground()
  choices.forEach(choice => {
    choice.classList.remove("active")
  })
  choices[0].classList.add("active")
}

// Color Option
colors.forEach(color => {
  color.addEventListener("click", (e) => {
    // Remove Active From All
    colors.forEach(color => {
      color.classList.remove("active")
    })
    // Add Active
    e.currentTarget.classList.add("active")
    // Modify The CSS Variable
    root.style.setProperty("--main-color", e.currentTarget.getAttribute("data-color"))
    // Add To Local Storage
    window.localStorage.setItem("color", e.currentTarget.getAttribute("data-color"))
  })
})

// Random Background Option
choices.forEach(choice => {
  choice.addEventListener("click", (e) => {
    // Remove Active From All
    choices.forEach(choice => {
      choice.classList.remove("active")
    })
    // Add Active
    e.currentTarget.classList.add("active")
    // Do The Job
    if (e.currentTarget.getAttribute("data-choice") === 'true') {
      interval = randomBackground()
    } else {
      clearInterval(interval)
    }
    // Add To Local Storage
    window.localStorage.setItem("randomBackground", e.currentTarget.getAttribute("data-choice"))
  })
})

let backgrounds = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg']

function randomBackground() {
  let interval = setInterval(() => {
    let randomNumber = Math.floor(Math.random() * backgrounds.length)
    targetElement.style.cssText = `background: url(https://raw.githubusercontent.com/MomenMa7rous/Special_Design/main/imgs/${backgrounds[randomNumber]});`
  }, 8000)
  return interval
}

// Reset Options
const resetBtn = document.querySelector(".settings .box.reset")

resetBtn.addEventListener("click", () => {
  // Clear Local Storage
  window.localStorage.clear()
  // Color Default Behavior
  colorDefaultBehavior()
  // Background Default Behavior
  backgroundDefaultBehavior()
})

// Scroll To Top Button
const sttBtn = document.querySelector("button.stt")

sttBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
})

window.addEventListener("scroll", () => {
  if (window.scrollY >= 200) {
    sttBtn.classList.add("active")
  } else {
    sttBtn.classList.remove("active")
  }
})

// Header Border Fill On Scroll
const headerBorder = document.querySelector('header .border')

controlHeaderBorder()

window.addEventListener("scroll", () => {
  controlHeaderBorder()
})

function controlHeaderBorder() {
  if (window.scrollY >= 20) {
    headerBorder.style.opacity = '1'
  } else {
    headerBorder.style.opacity = '0'
  }
  let percentage = (((window.scrollY + window.innerHeight) / document.body.clientHeight) * 100)
  headerBorder.style.width = `${percentage}%`
}

// Initialize WOW.js
new WOW().init()

// Initialize Headroom.js
new Headroom(header).init()