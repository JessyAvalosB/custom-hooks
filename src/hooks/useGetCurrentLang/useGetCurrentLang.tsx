import { useEffect, useState } from 'react'

/**
 * Custom hook to retrieve and set the current language dictionary for a specific module and route.
 * Dynamically imports a language file based on the `module`, `route`, and `locale` parameters provided.
 * 
 * @param dictionary - Initial dictionary object.
 * @param module - The module name to locate the translation files.
 * @param route - The specific route for the translations.
 * @param locale - The locale (e.g., "en", "es") for which the translations are being fetched.
 * 
 * ### Usage:
 * Use `useGetCurrentLang` to fetch the appropriate translation dictionary based on the current locale.
 * 
 * - Automatically updates the dictionary when the `locale` changes.
 * - Fetches translations asynchronously and sets the dictionary state.
 * 
 * ### Example:
 * ```typescript
 * import useGetCurrentLang from './hooks/useGetCurrentLang';
 * 
 * const MyComponent = () => {
 *   const { dict, locale } = useGetCurrentLang(initialDictionary, 'module1', 'home', 'en');
 *   
 *   return (
 *     <div>
 *       <h1>{dict?.title || 'Default Title'}</h1>
 *       <p>Current language: {locale}</p>
 *     </div>
 *   );
 * };
 * ```
 * 
 * @param dictionary - Initial translation dictionary (if available).
 * @param module - The module or section of the app for which translations are being fetched.
 * @param route - The specific route or page to locate the translation file.
 * @param locale - The target language locale for translations.
 * 
 * @returns An object containing:
 *   - `dict`: The translation dictionary for the specified locale.
 *   - `locale`: The current locale string.
 */
const useGetCurrentLang = (dictionary: any, module: string, route: string, locale: string) =>{
  const [dict, setDict] = useState(dictionary)

  useEffect(() => {
    if (locale) {
      const translate = async () => {
        const { dictionary } = await import(`@/lang/translations/${module}/${route}/${locale}`)
        if (!dictionary || dictionary == undefined) { setDict(dict) }
        else { setDict(dictionary) }
      }
      translate()
      return () => { translate() }
    }
  }, [locale])
  return { dict, locale };
};

export default useGetCurrentLang;
