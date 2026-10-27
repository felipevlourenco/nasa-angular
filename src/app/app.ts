import { Component, signal } from '@angular/core';
import { Loading } from './shared/loading/loading';

@Component({
    imports: [Loading],
    selector: 'app-root',
    styleUrl: './app.css',
    templateUrl: './app.html',
})
export class App {
    protected readonly title = signal('nasa-angular');
}
