import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { injectPublicKey } from '@heavy-duty/wallet-adapter';
import { computedAsync } from 'ngxtension/computed-async';
import { ShyftApiService } from './shyft-api.service';

@Component({
  selector: 'cg-transactions-section',
  imports: [MatCard, MatTableModule],
  standalone: true,
  template: `
    <mat-card class="w-[500px] px-4 py-8">
      <h2 class="text-center text-3xl mb-4">Spending History</h2>

      @if (!transactions()) {
        <p class="text-center">Just spend by connecting your wallet</p>
      } @else if (transactions()?.length === 0) {
        <p class="text-center">You should be spending more.</p>
      } @else {
        <table mat-table [dataSource]="transactions() ?? []">
          <ng-container matColumnDef="type">
            <th mat-header-cell *matHeaderCellDef>Type</th>
            <td mat-cell *matCellDef="let element">{{ element.type }}</td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef>Status</th>
            <td mat-cell *matCellDef="let element">
              {{ element.status }}
            </td>
          </ng-container>

          <ng-container matColumnDef="timestamp">
            <th mat-header-cell *matHeaderCellDef>Timestamp</th>
            <td mat-cell *matCellDef="let element">
              {{ element.timestamp }}
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      }
    </mat-card>
  `,
})
export class TransactionsSectionComponent {
  private readonly _shyftApiService = inject(ShyftApiService);
  private readonly _publicKey = injectPublicKey();

  readonly displayedColumns = ['type', 'status', 'timestamp'];
  readonly transactions = computedAsync(() =>
    this._shyftApiService.getTransactions(this._publicKey()?.toBase58()),
  );
}
