import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { injectPublicKey } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './shyft-api.service';
import { computedAsync } from 'ngxtension/computed-async';

@Component({
  standalone: true,
  imports: [RouterOutlet, HdWalletMultiButtonComponent],
  selector: 'cg-root',
  template: `
    <header class="pb-4 pt-16 relative">
      <h1 class="text-center text-5xl mb-4">CG Bank</h1>

      <div class="flex justify-center absolute top-4 right-4">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      @if (balance()) {
        <div
          class="flex justify-center items-center gap-2 absolute top-4 left-4"
        >
          <img src="assets/solana-logo.png" class="w-8 h-8" />
          <p class="font-bold">{{ balance()?.balance }}</p>
        </div>
      }
    </header>

    <main><router-outlet></router-outlet></main>
  `,
})
export class AppComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();

  readonly balance = computedAsync(() =>
    this._shyftApiService.getBalance(this._publicKey()?.toBase58()),
  );
}
