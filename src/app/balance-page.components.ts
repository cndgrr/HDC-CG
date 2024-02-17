import { Component } from '@angular/core';
import { ShyftApiService } from './shyft-api.service';
import { BalanceSectionComponent } from './balance-section.component';

@Component({
  selector: 'cg-balance-page',
  template: ` <cg-balance-section> </cg-balance-section> `,
  standalone: true,
  imports: [BalanceSectionComponent],
})
export class BalancePageComponent {}
