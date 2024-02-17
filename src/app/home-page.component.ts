import { Component } from '@angular/core';
import { HeroSectionComponent } from './hero-section.component';

@Component({
  selector: 'cg-home-page',
  template: ` <cg-hero-section> </cg-hero-section> `,
  standalone: true,
  imports: [HeroSectionComponent],
})
export class HomePageComponent {}
