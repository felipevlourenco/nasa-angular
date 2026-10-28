import { bootstrapApplication } from '@angular/platform-browser';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { App } from './app/app';
import { appConfig } from './app/app.config';

// Registering AllCommunityModule (not individual feature modules) increase the
// bundle size for not having to track down each AG Grid "module not registered"
// error one feature at a time.
// Ok for this assingment, but a production app with a
// real bundle budget would register only the specific modules actually used
// (TextFilterModule, etc...).
ModuleRegistry.registerModules([AllCommunityModule]);

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
