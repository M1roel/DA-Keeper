function header() {
  let header = document.getElementById('header');
  header.innerHTML = '';
  header.innerHTML += `<h1>Keeper App</h1>`;
}

function addNote() {
    let input = document.getElementById('addNote');
    input.innerHTML = '';
    input.innerHTML += `<input type="text" placeholder="Title">`;
    input.innerHTML += `<input type="text" placeholder="Text">`;
    input.innerHTML += `<button onclick="add()">Add</button>`;
}

function note() {
    let note = document.getElementById('note')
    note.innerHTML = '';
    note.innerHTML += `
        <div>
            <h2>Titel</h2> 
            <p>Text</p>
        </div>
    `;    
}

function render() {
    header();
    addNote();
    note();
  }