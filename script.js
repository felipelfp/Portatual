// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const mobileLinks = document.querySelectorAll(".mobile-link")

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
})

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
  })
})

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe all animated elements
document.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right").forEach((el) => {
  observer.observe(el)
})

// Navbar scroll effect
let lastScroll = 0
const nav = document.querySelector(".nav")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll > 100) {
    nav.style.background = "rgba(10, 10, 15, 0.95)"
    nav.style.boxShadow = "0 4px 20px rgba(147, 51, 234, 0.1)"
  } else {
    nav.style.background = "rgba(10, 10, 15, 0.8)"
    nav.style.boxShadow = "none"
  }

  lastScroll = currentScroll
})

// Skill bars animation
const skillBars = document.querySelectorAll(".skill-progress")
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width
        entry.target.style.width = "0"
        setTimeout(() => {
          entry.target.style.width = width
        }, 100)
        skillObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

skillBars.forEach((bar) => {
  skillObserver.observe(bar)
})

// Contact Form
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const message = formData.get("message")

  // Aqui você pode adicionar a lógica para enviar o email
  // Por exemplo, usando EmailJS ou um backend próprio

  alert(`Obrigado ${name}! Sua mensagem foi enviada com sucesso. Entrarei em contato em breve!`)
  contactForm.reset()
})

// Parallax effect for hero grid
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroGrid = document.querySelector(".hero-grid")
  if (heroGrid) {
    heroGrid.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Add active state to nav links based on scroll position
const sections = document.querySelectorAll("section[id]")
const navLinks = document.querySelectorAll(".nav-link")

window.addEventListener("scroll", () => {
  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})
