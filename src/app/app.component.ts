import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { injectPublicKey } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './shyft-api.service';
import { computedAsync } from 'ngxtension/computed-async';
import { MatDialog } from '@angular/material/dialog';
import { TransferModalComponent } from './transfer-modal.component';
import { MatButton } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [RouterOutlet, HdWalletMultiButtonComponent, MatButton],
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
    <div class="flex justify-center mb-5">
      <button mat-raised-button (click)="onTransfer()" color="primary">
        Let's spend...
      </button>
    </div>
    <main><router-outlet></router-outlet></main>
    <footer class="my-4 text-center px-3 py-3 text-black bg-white">
      You should be spending more...
    </footer>
  `,
})
export class AppComponent {
  //onTransfer() {
  //throw new Error('Method not implemented.');
  //}
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();
  private readonly _matDioalog = inject(MatDialog);

  readonly balance = computedAsync(() =>
    this._shyftApiService.getBalance(this._publicKey()?.toBase58()),
  );

  onTransfer() {
    this._matDioalog.open(TransferModalComponent);
  }
}
