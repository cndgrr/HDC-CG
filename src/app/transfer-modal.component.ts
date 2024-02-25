import { Component } from '@angular/core';
import {
  JustspendFormComponent,
  transferFormPayload,
} from './transfer-form.component';
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
  onTransfer(payload: transferFormPayload) {
    console.log('Lets spend...', payload);
  }
}
