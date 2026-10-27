import type { ScoutResponse } from './types';

export async function fetchScoutObjects() {
    const response = await fetch('/scout-api/scout.api');

    if (!response.ok) {
        throw new Error(`Scout API error: ${response.status}`);
    }

    const body: ScoutResponse = await response.json();

    return body.data;
}
