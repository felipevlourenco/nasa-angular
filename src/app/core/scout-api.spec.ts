import { TestBed } from '@angular/core/testing';
import { ScoutApi } from './scout-api';

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
        const data = [{ objectName: 'A11HAVq', rating: 0 }];

        vi.stubGlobal(
            'fetch',
            vi.fn().mockReturnValue({
                ok: true,
                json: () => Promise.resolve({ signature: {}, count: 1, data }),
            }),
        );

        await expect(scoutApi.getObjects()).resolves.toEqual(data);
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
