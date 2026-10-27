import { TestBed } from '@angular/core/testing';
import { ScoutApi } from '../api/scout-api';
import scoutMock from '../api/scout.mock.json';
import type { ScoutResponse } from '../types';
import { ScoutStore } from './scout-store';

const mockObjects = (scoutMock as ScoutResponse).data.slice(0, 2);

describe('ScoutStore', () => {
    it('loads objects on success', async () => {
        const scoutApiStub = { getObjects: () => Promise.resolve(mockObjects) };
        TestBed.configureTestingModule({
            providers: [{ provide: ScoutApi, useValue: scoutApiStub }],
        });
        const store = TestBed.inject(ScoutStore);

        expect(store.loading()).toBe(false);

        const loadPromise = store.load();
        expect(store.loading()).toBe(true);

        await loadPromise;

        expect(store.objects()).toEqual(mockObjects);
        expect(store.loading()).toBe(false);
        expect(store.error()).toBeNull();
    });

    it('sets error on failure', async () => {
        const scoutApiStub = {
            getObjects: () => Promise.reject(new Error('Scout API error: 500')),
        };
        TestBed.configureTestingModule({
            providers: [{ provide: ScoutApi, useValue: scoutApiStub }],
        });
        const store = TestBed.inject(ScoutStore);

        await store.load();

        expect(store.error()).toBe('Scout API error: 500');
        expect(store.loading()).toBe(false);
        expect(store.objects()).toEqual([]);
    });
});
