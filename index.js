const COLORS = {
  'Light Blue': 'lightblue',
  'Light Pink': 'lightpink',
  'Light Yellow': 'lightyellow',
  'Light Grey': 'lightgrey',
};

function createNote(e) {
  e.preventDefault();
  const note = document.getElementById('enterNote');

  if (note.value.length <= 0) return alert('Please enter a note to add');

  const noteList = document.getElementById('noteList');
  const nextId = noteList.childElementCount + 1;
  const individualNote = createIndividualNote(nextId, note.value);
  noteList.appendChild(individualNote);
  note.value = '';
}

function updateRow(event, element) {
  event.preventDefault();
  const note = document.getElementById('updateNote');
  if (note.value.length <= 0) return alert('Please enter a note to update it');

  const updatedNote = document.createElement('h2');
  updatedNote.innerHTML = note.value;

  const editButton = document.createElement('button');
  editButton.setAttribute('onclick', 'swapElements(this)');
  editButton.innerHTML = 'Edit';

  const currentNoteInput = element.parentElement.getElementsByTagName(
    'input'
  )[0];

  element.parentElement.replaceChild(updatedNote, currentNoteInput);
  element.parentElement.replaceChild(editButton, element);
  note.value = '';
}

function deleteRow(e) {
  const noteList = document.getElementById('noteList');
  const parentElementId = e.parentElement;
  noteList.removeChild(parentElementId);
}

function changeIndividualNoteColor(e) {
  e.parentElement.style.backgroundColor = e.value;
}

function getColorOptions() {
  let options = '';

  for (let color in COLORS) {
    options += `<option value="${COLORS[color]}">${color}</option>`;
  }
  return options;
}

function createIndividualNote(id, note) {
  const rowDiv = document.createElement('div');
  const options = getColorOptions();
  rowDiv.id = id;
  rowDiv.className = 'individualNote';
  rowDiv.style.backgroundColor = Object.values(COLORS)[0];
  rowDiv.innerHTML = `
    <h2>${note}</h2>
    <button onclick="swapElements(this)">Edit</button>
    <button onclick="deleteRow(this)">Delete</button>
    <select onchange="changeIndividualNoteColor(this)">
      ${options}
    </select>
    `;

  return rowDiv;
}

function swapElements(e) {
  const currentNote = e.parentElement.getElementsByTagName('h2')[0];
  const updateNoteInput = getUpdateNoteInput(currentNote.innerHTML);
  const updateNoteBtn = getUpdateNoteBtn();
  e.parentElement.replaceChild(updateNoteInput, currentNote);
  e.parentElement.replaceChild(updateNoteBtn, e);
}

function getUpdateNoteInput(inputValue) {
  const updateNoteInput = document.createElement('input');
  updateNoteInput.type = 'text';
  updateNoteInput.placeholder = 'Update note';
  updateNoteInput.id = 'updateNote';
  updateNoteInput.value = inputValue;
  return updateNoteInput;
}

function getUpdateNoteBtn() {
  const updateNoteBtn = document.createElement('button');
  updateNoteBtn.type = 'submit';
  updateNoteBtn.setAttribute('onclick', 'updateRow(event, this)');
  updateNoteBtn.id = 'updateBtn';
  updateNoteBtn.innerHTML = 'Update';
  return updateNoteBtn;
}
