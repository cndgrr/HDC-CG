import { Component } from '@angular/core';
import { FeaturesSectionComponent } from './features-section.component';
import { HeroSectionComponent } from './hero-section.component';

@Component({
  selector: 'cg-home-page',
  template: `
    <cg-hero-section> Just spend ✔️ </cg-hero-section>
    <cg-features-section> Just spend ✔️ </cg-features-section>
  `,
  standalone: true,
  imports: [HeroSectionComponent, FeaturesSectionComponent],
})
export class HomePageComponent {}
