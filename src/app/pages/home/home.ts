import { Component, signal } from '@angular/core';
import { fetchScoutObjects } from '../../core/api';
import type { ScoutObject } from '../../core/types';
import { Loading } from '../../shared/loading/loading';

@Component({
    imports: [Loading],
    selector: 'home',
    styleUrl: './home.css',
    templateUrl: './home.html',
})
export class Home {
    readonly objects = signal<ScoutObject[]>([]);
    readonly error = signal<string | null>(null);
    readonly loading = signal<boolean>(true);

    constructor() {
        fetchScoutObjects()
            .then((data) => {
                this.objects.set(data);
            })
            .catch((error) => {
                this.error.set(error?.message);
            })
            .finally(() => {
                this.loading.set(false);
            });
    }
}
