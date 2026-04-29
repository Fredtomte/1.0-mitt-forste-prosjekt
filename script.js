let tidIgjen = 0;
let startTid = 0;
let interval = null;

const timerElement = document.getElementById("timer");
const minutterInput = document.getElementById("minutter");

function oppdaterVisning() {
  const minutter = Math.floor(tidIgjen / 60);
  const sekunder = tidIgjen % 60;

  timerElement.textContent =
    String(minutter).padStart(2, "0") +
    ":" +
    String(sekunder).padStart(2, "0");

  if (tidIgjen <= 10) {
    timerElement.style.color = "red";
  } else {
    timerElement.style.color = "black";
  }
}

function startNedtelling() {
  if (interval !== null) return;

  if (tidIgjen === 0) {
    startTid = Number(minutterInput.value) * 60;
    tidIgjen = startTid;
    oppdaterVisning();
  }

  interval = setInterval(() => {
    if (tidIgjen <= 0) {
      clearInterval(interval);
      interval = null;
      timerElement.textContent = "Tiden er ute!";
      return;
    }

    tidIgjen--;
    oppdaterVisning();
  }, 1000);
}

function pauseNedtelling() {
  clearInterval(interval);
  interval = null;
}

function resetNedtelling() {
  pauseNedtelling();
  tidIgjen = startTid;
  oppdaterVisning();
}
