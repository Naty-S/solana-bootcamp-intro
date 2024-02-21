import { Component } from '@angular/core';

import { TransferFormComponent } from './form.component';


@Component({
  standalone: true,
  selector: 'solana-bootcamp-intro-transfer-modal',
  imports: [TransferFormComponent],
  template: `
    <div class="px-8 py-16">
      <h2 class="text-3xl">Transfer</h2>
      
      <solana-bootcamp-intro-transfer-form (submiForm)="onTransfer()" />
    </div>
  `
})

export class TransferModalComponent {

  onTransfer() {};
}
