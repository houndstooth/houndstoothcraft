import { Color } from '../../render'
import { Supertile, Weave, Assignment } from '../../components'

enum _SettingBrand {}
type Setting = _SettingBrand & (number | string | Color | Function | Supertile | Weave | Assignment | object)

export default Setting
