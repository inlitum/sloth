import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Account } from 'src/app/models/finance/account.model';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html'
})
export class BankAccountsComponent implements OnInit {

  @ViewChild(ModalComponent)
  modal!: ModalComponent

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  accounts: Account[] = [ ];

  constructor() { 
    let a = {
      id: 1,
      name: "Something",
      currentAmount: 19.20,
      userId: 1
    }

    let account = new Account(a);

    this.accounts.push(account);

    console.log(account);
  }

  ngOnInit(): void {
  }

  createAccount(): void {
    console.log('Ayo... im creating an account.')
    if (!this.modal) {
      return;
    }

    this.modal.showModal();
  }
}
