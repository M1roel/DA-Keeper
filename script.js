let titles = ['Wichtig']; // Array für Titel initialisieren
let contents = ['Einkaufen']; // Array für Inhalte initialisieren
load(); // Lade gespeicherte Daten aus dem lokalen Speicher

// Funktion zum Erstellen des Headers
function header() {
    let headerElement = document.getElementById('header'); // Element mit der ID 'header' holen
    headerElement.innerHTML = ''; // Inhalt des Headers löschen
    headerElement.innerHTML += `<h1>SchreibBlock</h1>`; // Neues HTML-Element (H1) zum Header hinzufügen
}

function save() {
    let titlesAsText = JSON.stringify(titles); // Array 'titles' in JSON-String umwandeln
    let contentsAsText = JSON.stringify(contents); // Array 'contents' in JSON-String umwandeln
    localStorage.setItem('titles', titlesAsText); // JSON-String im lokalen Speicher speichern
    localStorage.setItem('contents', contentsAsText); // JSON-String im lokalen Speicher speichern
}

function load() {
    let titlesAsText = localStorage.getItem('titles'); // JSON-String für 'titles' aus lokalem Speicher holen
    let contentsAsText = localStorage.getItem('contents'); // JSON-String für 'contents' aus lokalem Speicher holen
    if (titlesAsText && contentsAsText) { // Überprüfen, ob Daten im lokalen Speicher vorhanden sind
        titles = JSON.parse(titlesAsText); // JSON-String zurück in Array umwandeln
        contents = JSON.parse(contentsAsText); // JSON-String zurück in Array umwandeln
    }
}

// Funktion zum Erstellen der Eingabefelder und des Buttons
function addNote() {
    let noteTitleInput = document.getElementById('noteTitle'); // Eingabefeld für Titel holen
    let noteContentInput = document.getElementById('noteContent'); // Eingabefeld für Inhalt holen
    titles.push(noteTitleInput.value); // Neuen Titel zum Array hinzufügen
    contents.push(noteContentInput.value); // Neuen Inhalt zum Array hinzufügen
    displayNotes(); // Funktion 'displayNotes' aufrufen, um die Notizen anzuzeigen
    save(); // Funktion 'save' aufrufen, um die neuen Daten zu speichern
}

function deleteNote(i) {
    titles.splice(i, 1);
    contents.splice(i, 1);
    displayNotes();
    save();
}

// Funktion zum Erstellen einer Beispielnotiz
function displayNotes() {
    let addNoteElement = document.getElementById('addNote'); // Element mit der ID 'addNote' holen
    addNoteElement.innerHTML = ''; // Inhalt des Elements löschen
    addNoteElement.innerHTML += `<input type="text" placeholder="Title" id="noteTitle">`; // Eingabefeld für den Titel hinzufügen
    addNoteElement.innerHTML += `<input type="text" placeholder="Content" id="noteContent">`; // Eingabefeld für den Inhalt hinzufügen
    addNoteElement.innerHTML += `<button onclick="addNote()">Add</button>`; // Button zum Hinzufügen einer Notiz hinzufügen
    
    let notesContainer = document.getElementById('notesContainer'); // Element mit der ID 'notesContainer' holen
    notesContainer.innerHTML = ''; // Inhalt des Elements löschen
    
    for (let i = 0; i < titles.length; i++) { // Schleife durch alle Titel
        const noteTitle = titles[i]; // Titel aus dem Array holen
        const noteContent = contents[i]; // Inhalt aus dem Array holen
        notesContainer.innerHTML += `
            <div class="note">
                <b class="note-title">${noteTitle}</b><br>
                <span class="note-content">${noteContent}</span>
                <button class="button" onclick="deleteNote(${i})">x</button>
            </div>
        `; // Notiz zum Container hinzufügen
    }
}

// Funktion zum Erstellen des Footers mit dem aktuellen Jahr
function footer() {
    let footerElement = document.getElementById('footer'); // Element mit der ID 'footer' holen
    let currentYear = new Date().getFullYear(); // Aktuelles Jahr holen
    footerElement.innerHTML = ''; // Inhalt des Footers löschen
    footerElement.innerHTML += `<p>&copy; Copyright ${currentYear}</p>`; // Copyright-Text mit aktuellem Jahr hinzufügen
}

// Funktion zum Rendern der Seite
function render() {
    header(); // Header-Funktion aufrufen
    displayNotes(); // displayNotes-Funktion aufrufen
    footer(); // footer-Funktion aufrufen
}

// Initiale Aufrufe
document.addEventListener('DOMContentLoaded', (event) => {
    render(); // render-Funktion aufrufen, wenn DOM vollständig geladen ist
});
