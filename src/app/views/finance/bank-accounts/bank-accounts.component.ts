import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Account } from 'src/app/models/finance/account.model';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: [ './bank-accounts.component.scss' ]
})
export class BankAccountsComponent implements OnInit, AfterViewInit {

  @ViewChild(ModalComponent)
  modal!: ModalComponent

  @ViewChild('contentWrapper')
  contentWrapper!: ElementRef;

  @ViewChild('gridContainer')
  gridContainer!: ElementRef;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  accounts: Account[] = [ ];

  layoutType: string = 'grid';
  loaded: boolean = false;
  private _buffer: number = 0;

  constructor(
    private _renderer: Renderer2,
    private _changeDetector: ChangeDetectorRef
  ) { 

    for (let i = 0; i < 100; i++) {
      let a = {
        id: i + 1,
        initialBalance: i * (i + 0.123),
        name: `Something ${i + 1}`,
        userId: 1
      }

      let account = new Account(a);
      this.accounts.push(account);
    }
  }

  ngAfterViewInit(): void {
    let screenHeight = window.innerHeight;
    let contentWrapperHeight = this.contentWrapper.nativeElement.clientHeight;
    this._buffer = screenHeight - contentWrapperHeight;
    this.resize();
    this.loaded = true;
    this._changeDetector.detectChanges();
  }

  ngOnInit(): void {
  }

  createAccount(): void {
    if (!this.modal) {
      return;
    }

    this.modal.showModal();
  }

  openAccount (accountId: number) {
    console.log(accountId);
  }

  @HostListener('window:resize')
  handleResize () {
    this.resize();
  }

  private resize () {
    let screenHeight = window.innerHeight;
    let height = screenHeight - this._buffer;
    this._renderer.setAttribute (this.gridContainer.nativeElement, 'style', `height: ${height}px; overflow-y: auto`)
  }
}