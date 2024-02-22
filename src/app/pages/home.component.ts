import { Component, EventEmitter, Output } from "@angular/core";

import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';

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
          <solana-bootcamp-intro-balance-section />
        </mat-grid-tile>
        <mat-grid-tile>
          <solana-bootcamp-intro-transfer-section />
        </mat-grid-tile>
      </mat-grid-list>
    
      <solana-bootcamp-intro-transactions-section />

    </section>
  `
})
export class HomeComponent {
  
};
