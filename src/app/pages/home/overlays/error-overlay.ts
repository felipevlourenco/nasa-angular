import { Component } from '@angular/core';
import { ExclamationCircle } from '@primeicons/angular/exclamation-circle';
import type { INoRowsOverlayAngularComp } from 'ag-grid-angular';
import type { INoRowsOverlayParams } from 'ag-grid-community';

interface ErrorOverlayParams extends INoRowsOverlayParams {
    error: string | null;
}

@Component({
    selector: 'error-overlay',
    imports: [ExclamationCircle],
    templateUrl: './error-overlay.html',
    styleUrl: './error-overlay.css',
})
export class ErrorOverlay implements INoRowsOverlayAngularComp {
    error: string | null = null;

    agInit(params: ErrorOverlayParams): void {
        this.error = params.error;
    }
}
