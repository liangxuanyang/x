import { useI18n } from "vue-i18n";

/**
 * Generic locale composable that provides reactive access to all translations
 * @returns Reactive locale messages object for the current language and a t function
 */
export function useLocale() {
  const { t, locale, messages } = useI18n();

  return { t, locale, messages };
}
