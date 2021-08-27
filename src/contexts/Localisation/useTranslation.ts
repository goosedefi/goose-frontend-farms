import { useContext } from 'react'
import { LanguageContext } from './Provider'
import {TranslationsContext} from './translationsContext'

const useTranslation = () => {
  const languageContext = useContext(TranslationsContext)

  if (languageContext === undefined) {
    throw new Error('Language context is undefined')
  }

  return languageContext
}

export default useTranslation
