import { Component } from '@angular/core';
import { BalanceSectionComponent } from './balance-section.component';
import { TransactionsSectionComponent } from './transactions-section.component'; // Add the missing import here
@Component({
  selector: 'cg-home-page',
  template: `
    <div class="flex justify-center gap-4">
      <cg-balance-section> </cg-balance-section>
      <cg-transactions-section> </cg-transactions-section>
    </div>
  `,
  standalone: true,
  imports: [BalanceSectionComponent, TransactionsSectionComponent], // Add the missing import here
})
export class HomePageComponent {}
