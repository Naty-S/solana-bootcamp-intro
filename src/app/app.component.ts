import { Component, inject, signal, ViewChild } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { toSignal } from "@angular/core/rxjs-interop";

import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';

import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { WalletStore } from '@heavy-duty/wallet-adapter';

import { computedAsync } from 'ngxtension/computed-async';

import { ShyftApiService } from './core/services/shyft-api.service';
import { HomeComponent } from './home.component';
import { TransferModalComponent } from './features/transfer/modal.component';


@Component({
  standalone: true,
  imports: [
      RouterLink
    , RouterOutlet
    , HdWalletMultiButtonComponent
    , DecimalPipe
    , DatePipe
    , MatAnchor
    , MatButtonModule
    , MatTableModule
    , MatSortModule
    , MatPaginatorModule
    , MatFormFieldModule
    , MatInputModule
    , HomeComponent
  ],
  selector: 'solana-bootcamp-intro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _walletStore = inject(WalletStore);
  private readonly _matDialog = inject(MatDialog);
  private readonly _publicKey = toSignal(this._walletStore.publicKey$);
  private _coin = signal('');
  
  currentPage = 0;
  displayedColumns: string[] = ['Signature', 'Time', 'Instructions', 'By', 'From', 'To', 'Amount', 'Fee (SOL)'];

  @ViewChild(MatTableDataSource) dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // If not using router-outlet
  // onCoinSelected(coin: any) { console.log(coin) ; this._coin = coin; };
  
  readonly account = computedAsync(
    () => this._shyftApiService.getAccount(this._publicKey()?.toBase58(), this._coin().toString()),
    { requireSync: true }
  );

  readonly txs = computedAsync(
    () => {
      const tx = this._shyftApiService.getTransactions(this._publicKey()?.toBase58(), this._coin().toString());
      
      tx.subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
      
      return tx;
    },
    { requireSync: true }
  );

  onActive(component: HomeComponent) {

    if (component.coin != null) {
      component.coin.subscribe((newCoin: string) => {
        this._coin.set(newCoin);
      });
    }
  };

  applyFilter(event: Event) {
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };

  handlePageEvent(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
  };

  onTransfer() {
    this._matDialog.open(TransferModalComponent)
  };
};
