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
    if (window.pageYOffset >= sectionTop - 200) {
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

// Carousel
const carouselTrack = document.getElementById("carouselTrack")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")
const carouselIndicators = document.getElementById("carouselIndicators")
const projectCards = document.querySelectorAll(".project-card")

let currentIndex = 0
let autoplayInterval
const AUTOPLAY_DELAY = 5000

function getCardsPerView() {
  return window.innerWidth <= 768 ? 1 : 3
}

let CARDS_PER_VIEW = getCardsPerView()

// Create indicators
function createIndicators() {
  carouselIndicators.innerHTML = ""
  const totalSlides = Math.ceil(projectCards.length / CARDS_PER_VIEW)

  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement("div")
    indicator.classList.add("carousel-indicator")
    if (i === 0) indicator.classList.add("active")
    indicator.addEventListener("click", () => goToSlide(i))
    carouselIndicators.appendChild(indicator)
  }
}

createIndicators()
const indicators = document.querySelectorAll(".carousel-indicator")

function updateCarousel() {
  const cardWidth = projectCards[0].offsetWidth
  const gap = 32 // 2rem gap
  const offset = -(currentIndex * (cardWidth + gap) * CARDS_PER_VIEW)
  carouselTrack.style.transform = `translateX(${offset}px)`

  // Update indicators
  const allIndicators = document.querySelectorAll(".carousel-indicator")
  allIndicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentIndex)
  })
}

function nextSlide() {
  const totalSlides = Math.ceil(projectCards.length / CARDS_PER_VIEW)
  currentIndex = (currentIndex + 1) % totalSlides
  updateCarousel()
}

function prevSlide() {
  const totalSlides = Math.ceil(projectCards.length / CARDS_PER_VIEW)
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides
  updateCarousel()
}

function goToSlide(index) {
  currentIndex = index
  updateCarousel()
  resetAutoplay()
}

function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, AUTOPLAY_DELAY)
}

function resetAutoplay() {
  clearInterval(autoplayInterval)
  startAutoplay()
}

// Event listeners
prevBtn.addEventListener("click", () => {
  prevSlide()
  resetAutoplay()
})

nextBtn.addEventListener("click", () => {
  nextSlide()
  resetAutoplay()
})

// Pause autoplay on hover
carouselTrack.addEventListener("mouseenter", () => {
  clearInterval(autoplayInterval)
})

carouselTrack.addEventListener("mouseleave", () => {
  startAutoplay()
})

// Start autoplay
startAutoplay()

// Handle window resize
let resizeTimeout
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout)
  resizeTimeout = setTimeout(() => {
    const newCardsPerView = getCardsPerView()
    if (newCardsPerView !== CARDS_PER_VIEW) {
      CARDS_PER_VIEW = newCardsPerView
      currentIndex = 0
      createIndicators()
      updateCarousel()
    } else {
      updateCarousel()
    }
  }, 250)
})

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide()
    resetAutoplay()
  } else if (e.key === "ArrowRight") {
    nextSlide()
    resetAutoplay()
  }
})

// Touch swipe support
let touchStartX = 0
let touchEndX = 0

carouselTrack.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX
})

carouselTrack.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
})

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    nextSlide()
    resetAutoplay()
  }
  if (touchEndX > touchStartX + 50) {
    prevSlide()
    resetAutoplay()
  }
}

const themeToggle = document.getElementById("themeToggle")
const mobileThemeToggle = document.getElementById("mobileThemeToggle")
const body = document.body

// Load saved theme
const savedTheme = localStorage.getItem("theme") || "dark"
if (savedTheme === "light") {
  body.classList.add("light-theme")
}

function toggleTheme() {
  body.classList.toggle("light-theme")
  const currentTheme = body.classList.contains("light-theme") ? "light" : "dark"
  localStorage.setItem("theme", currentTheme)
}

themeToggle.addEventListener("click", toggleTheme)
mobileThemeToggle.addEventListener("click", toggleTheme)

const languageBtn = document.getElementById("languageBtn")
const languageDropdown = document.getElementById("languageDropdown")
const langOptions = document.querySelectorAll(".lang-option")

const translations = {
  pt: {
    "nav.about": "Sobre",
    "nav.experience": "Experiência",
    "nav.projects": "Projetos",
    "nav.skills": "Habilidades",
    "nav.contact": "Contato",
    "hero.available": "Disponível para projetos",
    "hero.greeting": "Olá, eu sou",
    "hero.title": "Desenvolvedor Full Stack & Estudante de Ciência da Computação",
    "hero.description":
      "Transformando ideias em experiências digitais inovadoras com código limpo e design futurista. Especializado em desenvolvimento web moderno e soluções tecnológicas criativas.",
    "hero.viewProjects": "Ver Projetos",
    "hero.contact": "Entre em Contato",
    "about.label": "Conheça-me",
    "about.title": "Sobre Mim",
    "about.text1":
      "Sou estudante de <strong>Ciência da Computação</strong> apaixonado por tecnologia e inovação. Com experiência em desenvolvimento full stack, crio soluções digitais que combinam funcionalidade excepcional com design moderno.",
    "about.text2":
      "Minha jornada na tecnologia começou com curiosidade sobre como as coisas funcionam, e evoluiu para uma paixão por construir experiências digitais que fazem a diferença. Estou sempre buscando aprender novas tecnologias e aprimorar minhas habilidades.",
    "about.stat1": "Projetos Concluídos",
    "about.stat2": "Anos de Experiência",
    "about.stat3": "Tecnologias",
    "experience.label": "Carreira",
    "experience.title": "Experiência Profissional",
    "experience.date": "2025 - Presente",
    "experience.role": "Estagiário de TI - Helpdesk & Datacenter",
    "experience.company": "Suporte Técnico & Infraestrutura",
    "experience.task1": "Atendimento e resolução de chamados técnicos de usuários",
    "experience.task2": "Suporte remoto e presencial para hardware e software",
    "experience.task3": "Monitoramento de servidores e sistemas críticos",
    "experience.task4": "Manutenção preventiva e corretiva de equipamentos",
    "experience.task5": "Configuração e manutenção de estações de trabalho",
    "experience.task6": "Gerenciamento de Active Directory e permissões de usuários",
    "experience.task7": "Gerenciamento de backup e recuperação de dados",
    "experience.task8": "Suporte em migração de servidores e virtualização",
    "experience.task9": "Documentação de procedimentos e soluções técnicas",
    "projects.label": "Portfolio",
    "projects.title": "Projetos em Destaque",
    "projects.viewProject": "Ver Projeto",
    "projects.project1.title": "Plataforma de Aprendizado",
    "projects.project1.desc":
      "Sistema completo de gerenciamento de cursos online com dashboard interativo, sistema de progresso e certificados.",
    "projects.project2.title": "Site de Academia",
    "projects.project2.desc":
      "Website moderno para academia com sistema de agendamento de aulas, planos de treino personalizados e área do aluno.",
    "projects.project3.title": "Loja Virtual",
    "projects.project3.desc":
      "E-commerce completo com carrinho de compras, sistema de pagamento integrado e painel administrativo.",
    "projects.project4.title": "Plataforma de Torneio de Robótica",
    "projects.project4.desc":
      "Sistema de gerenciamento de competições de robótica com placar ao vivo, inscrições e classificações.",
    "projects.project5.title": "Roadmap de Estudos",
    "projects.project5.desc":
      "Aplicação para criar e acompanhar trilhas de aprendizado personalizadas com metas e progresso visual.",
    "projects.project6.title": "Robô Autônomo Arduino",
    "projects.project6.desc":
      "Robô seguidor de linha com sensores ultrassônicos e interface web para controle remoto via WiFi.",
    "skills.label": "Tecnologias",
    "skills.title": "Habilidades Técnicas",
    "skills.infrastructure": "Infraestrutura",
    "skills.techSupport": "Suporte Técnico",
    "skills.virtualization": "Virtualização",
    "skills.tools": "Ferramentas",
    "contact.label": "Conecte-se",
    "contact.title": "Entre em Contato",
    "contact.subtitle": "Vamos trabalhar juntos!",
    "contact.text":
      "Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades para fazer parte da sua visão.",
    "contact.form.name": "Nome",
    "contact.form.message": "Mensagem",
    "contact.form.send": "Enviar Mensagem",
    "footer.copyright": "© 2025 Felipe Possa. Todos os direitos reservados.",
    "footer.built": "Desenvolvido com paixão e tecnologia",
  },
  en: {
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",
    "hero.available": "Available for projects",
    "hero.greeting": "Hello, I'm",
    "hero.title": "Full Stack Developer & Computer Science Student",
    "hero.description":
      "Transforming ideas into innovative digital experiences with clean code and futuristic design. Specialized in modern web development and creative technology solutions.",
    "hero.viewProjects": "View Projects",
    "hero.contact": "Get In Touch",
    "about.label": "Get to know me",
    "about.title": "About Me",
    "about.text1":
      "I am a <strong>Computer Science</strong> student passionate about technology and innovation. With experience in full stack development, I create digital solutions that combine exceptional functionality with modern design.",
    "about.text2":
      "My journey in technology began with curiosity about how things work, and evolved into a passion for building digital experiences that make a difference. I am always seeking to learn new technologies and improve my skills.",
    "about.stat1": "Completed Projects",
    "about.stat2": "Years of Experience",
    "about.stat3": "Technologies",
    "experience.label": "Career",
    "experience.title": "Professional Experience",
    "experience.date": "2025 - Present",
    "experience.role": "IT Intern - Helpdesk & Datacenter",
    "experience.company": "Technical Support & Infrastructure",
    "experience.task1": "User technical ticket support and resolution",
    "experience.task2": "Remote and on-site hardware and software support",
    "experience.task3": "Server and critical systems monitoring",
    "experience.task4": "Preventive and corrective equipment maintenance",
    "experience.task5": "Workstation configuration and maintenance",
    "experience.task6": "Active Directory and user permissions management",
    "experience.task7": "Backup and data recovery management",
    "experience.task8": "Server migration and virtualization support",
    "experience.task9": "Technical procedures and solutions documentation",
    "projects.label": "Portfolio",
    "projects.title": "Featured Projects",
    "projects.viewProject": "View Project",
    "projects.project1.title": "Learning Platform",
    "projects.project1.desc":
      "Complete online course management system with interactive dashboard, progress tracking and certificates.",
    "projects.project2.title": "Gym Website",
    "projects.project2.desc":
      "Modern gym website with class scheduling system, personalized workout plans and student area.",
    "projects.project3.title": "Online Store",
    "projects.project3.desc": "Complete e-commerce with shopping cart, integrated payment system and admin panel.",
    "projects.project4.title": "Robotics Tournament Platform",
    "projects.project4.desc":
      "Robotics competition management system with live scoreboard, registrations and rankings.",
    "projects.project5.title": "Study Roadmap",
    "projects.project5.desc":
      "Application to create and track personalized learning paths with goals and visual progress.",
    "projects.project6.title": "Autonomous Arduino Robot",
    "projects.project6.desc":
      "Line follower robot with ultrasonic sensors and web interface for remote control via WiFi.",
    "skills.label": "Technologies",
    "skills.title": "Technical Skills",
    "skills.infrastructure": "Infrastructure",
    "skills.techSupport": "Technical Support",
    "skills.virtualization": "Virtualization",
    "skills.tools": "Tools",
    "contact.label": "Connect",
    "contact.title": "Get In Touch",
    "contact.subtitle": "Let's work together!",
    "contact.text":
      "I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.",
    "contact.form.name": "Name",
    "contact.form.message": "Message",
    "contact.form.send": "Send Message",
    "footer.copyright": "© 2025 Felipe Possa. All rights reserved.",
    "footer.built": "Built with passion and technology",
  },
  es: {
    "nav.about": "Sobre mí",
    "nav.experience": "Experiencia",
    "nav.projects": "Proyectos",
    "nav.skills": "Habilidades",
    "nav.contact": "Contacto",
    "hero.available": "Disponible para proyectos",
    "hero.greeting": "Hola, soy",
    "hero.title": "Desarrollador Full Stack & Estudiante de Ciencias de la Computación",
    "hero.description":
      "Transformando ideas en experiencias digitales innovadoras con código limpio y diseño futurista. Especializado en desarrollo web moderno y soluciones tecnológicas creativas.",
    "hero.viewProjects": "Ver Proyectos",
    "hero.contact": "Contáctame",
    "about.label": "Conóceme",
    "about.title": "Sobre Mí",
    "about.text1":
      "Soy estudiante de <strong>Ciencias de la Computación</strong> apasionado por la tecnología y la innovación. Con experiencia en desarrollo full stack, creo soluciones digitales que combinan funcionalidad excepcional con diseño moderno.",
    "about.text2":
      "Mi viaje en tecnología comenzó con curiosidad sobre cómo funcionan las cosas, y evolucionó hacia una pasión por construir experiencias digitales que marcan la diferencia. Siempre estoy buscando aprender nuevas tecnologías y mejorar mis habilidades.",
    "about.stat1": "Proyectos Completados",
    "about.stat2": "Años de Experiencia",
    "about.stat3": "Tecnologías",
    "experience.label": "Carrera",
    "experience.title": "Experiencia Profesional",
    "experience.date": "2025 - Presente",
    "experience.role": "Practicante de TI - Helpdesk & Datacenter",
    "experience.company": "Soporte Técnico & Infraestructura",
    "experience.task1": "Atención y resolución de tickets técnicos de usuarios",
    "experience.task2": "Soporte remoto y presencial para hardware y software",
    "experience.task3": "Monitoreo de servidores y sistemas críticos",
    "experience.task4": "Mantenimiento preventivo y correctivo de equipos",
    "experience.task5": "Configuración y mantenimiento de estaciones de trabajo",
    "experience.task6": "Gestión de Active Directory y permisos de usuarios",
    "experience.task7": "Gestión de backup y recuperación de datos",
    "experience.task8": "Soporte en migración de servidores y virtualización",
    "experience.task9": "Documentación de procedimientos y soluciones técnicas",
    "projects.label": "Portafolio",
    "projects.title": "Proyectos Destacados",
    "projects.viewProject": "Ver Proyecto",
    "projects.project1.title": "Plataforma de Aprendizaje",
    "projects.project1.desc":
      "Sistema completo de gestión de cursos online con dashboard interactivo, sistema de progreso y certificados.",
    "projects.project2.title": "Sitio de Gimnasio",
    "projects.project2.desc":
      "Sitio web moderno para gimnasio con sistema de reserva de clases, planes de entrenamiento personalizados y área de estudiante.",
    "projects.project3.title": "Tienda Virtual",
    "projects.project3.desc":
      "E-commerce completo con carrito de compras, sistema de pago integrado y panel administrativo.",
    "projects.project4.title": "Plataforma de Torneo de Robótica",
    "projects.project4.desc":
      "Sistema de gestión de competiciones de robótica con marcador en vivo, inscripciones y clasificaciones.",
    "projects.project5.title": "Hoja de Ruta de Estudios",
    "projects.project5.desc":
      "Aplicación para crear y seguir rutas de aprendizaje personalizadas con metas y progreso visual.",
    "projects.project6.title": "Robot Autónomo Arduino",
    "projects.project6.desc":
      "Robot seguidor de línea con sensores ultrasónicos e interfaz web para control remoto vía WiFi.",
    "skills.label": "Tecnologías",
    "skills.title": "Habilidades Técnicas",
    "skills.infrastructure": "Infraestructura",
    "skills.techSupport": "Soporte Técnico",
    "skills.virtualization": "Virtualización",
    "skills.tools": "Herramientas",
    "contact.label": "Conéctate",
    "contact.title": "Contáctame",
    "contact.subtitle": "¡Trabajemos juntos!",
    "contact.text":
      "Siempre estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tu visión.",
    "contact.form.name": "Nombre",
    "contact.form.message": "Mensaje",
    "contact.form.send": "Enviar Mensaje",
    "footer.copyright": "© 2025 Felipe Possa. Todos los derechos reservados.",
    "footer.built": "Desarrollado con pasión y tecnología",
  },
}

// Load saved language
let currentLang = localStorage.getItem("language") || "pt"

function setLanguage(lang) {
  currentLang = lang
  localStorage.setItem("language", lang)
  document.documentElement.lang = lang === "pt" ? "pt-BR" : lang === "en" ? "en-US" : "es-ES"

  // Update all translatable elements
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n")
    if (translations[lang] && translations[lang][key]) {
      element.innerHTML = translations[lang][key]
    }
  })

  // Update active language option
  document.querySelectorAll(".lang-option").forEach((option) => {
    option.classList.toggle("active", option.getAttribute("data-lang") === lang)
  })

  languageDropdown.classList.remove("active")
}

// Initialize with saved language
setLanguage(currentLang)

// Language dropdown toggle
languageBtn.addEventListener("click", (e) => {
  e.stopPropagation()
  languageDropdown.classList.toggle("active")
})

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
    languageDropdown.classList.remove("active")
  }
})

// Language selection
langOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const lang = option.getAttribute("data-lang")
    setLanguage(lang)
  })
})
