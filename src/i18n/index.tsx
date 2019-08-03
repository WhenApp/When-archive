import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import messages_en_us from './en_US.json';
import messages_es from './es.json';
import { logger } from '../logger';

const allMessages: { [index: string]: Record<string, string> } = {
  en: messages_en_us,
  'en-US': messages_en_us,
  es: messages_es,
};

const supportedLocales = Object.keys(allMessages);
const userLocales = new Set([...navigator.languages, 'en']); // add en to the list as a final fallback

// get the first user locale that is also supported
const messagesToUse = Array.from(userLocales).filter(_ => supportedLocales.includes(_))[0];
const localeToUse = messagesToUse.split(/[-_]/)[0]; // remove any region codes

// start with english translations, then add our chosen language. This allows english translations to be a fallback in
// case a particular string is not added to the chosen language's messages.
const messages = Object.assign(allMessages['en'], allMessages[messagesToUse]);

logger.debug(
  'Initializing i18n...',
  {
    supportedLocales,
    userLocales,
    messagesToUse,
    localeToUse,
    messages,
  },
);

const WhenIntlProvider = ({ children }: { children: ReactNode }) => {
  return (
    <IntlProvider locale={messagesToUse} messages={messages}>
      {children}
    </IntlProvider>
  );
};

export {
  WhenIntlProvider as default,
  messages,
};
