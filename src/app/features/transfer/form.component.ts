import { Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule, MatOption } from '@angular/material/select';

import { Balance } from '../../core/models/transactions.model';
import { TransferMessageComponent } from './message.component';


export interface TransferFormModel {
  memo: string | null;
  amount: number | null;
  receiverAddress: string | null;
  token: Balance | null
};

export interface TransferFormPayload {
  memo: string;
  amount: number;
  receiverAddress: string;
  mintAddress: string
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
    , MatSelectModule
    , MatOption
  ],
  templateUrl: "./form.component.html"
})

export class TransferFormComponent {

  readonly model: TransferFormModel = {
    memo: null,
    amount: null,
    receiverAddress: null,
    token: null
  };

  private readonly _matSnackBar = inject(MatSnackBar);

  readonly locked = input<boolean>(false);
  @Input() status = "";
  @Input() tokens: Balance[] = [];
  
  @Output() readonly submitForm = new EventEmitter<TransferFormPayload>();
  @Output() readonly cancelTransfer = new EventEmitter();
  
  onSubmit(form: NgForm) {

    if (form.invalid ||
        this.model.amount == null ||
        this.model.memo == null ||
        this.model.receiverAddress == null || 
        this.model.token == null
    ) {
      this._matSnackBar.openFromComponent(TransferMessageComponent, {
        duration: 4000,
        horizontalPosition: 'end',
        verticalPosition: 'top',// panelClass: ["background-color: #00000000", "box-shadow: none"],
        // announcementMessage: "mensaje de anuncio",
        data: {
          msg: "⚠️ Formulario inválido",
          success: false
        }
      })

    } else {
      this.submitForm.emit({
        memo: this.model.memo,
        amount: this.model.amount,
        receiverAddress: this.model.receiverAddress,
        mintAddress: this.model.token.address
      });
    };
  };

  onCancel() {
    this.cancelTransfer.emit();
  };
}
