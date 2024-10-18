export const defaultLocale = "en" as const;
export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const pathnames = {};
export const localePrefix = "always";

export const url = new URL(process.env.NEXT_PUBLIC_APP_URL ? process.env.NEXT_PUBLIC_APP_URL : `http://localhost:${process.env.PORT || 3000}`)
export const apiUrl = new URL(process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : `http://localhost:${process.env.PORT || 1337}`)
export const createUrl = (path: string) => new URL(path, url)
export const createApiUrl = (path: string) => new URL(path, apiUrl);