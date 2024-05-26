// Funktion zum Erstellen des Headers
function header() {
    let header = document.getElementById('header'); // Element mit der ID 'header' holen
    header.innerHTML = ''; // Inhalt des Headers löschen
    header.innerHTML += `<h1>Keeper App</h1>`; // Neues HTML-Element (H1) zum Header hinzufügen
}

// Funktion zum Erstellen der Eingabefelder und des Buttons
function addNote() {
    let input = document.getElementById('addNote'); // Element mit der ID 'addNote' holen
    input.innerHTML = ''; // Inhalt des Elements löschen
    input.innerHTML += `<input type="text" placeholder="Title">`; // Eingabefeld für den Titel hinzufügen
    input.innerHTML += `<input type="text" placeholder="Text">`; // Eingabefeld für den Text hinzufügen
    input.innerHTML += `<button onclick="add()">Add</button>`; // Button zum Hinzufügen einer Notiz hinzufügen
}

// Funktion zum Erstellen einer Beispielnotiz
function note() {
    let note = document.getElementById('note'); // Element mit der ID 'note' holen
    note.innerHTML = ''; // Inhalt des Elements löschen
    note.innerHTML += `
        <div>
            <h2>Titel</h2>
            <p>Text</p>
        </div>
    `;    
}

// Funktion zum Erstellen des Footers mit dem aktuellen Jahr
function footer() {
    let footer = document.getElementById('footer'); // Element mit der ID 'footer' holen
    let aktuellesJahr = new Date().getFullYear(); // Aktuelles Jahr holen
    footer.innerHTML = ''; // Inhalt des Footers löschen
    footer.innerHTML += `<p>&copy Copryright Peter Pfautsch ${aktuellesJahr}</p>`; // Copyright-Text mit aktuellem Jahr hinzufügen
}

// Funktion zum Rendern der Seite
function render() {
    header(); // Header-Funktion aufrufen
    addNote(); // addNote-Funktion aufrufen
    note(); // note-Funktion aufrufen
    footer();
}
