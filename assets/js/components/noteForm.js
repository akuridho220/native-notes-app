class NoteForm extends HTMLElement {
    constructor(notes) {
        super();
        this.notes = notes; 
        this.innerHTML = `
            <div class="note-input">
                <h2>Form Tambah Catatan</h2>
                <form>
                    <p class="note-input__title__char-limit">Sisa karakter: <span id="charCount">50</span></p>
                    <input class="note-input__title" type="text" placeholder="Silahkan masukkan judul ..." required />
                    <textarea class="note-input__body" placeholder="Tuliskan catatanmu di sini ..." required></textarea>
                    <button type="submit">Tambah</button>
                </form>
            </div>
        `;
    }
  
}
  
customElements.define('note-form', NoteForm);
