import { appStore } from '../appStore';

export type AppRootState = ReturnType<typeof appStore.getState>;
