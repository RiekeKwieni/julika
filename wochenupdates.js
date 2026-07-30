const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwVWacGrH0GO15swfij9zG5ik_dX8w8H-8AuwZfnEmKsQFvVDTXlEocapnucCN91C7H/exec";

window.zeigeUpdates = function(updates) {
  window.wochenupdatesGeladen = true;
  const status = document.getElementById("updatesStatus");
  const liste = document.getElementById("updatesListe");

  liste.innerHTML = "";

  if (!updates || updates.length === 0) {
    status.textContent = "Noch keine Wochenupdates da.";
    return;
  }

  status.textContent = "";

  const neueUpdates = updates.filter(function(update) {
    return update.istNeu !== false;
  });

  const alteUpdates = updates.filter(function(update) {
    return update.istNeu === false;
  });

  if (neueUpdates.length > 0) {
    fuegeUpdateGruppeHinzu(liste, "Neue Wochenupdates", neueUpdates, true);
  }

  if (alteUpdates.length > 0) {
    fuegeUpdateGruppeHinzu(liste, "Alte Wochenupdates", alteUpdates, false);
  }
};

function fuegeUpdateGruppeHinzu(liste, titelText, updates, istNeuGruppe) {
  const gruppe = document.createElement("section");
  gruppe.className = "update-group";

  if (istNeuGruppe) {
    gruppe.classList.add("update-group-new");
  }

  const titel = document.createElement("h2");
  titel.className = "update-group-title";
  titel.textContent = titelText;
  gruppe.appendChild(titel);

  const board = document.createElement("div");
  board.className = "update-board";

  updates.forEach(function(update) {
    board.appendChild(erstelleUpdateKarte(update, istNeuGruppe));
  });

  gruppe.appendChild(board);
  liste.appendChild(gruppe);
}

function erstelleUpdateKarte(update, istNeuGruppe) {
  const karte = document.createElement("article");
  karte.className = "update-card";

  const kopf = document.createElement("div");
  kopf.className = "update-card-head";

  const name = document.createElement("h2");
  name.textContent = update.name || "Anonym";
  kopf.appendChild(name);

  if (istNeuGruppe) {
    const badge = document.createElement("span");
    badge.className = "update-badge";
    badge.textContent = "NEU";
    kopf.appendChild(badge);
  }

  karte.appendChild(kopf);

  const datumText = update.datum || update.zeit || update.zeitstempel;
  if (datumText) {
    const datum = document.createElement("p");
    datum.className = "update-date";
    datum.textContent = datumText;
    karte.appendChild(datum);
  }

  fuegeAbschnittHinzu(karte, "Highlight", update.highlight);
  fuegeAbschnittHinzu(karte, "Lowlight", update.lowlight);

  if (update.gruss) {
    fuegeAbschnittHinzu(karte, "Notiz", update.gruss);
  }

  return karte;
}

function fuegeAbschnittHinzu(karte, labelText, inhaltText) {
  const label = document.createElement("p");
  label.className = "update-label";
  label.textContent = labelText;
  karte.appendChild(label);

  const inhalt = document.createElement("p");
  inhalt.textContent = inhaltText || "-";
  karte.appendChild(inhalt);
}

document.addEventListener("DOMContentLoaded", function() {
  const status = document.getElementById("updatesStatus");


  const script = document.createElement("script");
  script.src = APPS_SCRIPT_URL + "?callback=zeigeUpdates&t=" + Date.now();
  script.onerror = function() {
    status.textContent = "Updates konnten nicht geladen werden.";
  };

  document.body.appendChild(script);

  setTimeout(function() {
    if (!window.wochenupdatesGeladen) {
      status.textContent = "Google hat gerade keine gueltige Antwort geschickt.";
    }
  }, 5000);
});
