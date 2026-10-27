import { fetchScoutObjects } from './api';

describe('fetchScoutObjects', () => {
    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('returns the data array on success', async () => {
        const data = [{ objectName: 'A11HAVq', rating: 0 }];
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                json: () => Promise.resolve({ signature: {}, count: '1', data }),
            }),
        );

        await expect(fetchScoutObjects()).resolves.toEqual(data);
    });

    it('throws when the response is not ok', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));

        await expect(fetchScoutObjects()).rejects.toThrow('Scout API error: 500');
    });
});
