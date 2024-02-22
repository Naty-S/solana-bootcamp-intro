import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';


export interface TransferFormModel {
  memo: string | null,
  amount: number | null,
  receiverAddress: string | null
};

export interface TransferFormPayload {
  memo: string,
  amount: number,
  receiverAddress: string
};

@Component({
  standalone: true,
  selector: 'solana-bootcamp-intro-transfer-form',
  imports: [
      FormsModule
    , MatFormFieldModule
    , MatInput
    , MatIcon
    , MatButton
  ],
  templateUrl: "./form.component.html"
})

export class TransferFormComponent {

  readonly model: TransferFormModel = {
    memo: null,
    amount: null,
    receiverAddress: null
  };

  @Output() readonly submitForm = new EventEmitter<TransferFormPayload>();

  onSubmit(form: NgForm) {
    if (form.invalid ||
        this.model.amount == null ||
        this.model.memo == null ||
        this.model.receiverAddress == null
    ) {
      console.log("Formulario inválido")
    } else {
      this.submitForm.emit({
        memo: this.model.memo,
        amount: this.model.amount,
        receiverAddress: this.model.receiverAddress
      })
    }
  };
}
