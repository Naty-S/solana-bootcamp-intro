import { Component, Inject } from '@angular/core';

import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'solana-bootcamp-intro-transfer-modal-snackbar',
  template: `
    <div [class]="data.success ? 'alert alert-success' : 'alert alert-error'">

      @if (data.success) {
        <!-- succes icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6"
          fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      } @else {
        <!-- error icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6"
          fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      }

      <span>{{ data.msg }}.</span>
    </div>
  `,
})
export class TransferMessageComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { msg: string, success: boolean }
  ) {
  };
};
