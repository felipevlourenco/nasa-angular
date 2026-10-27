import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeader } from './shared/app-header/app-header';

@Component({
    imports: [RouterOutlet, AppHeader],
    selector: 'app-root',
    templateUrl: './app.html',
})
export class App {
    protected readonly title = signal('nasa-angular');
}
