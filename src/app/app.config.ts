import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { provideWalletAdapter } from '@heavy-duty/wallet-adapter';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimationsAsync(),
    provideWalletAdapter(),
    provideHttpClient(),
    importProvidersFrom([MatDialogModule]),
  ],
};
