import { SettingsStep } from './SettingsStep'

enum _SettingsPathBrand {}
type SettingsPath = _SettingsPathBrand & SettingsStep[]

export { SettingsPath }