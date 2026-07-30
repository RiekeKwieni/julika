document.addEventListener("DOMContentLoaded", function() {
  ladeErinnerungDesTages();
  aktiviereErinnerungsButton();
  planeNaechsteMitternacht();
});

function ladeErinnerungDesTages() {
  const memoryText = document.getElementById("memoryOfTheDay");
  const memoryDate = document.getElementById("memoryDate");
  const erinnerungen = holeErinnerungen();

  if (erinnerungen.length === 0) {
    memoryText.textContent = "In erinnerungen.js steht noch nichts drin.";
    memoryDate.textContent = "";
    return;
  }

  const heute = new Date();
  const datumKey = [
    heute.getFullYear(),
    heute.getMonth() + 1,
    heute.getDate()
  ].join("-");

  const index = zufallsIndexFuerHeute(datumKey, erinnerungen.length);

  memoryText.textContent = erinnerungen[index];
  memoryDate.textContent = "";
}

function holeErinnerungen() {
  if (!window.erinnerungenText) {
    return [];
  }

  return window.erinnerungenText
    .split(/\r?\n/)
    .map(function(zeile) {
      return zeile.trim();
    })
    .filter(function(zeile) {
      return zeile.length > 0 && !zeile.startsWith("#");
    });
}

function aktiviereErinnerungsButton() {
  const openButton = document.getElementById("openMemoryButton");
  const closeButton = document.getElementById("closeMemoryButton");
  const overlay = document.getElementById("memoryOverlay");
  const memoryBox = overlay ? overlay.querySelector(".memory-box") : null;

  if (!openButton || !closeButton || !overlay || !memoryBox) {
    return;
  }

  openButton.addEventListener("click", function() {
    overlay.classList.add("sichtbar");
    overlay.setAttribute("aria-hidden", "false");

    memoryBox.classList.remove("drop-in");
    void memoryBox.offsetWidth;
    memoryBox.classList.add("drop-in");

    starteKonfetti();
  });

  closeButton.addEventListener("click", function() {
    schliesseErinnerung();
  });

  overlay.addEventListener("click", function(event) {
    if (event.target === overlay) {
      schliesseErinnerung();
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      schliesseErinnerung();
    }
  });
}

function schliesseErinnerung() {
  const overlay = document.getElementById("memoryOverlay");

  if (!overlay) {
    return;
  }

  overlay.classList.remove("sichtbar");
  overlay.setAttribute("aria-hidden", "true");
}

function starteKonfetti() {
  const confettiLayer = document.getElementById("confettiLayer");
  const farben = ["#ff0000", "#ffff00", "#00ff99", "#0000ff", "#f82ff1", "#ffffff"];

  if (!confettiLayer) {
    return;
  }

  confettiLayer.innerHTML = "";

  for (let i = 0; i < 80; i++) {
    const stueck = document.createElement("span");
    const farbe = farben[i % farben.length];

    stueck.className = "confetti-piece";
    stueck.style.left = Math.random() * 100 + "%";
    stueck.style.backgroundColor = farbe;
    stueck.style.animationDelay = Math.random() * 0.9 + "s";
    stueck.style.animationDuration = 2.4 + Math.random() * 1.8 + "s";
    stueck.style.setProperty("--drehung", Math.random() * 720 + "deg");
    stueck.style.setProperty("--drift", (Math.random() * 180 - 90) + "px");

    confettiLayer.appendChild(stueck);
  }

  setTimeout(function() {
    confettiLayer.innerHTML = "";
  }, 5000);
}

function planeNaechsteMitternacht() {
  const jetzt = new Date();
  const mitternacht = new Date(jetzt);

  mitternacht.setDate(mitternacht.getDate() + 1);
  mitternacht.setHours(0, 0, 0, 0);

  const millisekundenBisMitternacht = mitternacht.getTime() - jetzt.getTime();

  setTimeout(function() {
    ladeErinnerungDesTages();
    planeNaechsteMitternachtNachKurzerPause();
  }, millisekundenBisMitternacht);
}

function planeNaechsteMitternachtNachKurzerPause() {
  setTimeout(function() {
    planeNaechsteMitternacht();
  }, 1000);
}

function zufallsIndexFuerHeute(datumKey, anzahl) {
  let hash = 0;

  for (let i = 0; i < datumKey.length; i++) {
    hash = (hash * 31 + datumKey.charCodeAt(i)) % 100000;
  }

  return hash % anzahl;
}
