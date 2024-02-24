import { Component, Inject, computed, inject } from '@angular/core';

import { injectTransactionSender } from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from "@heavy-duty/spl-utils";

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Balance } from '../../core/models/transactions.model';
import { TransferFormComponent, TransferFormPayload } from './form.component';
import { TransferMessageComponent } from './message.component';


@Component({
  standalone: true,
  selector: 'solana-bootcamp-intro-transfer-modal',
  imports: [TransferFormComponent],
  template: `
    <div class="px-8 pt-16 pb-8">
      <h2 class="text-3xl text-center mb-8">Transfer</h2>

      <solana-bootcamp-intro-transfer-form
        [locked]="isProcessing()"
        [status]="transactionStatus()"
        [tokens]="data"
        (submitForm)="onTransfer($event)"
        (cancelTransfer)="onCancelTransfer()"
      />
    </div>
  `
})

export class TransferModalComponent {

  private readonly _matDialogRef = inject(MatDialogRef);
  private readonly _matSnackBar = inject(MatSnackBar);
  private readonly _transactionSender = injectTransactionSender();

  readonly transactionStatus = computed(() => this._transactionSender().status);
  readonly isProcessing = computed(() =>
    // this.transactionStatus() === 'pending' ||
    this.transactionStatus() === 'sending' ||
    this.transactionStatus() === 'confirming' ||
    this.transactionStatus() === 'finalizing' ||
    this.transactionStatus() === 'finalized' ||
    this.transactionStatus() === 'failed',
  );

  constructor(@Inject(MAT_DIALOG_DATA) public data: Balance[]) {}

  onTransfer(payload: TransferFormPayload) {

    this._matDialogRef.disableClose = true;

    this._transactionSender.send( ({ publicKey }) =>
      // Tener los valores en un archivo config
      createTransferInstructions({
        amount: payload.amount * 10 ** payload.decimals,
        mintAddress: payload.mintAddress,
        receiverAddress: payload.receiverAddress,
        senderAddress: publicKey.toBase58(),
        fundReceiver: true, // Intenta crear la associated token account (ATA)
        memo: payload.memo
      })
    ).subscribe({
      next: (signature) => {
        this._matSnackBar.openFromComponent(TransferMessageComponent, {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          // announcementMessage: "mensaje de anuncio",
          data: {
            msg: `🎉 Exito al enviar. Ver explorador: https://explorer.solana.com/tx/${signature}`,
            success: true
          }
        });
        
        this._matDialogRef.close();
      },
      error: error => {
        this._matSnackBar.openFromComponent(TransferMessageComponent, {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          // announcementMessage: "mensaje de anuncio",// panelClass: ['toast'],
          data: {
            msg: `🚨 Error enviando: ${error.toString()}`,
            success: false
          }
        });

        this._matDialogRef.close();
      },
      complete: () => { this._matDialogRef.disableClose = false; }
    });
  };

  onCancelTransfer() {
    this._matDialogRef.close();
  }
};
