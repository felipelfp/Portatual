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

document.querySelectorAll(".fade-in-up, .fade-in-left, .fade-in-right").forEach((el) => {
  observer.observe(el)
})

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

const whatsappBtn = document.getElementById("whatsappBtn")

if (whatsappBtn) {
  whatsappBtn.addEventListener("click", (e) => {
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("message").value
    const phone = "5541991662971"

    const whatsappMessage = encodeURIComponent(`Olá Felipe, vi seu portfólio e gostaria de entrar em contato!
    
*Nome*: ${name}
*Email*: ${email}
*Mensagem*:
${message}`)

    e.currentTarget.href = `https://api.whatsapp.com/send?phone=${phone}&text=${whatsappMessage}`
  })
}

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroGrid = document.querySelector(".hero-grid")
  if (heroGrid) {
    heroGrid.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

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
  const gap = 32
  const offset = -(currentIndex * (cardWidth + gap) * CARDS_PER_VIEW)
  carouselTrack.style.transform = `translateX(${offset}px)`

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

prevBtn.addEventListener("click", () => {
  prevSlide()
  resetAutoplay()
})

nextBtn.addEventListener("click", () => {
  nextSlide()
  resetAutoplay()
})

carouselTrack.addEventListener("mouseenter", () => {
  clearInterval(autoplayInterval)
})

carouselTrack.addEventListener("mouseleave", () => {
  startAutoplay()
})

startAutoplay()

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

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide()
    resetAutoplay()
  } else if (e.key === "ArrowRight") {
    nextSlide()
    resetAutoplay()
  }
})

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
    "nav.languages": "Idiomas",
    "nav.contact": "Contato",
    "hero.available": "Disponível para projetos",
    "hero.greeting": "Olá, eu sou",
    "hero.title": "Desenvolvedor Full Stack & Estudante de Ciência da Computação",
    "hero.description":
      "Transformando ideias em experiências digitais inovadoras com código limpo e design futurista. Especializado em desenvolvimento web moderno e soluções tecnológicas criativas.",
    "hero.viewProjects": "Ver Projetos",
    "hero.downloadCV": "Baixar CV",
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
    "projects.project5.title": "Jornada Fullstack Developers",
    "projects.project5.desc":
      "Aplicação para criar e acompanhar trilhas de aprendizado personalizadas com metas e progresso visual.",
    "projects.project5_1.title": "Quiz",
    "projects.project5_1.desc":
      "Plataforma de quiz interativo para testar e aprimorar conhecimentos em linguagens de programação e lógica.",
    "projects.project5_2.title": "Lista de Compras Inteligente",
    "projects.project5_2.desc":
      "Aplicação para gerenciar listas de compras com sugestões de itens e acompanhamento de preços em tempo real.",
    "projects.project5_3.title": "Ponter - Sistema de Fidelidade",
    "projects.project5_3.desc":
      "Sistema de fidelidade e pontos para varejo, permitindo a gestão de clientes e recompensas. Acesso de teste: Usuário: admin@empresa.com, Senha: Admin123.",
    "projects.project5_4.title": "Guia de Viagem EUA",
    "projects.project5_4.desc":
      "Aplicação de planejamento e guia de viagem com informações detalhadas sobre destinos e atrações turísticas nos EUA.",
    "projects.project5_5.title": "Poupança e Planejamento",
    "projects.project5_5.desc":
      "Website moderno e responsivo para agência de viagens, focado em pacotes de turismo de aventura e ecoturismo.",
    "projects.project5_6.title": "Sistema de Agendamento",
    "projects.project5_6.desc":
      "Aplicação robusta para agendamento de serviços, com controle de disponibilidade, lembretes automáticos e gestão de clientes.",
    "projects.project6.title": "Robô Autônomo Arduino",
    "projects.project6.desc":
      "Robô seguidor de linha com sensores ultrassônicos e interface web para controle remoto via WiFi.",
    "skills.label": "Tecnologias",
    "skills.title": "Habilidades Técnicas",
    "skills.infrastructure": "Infraestrutura",
    "skills.techSupport": "Suporte Técnico",
    "skills.virtualization": "Virtualização",
    "skills.tools": "Ferramentas",
    "languages.label": "Comunicação",
    "languages.title": "Idiomas",
    "languages.portuguese": "Português",
    "languages.native": "Nativo",
    "languages.portuguese.desc": "Fluência completa em comunicação verbal e escrita",
    "languages.english": "Inglês",
    "languages.intermediate": "Intermediário",
    "languages.studying": "Cursando",
    "languages.english.desc": "Cursando na UNINTER - Leitura técnica e comunicação básica",
    "languages.uninter": "UNINTER",
    "languages.spanish": "Espanhol",
    "languages.basic": "Básico",
    "languages.spanish.desc": "Compreensão básica e leitura de documentación técnica",
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
    "nav.languages": "Languages",
    "nav.contact": "Contact",
    "hero.available": "Available for projects",
    "hero.greeting": "Hello, I'm",
    "hero.title": "Full Stack Developer & Computer Science Student",
    "hero.description":
      "Transforming ideas into innovative digital experiences with clean code and futuristic design. Specialized in modern web development and creative technology solutions.",
    "hero.viewProjects": "View Projects",
    "hero.downloadCV": "Download CV",
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
    "projects.project5_1.title": "Quiz",
    "projects.project5_1.desc":
      "Interactive quiz platform to test and improve knowledge in programming languages and logic.",
    "projects.project5_2.title": "Smart Shopping List",
    "projects.project5_2.desc":
      "Application to manage shopping lists with item suggestions and real-time price tracking.",
    "projects.project5_3.title": "Ponter - Loyalty System",
    "projects.project5_3.desc":
      "Loyalty and points system for retail, allowing client and rewards management. Test access: User: admin@empresa.com, Password: Admin123.",
    "projects.project5_4.title": "USA Travel Guide",
    "projects.project5_4.desc":
      "Travel planning and guide application with detailed information on destinations and tourist attractions in the USA.",
    "projects.project5_5.title": "Savings and Planning",
    "projects.project5_5.desc":
      "Modern and responsive website for a travel agency, focused on adventure tourism and ecotourism packages.",
    "projects.project5_6.title": "Scheduling System",
    "projects.project5_6.desc":
      "Robust application for scheduling services, with availability control, automatic reminders, and client management.",
    "projects.project6.title": "Autonomous Arduino Robot",
    "projects.project6.desc":
      "Line follower robot with ultrasonic sensors and web interface for remote control via WiFi.",
    "skills.label": "Technologies",
    "skills.title": "Technical Skills",
    "skills.infrastructure": "Infrastructure",
    "skills.techSupport": "Technical Support",
    "skills.virtualization": "Virtualization",
    "skills.tools": "Tools",
    "languages.label": "Communication",
    "languages.title": "Languages",
    "languages.portuguese": "Portuguese",
    "languages.native": "Native",
    "languages.portuguese.desc": "Complete fluency in verbal and written communication",
    "languages.english": "English",
    "languages.intermediate": "Intermediate",
    "languages.studying": "Studying",
    "languages.english.desc": "Studying at UNINTER - Technical reading and basic communication",
    "languages.uninter": "UNINTER",
    "languages.spanish": "Spanish",
    "languages.basic": "Basic",
    "languages.spanish.desc": "Basic understanding and reading of technical documentation",
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
    "nav.languages": "Idiomas",
    "nav.contact": "Contacto",
    "hero.available": "Disponible para proyectos",
    "hero.greeting": "Hola, soy",
    "hero.title": "Desarrollador Full Stack & Estudiante de Ciencias de la Computación",
    "hero.description":
      "Transformando ideas en experiencias digitales innovadoras con código limpio y diseño futurista. Especializado en desarrollo web moderno y soluciones tecnológicas creativas.",
    "hero.viewProjects": "Ver Proyectos",
    "hero.downloadCV": "Descargar CV",
    "hero.contact": "Contáctame",
    "about.label": "Conóceme",
    "about.title": "Sobre Mí",
    "about.text1":
      "Soy estudiante de <strong>Ciencias de la Computación</strong> apasionado por la tecnología y la innovación. Con experiencia en desarrollo full stack, creo soluciones digitales que combinan funcionalidad excepcional con diseño moderno.",
    "about.text2":
      "Mi viaje en tecnología comenzó con curiosidad sobre cómo funcionan las cosas, y evolucionó hacia una pasión por construir experiencias digitales que marcan la diferencia. Estoy buscando aprender nuevas tecnologías y mejorar mis habilidades.",
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
    "projects.project5_1.title": "Cuestionario",
    "projects.project5_1.desc":
      "Plataforma de cuestionario interactivo para probar y mejorar el conocimiento en lenguajes de programación y lógica.",
    "projects.project5_2.title": "Lista de Compras Inteligente",
    "projects.project5_2.desc":
      "Aplicación para gestionar listas de compras con sugerencias de artículos y seguimiento de precios en tiempo real.",
    "projects.project5_3.title": "Ponter - Sistema de Lealtad",
    "projects.project5_3.desc":
      "Sistema de lealtad y puntos para minoristas, permitiendo la gestión de clientes y recompensas. Acceso de prueba: Usuário: admin@empresa.com, Contraseña: Admin123.",
    "projects.project5_4.title": "Guía de Viaje a EE. UU.",
    "projects.project5_4.desc":
      "Aplicación de planificación y guía de viaje con información detallada sobre destinos y atracciones turísticas en los EE. UU.",
    "projects.project5_5.title": "Ahorro y Planificación",
    "projects.project5_5.desc":
      "Sitio web moderno y receptivo para una agencia de viajes, centrado en paquetes de turismo de aventura y ecoturismo.",
    "projects.project5_6.title": "Sistema de Agendamiento",
    "projects.project5_6.desc":
      "Aplicación robusta para agendar servicios, con control de disponibilidad, recordatorios automáticos y gestión de clientes.",
    "projects.project6.title": "Robot Autónomo Arduino",
    "projects.project6.desc":
      "Robot seguidor de línea con sensores ultrasónicos e interfaz web para control remoto vía WiFi.",
    "skills.label": "Tecnologías",
    "skills.title": "Habilidades Técnicas",
    "skills.infrastructure": "Infraestrutura",
    "skills.techSupport": "Soporte Técnico",
    "skills.virtualization": "Virtualización",
    "skills.tools": "Herramientas",
    "languages.label": "Comunicación",
    "languages.title": "Idiomas",
    "languages.portuguese": "Portugués",
    "languages.native": "Nativo",
    "languages.portuguese.desc": "Fluidez completa en comunicación verbal y escrita",
    "languages.english": "Inglés",
    "languages.intermediate": "Intermedio",
    "languages.studying": "Cursando",
    "languages.english.desc": "Cursando en UNINTER - Lectura técnica y comunicación básica",
    "languages.uninter": "UNINTER",
    "languages.spanish": "Español",
    "languages.basic": "Básico",
    "languages.spanish.desc": "Comprensión básica y lectura de documentación técnica",
    "contact.label": "Conéctate",
    "contact.title": "Contáctame",
    "contact.subtitle": "¡Trabajemos juntos!",
    "contact.text":
      "Estoy abierto a discutir nuevos proyectos, ideas creativas u oportunidades para ser parte de tu visión.",
    "contact.form.name": "Nombre",
    "contact.form.message": "Mensaje",
    "contact.form.send": "Enviar Mensaje",
    "footer.copyright": "© 2025 Felipe Possa. Todos los derechos reservados.",
    "footer.built": "Desarrollado con pasión y tecnología",
  },
}

languageBtn.addEventListener("click", () => {
  languageDropdown.classList.toggle("active")
})

langOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const lang = option.getAttribute("data-lang")
    document.documentElement.lang = lang
    updateText(lang)
    localStorage.setItem("selectedLanguage", lang)
    languageDropdown.classList.remove("active")
    langOptions.forEach((opt) => opt.classList.remove("active"))
    option.classList.add("active")
  })
})

function updateText(lang) {
  const elements = document.querySelectorAll("[data-i18n]")
  elements.forEach((element) => {
    const key = element.getAttribute("data-i18n")
    if (translations[lang] && translations[lang][key]) {
      element.innerHTML = translations[lang][key]
    }
  })
}

const savedLang = localStorage.getItem("selectedLanguage") || "pt"
document.documentElement.lang = savedLang
updateText(savedLang)

langOptions.forEach((option) => {
  if (option.getAttribute("data-lang") === savedLang) {
    option.classList.add("active")
  }
})

const languageProgressBars = document.querySelectorAll(".language-progress-bar")
const languageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width
        entry.target.style.width = "0"
        setTimeout(() => {
          entry.target.style.width = width
        }, 100)
        languageObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

languageProgressBars.forEach((bar) => {
  languageObserver.observe(bar)
})
