let titel = ['Wichtig']; // Array für Titel initialisieren
let texts = ['Einkaufen']; // Array für Texte initialisieren
load(); // Lade gespeicherte Daten aus dem lokalen Speicher

// Funktion zum Erstellen des Headers
function header() {
    let header = document.getElementById('header'); // Element mit der ID 'header' holen
    header.innerHTML = ''; // Inhalt des Headers löschen
    header.innerHTML += `<h1>SchreibBlock</h1>`; // Neues HTML-Element (H1) zum Header hinzufügen
}

function save() {
    let titelAsText = JSON.stringify(titel); // Array 'titel' in JSON-String umwandeln
    let textsAsText = JSON.stringify(texts); // Array 'texts' in JSON-String umwandeln
    localStorage.setItem('titel', titelAsText); // JSON-String im lokalen Speicher speichern
    localStorage.setItem('texts', textsAsText); // JSON-String im lokalen Speicher speichern
}

function load() {
    let titelAsText = localStorage.getItem('titel'); // JSON-String für 'titel' aus lokalem Speicher holen
    let textsAsText = localStorage.getItem('texts'); // JSON-String für 'texts' aus lokalem Speicher holen
    if (titelAsText && textsAsText) { // Überprüfen, ob Daten im lokalen Speicher vorhanden sind
        titel = JSON.parse(titelAsText); // JSON-String zurück in Array umwandeln
        texts = JSON.parse(textsAsText); // JSON-String zurück in Array umwandeln
    }
}

// Funktion zum Erstellen der Eingabefelder und des Buttons
function addNote() {
    let title = document.getElementById('title'); // Eingabefeld für Titel holen
    let text = document.getElementById('text'); // Eingabefeld für Text holen
    titel.push(title.value); // Neuen Titel zum Array hinzufügen
    texts.push(text.value); // Neuen Text zum Array hinzufügen
    note(); // Funktion 'note' aufrufen, um die Notizen anzuzeigen
    save(); // Funktion 'save' aufrufen, um die neuen Daten zu speichern
}

// Funktion zum Erstellen einer Beispielnotiz
function note() {
    let addNote = document.getElementById('addNote'); // Element mit der ID 'addNote' holen
    addNote.innerHTML = ''; // Inhalt des Elements löschen
    addNote.innerHTML += `<input type="text" placeholder="Title" id="title">`; // Eingabefeld für den Titel hinzufügen
    addNote.innerHTML += `<input type="text" placeholder="Text" id="text">`; // Eingabefeld für den Text hinzufügen
    addNote.innerHTML += `<button onclick="addNote()">Add</button>`; // Button zum Hinzufügen einer Notiz hinzufügen
    
    let noteContainer = document.getElementById('noteContainer'); // Element mit der ID 'noteContainer' holen
    noteContainer.innerHTML = ''; // Inhalt des Elements löschen
    
    for (let i = 0; i < titel.length; i++) { // Schleife durch alle Titel
        const title = titel[i]; // Titel aus dem Array holen
        const text = texts[i]; // Text aus dem Array holen
        noteContainer.innerHTML += `
            <div class="note">
                <b>${title}</b><br>
                ${text}
            </div>
        `; // Notiz zum Container hinzufügen
    }
}

// Funktion zum Erstellen des Footers mit dem aktuellen Jahr
function footer() {
    let footer = document.getElementById('footer'); // Element mit der ID 'footer' holen
    let aktuellesJahr = new Date().getFullYear(); // Aktuelles Jahr holen
    footer.innerHTML = ''; // Inhalt des Footers löschen
    footer.innerHTML += `<p>&copy; Copyright ${aktuellesJahr}</p>`; // Copyright-Text mit aktuellem Jahr hinzufügen
}

// Funktion zum Rendern der Seite
function render() {
    header(); // Header-Funktion aufrufen
    note(); // note-Funktion aufrufen
    footer(); // footer-Funktion aufrufen
}

// Initiale Aufrufe
document.addEventListener('DOMContentLoaded', (event) => {
    render(); // render-Funktion aufrufen, wenn DOM vollständig geladen ist
});
