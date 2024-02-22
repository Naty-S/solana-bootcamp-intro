import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { map, of } from 'rxjs';

import { TokenBalance, Portfolio, TransactionsHistory, TokensBalance } from '../models/transactions.model';


@Injectable({ providedIn: "root" })
export class ShyftApiService {

  private readonly _httpClient: HttpClient = inject(HttpClient);
  private readonly _key = "7c89JUFN8-tljDsA";
  private readonly _header = { "x-api-key": this._key };
  private readonly _mintUSDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
  private readonly _mintSILLY = "7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs"; // dir del contrato

  /*  */
  getSOLBalance(publicKey: string | undefined | null) {
    
    if (!publicKey) return of(null);

    const url = new URL('https://api.shyft.to/sol/v1/wallet/balance');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey);

    return this._httpClient.get<{ result: { balance: number }}>(url.toString(), { headers: this._header })
      .pipe(map((response) => response.result));
  }

  /*  */
  getTokenBalance(publicKey: string | undefined | null, mint: string) {

    if (!publicKey) return of(null);

    const url = new URL("https://api.shyft.to/sol/v1/wallet/token_balance");

    url.searchParams.append("network", "mainnet-beta")
    url.searchParams.append("wallet", publicKey)
    url.searchParams.append("token", mint);

    return this._httpClient.get<TokenBalance>(url.toString(), { headers: this._header })
      .pipe(map((response) => response.result));
  };

  /*  */
  getTokensBalance(publicKey: string | undefined | null) {
    
    if (!publicKey) return of(null);

    const url = new URL('https://api.shyft.to/sol/v1/wallet/all_tokens');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey);

    return this._httpClient.get<TokensBalance>(url.toString(), { headers: this._header })
      .pipe(map((response) => response.result));
  
  };

  /*  */
  getPortfolio(publicKey: string | undefined | null) {
    
    if (!publicKey) return of(null);

    const url = new URL('https://api.shyft.to/sol/v1/wallet/get_portfolio');

    url.searchParams.set('network', 'mainnet-beta');
    url.searchParams.set('wallet', publicKey);

    const portfolio = this._httpClient.get<Portfolio>(url.toString(), { headers: this._header })
      .pipe(map((response) => response.result));
  
      // get token info
      // portfolio.subscribe((data) => {

      //   let tokens = [];

      //   for (let index = 0; index < data.num_tokensh; index++) {
      //     tokens.push(this.getTokenBalance(publicKey, data.tokens[index].address));
      //   };

      //   data.tokens = tokens
      // });

    return portfolio;
  };

  /*  */
  getTransactions(publicKey: string | undefined | null) {

    if (!publicKey) return of([]);

    const url = new URL("https://api.shyft.to/sol/v1/transaction/history");

    url.searchParams.append("network", "mainnet-beta")
    url.searchParams.append("tx_num", "100")
    url.searchParams.append("account", publicKey)
    // url.searchParams.append("token", coin.includes("USD") ? this._mintUSDC : this._mintSILLY);

    return this._httpClient.get<TransactionsHistory>(url.toString(), { headers: this._header })
      .pipe(map((response) => response.result ));
  };

  /*  */
  getEndpoint() {
    const url = new URL("https://rpc.shyft.to");
    
    url.searchParams.set("api_key", this._key);
    
    return url.toString();
  };
};
