let titles = [];
let contents = [];
let tempDeleteTitles = [];
let tempDeleteContents = [];
load();
loadDel();

function load() {
  let titlesAsText = localStorage.getItem("titles");
  let contentsAsText = localStorage.getItem("contents");
  if (titlesAsText && contentsAsText) {
    titles = JSON.parse(titlesAsText);
    contents = JSON.parse(contentsAsText);
  }
}

function loadDel() {
  let tempTitlesAsText = localStorage.getItem("tempDeleteTitles");
  let tempContentsAsText = localStorage.getItem("tempDeleteContents");
  if (tempTitlesAsText && tempContentsAsText) {
    tempDeleteTitles = JSON.parse(tempTitlesAsText);
    tempDeleteContents = JSON.parse(tempContentsAsText);
  }
}

function save() {
  let titlesAsText = JSON.stringify(titles);
  let contentsAsText = JSON.stringify(contents);
  localStorage.setItem("titles", titlesAsText);
  localStorage.setItem("contents", contentsAsText);
}

function saveDel() {
  let titlesAsText = JSON.stringify(tempDeleteTitles);
  let contentsAsText = JSON.stringify(tempDeleteContents);
  localStorage.setItem("tempDeleteTitles", titlesAsText);
  localStorage.setItem("tempDeleteContents", contentsAsText);
}

function generateNoteHTML(noteTitle, noteContent, index) {
  return `
      <div class="note">
          <b class="note-title">${noteTitle}</b><br>
          <span class="note-content">${noteContent}</span>
          <button class="button" onclick="deleteNoteTemp(${index})">x</button>
      </div>
  `;
}

function displayNotes() {
  let notesContainer = document.getElementById("notesContainer");
  if (!notesContainer) {
    console.error("Element with ID 'notesContainer' not found.");
    return;
  }
  notesContainer.innerHTML = "";

  for (let i = 0; i < titles.length; i++) {
    const noteTitle = titles[i];
    const noteContent = contents[i];
    notesContainer.innerHTML += generateNoteHTML(noteTitle, noteContent, i);
  }
}

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

function bin() {
  let binContainer = document.getElementById("bincontainer");
  if (!binContainer) {
    console.error("Element with ID 'bincontainer' not found.");
    return;
  }
  binContainer.innerHTML = "";

  binContainer.innerHTML = tempDeleteTitles
    .map((title, i) => generateBinNoteHTML(title, tempDeleteContents[i], i))
    .join("");

  // tempDeleteTitles.length < 1 && hideBin();
}


function showWarning(message) {
  const noteWarning = document.getElementById("noteWarning");
  noteWarning.textContent = message;
  noteWarning.classList.remove('d-none');
  setTimeout(() => (noteWarning.classList.add('d-none')), 1500);
}

function isNoteEmpty(title, content) {
  return !title.trim() || !content.trim();
}

function clearNote() {
  const title = document.getElementById('noteTitle');
  const content = document.getElementById('noteContent');
  title.value = "";
  content.value = "";
}

function addNote() {
  const noteTitleInput = document.getElementById("noteTitle");
  const noteContentInput = document.getElementById("noteContent");

  const trimmedTitle = noteTitleInput.value.trim();
  const trimmedContent = noteContentInput.value.trim();

  if (!trimmedTitle || !trimmedContent) {
    showWarning("Bitte eine Notiz eintragen.");
    return;
  }

  titles.push(trimmedTitle);
  contents.push(trimmedContent);
  displayNotes();
  save();
  clearNote();
}

function deleteNoteTemp(i) {
  tempDeleteTitles.push(titles[i]);
  tempDeleteContents.push(contents[i]);
  titles.splice(i, 1);
  contents.splice(i, 1);
  displayNotes();
  save();
  saveDel();
  bin();
}

function deleteNotePerm(i) {
  tempDeleteTitles.splice(i, 1);
  tempDeleteContents.splice(i, 1);
  bin();
  saveDel();
}

function restore(i) {
  titles.push(tempDeleteTitles[i]);
  contents.push(tempDeleteContents[i]);
  tempDeleteTitles.splice(i, 1);
  tempDeleteContents.splice(i, 1);
  displayNotes();
  save();
  saveDel();
  bin();
}

function showBin() {
  if (tempDeleteTitles.length == 0) {
    showWarning("Papierkorb ist leer.");
    return false;
  }
  return true;
}

// function hideBin() {
//   const binElement = document.getElementById("bincontainer");
//   const noteElement = document.getElementById("notesContainer");
//   const addElement = document.getElementById("addNote");
//   binElement.classList.add("d-none");
//   noteElement.classList.remove("d-none");
//   addElement.classList.remove("d-none");
// }

function render() {
  load();
  loadDel();
  
  const path = window.location.pathname;
  
  if (path.includes("index.html")) {
    displayNotes();
  } else if (path.includes("papierkorb.html")) {
    bin();
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  render();
});
