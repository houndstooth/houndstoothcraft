// tslint:disable:no-magic-numbers no-any

import { Radian } from '../stripe'
import { Bool, False, FunctionsOf, Rec, True } from '../types'

type ViewSettingsSchema<R extends Bool> =
	Rec<'centerViewOnCenterOfTileAtHomeAddress', boolean, R> &
	Rec<'rotationAboutCanvasCenter', Radian, R> &
	Rec<'zoom', number, R> &
	Rec<'zoomOnCanvasCenter', boolean, R>

interface ViewSettings extends ViewSettingsSchema<True>{}

type ViewSettingsFunctions = FunctionsOf<ViewSettingsSchema<False>>

export {
	ViewSettings,
	ViewSettingsSchema,
	ViewSettingsFunctions,
}
