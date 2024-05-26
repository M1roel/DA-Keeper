function header() {
  let content = document.getElementById('header');
  content.innerHTML = '';
  content.innerHTML += `<h1>Keeper App</h1>`;
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
    note();
  }