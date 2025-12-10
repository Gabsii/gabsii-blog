"use client";

import { IntlError, IntlErrorCode, NextIntlClientProvider as Provider } from "next-intl";

interface ProviderProps extends React.ComponentProps<typeof Provider>{}

export const NextIntlClientProvider = ({children, ...props}: ProviderProps) => {
  const onError = (error: IntlError) => {
    if (error.code === IntlErrorCode.MISSING_MESSAGE) {
      // Missing translations are expected and should only log an error
      console.log(error);
      return;
    }
    throw error;
  }

  function getMessageFallback({namespace, key, error}: {namespace?: string; key: string; error: IntlError}) {
    if (error.code === IntlErrorCode.MISSING_MESSAGE) {
      return key;
    } else {
      return [namespace, key].filter(Boolean).join(".") ;
    }
  }

  return (
    <Provider onError={onError} getMessageFallback={getMessageFallback} {...props}>
      {children}
    </Provider>
  )
}
