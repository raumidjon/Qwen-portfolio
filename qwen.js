// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden')
  }, 800)
})

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles')
for (let i = 0; i < 40; i++) {
  const particle = document.createElement('div')
  particle.classList.add('particle')
  particle.style.left = Math.random() * 100 + '%'
  particle.style.width = particle.style.height = Math.random() * 3 + 1 + 'px'
  particle.style.animationDuration = Math.random() * 15 + 10 + 's'
  particle.style.animationDelay = Math.random() * 10 + 's'
  particlesContainer.appendChild(particle)
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
})

// ===== MOBILE MENU =====
const menuToggle = document.getElementById('menuToggle')
const navLinks = document.getElementById('navLinks')

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active')
  navLinks.classList.toggle('open')
})

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active')
    navLinks.classList.remove('open')
  })
})

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]')
window.addEventListener('scroll', () => {
  let current = ''
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 200
    if (scrollY >= sectionTop) {
      current = section.getAttribute('id')
    }
  })
  navLinks.querySelectorAll('a').forEach((link) => {
    link.classList.remove('active')
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active')
    }
  })
})

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible')
      }, index * 100)
    }
  })
}, observerOptions)

document.querySelectorAll('.service-card, .project-card').forEach((card) => {
  observer.observe(card)
})

// ===== COUNTER ANIMATION =====
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.number')
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-target'))
          let current = 0
          const increment = target / 60
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              counter.textContent = target + '+'
              clearInterval(timer)
            } else {
              counter.textContent = Math.floor(current)
            }
          }, 30)
        })
        counterObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 }
)

const statsRow = document.querySelector('.stats-row')
if (statsRow) counterObserver.observe(statsRow)

// ===== FORM SUBMIT =====
function handleSubmit(e) {
  e.preventDefault()
  const btn = e.target.querySelector('.submit-btn')
  btn.innerHTML = '<i class="fas fa-check"></i> Yuborildi!'
  btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)'
  setTimeout(() => {
    btn.innerHTML = 'Yuborish <i class="fas fa-paper-plane"></i>'
    btn.style.background = ''
    e.target.reset()
  }, 2000)
}

// ===== SMOOTH SCROLL FOR ALL ANCHORS =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute('href'))
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})

// ===== TILT EFFECT ON CARDS =====
document.querySelectorAll('.service-card, .project-card').forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`
  })

  card.addEventListener('mouseleave', () => {
    card.style.transform = ''
  })
})

const TOKEN = '8659638964:AAFrYgD6-_nzito-KD8RLkWrRC2CL6D2AHs'
const CHAT_ID = '7293175355–'

const form = document.getElementById('contactForm')

form.addEventListener('submit', function (e) {
  e.preventDefault()

  const name = document.getElementById('name').value
  const email = document.getElementById('email').value
  const subject = document.getElementById('subject').value
  const messageText = document.getElementById('message').value

  const text = `
📩 Yangi hamkorlik so'rovi

👤 Ism: ${name}
📧 Email: ${email}
📌 Mavzu: ${subject}
📝 Xabar: ${messageText}
`

  fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text,
    }),
  })
    .then(() => {
      alert('Xabar yuborildi ✅')
      form.reset()
    })
    .catch(() => {
      alert('Xatolik bo‘ldi ❌')
    })
})
