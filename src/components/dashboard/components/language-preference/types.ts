import { FunctionComponent } from 'react'

export interface LanguagePreference {
  label: string
  value: number
}

interface LanguagePreferenceProps {
  data: LanguagePreference[]
}

type LanguagePreferenceComponent = FunctionComponent<LanguagePreferenceProps>
export default LanguagePreferenceComponent
