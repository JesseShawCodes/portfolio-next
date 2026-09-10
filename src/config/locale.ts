import en from './locales/en.json';

const locales = { en };

export type LocaleCode = keyof typeof locales;
export type LocaleContent = typeof en;

const defaultLocale: LocaleCode =
  (process.env.NEXT_PUBLIC_LOCALE as LocaleCode) || 'en';

export function getLocale(locale?: LocaleCode): LocaleContent {
  const resolved = locale ?? defaultLocale;
  return locales[resolved] ?? locales.en;
}
