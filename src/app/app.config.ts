import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(routes),
        providePrimeNG({
            theme: {
                preset: Aura,
                // Pin to light mode — PrimeNG's Aura preset otherwise auto-switches on
                // `prefers-color-scheme`, which was turning inputs/drawer dark unexpectedly.
                options: { darkModeSelector: 'none' },
            },
            license: environment.primeNgLicense,
        }),
    ],
};
