import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { injectPublicKey } from '@heavy-duty/wallet-adapter';

import { computedAsync } from 'ngxtension/computed-async';

import { ShyftApiService } from '../core/services/shyft-api.service';


@Component({
  standalone: true,
  selector: 'solana-bootcamp-intro-balance-section',
  imports: [MatTableModule, MatCard, DecimalPipe],
  template: `
    <mat-card class="w-[400px] px-4">
      <h2 class="text-center text-3xl mb-4">Balance</h2>

      @if (!token()) {
        <p class="text-center">Conecta tu wallet para ver tu balance.</p>
      } @else {
        <div class="flex justify-center items-center gap-2">
          <img [src]="token()?.info?.image" class="w-16 h-16" />
          <p class="text-5xl font-bold">
            {{ token()?.balance | number }}
          </p>
          <!-- mostrar saldo SOL -->
          <!-- Mostrar lista de tokens en la wallet y 
              poder filtrar/seleccionar cuales mostrar saldo -->
        </div>
      }
    </mat-card>
  `
})
export class BalanceSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();
  
  readonly sol = computedAsync(() =>
    this._shyftApiService.getSOLBalance(this._publicKey()?.toBase58()),
  );

  readonly token = computedAsync(() =>
    this._shyftApiService.getTokenBalance(this._publicKey()?.toBase58(), ""),
  );
}
