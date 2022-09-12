import { useTranslation } from 'react-i18next';

/**
 * App translation factory function.
 * @returns Translator function.
 * @example
 * import { useAppTranslation } from 'app/hooks';
 * const { t } = useAppTranslation();
 */
export const useAppTranslation = useTranslation;
