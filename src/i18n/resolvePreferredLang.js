import { getPreferredLang } from './translations'

/**
 * @deprecated Use getPreferredLang() — no network; default id until user picks a language.
 */
export async function resolvePreferredLangAsync() {
  return getPreferredLang()
}
