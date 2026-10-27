import { Component, inject, OnInit, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, themeQuartz } from 'ag-grid-community';
import { ScoutApi } from '../../core/scout-api';
import type { ScoutObject } from '../../core/types';
import { Loading } from '../../shared/loading/loading';

@Component({
    imports: [Loading, AgGridAngular],
    selector: 'home',
    styleUrl: './home.css',
    templateUrl: './home.html',
})
export class Home implements OnInit {
    private readonly scoutApi = inject(ScoutApi);

    readonly objects = signal<ScoutObject[]>([]);
    readonly error = signal<string | null>(null);
    readonly loading = signal<boolean>(true);

    readonly columnDefs: ColDef[] = [
        { field: 'objectName', headerName: 'Designation' },
        { field: 'rating', headerName: 'Rating' },
    ];
    readonly theme = themeQuartz;

    ngOnInit(): void {
        this.scoutApi
            .getObjects()
            .then((data) => this.objects.set(data))
            .catch((error) => this.error.set(error?.message))
            .finally(() => this.loading.set(false));
    }
}
