// skripta.js
const pitanjeElement = document.getElementById("pitanje");
const odgovoriDiv = document.getElementById("odgovori");
const rezultat = document.getElementById("rezultat");
const submitGumb = document.getElementById("submitGumb");
const sljedeceGumb = document.getElementById("sljedeceGumb");
const brojPitanjaElement = document.getElementById("brojPitanja");
const forma = document.getElementById("odgovoriForma");

let trenutnoPitanjeIndex = 0;
let bodovi = 0;
let pitanja = [];                   // bit će popunjeno iz JSON-a

// ---------------- UČITAVANJE PITANJA IZ JSON DATOTEKE ----------------
fetch("pitanja.json")
  .then(response => {
    if (!response.ok) throw new Error("Ne mogu učitati pitanja.json");
    return response.json();
  })
  .then(data => {
    pitanja = data;
    prikaziPitanje(trenutnoPitanjeIndex);
  })
  .catch(err => {
    console.error(err);
    pitanjeElement.textContent = "Došlo je do greške prilikom učitavanja kviza.";
    pitanjeElement.style.color = "red";
  });

// ---------------- PRIKAZ JEDNOG PITANJA ----------------
function prikaziPitanje(index) {
  if (pitanja.length === 0) return;           // još nisu učitana

  const pitanje = pitanja[index];

  forma.reset();
  pitanjeElement.textContent = pitanje.pitanje;
  odgovoriDiv.innerHTML = "";
  rezultat.textContent = "";
  submitGumb.disabled = false;
  sljedeceGumb.style.display = "none";

  brojPitanjaElement.textContent = `Pitanje ${index + 1} od ${pitanja.length}`;

  pitanje.odgovori.forEach((odgovor, i) => {
    const div = document.createElement("div");

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "odgovor";
    input.value = i;
    input.id = `odgovor${i}`;

    const label = document.createElement("label");
    label.htmlFor = `odgovor${i}`;
    label.textContent = odgovor.tekst;

    div.appendChild(input);
    div.appendChild(label);
    odgovoriDiv.appendChild(div);
  });
}

// ---------------- POTVRDA ODGOVORA ----------------
forma.addEventListener("submit", function (e) {
  e.preventDefault();

  const odabraniRadio = document.querySelector('input[name="odgovor"]:checked');
  if (!odabraniRadio) {
    rezultat.textContent = "Odaberite jedan odgovor!";
    rezultat.style.color = "orange";
    return;
  }

  const odabraniIndex = parseInt(odabraniRadio.value);
  const tocan = pitanja[trenutnoPitanjeIndex].odgovori[odabraniIndex].tocan;

  // Zaključaj odgovore
  submitGumb.disabled = true;
  document.querySelectorAll('input[name="odgovor"]').forEach(r => r.disabled = true);

  if (tocan) {
    bodovi++;
    rezultat.textContent = "Točno!";
    rezultat.style.color = "green";
  } else {
    rezultat.textContent = "Netočno!";
    rezultat.style.color = "red";
  }

  // Sljedeće ili kraj kviza
  if (trenutnoPitanjeIndex < pitanja.length - 1) {
    sljedeceGumb.style.display = "inline-block";
  } else {
    setTimeout(prikaziKraj, 1200);
  }
});

// ---------------- SLJEDEĆE PITANJE ----------------
sljedeceGumb.addEventListener("click", () => {
  trenutnoPitanjeIndex++;
  prikaziPitanje(trenutnoPitanjeIndex);
});

// ---------------- KRAJ KVIZA ----------------
function prikaziKraj() {
  pitanjeElement.textContent = "Kviz završen!";
  odgovoriDiv.innerHTML = "";
  brojPitanjaElement.textContent = "";
  submitGumb.style.display = "none";
  sljedeceGumb.style.display = "none";

  const postotak = Math.round((bodovi / pitanja.length) * 100);
  rezultat.innerHTML = `
    <strong>Čestitamo!</strong><br>
    Osvojili ste <strong>${bodovi} od ${pitanja.length}</strong> bodova (${postotak}%)
  `;
  rezultat.style.fontSize = "1.6em";
  rezultat.style.color = bodovi === pitanja.length ? "goldenrod" : "#333";
}