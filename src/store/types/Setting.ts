import { Assignment, Supertile, Units, Weave } from '../../components'
import { Color } from '../../render'

enum _SettingBrand {}

type Setting =
	_SettingBrand
	& (number | string | Color | { (p: any): {} } | Supertile | Weave | Assignment | Units | object)

export default Setting
