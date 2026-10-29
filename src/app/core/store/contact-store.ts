import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface ContactState {
    submitting: boolean;
    submitted: boolean;
}

const initialState: ContactState = {
    submitting: false,
    submitted: false,
};

export const ContactStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        async submit() {
            patchState(store, { submitting: true });

            // Simulate network so the submitting state is visible
            await new Promise((resolve) => setTimeout(resolve, 1000));

            patchState(store, { submitting: false, submitted: true });
        },
        reset() {
            patchState(store, initialState);
        },
    })),
);
