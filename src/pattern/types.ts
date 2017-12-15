import { animationSettings } from './animation'
import { colorSettings } from './color'
import { gridSettings } from './grid'
import { layerSettings } from './layer'
import { stripeSettings } from './stripe'
import { textureSettings } from './texture'
import { tileSettings } from './tile'
import { viewSettings } from './view'

type FunctionsOf<T> = { [P in keyof T]: () => T[P] }
type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T]
type Overwrite<T, U> = { [P in Diff<keyof T, keyof U>]: T[P] } & U
type False = '0'
type True = '1'
type Bool = False | True
type IfElse<Cond extends Bool, Then, Else> = {'0': Else; '1': Then; }[Cond]
type Rec<K extends string, V, Required extends Bool> = IfElse<Required, Record<K, V>, Partial<Record<K, V>>>

type BasePatternSchema<R extends Bool> =
	Rec<'animationSettings', animationSettings.AnimationSettingsSchema<R>, R> &
	Rec<'colorSettings', colorSettings.ColorSettingsSchema<R>, R> &
	Rec<'gridSettings', gridSettings.GridSettingsSchema<R>, R> &
	Rec<'layerSettings', layerSettings.LayerSettingsSchema<R>, R> &
	Rec<'stripeSettings', stripeSettings.StripeSettingsSchema<R>, R> &
	Rec<'textureSettings', textureSettings.TextureSettingsSchema<R>, R> &
	Rec<'tileSettings', tileSettings.TileSettingsSchema<R>, R> &
	Rec<'viewSettings', viewSettings.ViewSettingsSchema<R>, R>

interface FullPatternBaseValues extends BasePatternSchema<True> {}
interface PatternBaseValues extends BasePatternSchema<False> {}

type PatternFunctions = Partial<{
	animationSettings: animationSettings.AnimationSettingFunctions,
	colorSettings: colorSettings.ColorSettingFunctions,
	gridSettings: gridSettings.GridSettingFunctions,
	layerSettings: layerSettings.LayerSettingFunctions,
	stripeSettings: stripeSettings.StripeSettingFunctions,
	textureSettings: textureSettings.TextureSettingFunctions,
	tileSettings: tileSettings.TileSettingFunctions,
	viewSettings: viewSettings.ViewSettingFunctions,
}>

export {
	Overwrite,
	FunctionsOf,
	Rec,
	Bool,
	True,
	False,
	FullPatternBaseValues,
	PatternBaseValues,
	PatternFunctions,
}
