
import i18n from './local/i18n';
import { TranslationKeys } from './translation';

// The translate function now has autocomplete and is strongly typed
const translate: TranslationKeys = new Proxy({}, {
    get: (_, prop: string) => i18n.t(prop),
  }) as TranslationKeys;

export default translate;