class NoteItem extends HTMLElement {
  constructor(note, onArchive, onActive) {
    super();
    this.note = note;
    this.onArchive = onArchive;
    this.onActive = onActive;
    this.render();
  }

  render() {
    const formattedDate = showFormattedDate(this.note.createdAt);
    this.innerHTML = `
      <div class="note-item">
        <div class="note-item__content">
          <h3 class="note-item__title">${this.note.title}</h3>
          <p class="note-item__date">${formattedDate}</p>
          <p class="note-item__body">${this.note.body}</p>
        </div>
        <div class="note-item__action">
          <button class="note-item__delete-button" data-id="${this.note.id}">Hapus</button>
          ${this.note.archived ?
            `<button class="note-item__active-button">Pindahkan</button>` :
            `<button class="note-item__archive-button">Arsipkan</button>`
          }
        </div>
      </div>
    `;

    const archiveButton = this.querySelector('.note-item__archive-button');
    const activeButton = this.querySelector('.note-item__active-button');

    if (archiveButton) {
      archiveButton.addEventListener('click', () => this.onArchive(this.note.id));
    }

    if (activeButton) {
      activeButton.addEventListener('click', () => this.onActive(this.note.id));
    }
  }
}

customElements.define('note-item', NoteItem);


