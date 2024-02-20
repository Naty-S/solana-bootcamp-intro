import { Component, EventEmitter, Output } from "@angular/core";
import { MatAnchor, MatButtonModule } from '@angular/material/button';


@Component({
  standalone: true,
  selector: 'solana-bootcamp-intro-home',
  imports: [
      MatAnchor
    , MatButtonModule
  ],
  template: `
    <section>
      <h2 class="text-center text-3xl">Home</h2>

      <p class="text-center">Seleccione la moneda a consultar</p>
      <ul class="flex justify-center gap-4">
        <li>
          <button mat-raised-button type="button" (click)="selectCoin('USDC')">USDC</button>
        </li>
        <li>
          <button mat-raised-button type="button" (click)="selectCoin('SILLY')">SILLY</button>
        </li>
      </ul>
    </section>
  `
})
export class HomeComponent {
  
  @Output() coin = new EventEmitter<string>();

  public selectCoin(coin: string): void {
    this.coin.emit(coin);
  }
};
