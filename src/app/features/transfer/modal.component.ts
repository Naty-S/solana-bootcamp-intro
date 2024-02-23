import { Component, computed, inject } from '@angular/core';

import { injectTransactionSender } from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from "@heavy-duty/spl-utils";

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    this.transactionStatus() === 'sending' ||
    this.transactionStatus() === 'confirming' ||
    this.transactionStatus() === 'finalizing',
  );

  txErr = false;
  txOk = false;

  onTransfer(payload: TransferFormPayload) {

    this._matDialogRef.disableClose = true;

    this._transactionSender.send( ({ publicKey }) =>
      // Tener los valores en un archivo config
      createTransferInstructions({
        amount: payload.amount,
        mintAddress: "7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs", // SILLY
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
        })
        
        this._matDialogRef.close();
      },
      error: error => {
        this._matSnackBar.openFromComponent(TransferMessageComponent, {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          // announcementMessage: "mensaje de anuncio",// panelClass: ['toast'],
          data: {
            msg: error.toString() + ".\n 🚨 Error enviando",
            success: false
          }
        })
      },
      complete: () => { this._matDialogRef.disableClose = false; }
    });
  };

  onCancelTransfer() {
    this._matDialogRef.close();
  }
};
