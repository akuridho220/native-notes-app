class NoteHeader extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  connectedCallback() {
    this.title = this.getAttribute('title') || 'Catatan Sederhana'; // default untuk title 
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="note-app__header">
        <h1>${this.title}</h1>
        <div class="note-search">
          <input type="text" placeholder="Cari catatan ..." id="searchInput" />
        </div>
      </div>
    `;
  }
}

customElements.define('note-header', NoteHeader);
