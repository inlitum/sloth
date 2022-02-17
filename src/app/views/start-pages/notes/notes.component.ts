import { Component, OnInit }   from '@angular/core';
import { LocalStorageService } from '../../../core/services/local-storage.service';

export interface NoteLink {
    id: number,
    prefix: string,
    link: string,
    text: string
}

export interface Note {
    id: number,
    text: string
}

@Component ({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: [ './notes.component.scss' ]
})
export class NotesComponent implements OnInit {

    links: NoteLink[] = [];
    notes: Note[] = [];

    maxLinkId: number = 0;
    maxNoteId: number = 0;

    constructor (private _localStorageService: LocalStorageService) {
        this.loadLinks();
        this.loadNotes();
    }

    ngOnInit (): void {
    }

    loadLinks () {
        let data = this._localStorageService.get('links');

        if (!data) {
            return;
        }

        try {
            this.links = JSON.parse(data);
        } catch (e) {
            console.error(e);
        }

        this.links.forEach(link => {
            if (link.id > this.maxLinkId) {
                this.maxLinkId = link.id;
            }
        })
    }

    saveLinks () {
        this._localStorageService.set('links', JSON.stringify(this.links));
    }

    deleteLink (linkId: number) {
        this.links = this.links.filter(link => link.id != linkId);

        this.saveLinks();
    }

    saveNotes () {
        this._localStorageService.set('notes', JSON.stringify(this.notes));
    }

    loadNotes () {
        let data = this._localStorageService.get('notes');

        if (!data) {
            return;
        }

        try {
            this.notes = JSON.parse(data);
        } catch (e) {
            console.error(e);
        }

        this.notes.forEach(note => {
            if (note.id > this.maxNoteId) {
                this.maxNoteId = note.id;
            }
        })
    }

    deleteNote (noteId: number) {
        console.log(noteId, this.notes)
        this.notes = this.notes.filter(note => {
            return note.id != noteId;
        });

        console.log(this.notes)

        this.saveNotes();
    }

}
