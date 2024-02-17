import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WalletStore } from '@heavy-duty/wallet-adapter';
import { HdWalletMultiButtonComponent } from '@heavy-duty/wallet-adapter-material';
import { ShyftApiService } from './shyft-api.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { computedAsync } from 'ngxtension/computed-async';
import { MatAnchor } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [RouterModule, HdWalletMultiButtonComponent, MatAnchor],
  selector: 'cg-root',
  template: `
    <header class="py-8 relative">
      <h1 class="text-center text-5xl mb-4">CG Bank</h1>

      <div class="flex justify-center mb-4">
        <hd-wallet-multi-button></hd-wallet-multi-button>
      </div>

      <nav>
        <ul class="flex justify-center items-center gap-4">
          <li><a [routerLink]="['']" mat-raised-button>Home</a></li>
          <li>
            <a [routerLink]="['balance']" mat-raised-button>Just spend ✔️</a>
          </li>
        </ul>
      </nav>
    </header>

    <main><router-outlet></router-outlet></main>
  `,
})
export class AppComponent {}
