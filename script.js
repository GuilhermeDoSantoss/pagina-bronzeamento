// Configurações do WhatsApp
const WHATSAPP_NUMBER = "5521996093885" 
const BUSINESS_ADDRESS = "Campo Grande, Rio de Janeiro - RJ"

// Animação de preloader
document.addEventListener("DOMContentLoaded", () => {
  // Animação do texto letra por letra
  const textElements = document.querySelectorAll(".loading-text span")
  textElements.forEach((span, index) => {
    setTimeout(() => {
      span.style.opacity = "1"
      span.style.transform = "translateY(0)"
      span.style.transition = "opacity 0.3s ease, transform 0.3s ease"
    }, 100 * index)
  })

  // Simulação de progresso de carregamento
  const progressBar = document.querySelector(".loading-progress")
  const loadingMessages = [
    "Carregando fitas...",
    "Preparando produtos...",
    "Ajustando marquinhas...",
    "Quase pronto...",
    "Finalizando...",
  ]
  const loadingMessageElement = document.querySelector(".loading-message")

  let progress = 0
  const progressInterval = setInterval(() => {
    progress += Math.random() * 10
    if (progress >= 100) {
      progress = 100
      clearInterval(progressInterval)

      // Após completar o progresso, aguarda um pouco e remove o preloader
      setTimeout(() => {
        const preloader = document.getElementById("preloader")
        preloader.classList.add("hidden")

        // Inicia as animações do conteúdo principal
        startMainContentAnimations()
      }, 500)
    }

    // Atualiza a barra de progresso
    progressBar.style.width = `${progress}%`

    // Atualiza a mensagem de carregamento
    if (progress < 20) {
      loadingMessageElement.textContent = loadingMessages[0]
    } else if (progress < 40) {
      loadingMessageElement.textContent = loadingMessages[1]
    } else if (progress < 60) {
      loadingMessageElement.textContent = loadingMessages[2]
    } else if (progress < 80) {
      loadingMessageElement.textContent = loadingMessages[3]
    } else {
      loadingMessageElement.textContent = loadingMessages[4]
    }
  }, 200)

  // Adiciona partículas flutuantes ao preloader
  createFloatingParticles()
})

// Função para criar partículas flutuantes
function createFloatingParticles() {
  const preloader = document.querySelector(".preloader")
  const particleCount = 20

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "floating-particle"

    // Estilo das partículas
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 10 + 5}px;
      height: ${Math.random() * 10 + 5}px;
      background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      pointer-events: none;
      animation: float ${Math.random() * 10 + 10}s linear infinite;
    `

    // Animação de flutuação
    const keyframes = `
      @keyframes float {
        0% {
          transform: translate(0, 0) rotate(0deg);
          opacity: ${Math.random() * 0.5 + 0.5};
        }
        25% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
          opacity: ${Math.random() * 0.5 + 0.5};
        }
        50% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
          opacity: ${Math.random() * 0.5 + 0.5};
        }
        75% {
          transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
          opacity: ${Math.random() * 0.5 + 0.5};
        }
        100% {
          transform: translate(0, 0) rotate(0deg);
          opacity: ${Math.random() * 0.5 + 0.5};
        }
      }
    `

    // Adiciona os keyframes ao head
    const style = document.createElement("style")
    style.innerHTML = keyframes
    document.head.appendChild(style)

    preloader.appendChild(particle)
  }
}

// Função para iniciar as animações do conteúdo principal
function startMainContentAnimations() {
  // Remove loading overlay após carregamento
  setTimeout(() => {
    const loadingOverlay = document.getElementById("loading-overlay")
    loadingOverlay.classList.add("hidden")
  }, 500)

  // Animações de entrada com delay
  const elementsToAnimate = document.querySelectorAll(".slide-up")

  elementsToAnimate.forEach((element) => {
    const delay = element.getAttribute("data-delay") || 0

    setTimeout(() => {
      element.style.animationDelay = "0s"
      element.style.animation = "slideUp 0.8s ease forwards"
    }, Number.parseInt(delay))
  })

  // Configurar data mínima para hoje
  const dateInput = document.getElementById("date")
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0]
    dateInput.min = today
  }

  // Modal de agendamento
  const modal = document.getElementById("schedule-modal")
  const scheduleBtn = document.getElementById("schedule-btn")
  const closeBtn = document.querySelector(".close")
  const scheduleForm = document.getElementById("schedule-form")

  // Abrir modal
  scheduleBtn.addEventListener("click", (e) => {
    e.preventDefault()
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
  })

  // Fechar modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none"
    document.body.style.overflow = "auto"
  })

  // Fechar modal clicando fora
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })

  // Função para gerar mensagem do WhatsApp
  function generateWhatsAppMessage(formData) {
    const name = formData.get("name")
    const phone = formData.get("phone")
    const service = formData.get("service")
    const date = formData.get("date")
    const time = formData.get("time")
    const description = formData.get("description")

    // Converter data para formato brasileiro
    const dateObj = new Date(date + "T00:00:00")
    const formattedDate = dateObj.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Mapear serviços
    const serviceNames = {
      delicada: "Bronzeamento Delicada",
      neon: "Bronzeamento Neon",
      retoque: "Retoque",
    }

    const message = `*AGENDAMENTO DO BRONZEAMENTO*

Olá! Tudo bem!? Gostaria de agendar um horário.

*DADOS PESSOAIS:*
• Nome: ${name}
• WhatsApp: ${phone}

*SERVIÇO DESEJADO:*
• Tipo: ${serviceNames[service] || service}

*DATA E HORÁRIO:*
• Data: ${formattedDate}
• Horário: ${time}

*DESCRIÇÃO:*
${description || "Não informado"}

---
Aguardo confirmação!! `

    return encodeURIComponent(message)
  }

  // Envio do formulário
  scheduleForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = new FormData(scheduleForm)
    const message = generateWhatsAppMessage(formData)
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

    // Abrir WhatsApp
    window.open(whatsappUrl, "_blank")

    // Fechar modal
    modal.style.display = "none"
    document.body.style.overflow = "auto"

    // Resetar formulário
    scheduleForm.reset()

    // Feedback visual
    showNotification("Redirecionando para o WhatsApp...", "success")
  })

  // Botão WhatsApp direto
  const whatsappBtn = document.getElementById("whatsapp-btn")
  const footerWhatsapp = document.getElementById("footer-whatsapp")

  function openWhatsAppDirect() {
    const message = encodeURIComponent(`Olá! Tudo bem!? Gostaria de saber mais sobre os serviços sobre bronzeamento artificial.

Poderia me ajudar?`)

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  whatsappBtn.addEventListener("click", (e) => {
    e.preventDefault()
    openWhatsAppDirect()
  })

  footerWhatsapp.addEventListener("click", (e) => {
    e.preventDefault()
    openWhatsAppDirect()
  })

  // Botão Google Maps
  const mapsBtn = document.getElementById("maps-btn")
  mapsBtn.addEventListener("click", () => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_ADDRESS)}`
    window.open(mapsUrl, "_blank")
  })

  // Efeito de hover aprimorado nos botões
  const buttons = document.querySelectorAll(".action-button")

  buttons.forEach((button) => {
    // Efeito de ripple ao clicar
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })

    // Efeito de hover para dispositivos móveis
    button.addEventListener("touchstart", function () {
      this.style.transform = "translateY(-2px) scale(1.02)"
      this.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)"
    })

    button.addEventListener("touchend", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)"
    })
  })

  // Animação da foto de perfil
  const profilePhoto = document.querySelector(".profile-photo")
  let isAnimating = false

  profilePhoto.addEventListener("click", function () {
    if (!isAnimating) {
      isAnimating = true
      this.style.animation = "pulse 0.6s ease"

      setTimeout(() => {
        this.style.animation = ""
        isAnimating = false
      }, 600)
    }
  })

  // Parallax suave no scroll (apenas para desktop)
  if (window.innerWidth > 768) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(".profile-photo, h1, .description")

      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + index * 0.1
        element.style.transform = `translateY(${scrolled * speed}px)`
      })
    })
  }

  // Função para mostrar notificações
  function showNotification(message, type = "info") {
    const notification = document.createElement("div")
    notification.className = `notification ${type}`
    notification.textContent = message

    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "#22c55e" : "#3b82f6"};
      color: white;
      padding: 15px 20px;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      z-index: 10001;
      animation: slideInRight 0.3s ease;
    `

    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = "slideOutRight 0.3s ease"
      setTimeout(() => {
        document.body.removeChild(notification)
      }, 300)
    }, 3000)
  }

  // Função para detectar cliques nos botões e adicionar feedback visual
  function trackButtonClick(buttonName, element) {
    console.log(`Botão "${buttonName}" foi clicado`)

    // Feedback visual adicional
    element.style.transform = "scale(0.95)"
    setTimeout(() => {
      element.style.transform = ""
    }, 150)
  }

  // Event listeners para os botões
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const buttonText = this.querySelector("span").textContent
      trackButtonClick(buttonText, this)
    })
  })

  // Animação de entrada suave para elementos quando entram na viewport
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observar elementos para animação de entrada
  const elementsToObserve = document.querySelectorAll(".action-button, .footer-logo, .location-section")
  elementsToObserve.forEach((el) => observer.observe(el))

  // Efeito de digitação no título (opcional)
  const title = document.querySelector("h1")
  const originalText = title.textContent

  function typeWriter(text, element, speed = 100) {
    element.textContent = ""
    let i = 0

    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i)
        i++
        setTimeout(type, speed)
      }
    }

    type()
  }

  // Ativar efeito de digitação após delay
  setTimeout(() => {
    typeWriter(originalText, title, 80)
  }, 1200)

  // Adicionar classe CSS para efeito ripple e notificações
  const style = document.createElement("style")
  style.textContent = `
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
    
    .floating-particle {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
    }
  `
  document.head.appendChild(style)

  // Smooth scroll para links internos
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

  // Máscara para telefone
  const phoneInput = document.getElementById("phone")
  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      let value = e.target.value.replace(/\D/g, "")
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2")
      value = value.replace(/(\d)(\d{4})$/, "$1-$2")
      e.target.value = value
    })
  }
}

// Função para ajustar animações baseado no tamanho da tela
function adjustAnimationsForScreen() {
  const isMobile = window.innerWidth <= 480
  const isTablet = window.innerWidth > 480 && window.innerWidth <= 768

  if (isMobile) {
    // Reduzir duração das animações em mobile
    document.documentElement.style.setProperty("--animation-duration", "0.5s")
  } else if (isTablet) {
    document.documentElement.style.setProperty("--animation-duration", "0.6s")
  } else {
    document.documentElement.style.setProperty("--animation-duration", "0.8s")
  }
}

// Ajustar animações no carregamento e redimensionamento
window.addEventListener("load", adjustAnimationsForScreen)
window.addEventListener("resize", adjustAnimationsForScreen)

function abrirNoGoogleMaps() {
      const local = 'Campo Grande, Rio de Janeiro';
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local)}`;
      window.open(url, '_blank');
    }
