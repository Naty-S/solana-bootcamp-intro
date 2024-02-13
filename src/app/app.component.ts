import { Component, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { toSignal } from "@angular/core/rxjs-interop";
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { WalletStore } from '@heavy-duty/wallet-adapter';

import { computedAsync } from 'ngxtension/computed-async';

import { ShyftApiService } from './shyft-api.service';
import { HomeComponent } from './home.component';

@Component({
  standalone: true,
  imports: [
      RouterLink
    , RouterOutlet
    , DecimalPipe
    , MatAnchor
    , MatButtonModule
    , MatListModule
    , HdWalletMultiButtonComponent
    , HomeComponent
  ],
  selector: 'solana-bootcamp-intro-root',
  template: `
    <header class="px-16 pt-24 pb-8">
      
      <h1 class="text-center text-5xl mb-4">Solana Acoount</h1>

      <div class="flex justify-center">
        <hd-wallet-multi-button/>
      </div>

      <nav>
        <ul class="flex justify-center gap-4">
          <li>
            <a [routerLink]="['']" mat-raised-button>Home</a>
          </li>
          <li>
            <a [routerLink]="['settings']" mat-raised-button>Settings</a>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-outlet (activate)="onActive($event)" />

      @if (account()) {
        <div class="absolute left-1/2 transform-translate-x-1/2 top-4 flex items-center gap-2">
          <img [src]="account()?.info?.image" class="w-10 h-10" />
          <p class="text-3xl font-bold">
            {{ account()?.balance }}
          </p>
        </div>
      }

      <!-- If not using router-outlet -->
      <!-- <solana-bootcamp-intro-home (coin)="onCoinSelected($event)" /> -->
    </main>
  `
})
export class AppComponent {

  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);
  private _coin = signal('');

  onActive(component: HomeComponent) {

    if (component.coin != null) {
      component.coin.subscribe((newCoin: string) => {
        this._coin.set(newCoin);
      });
    }
  }

  // If not using router-outlet
  // onCoinSelected(coin: any) { console.log(coin) ; this._coin = coin; };

  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58(), this._coin().toString()),
    { requireSync: true }
  );
}
