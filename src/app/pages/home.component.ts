import { Component, inject } from "@angular/core";

import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

import { injectPublicKey } from "@heavy-duty/wallet-adapter";

import { computedAsync } from "ngxtension/computed-async";

import { ShyftApiService } from "../core/services/shyft-api.service";
import { BalanceSectionComponent } from "../features/balance-section.component";
import { TransactionsSectionComponent } from "../features/trasactions/section.component";
import { TransferSectionComponent } from "../features/transfer/section.component";


@Component({
  standalone: true,
  selector: 'solana-bootcamp-intro-home',
  imports: [
      MatAnchor
    , MatButtonModule
    , MatGridListModule
    , BalanceSectionComponent
    , TransferSectionComponent
    , TransactionsSectionComponent
  ],
  template: `
    <section>
      <h2 class="text-center text-3xl">Home</h2>

      <mat-grid-list cols="2" rowHeight="2:1">
        <mat-grid-tile>
          <solana-bootcamp-intro-balance-section [tokens]="tokens() ?? []" />
        </mat-grid-tile>
        <mat-grid-tile>
          <solana-bootcamp-intro-transfer-section [tokens]="tokens() ?? []" />
        </mat-grid-tile>
      </mat-grid-list>
    
      <solana-bootcamp-intro-transactions-section />

    </section>
  `
})
export class HomeComponent {
  
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();

  readonly tokens = computedAsync(() =>
    this._shyftApiService.getTokensBalance(this._publicKey()?.toBase58())
  );

};
