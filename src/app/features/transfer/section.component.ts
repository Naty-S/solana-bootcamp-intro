/* 
boton transferir
*/
import { Component, OnInit, inject } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { TransferModalComponent } from './modal.component';


@Component({
  standalone: true,
  selector: 'solana-bootcamp-intro-transfer-section',
  imports: [MatButtonModule],
  template: `
    <section class="flex justify-center items-center gap-2">

    <!-- if (saldo insuficiente) 
      else (button) Advertencia que no tiene SOL para el fee?  -->

      <button type="button" (click)="onTransfer()" mat-raised-button color="primary">
        transferir SILLY
      </button>
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
