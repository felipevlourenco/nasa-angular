import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ScoutApi } from '../api/scout-api';
import { ScoutObject } from '../types';

interface ScoutState {
    objects: ScoutObject[];
    loading: boolean;
    error: string | null;
}

const initialState: ScoutState = {
    objects: [],
    loading: false,
    error: null,
};

export const ScoutStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, scoutApi = inject(ScoutApi)) => ({
        async load() {
            patchState(store, { loading: true, error: null });

            try {
                const objects = await scoutApi.getObjects();
                patchState(store, { objects, loading: false });
            } catch (error: unknown) {
                patchState(store, { loading: false, error: (error as Error)?.message });
            }
        },
    })),
);
