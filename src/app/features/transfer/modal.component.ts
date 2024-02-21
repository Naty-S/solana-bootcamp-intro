import { Component } from '@angular/core';

import { injectTransactionSender } from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from "@heavy-duty/spl-utils";

import { TransferFormComponent, TransferFormPayload } from './form.component';


@Component({
  standalone: true,
  selector: 'solana-bootcamp-intro-transfer-modal',
  imports: [TransferFormComponent],
  template: `
    <div class="px-8 pt-16 pb-8">
      <h2 class="text-3xl text-center mb-8">Transfer</h2>

      <solana-bootcamp-intro-transfer-form (submitForm)="onTransfer($event)" />
    </div>
  `
})

export class TransferModalComponent {

  private readonly _transactionSender = injectTransactionSender();

  onTransfer(payload: TransferFormPayload) {

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
      next: (signature) => {},
      error: error => console.log(error),
      complete: () => console.log("Completed!!")
    });
  };
}
