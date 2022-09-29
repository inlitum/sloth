import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { clone as _clone }                                                       from 'lodash';

@Component ( {
    selector:    'sloth-editable-label[text]',
    templateUrl: './editable-label.component.html',
    styleUrls:   [ './editable-label.component.scss' ],
} )
export class EditableLabelComponent implements OnInit {

    @ViewChild ( 'accountName' )
    accountNameInput!: ElementRef;

    @ViewChild ( 'save' )
    saveButton!: ElementRef;

    @Input ()
    set text ( value: string ) {
        this._text = value;
    }

    get text (): string {
        return this._text;
    }

    @Input ()
    disabled: boolean = false;

    editing: boolean = false;

    private originalText: string = '';
    private _clicking: boolean   = false;
    private _text: string        = '';

    @Output ()
    textChanged: EventEmitter<string> = new EventEmitter<string> ()

    /**
     * Check if the text has been modified.
     */
    get modified (): boolean {
        return this.text !== this.originalText;
    }

    ngOnInit (): void {
        this.originalText = _clone ( this.text );
    }

    /**
     * Toggle the editing to the value provided.
     */
    toggleEditing ( state: boolean ) {
        if ( state && this.disabled ) {
            return;
        }

        this.editing = state;
        // Set a timeout so the element can focus, properly.
        // Attempting to focus on the input before timeout will cause errors as the element
        // won't be registered.
        if ( this.editing ) {
            setTimeout ( () => {
                this.accountNameInput.nativeElement.focus ();
            }, 0 );
        } else {
            if ( this.modified ) {
                this.originalText = _clone ( this.text );
                this.textChanged.next ( this.text );
            }
        }
    }

    // Element event handlers.

    /**
     * Toggle editing if the user clicks the label double clicks.
     */
    handleLabelClick ( event: MouseEvent ) {
        if ( event.detail == 2 ) {
            // Toggle editing.
            this.toggleEditing ( true );
        }
    }

    /**
     * Check key presses for enter or escape, to switch back to label.
     */
    handleKeyUp ( event: KeyboardEvent ) {
        if ( event.key === 'Enter' || event.key === 'Escape' ) {
            this.toggleEditing ( false );
        }
    }

    /**
     * Handles the mouse state of the save button.
     * @param clicking The current clicking state.
     */
    clicking ( clicking: boolean ) {
        // Set the clicking state.
        this._clicking = clicking;
        // If the mouseup event has been fired. use the internal toggleEditing function.
        if ( !clicking ) {
            this.toggleEditing ( false );
        }
    }

    /**
     * Handles the input's focus out event to toggle editing.
     */
    handleFocusOut () {
        // If the user is already clicking the save button, don't use the focus toggle.
        if ( !this._clicking ) {
            // Toggle editing to false
            this.toggleEditing ( false );
        }
    }

    /**
     * Reverts the input text back to the original text.
     */
    revertInput () {
        this.text = _clone ( this.originalText );
    }
}
