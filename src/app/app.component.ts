import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { MatAnchor, MatButtonModule } from '@angular/material/button';

import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ConnectionStore } from '@heavy-duty/wallet-adapter';

import { ShyftApiService } from './core/services/shyft-api.service';


@Component({
  standalone: true,
  imports: [
      RouterLink
    , RouterOutlet
    , HdWalletMultiButtonComponent
    , MatAnchor
    , MatButtonModule
  ],
  selector: 'solana-bootcamp-intro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _connectionStore = inject(ConnectionStore);

  // If not using router-outlet
  // onCoinSelected(coin: any) { console.log(coin) ; this._coin = coin; };
  
  ngOnInit() {
    this._connectionStore.setEndpoint(this._shyftApiService.getEndpoint());
  }

};
