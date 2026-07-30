function berechneEntfernung() {
  if (!navigator.geolocation) {
    document.getElementById("entfernung").innerHTML =
      "Dein Browser kann keine Location abfragen.";
    return;
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    const meineBreite = position.coords.latitude;
    const meineLaenge = position.coords.longitude;

    const muensterBreite = 51.9743;
    const muensterLaenge = 7.6237;

    const entfernung = entfernungBerechnen(
      meineBreite,
      meineLaenge,
      muensterBreite,
      muensterLaenge
    );

    document.getElementById("entfernung").innerHTML =
      "uns trennen ganze " + entfernung.toFixed(1) + " km";
      document.getElementById("heulEmoji").classList.add("aktiv");
  });
}

document.addEventListener("DOMContentLoaded", function() {
  const montagsHinweis = document.getElementById("montagsHinweis");

  if (!montagsHinweis) {
    return;
  }

  const heute = new Date();
  const istMontag = heute.getDay() === 1;

  if (istMontag) {
    montagsHinweis.classList.add("sichtbar");
  }
});

function entfernungBerechnen(lat1, lon1, lat2, lon2) {
  const erdradius = 6371;

  const dLat = gradZuRad(lat2 - lat1);
  const dLon = gradZuRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(gradZuRad(lat1)) *
    Math.cos(gradZuRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return erdradius * c;
}

function gradZuRad(grad) {
  return grad * (Math.PI / 180);
}
