class ImageSlider {
  currentID = 0;
  constructor (imgs, preBtn, nextBtn, bulletsWrapper) {
    this.imgs = imgs
    this.preBtn = preBtn
    this.nextBtn = nextBtn
    this.bulletsWrapper = bulletsWrapper
    this.removeActiveFromImgs()
    this.imgs[0].classList.add("active")
    this.addImgsIDs()
    this.createBullets()
    this.checker()
    // Next Function
    this.next = () => {
      if (this.currentID < this.imgs.length - 1) {
        let bullets = Array.from(this.bulletsWrapper.children)
        this.currentID += 1;
        this.imgs.forEach((img) => {
          img.classList.remove("active")
          if (+img.id === this.currentID) {
            img.classList.add("active")
          }
        })
        bullets.forEach((bullet) => {
          bullet.classList.remove("active")
          if (+bullet.id === this.currentID) {
            bullet.classList.add("active")
          }
        })
        this.checker()
      }
    }
    // Previous Function
    this.previous = () => {
      if (this.currentID > 0) {
        let bullets = Array.from(this.bulletsWrapper.children)
        this.currentID -= 1;
        this.imgs.forEach((img) => {
          img.classList.remove("active")
          if (+img.id === this.currentID) {
            img.classList.add("active")
          }
        })
        bullets.forEach((bullet) => {
          bullet.classList.remove("active")
          if (+bullet.id === this.currentID) {
            bullet.classList.add("active")
          }
        })
        this.checker()
      }
    }
    // Next And Previous Events
    this.nextBtn.addEventListener("click", this.next)
    this.preBtn.addEventListener("click", this.previous)
  }

  addImgsIDs() {
    this.imgs.forEach((img, index) => {
      img.setAttribute("id", index)
    })
  }

  createBullets() {
    let numberOfBullets = this.imgs.length
    for (let i = 0; i < numberOfBullets; i++) {
      let bullet = document.createElement("span")
      bullet.classList.add("bullet")
      bullet.id = i
      if (i === this.currentID) {
        this.addActiveToBullet(bullet)
      }
      this.bulletsWrapper.appendChild(bullet)
      bullet.addEventListener("click", (e) => {
        this.currentID = +e.target.id
        this.removeActiveFromBullets()
        this.addActiveToBullet(e.target)
        this.removeActiveFromImgs()
        this.addActiveToImg(this.currentID)
        this.checker()
      })
    }
  }

  removeActiveFromBullets() {
    Array.from(this.bulletsWrapper.children).forEach(bullet => {
      bullet.classList.remove("active")
    })
  }

  addActiveToBullet(bullet) {
    bullet.classList.add("active")
  }

  removeActiveFromImgs() {
    this.imgs.forEach(img => {
      img.classList.remove("active")
    })
  }

  addActiveToImg(id) {
    this.imgs.forEach(img => {
      if (+img.id === id) {
        img.classList.add("active")
      }
    })
  }

  checker() {
    if (this.currentID < this.imgs.length - 1) {
      this.nextBtn.removeAttribute("disabled")
    } else if (this.currentID >= this.imgs.length - 1) {
      this.nextBtn.setAttribute("disabled", "true")
    }
    if (this.currentID > 0) {
      this.preBtn.removeAttribute("disabled")
    } else if (this.currentID >= 0) {
      this.preBtn.setAttribute("disabled", "true")
    }
    // // Additional (Another way to implement the task of the "checker" method, but less efficient) => [MUST BE IN THE CONSTRUCTOR]
    // setInterval(() => {
    //   if (this.currentID < this.imgs.length - 1) {
    //     this.nextBtn.removeAttribute("disabled")
    //   } else if (this.currentID >= this.imgs.length - 1) {
    //     this.nextBtn.setAttribute("disabled", "true")
    //   }
    //   if (this.currentID > 0) {
    //     this.preBtn.removeAttribute("disabled")
    //   } else if (this.currentID >= 0) {
    //     this.preBtn.setAttribute("disabled", "true")
    //   }
    // }, 500)
  }
}

export default ImageSlider