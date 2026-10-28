import { Injectable } from '@angular/core';
import { ScoutObject, ScoutResponse } from '../types';

@Injectable({ providedIn: 'root' })
export class ScoutApi {
    async getObjects(): Promise<ScoutObject[]> {
        // Scout's API has no CORS headers and forbids browser embedding, so this
        // only works through the dev proxy (proxy.conf.json). A production build
        // would need a real backend to call the API server-side instead.
        const response = await fetch('/scout-api/scout.api');

        if (!response.ok) {
            throw new Error(`Scout API error: ${response.status}`);
        }

        const body: ScoutResponse = await response.json();

        return body.data;
    }
}
