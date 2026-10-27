import { TestBed } from '@angular/core/testing';
import { ScoutApi } from './scout-api';
import scoutMock from './scout.mock.json';
import type { ScoutResponse } from './types';

describe('ScoutApi', () => {
    let scoutApi: ScoutApi;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        scoutApi = TestBed.inject(ScoutApi);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('should return an array of objects', async () => {
        const mock: ScoutResponse = scoutMock;

        vi.stubGlobal(
            'fetch',
            vi.fn().mockReturnValue({
                ok: true,
                json: () => Promise.resolve(mock),
            }),
        );

        await expect(scoutApi.getObjects()).resolves.toEqual(mock.data);
    });

    it('should throw when response is not ok', async () => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockReturnValue({
                ok: false,
                status: 500,
            }),
        );

        await expect(scoutApi.getObjects()).rejects.toThrow('Scout API error: 500');
    });
});
