import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, of } from 'rxjs';

@Injectable({ providedIn: "root" })
export class ShyftApiService {

  private readonly _httpClietnt: HttpClient = inject(HttpClient);
  private readonly _header = { "x-api-key": "7c89JUFN8-tljDsA" };
  //private readonly _mint = "EPjFWdd5AufqSSqeM2qNlxzybapC8G4wEGGkZwy";
  private readonly _mint = "7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs"; // dir del contrato

  getAccount(publicKey: string | undefined | null) {

    if (!publicKey) return of(null);

    const url = new URL("https://api.shyft.to/sol/v1/wallet/token_balance");

    url.searchParams.append("network", "mainnet-beta")
    url.searchParams.append("wallet", publicKey)
    url.searchParams.append("token", this._mint)

    return this._httpClietnt.get<{ result: { balance: number; info: {image: string} } }>
    (url.toString(), { headers: this._header })
    .pipe(map((response) => response.result));
  }
};
