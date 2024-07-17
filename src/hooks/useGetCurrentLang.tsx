'use client'

import { useEffect, useState } from 'react'

/**
 * Custom React hook to dynamically load and set the current language dictionary based on the module, route, and locale.
 * @param dictionary The initial dictionary object.
 * @param module The module name for the translations.
 * @param route The route name for the translations.
 * @param locale The locale for the translations.
 * @returns An object containing the current dictionary and locale.
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
