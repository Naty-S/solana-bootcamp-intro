import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';

@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent],
  selector: 'solana-bootcamp-intro-root',
  template: `
    <header class="px-16 pt-24 pb-8">
      <h1 class="text-center text-5xl mb-4">App component Header</h1>
      <div class="flex justify-center">
        <hd-wallet-multi-button/>
      </div>
    </header>
  `
})
export class AppComponent {
  title = 'solana-bootcamp-intro';
}
