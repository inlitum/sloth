import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { clone as _clone }                                                       from 'lodash';

@Component ({
                selector   : 'sloth-editable-label[text]',
                templateUrl: './editable-label.component.html',
                styleUrls  : [ './editable-label.component.scss' ],
            })
export class EditableLabelComponent implements OnInit {

    @ViewChild('accountName')
    accountNameInput!: ElementRef;

    @Input()
    text!: string;

    private originalText: string = '';

    @Input()
    disabled: boolean = false;

    editing: boolean = false;

    @Output()
    textChanged: EventEmitter<string> = new EventEmitter<string>()

    get modified (): boolean {
        return this.text !== this.originalText;
    }

    constructor () { }

    ngOnInit (): void {
        this.originalText = _clone(this.text);
    }

    handleClick(event: MouseEvent) {
        if (event.detail === 2) {
            this.toggleEditing(true);
        }
    }

    handleRevertButton(event: MouseEvent) {
        event.stopPropagation();
        this.text = _clone(this.originalText);
    }

    handleEditButtonClick(event: MouseEvent) {
        event.stopPropagation();
        this.toggleEditing(!this.editing);
    }

    handleKeyUp(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === 'Escape') {
            this.saveText();
        }
    }

    handleFocusOut() {
        this.saveText();
    }

    saveText () {
        if (!this.accountNameInput) {
            return;
        }
        this.toggleEditing(false);

        this.textChanged.emit(this.text);
    }

    toggleEditing (value: boolean) {
        this.editing = value;

        if (this.editing) {
            setTimeout(()=>{ // Add a little delay to the focus, so the input is loaded before attempting to focus.
                this.accountNameInput.nativeElement.focus();
            },0);
        }
    }

}
