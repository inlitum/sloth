import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators }                                                                  from '@angular/forms';
import { finalize }                                                                                            from 'rxjs';
import { ModalComponent }                                                                                      from 'src/app/components/modal/modal.component';
import { Account }                                                                                             from 'src/app/models/finance/account.model';
import { AccountsService }                                                                                     from '../../../services/data-services/accounts.service';
import { HeaderService }                                                                                       from '../../../services/header.service';

@Component ({
                selector   : 'app-bank-accounts',
                templateUrl: './bank-accounts.component.html',
                styleUrls  : [ './bank-accounts.component.scss' ],
            })
export class BankAccountsComponent implements OnInit, AfterViewInit {

    @ViewChild (ModalComponent)
    modal!: ModalComponent

    @ViewChild ('contentWrapper')
    contentWrapper!: ElementRef;

    @ViewChild ('gridContainer')
    gridContainer!: ElementRef;

    public accountCreationForm = new FormGroup ({
        name: new FormControl({value: '', disabled: false}, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]),
        startingAmount: new FormControl({value: '', disabled: false}, [Validators.required, Validators.pattern('^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\\.[0-9]{2})?$')])
                                                 })

    accounts: Account[] = [];

    layoutType: string      = 'grid';
    loaded: boolean         = false;
    private _buffer: number = 0;

    constructor (
        private _renderer: Renderer2,
        private _changeDetector: ChangeDetectorRef,
        private _accountsService: AccountsService,
        private _headerService: HeaderService,
    ) {
    }

    ngAfterViewInit (): void {
        let screenHeight         = window.innerHeight;
        let contentWrapperHeight = this.contentWrapper.nativeElement.clientHeight;
        this._buffer             = screenHeight - contentWrapperHeight;
        this.resize ();
        this.loaded = true;
        this._changeDetector.detectChanges ();
    }

    ngOnInit (): void {
        this.getAccounts ();
    }

    showAccountCreationModal (): void {
        if (!this.modal) {
            return;
        }

        this.modal.showModal ();
    }

    openAccount (accountId: number) {
        console.log (accountId);
    }

    @HostListener ('window:resize')
    handleResize () {
        this.resize ();
    }

    private resize () {
        let screenHeight = window.innerHeight;
        let height       = screenHeight - this._buffer;
        this._renderer.setAttribute (this.gridContainer.nativeElement, 'style', `height: ${ height }px; overflow-y: auto`)
    }

    private getAccounts () {
        this._headerService.startLoadingForKey ('accounts');
        this._accountsService.getAllAccounts ()
            .pipe (
                finalize (() => {
                    this._headerService.stopLoadingForKey ('accounts');
                }),
            ).subscribe ((accounts) => {
                             this.accounts = accounts.data;
                         },
        )
    }

    createAccount () {
        if (this.accountCreationForm.valid) {
            let name = this.accountCreationForm.get('name')?.value;
            let startingAmount = this.accountCreationForm.get('startingAmount')?.value;

            if (name == null || startingAmount == null) {
                return;
            }
            this._headerService.startLoadingForKey('account-creation');

            let s = Number.parseFloat(startingAmount);

            let account = {
                account_name: name,
                starting_amount: s
            }

            this._accountsService.createAccount(account)
                .pipe(
                    finalize(() => {
                        this._headerService.stopLoadingForKey('account-creation');
                    })
                ).subscribe(() => {
                    this.getAccounts();
                    this.modal.hideModal();
                    this.accountCreationForm.reset();
            })
        }
    }
}
