import {getRequestConfig} from 'next-intl/server';
import {hasLocale, IntlErrorCode} from 'next-intl';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  // Typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
    onError: (error) => {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        console.error('Missing translation:', error.message);
        return 'ignore';
      }
    }
  };
});
