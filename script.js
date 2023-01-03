const addBtn = document.getElementById('add');
const clearBtn = document.getElementById('clear');
const blurBG = document.querySelector('.blur');
const show = document.querySelector('.prompt');
const hide = document.querySelector('.hide');
const erase = document.querySelector('.reset')

const notes = JSON.parse(localStorage.getItem('notes'));

addBtn.addEventListener('click', () => addNewNote());
clearBtn.addEventListener('click', () => {
    blurBG.classList.remove('hidden')
    show.classList.remove('hidden')
})
hide.addEventListener('click', () => hidePrompt() )
erase.addEventListener('click', () => hidePrompt() )

if(notes) {
    notes.forEach(note => addNewNote(note));
}

// FUNCTIONS

// note crud function
function  addNewNote(text = '') {
    const container = document.querySelector('.container');
    const note = document.createElement('div');
    note.classList.add('note');
    container.appendChild(note);


    note.innerHTML = `
    <div class="note">
        <div class="tools">
          <button class="edit"><i class="fas fa-edit"></i></button>
          <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="display ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
      </div>
    `;
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete');
    const disp = note.querySelector('.display');
    const textArea = note.querySelector('textarea');
    const erase = document.querySelector('.reset')

    textArea.value = text;
    disp.innerHTML = text;
    
    deleteBtn.addEventListener('click', () => {
        note.remove();
        updateLS();
    });
    editBtn.addEventListener('click', () => {
        disp.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    });
    textArea.addEventListener('input', (e) => {
        const {value} = e.target;

        disp.innerHTML = value;
        updateLS();
    });
    erase.addEventListener('click', () => {
        note.remove();
        updateLS();  
    });

};

// saving notes in local storage
function updateLS() {
    const notesText = document.querySelectorAll('textarea');

    const notes = [];

    notesText.forEach(note => notes.push(note.value));

    localStorage.setItem('notes',JSON.stringify(notes));

}


function hidePrompt() {
    blurBG.classList.add('hidden')
    show.classList.add('hidden')
}