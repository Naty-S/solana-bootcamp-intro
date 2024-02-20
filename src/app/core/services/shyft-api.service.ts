import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { map, of } from 'rxjs';

import { TransactionsHistory } from '../models/transactions.model';


@Injectable({ providedIn: "root" })
export class ShyftApiService {

  private readonly _httpClietnt: HttpClient = inject(HttpClient);
  private readonly _header = { "x-api-key": "7c89JUFN8-tljDsA" };
  private readonly _mintUSDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
  private readonly _mintSILLY = "7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs"; // dir del contrato

  getAccount(publicKey: string | undefined | null, coin: string) {

    if (!publicKey) return of(null);

    const url = new URL("https://api.shyft.to/sol/v1/wallet/token_balance");

    url.searchParams.append("network", "mainnet-beta")
    url.searchParams.append("wallet", publicKey)
    url.searchParams.append("token", coin.includes("USD") ? this._mintUSDC : this._mintSILLY);

    return this._httpClietnt.get<{ result: { balance: number; info: { image: string } } }>
      (url.toString(), { headers: this._header })
      .pipe(map((response) => response.result));
  };

  getTransactions(publicKey: string | undefined | null, coin: string) {

    if (!publicKey) return of([]);

    const url = new URL("https://api.shyft.to/sol/v1/transaction/history");

    url.searchParams.append("network", "mainnet-beta")
    url.searchParams.append("tx_num", "100")
    url.searchParams.append("account", publicKey)
    // url.searchParams.append("token", coin.includes("USD") ? this._mintUSDC : this._mintSILLY);

    return this._httpClietnt.get<TransactionsHistory>(url.toString(), { headers: this._header })
      .pipe(map((response) => response.result ));
  };
};
