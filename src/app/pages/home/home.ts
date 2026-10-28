import { Component, inject, OnInit, signal } from '@angular/core';
import { Refresh } from '@primeicons/angular/refresh';
import { Spinner } from '@primeicons/angular/spinner';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, RowClickedEvent, themeQuartz, ValueGetterParams } from 'ag-grid-community';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { ScoutStore } from '../../core/store/scout-store';
import type { ScoutObject, ThreatLevel } from '../../core/types';
import { ErrorOverlay } from './overlays/error-overlay';

function computeThreatIndex(obj: ScoutObject): number {
    return (obj.neoScore + obj.phaScore) / 2;
}

function threatLevelFor(score: number): ThreatLevel {
    if (score >= 70) {
        return 'High';
    }
    if (score >= 40) {
        return 'Medium';
    }

    return 'Low';
}

@Component({
    imports: [
        AgGridAngular,
        DrawerModule,
        InputTextModule,
        ButtonModule,
        ProgressBarModule,
        Refresh,
        Spinner,
    ],
    selector: 'home',
    styleUrl: './home.css',
    templateUrl: './home.html',
})
export class Home implements OnInit {
    protected readonly store = inject(ScoutStore);
    protected readonly searchTerm = signal('');
    protected readonly drawerOpen = signal(false);
    protected readonly selectedObject = signal<ScoutObject | null>(null);

    readonly noRowsOverlayComponent = ErrorOverlay;

    readonly defaultColDef: ColDef = {
        sortable: true,
        filter: true,
        resizable: true,
    };

    readonly columnDefs: ColDef[] = [
        { field: 'objectName', headerName: 'Designation' },
        { field: 'H', headerName: 'Magnitude (H)' },
        { field: 'nObs', headerName: 'Observations' },
        { field: 'caDist', headerName: 'Close approach (LD)' },
        { field: 'neoScore', headerName: 'NEO score' },
        { field: 'phaScore', headerName: 'PHA score' },
        {
            field: 'lastRun',
            headerName: 'Updated (UTC)',
            // lastRun is a "YYYY-MM-DD HH:MM" string — compare as dates
            comparator: (a: string, b: string) => Date.parse(a) - Date.parse(b),
        },
        {
            headerName: 'Threat index',
            valueGetter: ({ data }: ValueGetterParams<ScoutObject>) =>
                data ? computeThreatIndex(data) : null,
            cellRenderer: (params: { value: number }) => {
                const level = threatLevelFor(params.value);
                return `<span class="tag tag-${level.toLowerCase()}">${Math.round(params.value)} ${level}</span>`;
            },
            sort: 'desc',
        },
    ];
    readonly theme = themeQuartz;

    ngOnInit(): void {
        this.store.load();
    }

    onSearch(query: string): void {
        this.searchTerm.set(query);
    }

    onRowClicked({ data }: RowClickedEvent<ScoutObject>): void {
        this.selectedObject.set(data ?? null);
        this.drawerOpen.set(true);
    }

    protected threatIndex(obj: ScoutObject): number {
        return Math.round(computeThreatIndex(obj));
    }

    protected threatLevel(obj: ScoutObject): ThreatLevel {
        return threatLevelFor(computeThreatIndex(obj));
    }
}
