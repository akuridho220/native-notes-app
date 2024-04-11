
// window.onload = function () {
//   const activeNotesList = document.getElementById('activeNotesList');
//   const archivedNotesList = document.getElementById('archivedNotesList');
//   const searchInput = document.getElementById('searchInput');
//   const noteForm = document.querySelector('note-form'); 
//   const titleInput = document.querySelector('.note-input__title');
//     const charLimitDisplay = document.querySelector('.note-input__title__char-limit');

//   let notes = getInitialData();

//   function renderActiveNotes() {
//       activeNotesList.innerHTML = '';
//       const activeNotes = notes.filter(note => !note.archived && note.title.toLowerCase().includes(searchInput.value.toLowerCase()));
//       activeNotes.forEach(note => {
//           const formattedDate = showFormattedDate(note.createdAt);
//           const noteItem = document.createElement('div');
//           noteItem.classList.add('note-item');
//           noteItem.innerHTML = `
//               <div class="note-item__content">
//                   <h3 class="note-item__title">${note.title}</h3>
//                   <p class="note-item__date">${formattedDate}</p>
//                   <p class="note-item__body">${note.body}</p>
//               </div>
//               <div class="note-item__action">
//                   <button class="note-item__delete-button" data-id="${note.id}">Hapus</button>
//                   <button class="note-item__archive-button" data-id="${note.id}">Arsipkan</button>
//               </div>
//           `;
//           activeNotesList.appendChild(noteItem);
//       });

//       attachEventListeners();
//   }

//   function renderArchivedNotes() {
//     archivedNotesList.innerHTML = '';
//     const archivedNotes = notes.filter(note => note.archived && note.title.toLowerCase().includes(searchInput.value.toLowerCase()));
//     archivedNotes.forEach(note => {
//         const formattedDate = showFormattedDate(note.createdAt);
//         const noteItem = document.createElement('div');
//         noteItem.classList.add('note-item');
//         noteItem.innerHTML = `
//             <div class="note-item__content">
//                 <h3 class="note-item__title">${note.title}</h3>
//                 <p class="note-item__date">${formattedDate}</p>
//                 <p class="note-item__body">${note.body}</p>
//             </div>
//             <div class="note-item__action">
//                 <button class="note-item__delete-button" data-id="${note.id}">Hapus</button>
//                 <button class="note-item__active-button" data-id="${note.id}">Pindahkan</button>
//             </div>
//         `;
//         archivedNotesList.appendChild(noteItem);
//     });

//     attachEventListeners();
//   }

//   function onDelete(id) {
//       notes = notes.filter(note => note.id !== id);
//       renderActiveNotes();
//       renderArchivedNotes();
//       console.log('hapus id', id);
//   }

//   function onArchive(id) {
//     const noteIndex = notes.findIndex(note => note.id === id);
//     if (noteIndex !== -1) {
//         const noteToArchive = notes[noteIndex];
//         const archivedNote = { ...noteToArchive, archived: true }; 
//         notes.splice(noteIndex, 1); 
//         notes.push(archivedNote); 
//         renderActiveNotes();
//         renderArchivedNotes();
//     }
//   }



//   function onActive(id) {
//       const noteIndex = notes.findIndex(note => note.id === id);
//       const noteToActive = notes[noteIndex];
//       noteToActive.archived = false;
//       renderActiveNotes();
//       renderArchivedNotes();
//   }

//   function attachEventListeners() {
//       document.querySelectorAll('.note-item__delete-button').forEach(button => {
//           button.addEventListener('click', function () {
//               onDelete(this.getAttribute('data-id'));
//           });
//       });

//       document.querySelectorAll('.note-item__archive-button').forEach(button => {
//           button.addEventListener('click', function () {
//               onArchive(this.getAttribute('data-id'));
//           });
//       });

//       document.querySelectorAll('.note-item__active-button').forEach(button => {
//           button.addEventListener('click', function () {
//               onActive(this.getAttribute('data-id'));
//           });
//       });

//       titleInput.addEventListener('input', updateCharCount);
//   }

//   function updateCharCount() {
//     const remainingChars = 50 - titleInput.value.length;
//     charLimitDisplay.textContent = `Sisa karakter: ${remainingChars}`;
//   }

//   noteForm.addEventListener('submit', function (event) {
//       event.preventDefault();
//       const title = this.querySelector('.note-input__title').value;
//       const body = this.querySelector('.note-input__body').value;
//       const createdAt = new Date().toISOString();
//       const newNote = {
//           id: 'notes-' + Math.random().toString(36).substr(2, 10),
//           title,
//           body,
//           createdAt,
//           archived: false
//       };
//       notes.push(newNote);
//       renderActiveNotes();
//       renderArchivedNotes();
//       this.reset();
//       updateCharCount();
//   });

//   searchInput.addEventListener('input', function () {
//       renderActiveNotes();
//       renderArchivedNotes();
//   });

//   renderActiveNotes();
//   renderArchivedNotes();
// };


/*

    Kode dibawah ini menggunakan komponen noteItem, kekurangannya ukuran tiap item jadi berbeda. 
    Jika ingin ukuran tiap item sama (mirip dg web yg pake react, uncomment kode di atas komen ini dan 
    comment saja kode dibawah)

*/


window.onload = function () {
  const activeNotesList = document.getElementById('activeNotesList');
  const archivedNotesList = document.getElementById('archivedNotesList');
  const searchInput = document.getElementById('searchInput');
  const noteForm = document.querySelector('note-form'); 
  const titleInput = document.querySelector('.note-input__title');
  const charLimitDisplay = document.querySelector('.note-input__title__char-limit');

  let notes = getInitialData();

  function renderActiveNotes() {
      activeNotesList.innerHTML = '';
      const activeNotes = notes.filter(note => !note.archived && note.title.toLowerCase().includes(searchInput.value.toLowerCase()));
      activeNotes.forEach(note => {
          const noteItem = new NoteItem(note, onArchive, onActive); 
          activeNotesList.appendChild(noteItem);
      });

      attachEventListeners();
  }

  function renderArchivedNotes() {
    archivedNotesList.innerHTML = '';
    const archivedNotes = notes.filter(note => note.archived && note.title.toLowerCase().includes(searchInput.value.toLowerCase()));
    archivedNotes.forEach(note => {
        const noteItem = new NoteItem(note, onArchive, onActive); 
        archivedNotesList.appendChild(noteItem);
    });

    attachEventListeners();
  }

  function onDelete(id) {
      notes = notes.filter(note => note.id !== id);
      renderActiveNotes();
      renderArchivedNotes();
      console.log('hapus id', id);
  }

  function onArchive(id) {
    const noteIndex = notes.findIndex(note => note.id === id);
    if (noteIndex !== -1) {
        const noteToArchive = notes[noteIndex];
        const archivedNote = { ...noteToArchive, archived: true }; 
        notes.splice(noteIndex, 1); 
        notes.push(archivedNote); 
        renderActiveNotes();
        renderArchivedNotes();
    }
  }

  function onActive(id) {
      const noteIndex = notes.findIndex(note => note.id === id);
      const noteToActive = notes[noteIndex];
      noteToActive.archived = false;
      renderActiveNotes();
      renderArchivedNotes();
  }

  function attachEventListeners() {
      document.querySelectorAll('.note-item__delete-button').forEach(button => {
          button.addEventListener('click', function () {
              onDelete(this.getAttribute('data-id'));
          });
      });

      titleInput.addEventListener('input', updateCharCount);
  }

  function updateCharCount() {
    const remainingChars = 50 - titleInput.value.length;
    charLimitDisplay.textContent = `Sisa karakter: ${remainingChars}`;
  }

  function resetForm() {
    document.querySelector('.note-input__title').value = '';
    document.querySelector('.note-input__body').value = '';
  }

  noteForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const title = this.querySelector('.note-input__title').value;
      const body = this.querySelector('.note-input__body').value;
      const createdAt = new Date().toISOString();
      const newNote = {
          id: 'notes-' + Math.random().toString(36).substr(2, 10),
          title,
          body,
          createdAt,
          archived: false
      };
      notes.push(newNote);
      renderActiveNotes();
      renderArchivedNotes();
      resetForm();
      updateCharCount();
  });



  searchInput.addEventListener('input', function () {
      renderActiveNotes();
      renderArchivedNotes();
  });

  renderActiveNotes();
  renderArchivedNotes();
};
