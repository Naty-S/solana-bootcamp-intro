import { Component, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { injectPublicKey } from '@heavy-duty/wallet-adapter';

import { computedAsync } from 'ngxtension/computed-async';

import { ShyftApiService } from '../core/services/shyft-api.service';
import { Balance } from '../core/models/transactions.model';


@Component({
  standalone: true,
  selector: 'solana-bootcamp-intro-balance-section',
  imports: [MatTableModule, MatCard, MatListModule, MatIconModule, DecimalPipe],
  template: `
    <mat-card class="w-[400px] px-4">
      <h2 class="text-center text-3xl mb-4">Balance</h2>

      @if (!portfolio()) {
        <p class="text-center">Billetera no conectada</p>
      } @else {
        <div class="flex justify-center items-center gap-2">
          <!-- Mostrar lista de tokens en la wallet y poder filtrar/seleccionar cuales mostrar saldo -->
          <mat-list>
            <mat-list-item>
              <img matListItemIcon src="assets/solana-logo.png" class="w-16 h-16" />
              <div matListItemLine>SOL</div>
              <p matListItemTitle class="text-5xl font-bold">
                {{ portfolio()?.sol_balance | number }}
              </p>
            </mat-list-item>

            @for (token of tokens(); track $index) {
              <mat-list-item>
                <img matListItemIcon [src]="token.info.image" class="w-16 h-16" />
                <p matListItemLine>{{ token.info.symbol }}</p>
                <p matListItemTitle class="text-5xl font-bold">
                  {{ token.balance | number }}
                </p>
              </mat-list-item>
            }
          </mat-list>

          <!-- listar nfts -->
          <!-- listar colections -->
        </div>
      }
    </mat-card>
  `
})
export class BalanceSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();
  
  readonly tokens = input<Balance[]>([]);

  readonly sol = computedAsync(() =>
    this._shyftApiService.getSOLBalance(this._publicKey()?.toBase58())
  );

  readonly portfolio = computedAsync(() =>
    this._shyftApiService.getPortfolio(this._publicKey()?.toBase58())
  );

  // readonly token = computedAsync(() =>
  //   this._shyftApiService.getTokenBalance(this._publicKey()?.toBase58(), "")
  // );
}
