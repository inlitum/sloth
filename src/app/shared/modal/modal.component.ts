import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { isArray as _isArray, isNumber as _isNumber, pad }                                              from 'lodash';
import { DomSanitizer }                                                              from '@angular/platform-browser';

@Component ({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: [ './modal.component.scss' ]
})
export class ModalComponent implements OnInit, AfterViewInit {

    @ViewChild('modalBackground')
    modalBackground!: ElementRef;

    private width: number = 0;
    private height: number = 0;

    thing: string = '';

    constructor (private renderer: Renderer2, private sanitizer: DomSanitizer, private changeDetector: ChangeDetectorRef) {
    }

    ngOnInit (): void {
    }

    genereateClipPath () {

    }

    ngAfterViewInit (): void {

        if (!this.modalBackground) {
            console.log('bru')
            return;
        }

        let me = this.modalBackground.nativeElement;

        this.width = me.offsetWidth;
        this.height = me.offsetHeight;

        let padding = 16;

        this.thing = `polygon(
            0 ${padding}, /* top left */
            ${padding} 0, /* top left */
            ${this.width - padding} 0, /* top right */
            ${this.width} ${padding}, /* top right */
            ${this.width} ${this.width - padding}, /* bottom right */
            ${this.width - padding} ${this.width}, /* bottom right */
            ${padding} ${this.width}, /* bottom left */
            0 ${this.width - padding} /* bottom left */
        );`

        this.sanitizer.bypassSecurityTrustStyle(this.thing);
        // this.renderer.setStyle(me, 'clip-path', 'thing');

        this.changeDetector.detectChanges();
    }
}
