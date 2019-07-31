import React, { ReactNode } from 'react';
import { IntlProvider } from 'react-intl';
import messages_en_us from './en_US.json';
import { logger } from '../logger';

const messages: { [index: string]: Record<string, string> } = {
  en: messages_en_us,
  'en-US': messages_en_us,
};

const supportedLocales = Object.keys(messages);
const userLocales = new Set([...navigator.languages, 'en']); // add en to the list as a final fallback

// get the first user locale that is also supported
const messagesToUse = Array.from(userLocales).filter(_ => supportedLocales.includes(_))[0];
const localeToUse = messagesToUse.split(/[-_]/)[0]; // remove any region codes

logger.debug('Initializing i18n...', { supportedLocales, userLocales, messagesToUse, localeToUse });

const WhenIntlProvider = ({ children }: { children: ReactNode }) => {
  return (
    <IntlProvider locale={messagesToUse} messages={messages[messagesToUse]}>
      {children}
    </IntlProvider>
  );
};

export {
  WhenIntlProvider as default,
  messages,
};
