import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { injectPublicKey } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';
import { TransferModalComponent } from './transfer-modal.component';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'cg-balance-section',
  imports: [MatTableModule, MatCard, MatButton],
  standalone: true,
  template: `
    <mat-card class="w-[400px] px-4 py-8">
      <h2 class="text-center text-3xl mb-4">Balance</h2>
      @if (!account()) {
        <p class="text-center">Just spend by connecting your wallet</p>
      } @else {
        <div class="flex justify-center items-center gap-2 mb-4">
          <img [src]="account()?.info?.image" class="w-16 h-16" />
          <p class="text-5xl font-bold">{{ account()?.balance }}</p>
        </div>
      }
      <footer class="flex justify-center items-center gap-2">
        <button mat-raised-button (click)="onTransfer()" color="primary">
          Let's spend...
        </button>
      </footer>
    </mat-card>
  `,
})
export class BalanceSectionComponent {
  private readonly _matDioalog = inject(MatDialog);
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();

  readonly account = computedAsync(() =>
    this._shyftApiService.getAccount(this._publicKey()?.toBase58()),
  );
  onTransfer() {
    this._matDioalog.open(TransferModalComponent);
  }
}
