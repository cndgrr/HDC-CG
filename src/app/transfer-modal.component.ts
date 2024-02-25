import { Component } from '@angular/core';
import {
  JustspendFormComponent,
  transferFormPayload,
} from './transfer-form.component';
import { injectTransactionSender } from '@heavy-duty/wallet-adapter';
import { createTransferInstructions } from '@heavy-duty/spl-utils';
@Component({
  selector: 'cg-bank-transfer-modal',
  template: ` <div class="px-8 py-16 pb8">
    <h2 class="text-3xl text-center mb-4">Just spend! ✔️</h2>
    <cg-bank-justspend-form (submitForm)="onTransfer($event)">
    </cg-bank-justspend-form>
  </div>`,
  standalone: true,
  imports: [JustspendFormComponent],
})
export class TransferModalComponent {
  private readonly _transactionSender = injectTransactionSender();
  onTransfer(payload: transferFormPayload) {
    console.log('Lets spend...', payload);

    this._transactionSender
      .send(({ publicKey }) =>
        createTransferInstructions({
          amount: payload.amount,
          mintAddress: '7EYnhQoR9YM3N7UoaKRoA44Uy8JeaZV3qyouov87awMs',
          receiverAddress: payload.recieverAddress,
          senderAddress: publicKey.toBase58(),
          fundReceiver: true,
          memo: payload.memo,
        }),
      )
      .subscribe({
        next: (signature) => console.log(`Transaction sent: ${signature}`),
        error: (error) => console.error(error),
        complete: () => console.log('You just spent! 🎉'),
      });
  }
}
