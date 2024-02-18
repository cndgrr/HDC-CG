import { Component } from '@angular/core';
import { BalanceSectionComponent } from './balance-section.component';
import { transactionsSectionComponent } from './transactions-section.component';

@Component({
  selector: 'cg-balance-page',
  template: `
    <div class="flex justify-center gap-4">
      <cg-balance-section> </cg-balance-section>
      <cg-transactions-section> </cg-transactions-section>
    </div>
  `,
  standalone: true,
  imports: [BalanceSectionComponent, transactionsSectionComponent],
})
export class BalancePageComponent {}
