let titles = ["Wichtig"]; // Array für Titel initialisieren
let contents = ["Einkaufen"]; // Array für Inhalte initialisieren
let tempDeleteTitles = [""];
let tempDeleteContents = [""];
load(); // Lade gespeicherte Daten aus dem lokalen Speicher

// Funktion zum Erstellen des Headers
function header() {
  let headerElement = document.getElementById("header"); // Element mit der ID 'header' holen
  headerElement.innerHTML = ""; // Inhalt des Headers löschen
  headerElement.innerHTML += `<h1>SchreibBlock</h1>`; // Neues HTML-Element (H1) zum Header hinzufügen
}

// Funktion zum Speichern der Notizen im lokalen Speicher
function save() {
  let titlesAsText = JSON.stringify(titles); // Array 'titles' in JSON-String umwandeln
  let contentsAsText = JSON.stringify(contents); // Array 'contents' in JSON-String umwandeln
  localStorage.setItem("titles", titlesAsText); // JSON-String im lokalen Speicher speichern
  localStorage.setItem("contents", contentsAsText); // JSON-String im lokalen Speicher speichern
}

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

// Funktion zum Erstellen der Eingabefelder und des Buttons
function addNote() {
  let noteTitleInput = document.getElementById("noteTitle"); // Eingabefeld für Titel holen
  let noteContentInput = document.getElementById("noteContent"); // Eingabefeld für Inhalt holen
  titles.push(noteTitleInput.value); // Neuen Titel zum Array hinzufügen
  contents.push(noteContentInput.value); // Neuen Inhalt zum Array hinzufügen
  displayNotes(); // Funktion 'displayNotes' aufrufen, um die Notizen anzuzeigen
  save(); // Funktion 'save' aufrufen, um die neuen Daten zu speichern
}

// Funktion zum Löschen einer Notiz
function deleteNoteTemp(i) {
  tempDeleteTitles.push(titles[i]); // Den Titel an der Position 'i' zum tempDeleteTitles-Array hinzufügen
  tempDeleteContents.push(contents[i]); // Den Inhalt an der Position 'i' zum tempDeleteContents-Array hinzufügen
  titles.splice(i, 1); // Titel an der Position 'i' aus dem Array entfernen
  contents.splice(i, 1); // Inhalt an der Position 'i' aus dem Array entfernen
  displayNotes(); // Funktion 'displayNotes' aufrufen, um die aktualisierten Notizen anzuzeigen
  save(); // Funktion 'save' aufrufen, um die aktualisierten Daten zu speichern
}

function deleteNotePerm(i) {
  tempDeleteTitles.splice(i, 1);
  tempDeleteContents.splice(i, 1);
  displayNotes();
  save();
}

// Funktion zum Anzeigen der Notizen
function displayNotes() {
  let addNoteElement = document.getElementById("addNote"); // Element mit der ID 'addNote' holen
  addNoteElement.innerHTML = ""; // Inhalt des Elements löschen
  addNoteElement.innerHTML += `<input type="text" placeholder="Titel..." id="noteTitle">`; // Eingabefeld für den Titel hinzufügen
  addNoteElement.innerHTML += `<textarea placeholder="Notiz..." id="noteContent"></textarea>`; // Eingabefeld für den Inhalt hinzufügen
  addNoteElement.innerHTML += `<button onclick="addNote()">Add</button>`; // Button zum Hinzufügen einer Notiz hinzufügen

  let notesContainer = document.getElementById("notesContainer"); // Element mit der ID 'notesContainer' holen
  notesContainer.innerHTML = ""; // Inhalt des Elements löschen

  for (let i = 0; i < titles.length; i++) {
    // Schleife durch alle Titel
    const noteTitle = titles[i]; // Titel aus dem Array holen
    const noteContent = contents[i]; // Inhalt aus dem Array holen
    notesContainer.innerHTML += `
            <div class="note">
                <b class="note-title">${noteTitle}</b><br>
                <span class="note-content">${noteContent}</span>
                <button class="button" onclick="deleteNoteTemp(${i})">x</button>
            </div>
        `; // Notiz zum Container hinzufügen
  }
}

function bin() {
  let binElement = document.getElementById("bin"); // Element mit der ID 'bin' holen
  binElement.innerHTML = ""; // Inhalt des Footers löschen

  let delNotesContainer = document.getElementById("delNotesContainer"); // Element mit der ID 'notesContainer' holen
  delNotesContainer.innerHTML = ""; // Inhalt des Elements löschen

  for (let i = 0; i < tempDeleteTitles.length; i++) {
    const tempDelTitle = tempDeleteTitles[i];
    const tempDelContent = tempDeleteContents[i];
    delNotesContainer.innerHTML += `
            <div class="note">
                <b class="note-title">${tempDelTitle}</b><br>
                <span class="note-content">${tempDelContent}</span>
                <button class="button" onclick="deleteNotePerm(${i})">x</button>
            </div>
    `;
  }
}

// Funktion zum Erstellen des Footers mit dem aktuellen Jahr
function footer() {
  let footerElement = document.getElementById("footer"); // Element mit der ID 'footer' holen
  let currentYear = new Date().getFullYear(); // Aktuelles Jahr holen
  footerElement.innerHTML = ""; // Inhalt des Footers löschen
  footerElement.innerHTML += `<p>&copy; Copyright ${currentYear}</p>`; // Copyright-Text mit aktuellem Jahr hinzufügen
}

// Funktion zum Rendern der Seite
function render() {
  header(); // Header-Funktion aufrufen
  displayNotes(); // displayNotes-Funktion aufrufen
  footer(); // footer-Funktion aufrufen
}

// Initiale Aufrufe
document.addEventListener("DOMContentLoaded", (event) => {
  render(); // render-Funktion aufrufen, wenn DOM vollständig geladen ist
});