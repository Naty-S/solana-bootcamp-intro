import { Component, ViewChild, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { MatCard } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { injectPublicKey } from '@heavy-duty/wallet-adapter';

import { computedAsync } from 'ngxtension/computed-async';

import { ShyftApiService } from '../../core/services/shyft-api.service';


@Component({
  standalone: true,
  selector: 'solana-bootcamp-intro-transactions-section',
  imports: [
      DecimalPipe
    , MatCard
    , MatTableModule
    , MatSortModule
    , MatPaginatorModule
    , MatFormFieldModule
    , MatInputModule
  ],
  templateUrl: "./section.component.html"
})
export class TransactionsSectionComponent {

  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();

  readonly displayedColumns: string[] = [
    'Signature', 'Time', 'Instructions', 'By', 'From', 'To', 'Amount', 'Fee (SOL)'];
  
  currentPage = 0;

  @ViewChild(MatTableDataSource) transactions!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  readonly txs = computedAsync(
    () => {
      const tx = this._shyftApiService.getTransactions(this._publicKey()?.toBase58(), "");

      tx.subscribe((data) => {
        this.transactions = new MatTableDataSource(data);
        this.transactions.paginator = this.paginator;
        this.transactions.sort = this.sort;
      });

      return tx;
    }
  );

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.transactions.filter = filterValue.trim();

    if (this.transactions.paginator) this.transactions.paginator.firstPage();
  };

  handlePageEvent(pageEvent: PageEvent) {
    this.currentPage = pageEvent.pageIndex;
  };

}
