import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'sloth-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {

  @ViewChild('modalWrapper')
  modal!: ElementRef;

  @ViewChild('modalBackground')
  modalBackground!: ElementRef;

  @ViewChild('modalBody')
  modalBody!: ElementRef;

  @ViewChild('modalBorder')
  modalBorder!: ElementRef;

  @ViewChild('closeButton')
  closeButton!: ElementRef;

  private _angleX: number = 20;
  private _angleY: number = 20;
  private _angleTopLeft: boolean = true;
  private _angleTopRight: boolean = false;
  private _angleBottomLeft: boolean = false;
  private _angleBottomRight: boolean = true;
  private _showCloseButton: boolean = true;
  private _showBackground: boolean = true;

  constructor(private _renderer2: Renderer2) { }

  get angleX(): number {
    return this._angleX
  }

  @Input()
  set angleX(value: number) {
    this._angleX = value;
  }

  get angleY(): number {
    return this._angleY;
  }

  @Input()
  set angleY(value:number) {
    this._angleY = value;
  }

  get angleTopLeft(): boolean {
    return this._angleTopLeft;
  }

  @Input()
  set angleTopLeft(value:boolean) {
    this._angleTopLeft = value;
  }

  get angleTopRight(): boolean {
    return this._angleTopRight;
  }

  @Input()
  set angleTopRight(value:boolean) {
    this._angleTopRight = value;
  }

  get angleBottomLeft(): boolean {
    return this._angleBottomLeft;
  }

  @Input()
  set angleBottomLeft(value:boolean) {
    this._angleBottomLeft = value;
  }
  
  get angleBottomRight(): boolean {
    return this._angleBottomRight;
  }

  @Input()
  set angleBottomRight(value:boolean) {
    this._angleBottomRight = value;
  }

  get showCloseButton(): boolean {
    return this._showCloseButton;
  }

  @Input()
  set showCloseButton(value:boolean) {
    this._showCloseButton = value;
  }

  get showBackground(): boolean {
    return this._showBackground;
  }

  @Input()
  set showBackground(value:boolean) {
    this._showBackground = value;
  }

  ngAfterViewInit(): void {

    const modalX = this.modalBody.nativeElement.offsetLeft;
    const modalY = this.modalBody.nativeElement.offsetTop;
    const modalHeight = this.modalBody.nativeElement.clientHeight;
    const modalWidth = this.modalBody.nativeElement.clientWidth;

    const generatedBorder = this.generateModalBorder(modalX, modalY, modalWidth, modalHeight);
  
    const topLeftX = modalX - this._angleX;
    const topLeftY = modalY - this._angleY;
    const viewWidth = modalWidth + (2 * this._angleX);
    const viewHeight = modalHeight + (2* this._angleY);

    let svg = `<svg width="${viewWidth}" height="${viewHeight}" style="position: absolute; left: ${topLeftX}px; top: ${topLeftY}px" viewBox="0 0 ${viewWidth} ${viewHeight}">
                <path d="${generatedBorder}" fill="#1B252F" stroke="#EBDBB2"/>
              </svg>`

    this.modalBorder.nativeElement.innerHTML = svg;

    let topRightX = modalX + modalWidth - 4;
    let topRightY = modalY - this._angleY + 1;

    if (!this._showCloseButton) {
      this._renderer2.setAttribute(this.closeButton.nativeElement, 'style', `display: none;`);
    } else {
      this._renderer2.setAttribute(this.closeButton.nativeElement, 'style', `position:absolute; left: ${topRightX}px; top: ${topRightY}px;`);
    }

    if (!this.showBackground) {
      this._renderer2.setAttribute(this.modalBackground.nativeElement, 'style', `display: none;`);
    }

    this.hideModal();
  }

  ngOnInit(): void {
    if (!this._showBackground && (!this._showCloseButton || this._angleTopRight)) {
      this._showCloseButton = true;
      this._angleTopRight = false;
    }
    if (this._showCloseButton && this._angleTopRight) {
      this._angleTopRight = false;
    }
  }

  generateModalBorder (x: number, y:number, width: number, height: number): string {
    let startLeftX = x - this._angleX;
    let startLeftY = y;
    
    let output = `M0 ${this._angleY}`

    if (this._angleTopLeft) {
      output += ` l${this._angleX} ${-this._angleY}`;
    } else {
      output += ` v${-this._angleX}h${this._angleY}`;
    }

    output += ` h${width}`;

    if (this._angleTopRight) {
      output += ` l${this._angleX} ${this._angleY}`;
    } else {
      output += ` h${this._angleY}v${this._angleX}`;
    }

    output += ` v${height}`;

    if (this._angleBottomRight) {
      output += ` l${-this._angleX} ${this._angleY}`;
    } else {
      output += ` v${this._angleX}h${-this._angleY}`;
    }

    output += ` h${-width}`;

    if (this._angleBottomLeft) {
      output += ` l${-this._angleX} ${-this._angleY}`;
    } else {
      output += ` h${-this._angleY}v${-this._angleX}`;
    }

    output += ` v${-height}`;

    return output;
  }

  showModal () {
    this.setModalVisibilityState (false);
  }

  hideModal () {
    console.log("yo")
    this.setModalVisibilityState (true);
  }

  private setModalVisibilityState (hidden: boolean) {
    if (!this.modal) {
      return;
    }
    if (hidden) {
      this._renderer2.setAttribute(this.modal.nativeElement, 'style', 'display:none;');
    } else {
      this._renderer2.setAttribute(this.modal.nativeElement, 'style', 'display:block;');
    }
  }

  @HostListener('click', ['$event'])
  onClick (event: any) {
    if (event.target.classList.contains('sloth-modal-background')) {
      this.hideModal();
      return;
    }
  }

}
