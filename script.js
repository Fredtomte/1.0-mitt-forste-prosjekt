const TEST_MODUS = true; // true = øving, false = reell bruk
const varsleLyd = new Audio("ding.mp3");
let arbeidTid = TEST_MODUS ? 1 * 60 : 25 * 60;
let pauseTid  = TEST_MODUS ? 10      : 5 * 60;

let tidIgjen = arbeidTid;
let interval = null;
let modus = "arbeid";

const timerElement = document.getElementById("timer");
const modusElement = document.getElementById("modus");

function oppdaterVisning() {
  const minutter = Math.floor(tidIgjen / 60);
  const sekunder = tidIgjen % 60;

  timerElement.textContent =
    String(minutter).padStart(2, "0") +
    ":" +
    String(sekunder).padStart(2, "0");

  modusElement.textContent = modus === "arbeid" ? "Arbeid" : "Pause";

  document.body.className = modus;
}

function byttModus() {
  modus = modus === "arbeid" ? "pause" : "arbeid";
  tidIgjen = modus === "arbeid" ? arbeidTid : pauseTid;

  // 🔔 Spill lyd når modus byttes
  varsleLyd.currentTime = 0;
  varsleLyd.play();

  oppdaterVisning();
}
function startPomodoro() {
  if (interval !== null) return;

  interval = setInterval(() => {
    if (tidIgjen <= 0) {
      byttModus();
    } else {
      tidIgjen--;
    }
    oppdaterVisning();
  }, 1000);
}

function pausePomodoro() {
  clearInterval(interval);
  interval = null;
}

function reset() {
  pausePomodoro();
  modus = "arbeid";
  tidIgjen = arbeidTid;
  oppdaterVisning();
}

oppdaterVisning();
``