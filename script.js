// ===================================================
// Abschnitt: Variablendeklaration und Initialisierung
// ===================================================

let titles = []; // Array für Titel initialisieren
let contents = []; // Array für Inhalte initialisieren
let tempDeleteTitles = []; // Array für Titel im Papierkorb initialisieren
let tempDeleteContents = []; // Array für Inhalte im Papierkorb initialisieren
load(); // Lade gespeicherte Daten aus dem lokalen Speicher
loadDel(); // Lade gelöschte Notizen aus dem lokalen Speicher

// ===========================================
// Abschnitt: Funktionen zur Datenverarbeitung
// ===========================================

// Funktion zum Laden der Notizen aus dem lokalen Speicher
function load() {
  let titlesAsText = localStorage.getItem("titles"); // JSON-String für 'titles' aus lokalem Speicher holen
  let contentsAsText = localStorage.getItem("contents"); // JSON-String für 'contents' aus lokalem Speicher holen
  if (titlesAsText && contentsAsText) {
    // Überprüfen, ob Daten im lokalen Speicher vorhanden sind
    titles = JSON.parse(titlesAsText); // JSON-String zurück in Array umwandeln
    contents = JSON.parse(contentsAsText); // JSON-String zurück in Array umwandeln
  }
}


// Funktion zum Laden der gelöschten Notizen aus dem lokalen Speicher
function loadDel() {
  let tempTitlesAsText = localStorage.getItem("tempDeleteTitles"); // JSON-String für 'tempDeleteTitles' aus dem lokalen Speicher holen
  let tempContentsAsText = localStorage.getItem("tempDeleteContents"); // JSON-String für 'tempDeleteContents' aus dem lokalen Speicher holen
  if (tempTitlesAsText && tempContentsAsText) {
    // Überprüfen, ob Daten im lokalen Speicher vorhanden sind
    tempDeleteTitles = JSON.parse(tempTitlesAsText); // JSON-String zurück in Array umwandeln
    tempDeleteContents = JSON.parse(tempContentsAsText); // JSON-String zurück in Array umwandeln
  }
}


// Funktion zum Speichern der Notizen im lokalen Speicher
function save() {
  let titlesAsText = JSON.stringify(titles); // Array 'titles' in JSON-String umwandeln
  let contentsAsText = JSON.stringify(contents); // Array 'contents' in JSON-String umwandeln
  localStorage.setItem("titles", titlesAsText); // JSON-String im lokalen Speicher speichern
  localStorage.setItem("contents", contentsAsText); // JSON-String im lokalen Speicher speichern
}


// Funktion zum speichern der gelöschten Notizen im lokalen Speicher
function saveDel() {
  let titlesAsText = JSON.stringify(tempDeleteTitles); // Array 'tempDeleteTitles' in JSON-String umwandeln
  let contentsAsText = JSON.stringify(tempDeleteContents); // Array 'tempDeleteContents' in JSON-String umwandeln
  localStorage.setItem("tempDeleteTitles", titlesAsText); // JSON-String im lokalen Speicher speichern
  localStorage.setItem("tempDeleteContents", contentsAsText); // JSON-String im lokalen Speicher speichern
}


// Funktion zur Generierung des HTML-Codes für eine einzelne Notiz
function generateNoteHTML(noteTitle, noteContent, index) {
  return `
      <div class="note">
          <b class="note-title">${noteTitle}</b><br>
          <span class="note-content">${noteContent}</span>
          <button class="button" onclick="deleteNoteTemp(${index})">x</button>
      </div>
  `;
}

// Funktion zur Anzeige der Notizen im Container
function displayNotes() {
  let notesContainer = document.getElementById("notesContainer"); // Element mit der ID 'notesContainer' holen
  notesContainer.innerHTML = ""; // Inhalt des Elements löschen

  for (let i = 0; i < titles.length; i++) {
      // Schleife durch alle Titel
      const noteTitle = titles[i]; // Titel aus dem Array holen
      const noteContent = contents[i]; // Inhalt aus dem Array holen
      notesContainer.innerHTML += generateNoteHTML(noteTitle, noteContent, i); // Notiz zum Container hinzufügen
  }
}


// Funktion zur Generierung des HTML-Codes für eine einzelne Notiz im Papierkorb
function generateBinNoteHTML(title, content, index) {
  return `
      <div class="note">
          <b class="bin-title">${title}</b><br>
          <span class="bin-content">${content}</span>
          <button class="button" onclick="deleteNotePerm(${index})">Delete</button>
          <button class="button" onclick="restore(${index})">Restore</button>
      </div>
  `;
}

// Funktion zur Anzeige der Notizen im Papierkorb
function bin() {
  const binElement = document.getElementById("bin");
  binElement.innerHTML = ""; // Inhalt des Papierkorbs löschen

  // Erstellen eines neuen delNotesContainer innerhalb des bin Containers
  const delNotesContainer = document.createElement("div");
  delNotesContainer.id = "delNotesContainer";
  delNotesContainer.className = "delNotesContainer";
  binElement.appendChild(delNotesContainer); // delNotesContainer zum bin hinzufügen

  delNotesContainer.innerHTML = tempDeleteTitles.map((title, i) => 
      generateBinNoteHTML(title, tempDeleteContents[i], i)
  ).join('');

  tempDeleteTitles.length < 1 && hideBin();
}


// Funktion zum Anzeigen eines Hinweises, wenn eine leere Notiz erstellt wird
function showWarning(message) {
  const noteWarning = document.getElementById("noteWarning"); // Element mit der ID 'noteWarning' holen
  noteWarning.textContent = message; // Hinweistext setzen
  noteWarning.style.display = 'block'; // Hinweis anzeigen
  setTimeout(() => noteWarning.style.display = 'none', 1500); // Hinweis nach 1500ms ausblenden
}


// Überprüft, ob der Titel oder der Inhalt einer Notiz leer ist.
// Gibt true zurück, wenn entweder der Titel oder der Inhalt leer ist, andernfalls gibt sie false zurück.
function isNoteEmpty(title, content) {
  return !title.trim() || !content.trim();
}

// =============================================
// Abschnitt: Funktionen zur Benutzerinteraktion
// =============================================

// Funktion zum Erstellen einer Notiz
function addNote() {
  const noteTitleInput = document.getElementById("noteTitle"); // Eingabefeld für den Titel holen
  const noteContentInput = document.getElementById("noteContent"); // Eingabefeld für den Inhalt holen

  const trimmedTitle = noteTitleInput.value.trim(); // Eingabewert für den Titel trimmen
  const trimmedContent = noteContentInput.value.trim(); // Eingabewert für den Inhalt trimmen

  if (!trimmedTitle || !trimmedContent) {
    // Überprüfen, ob der Titel oder der Inhalt leer ist
    showWarning("Bitte eine Notiz eintragen."); // Warnung anzeigen, wenn eine leere Notiz erstellt wird
    return;
  }

  titles.push(trimmedTitle); // Titel zum Array 'titles' hinzufügen
  contents.push(trimmedContent); // Inhalt zum Array 'contents' hinzufügen
  displayNotes(); // Funktion 'displayNotes' aufrufen, um die aktualisierten Notizen anzuzeigen
  save(); // Funktion 'save' aufrufen, um die aktualisierten Daten zu speichern
}



// Funktion zum Löschen einer Notiz
function deleteNoteTemp(i) {
  tempDeleteTitles.push(titles[i]); // Den Titel an der Position 'i' zum tempDeleteTitles-Array hinzufügen
  tempDeleteContents.push(contents[i]); // Den Inhalt an der Position 'i' zum tempDeleteContents-Array hinzufügen
  titles.splice(i, 1); // Titel an der Position 'i' aus dem Array entfernen
  contents.splice(i, 1); // Inhalt an der Position 'i' aus dem Array entfernen
  displayNotes(); // Funktion 'displayNotes' aufrufen, um die aktualisierten Notizen anzuzeigen
  save(); // Funktion 'save' aufrufen, um die aktualisierten Daten zu speichern
  saveDel(); // Funktion 'saveDel' aufrufen, um die aktualisierten Daten zu speichern
  bin(); // Funktion 'bin' aufrufen, um die aktualisierten Daten zu speichern
}


// Funktion zum endgültigen Löschen einer Notiz aus dem Papierkorb
function deleteNotePerm(i) {
  tempDeleteTitles.splice(i, 1); // Den Titel an der Position 'i' aus dem Array entfernen
  tempDeleteContents.splice(i, 1); // Den Inhalt an der Position 'i' aus dem Array entfernen
  bin(); // Funktion 'bin' aufrufen, um den Papierkorb zu aktualisieren
  saveDel(); // Funktion 'saveDel' aufrufen, um die aktualisierten Daten zu speichern
}


// Funktion um Notiz aus dem Papierkorb wiederherzustellen
function restore(i) {
  titles.push(tempDeleteTitles[i]);
  contents.push(tempDeleteContents[i]);
  tempDeleteTitles.splice(i, 1); // Den Titel an der Position 'i' aus dem Array entfernen
  tempDeleteContents.splice(i, 1); // Den Inhalt an der Position 'i' aus dem Array entfernen
  displayNotes(); // Funktion 'displayNotes' aufrufen, um die aktualisierten Notizen anzuzeigen
  save(); // Funktion 'save' aufrufen, um die aktualisierten Daten zu speichern
  saveDel(); // Funktion 'saveDel' aufrufen, um die aktualisierten Daten zu speichern
  bin(); // Funktion 'bin' aufrufen, um die aktualisierten Daten zu speichern
}


// Funktion zum Anzeigen des Papierkorbinhalts
function showBin() {
  if(tempDeleteTitles.length > 0) {
    // Überprüfen, ob der Papierkorb nicht leer ist
    const binElement = document.getElementById('bincontainer'); // Element mit der ID 'bincontainer' holen
    binElement.classList.remove('d-none'); // Klasse 'd-none' entfernen, um den Papierkorb anzuzeigen
  } else {
    showWarning("Papierkorb ist leer."); // Warnung anzeigen, wenn der Papierkorb leer ist
    return;
  }
}

// Funktion zum Ausblenden des Papierkorbinhalts
function hideBin() {
  const binElement = document.getElementById('bincontainer'); // Element mit der ID 'bincontainer' holen
  binElement.classList.add('d-none'); // Klasse 'd-none' hinzufügen, um den Papierkorb auszublenden
}

// ===========================================
// Abschnitt: Funktionen zum Rendern der Seite
// ===========================================


// Funktion zum Erstellen des Footers mit dem aktuellen Jahr
function footer() {
  let footerElement = document.getElementById("footer"); // Element mit der ID 'footer' holen
  let currentYear = new Date().getFullYear(); // Aktuelles Jahr holen
  footerElement.innerHTML += `<p>&copy; Copyright ${currentYear}</p>`; // Copyright-Text mit aktuellem Jahr hinzufügen
}


// Funktion zum Rendern der Seite
function render() {
  load(); // Notizen laden
  loadDel(); // Gelöschte Notizen laden
  displayNotes(); // displayNotes-Funktion aufrufen
  bin(); // Papierkorb anzeigen
  footer(); // footer-Funktion aufrufen
}

// ===========================
// Abschnitt: Initiale Aufrufe
// ===========================

// Initiale Aufrufe
document.addEventListener("DOMContentLoaded", (event) => {
  render(); // render-Funktion aufrufen, wenn DOM vollständig geladen ist
});
