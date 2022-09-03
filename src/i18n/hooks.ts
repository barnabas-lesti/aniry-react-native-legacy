import { useTranslation } from 'react-i18next';

/**
 * App level translation factory function.
 * @returns Translator function.
 * @example
 * import { useAppTranslation } from './i18n/hooks';
 * const { t } = useAppTranslation();
 */
export const useAppTranslation = useTranslation;
