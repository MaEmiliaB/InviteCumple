function checkCode() {
  const codeInput = document.getElementById('accessCode').value.toLowerCase();
  const correctCode = "catacumple"; // código correcto también en minúsculas

  if (codeInput === correctCode) {
    document.getElementById('accessScreen').style.display = "none";
    document.getElementById('invitationCard').style.display = "flex";
    startCountdown(); // Inicia el contador al mostrar la tarjeta
  } else {
    document.getElementById('errorMessage').textContent = "Código incorrecto.";
  }
}

// Cuenta regresiva
function startCountdown() {
  const eventDate = new Date("2025-06-15T17:00:00").getTime(); // Cambiá la fecha/hora

  const countdownEl = document.getElementById("countdown");

  const timer = setInterval(function() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      clearInterval(timer);
      countdownEl.innerHTML = "¡BIENVENIDOS!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    countdownEl.innerHTML = `Faltan: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
}
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevenir la redirección del formulario

  const formData = new FormData(this);

  fetch(this.action, {
    method: 'POST',
    body: formData
  })
  .then(response => {
    if (response.ok) {
      // Mostrar mensaje de confirmación en la misma página
      document.getElementById('mensajeConfirmacion').style.display = 'block';
    } else {
      alert("Hubo un error al enviar el formulario. Intenta nuevamente.");
    }
  })
  .catch(error => {
    alert("Error de red. Intenta nuevamente.");
  });
});

const canvas = document.getElementById('confeti');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

// Inicializamos canvas con el tamaño actual
resizeCanvas();

const confettis = [];

const isMobile = window.innerWidth <= 768;
const cantidadConfeti = isMobile ? 50 : 150;

for (let i = 0; i < cantidadConfeti; i++) {
  confettis.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 10 + 5,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    tilt: Math.random() * 10 - 10,
    tiltAngle: 0,
    tiltAngleIncrement: Math.random() * 0.1 + 0.05
  });
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettis.forEach(c => {
    ctx.beginPath();
    ctx.lineWidth = c.r;
    ctx.strokeStyle = c.color;
    ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
    ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
    ctx.stroke();
  });

  updateConfetti();
  requestAnimationFrame(drawConfetti);
}

function updateConfetti() {
  confettis.forEach(c => {
    c.y += Math.cos(c.d) + 1 + c.r / 2;
    c.x += Math.sin(c.d);
    c.tiltAngle += c.tiltAngleIncrement;
    c.tilt = Math.sin(c.tiltAngle) * 15;

    if (c.y > canvas.height) {
      c.y = -20;
      c.x = Math.random() * canvas.width;
    }
  });
}

// Para que canvas se ajuste si cambias el tamaño de ventana
window.addEventListener('resize', () => {
  resizeCanvas();
});

drawConfetti();
