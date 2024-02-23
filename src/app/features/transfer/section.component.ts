/* 
boton transferir
*/
import { Component, Input, OnInit, inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { TransferModalComponent } from './modal.component';
import { Balance } from '../../core/models/transactions.model';


@Component({
  standalone: true,
  selector: 'solana-bootcamp-intro-transfer-section',
  imports: [MatButtonModule],
  template: `
    <section class="flex justify-center items-center gap-2">
      <button
        mat-raised-button
        color="primary"
        type="button"
        (click)="onTransfer()"
      >
        transferir
      </button>
    </section>
  `
})

export class TransferSectionComponent implements OnInit {
  
  private readonly _matDialog = inject(MatDialog);

  @Input() tokens!: Balance[];

  constructor() { }

  ngOnInit() { }

  onTransfer() {
    this._matDialog.open(TransferModalComponent, {
      data: this.tokens
    })
  };
}
