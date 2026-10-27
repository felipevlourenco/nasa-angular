import { Injectable } from '@angular/core';
import { ScoutObject, ScoutResponse } from '../types';

@Injectable({ providedIn: 'root' })
export class ScoutApi {
    async getObjects(): Promise<ScoutObject[]> {
        const response = await fetch('/scout-api/scout.api');

        if (!response.ok) {
            throw new Error(`Scout API error: ${response.status}`);
        }

        const body: ScoutResponse = await response.json();

        return body.data;
    }
}
