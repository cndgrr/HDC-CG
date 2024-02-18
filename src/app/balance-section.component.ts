import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { injectPublicKey } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

@Component({
  selector: 'cg-balance-section',
  imports: [MatCardModule, MatCard],
  standalone: true,
  template: `
    <mat-card class="w-[400px] px-4 py-8">
      <h2 class="text-center text-3xl mb-4">Balance</h2>
      @if (!account()) {
        <p class="text-center">Just spend by connecting your wallet</p>
      } @else {
        <div class="flex justify-center items-center gap-2">
          <img [src]="account()?.info?.image" class="w-16 h-16" />
          <p class="text-5xl font-bold">{{ account()?.balance }}</p>
        </div>
      }
    </mat-card>
  `,
})
export class BalanceSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();

  readonly account = computedAsync(() =>
    this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
  );
}
