import { Color } from '../../render'
import { Supertile, Weave, Assignment, Units } from '../../components'

enum _SettingBrand {}

type Setting =
	_SettingBrand
	& (number | string | Color | { (p: any): {} } | Supertile | Weave | Assignment | Units | object)

export default Setting
