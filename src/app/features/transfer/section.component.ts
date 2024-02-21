/* 
boton transferir
*/
import { Component, OnInit, inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { TransferModalComponent } from './modal.component';


@Component({
  standalone: true,
  selector: 'solana-bootcamp-intro-transfer-section',
  imports: [],
  template: `
    <section>
      <button (click)="onTransfer()">Transfer</button>
    </section>
  `
})

export class TransferSectionComponent implements OnInit {
  
  private readonly _matDialog = inject(MatDialog);

  constructor() { }

  ngOnInit() { }

  onTransfer() {
    this._matDialog.open(TransferModalComponent)
  };
}
