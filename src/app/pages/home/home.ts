import { Component, inject, OnInit, signal } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, themeQuartz, ValueGetterParams } from 'ag-grid-community';
import { ScoutApi } from '../../core/scout-api';
import type { ScoutObject, ThreatLevel } from '../../core/types';
import { Loading } from '../../shared/loading/loading';

function threatLevel(score: number): ThreatLevel {
    if (score >= 70) {
        return 'High';
    }
    if (score >= 40) {
        return 'Medium';
    }

    return 'Low';
}

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
        { field: 'H', headerName: 'Magnitude (H)' },
        { field: 'nObs', headerName: 'Observations' },
        { field: 'caDist', headerName: 'Close approach (LD)' },
        { field: 'neoScore', headerName: 'NEO score' },
        { field: 'phaScore', headerName: 'PHA score' },
        { field: 'lastRun', headerName: 'Updated (UTC)' },
        {
            headerName: 'Threat index',
            valueGetter: ({ data }: ValueGetterParams<ScoutObject>) =>
                data ? (data.neoScore + data.phaScore) / 2 : null,
            cellRenderer: (params: { value: number }) => {
                const level = threatLevel(params.value);
                return `<span class="tag tag-${level.toLowerCase()}">${Math.round(params.value)} ${level}</span>`;
            },
            sort: 'desc',
        },
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
