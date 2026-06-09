let invitadoActual = "";

const invitados = {
  "aluheq":"Aluhé",
  "renatag":"Renata",
  "martind":"Martín",
  "julietar":"Juli",
  "matteom":"Matteo", 
  "bastianm":"Basti",
  "romanellar":"Roma",
  "valentinoc":"Vale",
  "indiac":"India", 
  "mateop":"Mateo",
  "aitanao":"Aitana",
  "hannaf":"Hanna",
  "arunaf":"Aruna",
  "marthinam":"Marti",
  "brianas":"Briana",
  "emmac":"Emma",

  "emiliaf":"Emi",
  "catalinag":"Cata",
  "mateop":"Mateo",
  "benicios":"Beni",

  "catarinap": "Catarina",
  "lucap": "Luca",
  "primos": "Vale, Tutti y Roma",
  "irupeb":"Irupé",
  "orlandop":"Papá",
  "abuela":"Abu",
  "abuelon":"Abuelo Nestor",
  "abueloc":"Abuelo Carlos",
  "norapony":"Tios abuelos",
  "gabrielad":"Gaby",
  "marial":"Abuela Mari",
  "thianluis":"Thian y Luis",
};

function checkCode() {

  const codeInput = document
    .getElementById('accessCode')
    .value
    .toLowerCase()
    .trim();

  const nombre = invitados[codeInput];
  invitadoActual = nombre;

  if (nombre) {

    document.getElementById('errorMessage').textContent = "";

    document.getElementById('accessScreen').style.display = "none";

    const card = document.getElementById('invitationCard');

    card.style.display = "flex";

    setTimeout(() => {
      card.style.opacity = "1";
    }, 100);

    document.getElementById("welcomeMessage")
      .textContent = `¡Aloha ${nombre}! 🌺`;

    startCountdown();

    setTimeout(() => {
      document.getElementById("confeti").style.display = "none";
    }, 3000);

  } else {

    document.getElementById('errorMessage')
      .textContent = "Nombre secreto incorrecto 💔";
  }
}

// Cuenta regresiva
function startCountdown() {
  const eventDate = new Date("2026-06-20T16:00:00").getTime(); // Cambiá la fecha/hora

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

const card = document.getElementById("invitationCard");
card.style.opacity = "1";

document.getElementById("confirmForm")
  .addEventListener("submit", async function(e){

    e.preventDefault();

    const asistencia =
      document.getElementById("asistencia").value;

    try {

      await fetch(
        "https://script.google.com/macros/s/AKfycbxGkW6YTaEm1kKedn_GhpkUXUTkdVsr5Y_2fuklYybMGZWwDNyPrtffZ2-BE9W0czZHgw/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify({
            nombre: invitadoActual,
            asistencia: asistencia
          })
        }
      );

      document.getElementById("confirmForm").style.display = "none";

      document.getElementById("mensajeConfirmacion")
        .style.display = "block";

    } catch(error) {

      alert("No se pudo registrar la confirmación.");
      console.error(error);

    }
});