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
  template: `
    <form #form="ngForm" class="w-[400px]" (ngSubmit)="onSubmit(form)">
      <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Concepto</mat-label>
        <input
          name="memo"
          matInput
          type="text"
          placeholder="Pagar recibo"
          #memoControl="ngModel"
          [(ngModel)]="model.memo"
          required
        />
        <mat-icon matSuffix>description</mat-icon>
        
        @if (form.submitted && memoControl.errors) {
          <mat-error>
            @if (memoControl.errors["required"]) { El concepto es obligatorio. }
          </mat-error>
        } @else {
          <mat-hint>Motivo de la transferencia</mat-hint>
        }
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Monto</mat-label>
        <input
          name="amount"
          matInput
          type="number"
          min="0"
          placeholder="Monto a pagar"
          #amountControl="ngModel"
          [(ngModel)]="model.amount"
          required
        />
        <mat-icon matSuffix>attach_money</mat-icon>
        
        @if (form.submitted && amountControl.errors) {
          <mat-error>
            @if (amountControl.errors["required"]) { El monto es obligatorio. }
            @else if (amountControl.errors["min"]) { El monto debe ser mayor a cero. }
          </mat-error>
        } @else {
          <mat-hint>Monto de la transferencia</mat-hint>
        }
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-full mb-4">
        <mat-label>Destinatario</mat-label>
        <input
          name="receiverAddress"
          matInput
          type="text"
          placeholder="Destinatario (clave pública de la wallet)"
          #receiverAddressControl="ngModel"
          [(ngModel)]="model.receiverAddress"
          required
        />
        <mat-icon matSuffix>key</mat-icon>
        
        @if (form.submitted && receiverAddressControl.errors) {
          <mat-error>
            @if (receiverAddressControl.errors["required"]) { El destinatario es obligatorio. }
          </mat-error>
        } @else {
          <mat-hint>Wallet de Solana</mat-hint>
        }
      </mat-form-field>

      <footer class="flex justify-center">
        <button type="submit" mat-raised-button color="primary">
          Enviar
        </button>
      </footer>
    </form>
  `
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
